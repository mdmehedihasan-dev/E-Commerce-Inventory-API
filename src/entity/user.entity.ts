import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string; 

  @Column()
  role: string; 

  @Column({ nullable: true }) 
  refreshToken?: string; 

  // @OneToMany(() => Store, (store) => store.storeOwner) 
  // stores: Store[];


}