import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'iPhone 15' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ description: 'Product description', example: 'Latest model of iPhone' })
  @IsString()
  @IsNotEmpty()
  productDescription: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  productPrice: number;

  @ApiProperty({ description: 'Product stock quantity', example: 50 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  productStock: number;

//   @ApiProperty({ description: 'Store ID where product belongs', example: 1 })
//   @IsNumber()
//   @IsNotEmpty()
//   storeId: number;

  @ApiProperty({ description: 'Category ID of the product', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiPropertyOptional({ description: 'Product image URL (optional)', example: 'https://example.com/product.jpg' })
  @IsString()
  @IsOptional()
  productImage?: string;
}
