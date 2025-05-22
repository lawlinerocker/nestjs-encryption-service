import { ApiProperty } from '@nestjs/swagger';

export class DecryptResponseDto {
  @ApiProperty({ example: true })
  successful: boolean;

  @ApiProperty({ example: '' })
  error_code: string;

  @ApiProperty({
    example: {
      payload: 'Decrypted data string',
    },
  })
  data: {
    payload: string;
  } | null;
}
