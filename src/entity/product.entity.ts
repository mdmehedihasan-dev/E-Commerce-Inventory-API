import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
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





  @ManyToOne(() => Category, (category) => category.product)  //= Category
  catagory: Category;








}