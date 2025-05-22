import { ApiProperty } from '@nestjs/swagger';

export class EncryptResponseDto {
  @ApiProperty({ example: true })
  successful: boolean;

  @ApiProperty({ example: '' })
  error_code: string;

  @ApiProperty({
    example: {
      data1: 'Encrypted AES Key String',
      data2: 'Encrypted Payload String',
    },
  })
  data: {
    data1: string;
    data2: string;
  } | null;
}
