import blowfish from "../index";
import * as m from "../__mocks__";

describe("blowfish", () => {
  it("Should decipher buffer using default key and schedule", () => {
    const bf = blowfish();
    const buffer = Buffer.from(m.encryptedBuffer);
    bf.decipher(buffer);
    expect(buffer).toEqual(m.decryptedBuffer);
  });

  it("Should encipher buffer using default key and schedule", () => {
    const bf = blowfish();
    const buffer = Buffer.from("blowfishblowfish");
    bf.encipher(buffer);
    expect(buffer).toEqual(m.encryptedBuffer);
  });

  it("Should decipher buffer using custom schedule", () => {
    const bf = blowfish(m.key, m.customScheduleBuffer);
    const buffer = Buffer.from(m.customEncryptedBuffer);
    bf.decipher(buffer);
    expect(buffer).toEqual(m.customDecryptedBuffer);
  });

  it("Should encipher buffer using custom schedule", () => {
    const bf = blowfish(m.key, m.customScheduleBuffer);
    const buffer = Buffer.from(m.customDecryptedBuffer);
    bf.encipher(buffer);
    expect(buffer).toEqual(m.customEncryptedBuffer);
  });

  it("Should decipher buffer using default, offset and length", () => {
    const bf = blowfish();
    const buffer = Buffer.from(m.encryptedBuffer);
    bf.decipher(buffer, 8, 8);
    expect(buffer).toEqual(
      Buffer.concat([
        m.encryptedBuffer.slice(0, 8),
        m.decryptedBuffer.slice(8, 16),
      ]),
    );
  });

  it("Should encipher buffer using default, offset and length", () => {
    const bf = blowfish();
    const buffer = Buffer.from(m.decryptedBuffer);
    bf.encipher(buffer, 8, 8);
    expect(buffer).toEqual(
      Buffer.concat([
        m.decryptedBuffer.slice(0, 8),
        m.encryptedBuffer.slice(8, 16),
      ]),
    );
  });

  it("Should throw RangeError when decipher receives invalid length", () => {
    const bf = blowfish();
    const buffer = Buffer.from(m.encryptedBuffer);
    try {
      bf.decipher(buffer, 0, 4);
    } catch (err) {
      expect(err.message).toEqual(
        "Invalid buffer length 4, must be multiple of 8",
      );
    }
  });

  it("Should throw RangeError when encipher receives invalid length", () => {
    const bf = blowfish();
    const buffer = Buffer.from(m.decryptedBuffer);
    try {
      bf.encipher(buffer, 0, 4);
    } catch (err) {
      expect(err.message).toEqual(
        "Invalid buffer length 4, must be multiple of 8",
      );
    }
  });
});
