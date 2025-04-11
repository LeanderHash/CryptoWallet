import { CryptoUtils } from '../src/utils/crypto';

describe('CryptoUtils', () => {
  test('should generate valid mnemonic', () => {
    const mnemonic = CryptoUtils.generateMnemonic();
    expect(mnemonic).toBeDefined();
    expect(mnemonic.split(' ')).toHaveLength(12);
    expect(CryptoUtils.validateMnemonic(mnemonic)).toBe(true);
  });

  test('should validate mnemonic correctly', () => {
    const validMnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
    const invalidMnemonic = 'invalid mnemonic phrase';

    expect(CryptoUtils.validateMnemonic(validMnemonic)).toBe(true);
    expect(CryptoUtils.validateMnemonic(invalidMnemonic)).toBe(false);
  });

  test('should generate seed from mnemonic', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
    const seed = CryptoUtils.mnemonicToSeed(mnemonic);

    expect(seed).toBeInstanceOf(Buffer);
    expect(seed.length).toBe(64);
  });

  test('should hash data correctly', () => {
    const data = Buffer.from('hello world', 'utf8');
    const hash = CryptoUtils.sha256(data);

    expect(hash).toBeInstanceOf(Buffer);
    expect(hash.length).toBe(32);
  });
});