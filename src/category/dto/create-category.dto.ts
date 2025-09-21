import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Category name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Category name must be at most 50 characters long' })
  categoryName: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
    example: 'All kinds of electronic devices',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Description must be at most 200 characters long' })
  categoryDescription?: string;
}
