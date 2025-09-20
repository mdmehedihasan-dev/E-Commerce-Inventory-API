import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {

  @ApiProperty({
    description: 'Name of the category',
    example: 'Electronics',
  })
  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @ApiProperty({
    description: 'Description of the category',
    example: 'All kinds of electronic devices',
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryDescription?: string;

}
