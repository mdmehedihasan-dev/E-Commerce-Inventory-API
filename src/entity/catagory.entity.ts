
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id:number; 

    @Column()
    ownerId:number;

    @Column({ unique: true })
    categoryName: string;

    @Column({ nullable: true })
    categoryDescription: string;

    @OneToMany(()=> Product, (product)=>product.catagory)
    product:Product[];


}