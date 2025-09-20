import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Store } from './store.entity';
import { Review } from './review.entity';
import { Category } from './catagory.entity';

@Entity()
export class Product {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productPrice: number;

  @Column()
  productStock: number;

  @Column({ nullable: true}) 
  productImageUrl: string; 


  @ManyToOne(() => User, (user) => user.id)  // =user er
  vendor: User;


  @ManyToOne(()=> Store, (store) => store.id)  //= store er
  store:Store;


  @OneToMany(() => Review, (review) => review.product)  //= review er
  reviews: Review[];


  @ManyToOne(() => Category, (category) => category.product)  //= Category
  catagory: Category;








}