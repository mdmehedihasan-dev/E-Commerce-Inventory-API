
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Store } from 'src/entity/store.entity';
import { Category } from 'src/entity/catagory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Store)
    private storeRepository: Repository<Store>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,


  ) {}

    /*=================== Create Product  Start =====================>*/

    async createProduct(
        userId: number ,
        createProductDto: CreateProductDto,
        imagePath?: string ,
    ): 
    Promise<{ message: string; product?: Product }> {

    const { storeId ,categoryId} = createProductDto; 

    // user kuja hoitase
    const user = await this.userRepository.findOne({ where: { id: userId } });
    console.log(user);
    if (!user) {
        throw new NotFoundException(`User ${userId} not found.`);
    }

    // store kuja hoitase
    const store = await this.storeRepository.findOne({ where: { id: storeId, storeOwner: { id: userId } } });
    console.log(store);
    if (!store) {
        throw new NotFoundException(`Store ${storeId} not found.`);
    }

    // category kuja hoitase
    const category = await this.categoryRepository.findOne({ where: { id: categoryId , ownerId: userId} });
    console.log(category);

    if (!category) {
        throw new NotFoundException(`Category ${categoryId} not found.`);
    }

    console.log(createProductDto)

    const product = this.productRepository.create({
                    ...createProductDto,
                    productImageUrl: imagePath, 
                    vendor: user,
                    store: store, 
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
        throw new ConflictException('Product with this name already exists.');
    }
     throw new InternalServerErrorException('Failed to create product.');
     }
    }
   
  /*===================  get A Single Product  Start  =====================*/

   async getProductById(id: number, userId: number): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: {id},
            relations: ['vendor', 'store'],
        });

        if (!product) {
            throw new NotFoundException(`Product ${id} not found.`);
        }

        if (product.vendor.id !== userId) {
            throw new NotFoundException(`Product ${id} not found or you are not authorized.`);
        }

        return product;
    }

    

 /*===================  get All Product  Start   =====================*/

   async getAllProduct(userId: number): Promise<{ message: string; products?: Product[] }> {
        const products = await this.productRepository.find({
            where: {
            store: {
                storeOwner: {
                id: userId,
                },
            },
            },
            relations: ['vendor', 'store',],
        }); 

        if (products.length === 0) {
            return { message: 'NO Product Found' };
        }

        return {
            message: 'Product Successful Retun',
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
        relations: ['vendor','store'], // vendor লোড করো
    });

    if (!product) {
        throw new NotFoundException(`Product ${id} not found.`);
    }


    if (product.vendor.id !== userId) {
        throw new NotFoundException(`Product ${id} not found or you are not authorized.`);
    }

    // Check if storeId is provided and valid
    if (updateProductDto.storeId) {
    
        const store = await this.storeRepository.findOne({ where: { id: updateProductDto.storeId, storeOwner: { id: userId } } });
        if (!store) {
            throw new NotFoundException(`Store ${updateProductDto.storeId} not found. or you are not onwer`);
        }
        product.store = store;
    }
 
    // Check if categoryId is provided
    if (updateProductDto.categoryId) {
        const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId, ownerId: userId } });
        if (!category) {
            throw new NotFoundException(`Category ${updateProductDto.categoryId} not found. or you are not onwer`);
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


    async deleteProduct(id: number, userId: number): Promise<{ message: string }> {

        const product = await this.productRepository.findOne({ where: { id:id } });
        
        if (!product) {
            throw new NotFoundException(`Product ${id} not found.`);
        }

        if (product.vendor.id !== userId) {
            throw new NotFoundException(`Product ${id} not found or you are not authorized.`);
        }
        
        await this.productRepository.remove(product);
        return { message: `Product ${id} deleted successfully.` };
    }

}


