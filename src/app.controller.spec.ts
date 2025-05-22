import { generateKeyPairSync } from 'crypto';
import { CryptoService } from './crypto/crypto.service';

describe('CryptoService dynamic key generation with logs', () => {
  let cryptoService: CryptoService;

  beforeAll(() => {
    console.log('Generating RSA key pair...');
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
    });

    const mockConfigService = {
      get: (key: string) => {
        if (key === 'PRIVATE_KEY') return privateKey;
        if (key === 'PUBLIC_KEY') return publicKey;
        return null;
      },
    };

    cryptoService = new CryptoService(mockConfigService as any);
    console.log('CryptoService initialized with generated keys.');
  });

  it('should load generated keys', () => {
    console.log('Checking if keys are loaded in CryptoService...');
    expect(cryptoService['privateKey']).toBeTruthy();
    expect(cryptoService['publicKey']).toBeTruthy();
    console.log('Keys loaded successfully.');
  });

  it('should encrypt and decrypt using generated keys', () => {
    const text = 'Hello, world!';
    console.log('Original text:', text);

    const encrypted = cryptoService.publicKeyEncrypt(text);
    console.log('Encrypted text:', encrypted);

    const decrypted = cryptoService.privateKeyDecrypt(encrypted);
    console.log('Decrypted text:', decrypted);

    expect(decrypted).toBe(text);
    console.log('Encryption and decryption verified successfully.');
  });
});
