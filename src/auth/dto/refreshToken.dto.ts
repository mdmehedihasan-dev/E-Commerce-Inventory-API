import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token provided during login',
    example: 'f7d4d3a0-9d3c-4f23-8b62-8f85d8d8f8a9',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
