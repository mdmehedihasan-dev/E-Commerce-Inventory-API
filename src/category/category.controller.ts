import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Category created successfully',
    schema: {
      example: {
        id: 1,
        categoryName: 'Electronics',
        categoryDescription: 'All kinds of electronic devices',
        ownerId: 5,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Category with this name already exists' })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req: any) {
    const ownerId = req.user.id;
    return this.categoryService.createCategory(createCategoryDto, ownerId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing category' })
  @ApiResponse({
    status: 200,
    description: 'Category updated successfully',
    schema: {
      example: {
        id: 1,
        categoryName: 'Updated Electronics',
        categoryDescription: 'Updated description',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - not the owner' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req: any,
  ) {
    const ownerId = req.user.id;
    return this.categoryService.updateCategory(+id, updateCategoryDto, ownerId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the owner or category has products' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(@Param('id') id: string, @Request() req: any) {
    const ownerId = req.user.id;
    return this.categoryService.deleteCategory(+id, ownerId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of categories',
    schema: {
      example: [
        { id: 1, categoryName: 'Electronics', productCount: 12 },
        { id: 2, categoryName: 'Books', productCount: 5 },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllCategories(@Request() req: any) {
    const ownerId = req.user.id;
    return this.categoryService.getAllCategory(ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
    schema: {
      example: {
        id: 1,
        categoryName: 'Electronics',
        categoryDescription: 'All kinds of electronic devices',
        productCount: 12,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCategoryById(@Param('id') id: string, @Request() req: any) {
    const ownerId = req.user.id;
    return this.categoryService.getCategoryById(+id, ownerId);
  }
}
