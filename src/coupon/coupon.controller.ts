import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateCouponDto } from './dto/create-coupon.dto';

@ApiTags('coupon')
@Controller('coupon')
export class CouponController {


    constructor(private readonly couponService: CouponService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'Create a new coupon'}) 
    @ApiResponse({status:201, description:"Coupon Create Successfull"})
    @ApiResponse({status:401, description:"Unauthorized"})
    @ApiResponse({status:403, description:"You are not owner"})
    @ApiResponse({status:404, description:"Not Found"})
    async  create(@Body() createCouponDto : CreateCouponDto , @Request() req:any): Promise<any> {
     const userId = req.user.id;
    return this.couponService.create(createCouponDto, userId);
   }
    
 





}
