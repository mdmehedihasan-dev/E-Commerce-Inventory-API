import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Products')
@Controller('api/products') // Use plural form to match REST standards
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /** Create Product */
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productName: { type: 'string', example: 'T-shirt' },
        productDescription: { type: 'string', example: 'Cotton T-shirt' },
        productPrice: { type: 'number', example: 100 },
        productStock: { type: 'number', example: 10 },
        categoryId: { type: 'number', example: 1 },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Create a new product with optional image' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    const imagePath = file ? `uploads/${file.filename}` : undefined;
    return this.productService.createProduct(userId, createProductDto, imagePath);
  }

  /** Get All Products with filters & pagination */
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products with optional filters' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getAllProducts(
    @Request() req: any,
    @Query() query: {
      categoryId?: number;
      minPrice?: number;
      maxPrice?: number;
      page?: number;
      limit?: number;
    },
  ) {
    const userId = req.user.id;
    return this.productService.getAllProduct(userId, query);
  }

  /** Get single Product by ID */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a product by ID' })
  async getProductById(@Param('id') id: number, @Request() req: any) {
    const userId = req.user.id;
    return this.productService.getProductById(id, userId);
  }

  /** Update Product */
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productName: { type: 'string', example: 'Updated T-shirt' },
        productDescription: { type: 'string', example: 'Updated Cotton T-shirt' },
        productPrice: { type: 'number', example: 120 },
        productStock: { type: 'number', example: 5 },
        categoryId: { type: 'number', example: 2 },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiOperation({ summary: 'Update a product with optional image' })
  async updateProduct(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: any,
  ) {
    const userId = req.user.id;
    const imagePath = file ? `uploads/${file.filename}` : undefined;
    return this.productService.updateProduct(id, updateProductDto, userId, imagePath);
  }

  /** Delete Product */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  async deleteProduct(@Param('id') id: number, @Request() req: any) {
    const userId = req.user.id;
    return this.productService.deleteProduct(id, userId);
  }
}
