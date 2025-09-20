

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateStoreDto {

    @ApiProperty({
        description: 'Name of the store',
        example: 'My Awesome Store'
    })
    @IsString()  
    @IsNotEmpty()
    @IsOptional()
    storeName: string;  // Changed from name


    @ApiProperty({
        description: 'Description of the store',
        example: 'This store sells awesome products.'
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    storeDescription: string;



}