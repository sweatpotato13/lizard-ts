import { randomPlaintext, keyGeneration, encrypt, decrypt, scalarMultiplyVector } from "../src/main";

describe("Lizard Test", () => {
    it("has successful flow", () => {
        const plain = randomPlaintext();
        const m_transpose = scalarMultiplyVector(128, plain);
        const key = keyGeneration();
        const enc = encrypt(m_transpose, key.pk);
        const dec = decrypt(enc, key.sk);
        const ms = plain.toString();
        const ts = dec.toString();
        expect(ms).toEqual(ts);
    });
});
