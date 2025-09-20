import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@ApiTags('Store')
@Controller('store')
export class StoreController {


  constructor(private readonly storeService: StoreService) {}

 
  @Post('createStore')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({ status: 201, description: 'Store created successfully.'})  
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createStore(@Body() createStoreDto: CreateStoreDto, @Request() req:any) {
    const userId = req.user.id;
    return this.storeService.create(createStoreDto,userId);
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all stores for the current user' })
  @ApiResponse({ status: 200, description: 'Stores retrieved successfully.'}) 
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllStores() {
  
    return this.storeService.getAllStores();
  }

  @Get('getSingleStore/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get store by ID' })
  @ApiResponse({ status: 200, description: 'Store retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  @ApiResponse({ status: 403, description: 'Access denied' }) 
  async getStoreById(@Param('id') id: string) {

    return this.storeService.getStoreById(+id);
  }


  @Delete('deleteStore/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete store by ID (owner only)' })
  @ApiResponse({ status: 200, description: 'Store deleted successfully.' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  async deleteStore(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id; 
    console.log(userId, id);
    return this.storeService.deleteStoreById(+id, userId);
  }


  @Put('updateStore/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update store by ID (owner only)' })
  @ApiResponse({ status: 200, description: 'Store updated successfully.' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Store not found' })
  async updateStore(
    @Param('id') id: string,
    @Body() updateStoreDto: UpdateStoreDto,
    @Request() req: any
  ) {
    const userId = req.user.id;
    return this.storeService.updateStoreById(+id, updateStoreDto, userId);
  }
 


}
