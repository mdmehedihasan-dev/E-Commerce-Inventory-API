import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Store } from 'src/entity/store.entity';
import { Category } from 'src/entity/catagory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,User,Store,Category])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
