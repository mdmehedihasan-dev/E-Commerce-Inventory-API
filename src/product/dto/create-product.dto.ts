import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class CreateProductDto {
  
    @ApiProperty({ description: 'Product name', example: "Product Name" })
    @IsString()
    @IsNotEmpty()
    productName: string;

    @ApiProperty({ description: 'Product description', example: "Product Description" })
    @IsString()
    @IsNotEmpty()
    productDescription: string;

    @ApiProperty({ description: 'Product price', example: 100 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    productPrice: number;

    @ApiProperty({ description: 'Product stock', example: 50 })
    @IsNotEmpty()   
    @IsNumber()
    @Min(0)
    productStock: number;

    
   @ApiProperty({description: 'Store ID', example: 1})
   @IsNotEmpty()
   @IsNumber()
   storeId: number;

   @ApiProperty({ description: 'Category Id', example: 1 })
   @IsNotEmpty()
   @IsNumber()
   categoryId: number;

}   

