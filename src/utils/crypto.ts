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
}