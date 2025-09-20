

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";


export class CreateReviewDto {

    @ApiProperty({ description: 'Rating (1-5)', example: 5, required: false })
    @IsInt()
    @Min(1)
    @Max(5)
    @IsOptional()
    rating?: number;

    @ApiProperty({ description: 'Write your Comment (Optional)', example: 'Great product!', required: false })
    @IsString() 
    @IsOptional()
    comment?: string;


    @ApiProperty({ description: 'Product ID', example: 1 })
    @IsInt()
    @IsNotEmpty()
    productId: number;

}   

