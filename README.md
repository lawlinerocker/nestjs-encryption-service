# NestJS Encryption Service

A NestJS-based encryption service providing AES and RSA encryption/decryption APIs.

---

## Prerequisites

- Node.js (v16+ recommended)  
- npm or pnpm package manager  
- OpenSSL (for generating RSA key pairs)  

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nestjs-encryption-service.git
   cd nestjs-encryption-service
  ```
2. Install dependencies
    Using npm : 
```bash
npm install
```
   Using pnpm : 
```bash
npm install
```
3. Generate RSA key pairs (.pem files)
Run this command once to generate the keys:
```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out src/keys/private.pem && openssl pkey -in src/keys/private.pem -pubout -out src/keys/public.pem
```

4. Build the project
For Linux/macOS:
```bash
npm run build
```
For Window:
```bash
npm run build:win
```
5. Run the service
Development mode (with watch):
```bash
npm run start:dev
```
Production mode:
```bash
npm run start:dev
```
6. Run all tests:
```bash
npm test
```


