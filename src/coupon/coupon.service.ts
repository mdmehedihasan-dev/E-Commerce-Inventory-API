import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/catagory.entity';
import { Coupon, ScopeType } from 'src/entity/coupon.entity';
import { Product } from 'src/entity/product.entity';
import { Store } from 'src/entity/store.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
    constructor(
        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,

        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createCouponDto: CreateCouponDto, userId: number): Promise<any> {
        const { 
            couponCode, 
            discountType, 
            discountAmount,
            scope,
            storeId, 
            productId, 
            categoryId,
            expireAt 
        } = createCouponDto;

        // Check Store existence and ownership
        const store = await this.storeRepository.findOne({ 
            where: { id: storeId, storeOwner: { id: userId } } 
        });
        if (!store) {
            throw new NotFoundException(`Store with ID ${storeId} not found or you are not the owner`);
        }

        // Already existing coupon code check
        const existingCoupon = await this.couponRepository.findOne({ where: { couponCode } });
        if (existingCoupon) {   
            throw new BadRequestException(`Coupon with code ${couponCode} already exists`);
        }

        // Validate scope
        if (scope === ScopeType.PRODUCT && !productId) {
            throw new BadRequestException('Product ID is required for Product scope');
        }
        if (scope === ScopeType.CATEGORY && !categoryId) {
            throw new BadRequestException('Category ID is required for Category scope');
        }

        // Fetch product or category if provided
        let product: Product | null = null;
        let category: Category | null = null;

        if (productId) {
            product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product) {
                throw new NotFoundException(`Product with ID ${productId} not found`);
            }
        }

        if (categoryId) {
            category = await this.categoryRepository.findOne({ where: { id: categoryId } });
            if (!category) {
                throw new NotFoundException(`Category with ID ${categoryId} not found`);
            }
        }

        // Create coupon
        const coupon = this.couponRepository.create({
            couponCode,
            discountType,
            discountAmount,
            scope,
            store,
            productId: product ? product.id : undefined,
            categoryId: category ? category.id : undefined,
            expireAt,
        });

        return this.couponRepository.save(coupon);
    }
}
