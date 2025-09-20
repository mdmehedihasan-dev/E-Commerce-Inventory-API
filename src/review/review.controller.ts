import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/Update-review.dto';

@ApiTags('Review')
@Controller('review')
export class ReviewController {

    constructor( private readonly reviewService: ReviewService) {}

    @Post('createreview')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new review for product' })
    @ApiResponse({ status: 201, description: 'Review created successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    async createReview(@Body() createReviewDto: CreateReviewDto,@Request() req) {
        return this.reviewService.createReview(createReviewDto, req.user.id);
    }
    @Put('updatereview/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update an existing review' })
    @ApiResponse({ status: 200, description: 'Review updated successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    async updateReview(@Body() updateReviewDto: UpdateReviewDto, @Request() req, @Param('id') id: string) {
        return this.reviewService.updateReview(updateReviewDto, req.user.id, +id);
    }



    


    @Delete('deletereview/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a review by ID' })
    @ApiResponse({ status: 200, description: 'Review deleted successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Review not found.' })
    async deleteReview(@Param('id') id: string, @Request() req) {
        
        return this.reviewService.deleteReview(+id, req.user.id);
    }



    @Get('getAllReview')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Reviews' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all reviews.' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Reviews not found' })
    async getAllReview() {
        return this.reviewService.allReview();
    }
}
