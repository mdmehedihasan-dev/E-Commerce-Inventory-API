
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Coupon } from './coupon.entity';

@Entity()
export class Store {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
   storeName: string;
   
  @Column()
  storeDescription: string; 

  @CreateDateColumn()
  createdAt: Date;

  // Assuming Store can have one owner
  @ManyToOne(() => User, (user) => user.stores)
  storeOwner: User; 

   // Assuming Store can have multiple products
  @OneToMany(() => Product, (product) => product.store)
  products: Product[];
 
  // Assuming Store can have multiple coupons
  @OneToMany(() => Coupon, (coupon) => coupon.store)
  coupons: Coupon[];

}

