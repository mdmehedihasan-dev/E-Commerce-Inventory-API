import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/entity/coupon.entity';
import { Store } from 'src/entity/store.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Category } from 'src/entity/catagory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon,Store,Product,User,Category])],
  controllers: [CouponController],
  providers: [CouponService]
})
export class CouponModule {}
