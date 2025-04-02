import * as crypto from 'crypto';
import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);

export class CryptoUtils {
  static generateMnemonic(): string {
    return bip39.generateMnemonic();
  }

  static validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
  }

  static mnemonicToSeed(mnemonic: string, passphrase?: string): Buffer {
    return bip39.mnemonicToSeedSync(mnemonic, passphrase);
  }

  static deriveKeyPair(seed: Buffer, path: string) {
    const root = bip32.fromSeed(seed);
    const child = root.derivePath(path);

    return {
      privateKey: child.privateKey,
      publicKey: child.publicKey,
      chainCode: child.chainCode
    };
  }

  static sha256(data: Buffer): Buffer {
    return crypto.createHash('sha256').update(data).digest();
  }

  static ripemd160(data: Buffer): Buffer {
    return crypto.createHash('ripemd160').update(data).digest();
  }

  static hash160(data: Buffer): Buffer {
    return this.ripemd160(this.sha256(data));
  }

  static doubleSha256(data: Buffer): Buffer {
    return this.sha256(this.sha256(data));
  }

  static generateSecureRandom(length: number = 32): Buffer {
    return crypto.randomBytes(length);
  }

  static encodeBase58Check(payload: Buffer): string {
    const checksum = this.doubleSha256(payload).slice(0, 4);
    const combined = Buffer.concat([payload, checksum]);
    return this.base58Encode(combined);
  }

  static base58Encode(buffer: Buffer): string {
    const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    let num = BigInt('0x' + buffer.toString('hex'));

    while (num > 0n) {
      const remainder = Number(num % 58n);
      result = alphabet[remainder] + result;
      num = num / 58n;
    }

    for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
      result = '1' + result;
    }

    return result;
  }
}