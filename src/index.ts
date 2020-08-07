import { P as PP, S as SS } from "./data";
import * as h from "./helper";

export const S = SS;
export const P = PP;
export const N = 16;

export const blowfish = (key = "blowfish", schedule?: Buffer): Blowfish => {
  const _key = Buffer.alloc((N + 2) * 4).fill(key);
  const _schedule = schedule && h.bufferToUint32Array(schedule);
  const _P: Uint32Array = _schedule
    ? _schedule.slice(0, P.length)
    : new Uint32Array(P);
  const _S: Uint32Array[] = S.map((_, i) =>
    _schedule
      ? _schedule.slice(
          P.length + S[0].length * i,
          P.length + S[0].length * (i + 1),
        )
      : new Uint32Array(S[i]),
  );

  const init = () => {
    for (let i = 0, j = 0; i < N + 2; i++, j += 4) {
      const n = h.packFourBytes(_key[j], _key[j + 1], _key[j + 2], _key[j + 3]);
      _P[i] = h.xor(_P[i], n);
    }

    let xl = 0;
    let xr = 0;
    for (let i = 0; i < N + 2; i += 2) {
      [xl, xr] = _encipher(xl, xr);
      _P[i] = xl;
      _P[i + 1] = xr;
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 256; j += 2) {
        [xl, xr] = _encipher(xl, xr);
        _S[i][j] = xl;
        _S[i][j + 1] = xr;
      }
    }
  };

  const F = (x: number): number => {
    const [a, b, c, d] = h.unpackFourBytes(x);

    let y = h.sumMod32(_S[0][a], _S[1][b]);
    y = h.xor(y, _S[2][c]);
    return h.sumMod32(y, _S[3][d]);
  };

  const _encipher = (xl: number, xr: number) => {
    for (let i = 0; i < N; i++) {
      xl = h.xor(xl, _P[i]);
      xr = h.xor(xr, F(xl));
      [xl, xr] = [xr, xl];
    }
    [xl, xr] = [xr, xl];
    xr = h.xor(xr, _P[N]);
    xl = h.xor(xl, _P[N + 1]);
    return [xl, xr];
  };

  const _decipher = (xl: number, xr: number) => {
    for (let i = N + 1; i > 1; i--) {
      xl = h.xor(xl, _P[i]);
      xr = h.xor(xr, F(xl));
      [xl, xr] = [xr, xl];
    }
    [xl, xr] = [xr, xl];
    xr = h.xor(xr, _P[1]);
    xl = h.xor(xl, _P[0]);
    return [xl, xr];
  };

  const encipher = (data: Buffer, offset = 0, length: number = data.length) => {
    let xl: number, xr: number;
    if (length % 8 != 0) {
      throw RangeError(
        `Invalid buffer length ${length}, must be multiple of 8`,
      );
    }
    for (let i = offset; i < length + offset; i += 8) {
      // Encode the data in 8 byte blocks.
      xl = h.packFourBytes(data[i], data[i + 1], data[i + 2], data[i + 3]);
      xr = h.packFourBytes(data[i + 4], data[i + 5], data[i + 6], data[i + 7]);
      [xl, xr] = _encipher(xl, xr);
      // Now Replace the data.
      [data[i], data[i + 1], data[i + 2], data[i + 3]] = h.unpackFourBytes(xl);
      [data[i + 4], data[i + 5], data[i + 6], data[i + 7]] = h.unpackFourBytes(
        xr,
      );
    }
  };

  const decipher = (data: Buffer, offset = 0, length: number = data.length) => {
    let xl: number, xr: number;
    if (length % 8 != 0) {
      throw RangeError(
        `Invalid buffer length ${length}, must be multiple of 8`,
      );
    }
    for (let i = offset; i < length + offset; i += 8) {
      // Encode the data in 8 byte blocks.
      xl = h.packFourBytes(data[i], data[i + 1], data[i + 2], data[i + 3]);
      xr = h.packFourBytes(data[i + 4], data[i + 5], data[i + 6], data[i + 7]);
      [xl, xr] = _decipher(xl, xr);
      // Now Replace the data.
      [data[i], data[i + 1], data[i + 2], data[i + 3]] = h.unpackFourBytes(xl);
      [data[i + 4], data[i + 5], data[i + 6], data[i + 7]] = h.unpackFourBytes(
        xr,
      );
    }
  };

  init();
  return {
    encipher,
    decipher,
  };
};

interface Blowfish {
  encipher: (data: Buffer, offset?: number, length?: number) => void;
  decipher: (data: Buffer, offset?: number, length?: number) => void;
}

export default blowfish;
