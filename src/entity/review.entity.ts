// review.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity() 
export class Review { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' }) 
    rating: number;

    @Column({ nullable: true })
    comment: string;
   
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;
    
}
