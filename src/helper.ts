export const signedToUnsigned = (signed: number): number => {
  return signed >>> 0;
};

export const xor = (a: number, b: number): number => {
  return signedToUnsigned(a ^ b);
};

export const sumMod32 = (a: number, b: number): number => {
  return signedToUnsigned((a + b) | 0);
};

export const packFourBytes = (
  byte1: number,
  byte2: number,
  byte3: number,
  byte4: number,
): number => {
  return signedToUnsigned((byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4);
};

export const unpackFourBytes = (pack: number): number[] => {
  return [
    (pack >>> 24) & 0xff,
    (pack >>> 16) & 0xff,
    (pack >>> 8) & 0xff,
    pack & 0xff,
  ];
};

export const bufferToUint32Array = (buffer: Buffer): Uint32Array => {
  return new Uint32Array(
    buffer.buffer,
    buffer.byteOffset,
    buffer.byteLength / Uint32Array.BYTES_PER_ELEMENT,
  );
};
