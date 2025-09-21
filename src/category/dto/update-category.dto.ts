import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Updated name of the category',
    example: 'Updated Electronics',
  })
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Category name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Category name must be at most 50 characters long' })
  categoryName?: string;

  @ApiPropertyOptional({
    description: 'Updated description for the category',
    example: 'Updated description for electronics category',
  })
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Description must be at most 200 characters long' })
  categoryDescription?: string;
}
