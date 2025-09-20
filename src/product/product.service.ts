import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/entity/catagory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /*=================== Create Product  Start =====================>*/
  async createProduct(
    userId: number,
    createProductDto: CreateProductDto,
    imagePath?: string,
  ): Promise<{ message: string; product?: Product }> {
    const { categoryId } = createProductDto;

    // find user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found.`);
    }

    // find category owned by user
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId, ownerId: userId },
    });

    if (!category) {
      throw new NotFoundException(`Category ${categoryId} not found.`);
    }

    const product = this.productRepository.create({
      ...createProductDto,
      productImageUrl: imagePath,
      vendor: user,
      catagory: category,
    });

    try {
      const savedProduct = await this.productRepository.save(product);
      return {
        message: 'Product created successfully.',
        product: savedProduct,
      };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Product with this name already exists.',
        );
      }
      throw new InternalServerErrorException('Failed to create product.');
    }
  }

  /*===================  get A Single Product  Start  =====================*/
  async getProductById(id: number, userId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found.`);
    }

    if (product.vendor.id !== userId) {
      throw new NotFoundException(
        `Product ${id} not found or you are not authorized.`,
      );
    }

    return product;
  }

  /*===================  get All Products  Start   =====================*/
  async getAllProduct(
    userId: number,
  ): Promise<{ message: string; products?: Product[] }> {
    const products = await this.productRepository.find({
      where: {
        vendor: {
          id: userId,
        },
      },
      relations: ['vendor'],
    });

    if (products.length === 0) {
      return { message: 'NO Product Found' };
    }

    return {
      message: 'Products retrieved successfully',
      products: products,
    };
  }

  /*===================  Update A Single Product  Start   =====================*/
  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    userId: number,
    imagePath?: string,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found.`);
    }

    if (product.vendor.id !== userId) {
      throw new NotFoundException(
        `Product ${id} not found or you are not authorized.`,
      );
    }

    // Check if categoryId is provided
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateProductDto.categoryId, ownerId: userId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category ${updateProductDto.categoryId} not found or you are not owner`,
        );
      }
      product.catagory = category;
    }

    if (imagePath) {
      product.productImageUrl = imagePath;
    }

    Object.assign(product, updateProductDto);

    return this.productRepository.save(product);
  }

  /*===================  Delete A Single Product   =====================*/
  async deleteProduct(
    id: number,
    userId: number,
  ): Promise<{ message: string }> {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['vendor'],
    });

    if (!product) {
      throw new NotFoundException(`Product ${id} not found.`);
    }

    if (product.vendor.id !== userId) {
      throw new NotFoundException(
        `Product ${id} not found or you are not authorized.`,
      );
    }

    await this.productRepository.remove(product);
    return { message: `Product ${id} deleted successfully.` };
  }
}
