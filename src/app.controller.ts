import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from './crypto/crypto.service';
import {
  decryptBodyExample,
  DecryptFailureResponse,
  DecryptSuccessResponse,
  encryptBodyExample,
  EncryptFailureResponse,
  EncryptSuccessResponse,
} from './docs';
import {
  DecryptDtoSwagger,
  DecryptResponse,
  EncryptDtoSwagger,
  EncryptResponse,
} from './dto';
import { DecryptDto, decryptSchema, EncryptDto, encryptSchema } from './schema';

@ApiTags('Encryption API')
@Controller()
export class AppController {
  constructor(private readonly cryptoService: CryptoService) {}
  @Post('/get-encrypt-data')
  @ApiOperation({ summary: 'Encrypt data with AES and RSA' })
  @ApiBody({
    type: EncryptDtoSwagger,
    required: true,
    examples: {
      example: encryptBodyExample.example,
    },
  })
  @ApiResponse(EncryptSuccessResponse)
  @ApiResponse(EncryptFailureResponse)
  encrypt(@Body() body: EncryptDto): EncryptResponse {
    try {
      const parsedBody = encryptSchema.safeParse(body);
      if (!parsedBody.success) {
        console.error('Validation error:', parsedBody.error.format());
        throw new Error(
          `Validation failed: ${JSON.stringify(parsedBody.error.format())}`,
        );
      }

      const { payload } = parsedBody.data;

      const aesKeyBuffer = this.cryptoService.generateAesKey();
      const aesKeyBase64 = aesKeyBuffer.toString('base64');

      const encryptedPayload = this.cryptoService.encryptAes(
        payload,
        aesKeyBuffer,
      );

      const encryptedAesKey = this.cryptoService.publicKeyEncrypt(aesKeyBase64);

      return {
        successful: true,
        error_code: '',
        data: { data1: encryptedAesKey, data2: encryptedPayload },
      };
    } catch (err) {
      console.error('Encryption error:', err);
      return {
        successful: false,
        error_code: err instanceof Error ? err.message : String(err),
        data: null,
      };
    }
  }
  @Post('/get-decrypt-data')
  @ApiOperation({ summary: 'Decrypt data with RSA and AES' })
  @ApiBody({
    type: DecryptDtoSwagger,
    required: true,
    examples: {
      example: decryptBodyExample.example,
    },
  })
  @ApiResponse(DecryptSuccessResponse)
  @ApiResponse(DecryptFailureResponse)
  decrypt(@Body() body: DecryptDto): DecryptResponse {
    try {
      const parsedBody = decryptSchema.safeParse(body);
      if (!parsedBody.success) {
        console.error('Validation error:', parsedBody.error.format());
        throw new Error(
          `Validation failed: ${JSON.stringify(parsedBody.error.format())}`,
        );
      }

      const aesKeyBase64 = this.cryptoService.privateKeyDecrypt(
        parsedBody.data.data1,
      );

      const aesKeyBuffer = Buffer.from(aesKeyBase64, 'base64');

      const decryptedPayload = this.cryptoService.decryptAes(
        parsedBody.data.data2,
        aesKeyBuffer,
      );

      return {
        successful: true,
        error_code: '',
        data: { payload: decryptedPayload },
      };
    } catch (err) {
      console.error('Decryption error:', err);
      return {
        successful: false,
        error_code: err instanceof Error ? err.message : String(err),
        data: null,
      };
    }
  }
}
