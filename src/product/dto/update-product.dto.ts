import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {

  @ApiProperty({ description: 'Product Name', example: 'Updated Product Name' })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiProperty({ description: 'Product Description', example: 'Updated Product Description' })
  @IsOptional()
  @IsString()
  productDescription?: string;

  @ApiProperty({ description: 'Product Price', example: 150 })
  @IsOptional()
  @IsNumber()
  @IsPositive() // Ensures the price is a positive number
  @Min(0) // Accepts 0 and above
  productPrice?: number;

  @ApiProperty({ description: 'Product Stock', example: 50 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(0)
  productStock?: number;


  @ApiProperty({description: 'Store ID', example: 1})
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  storeId?: number;


  @ApiProperty({ description: 'Store ID', example: 1 })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  categoryId?: number;

}

