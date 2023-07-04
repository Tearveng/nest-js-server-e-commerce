import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
  
    
    @Entity({ name: 'category' })
    export class CategoryEntity {
      @PrimaryGeneratedColumn('increment')
      id: number;
    
      @Column({ name: 'name', nullable: false })
      name: string;
    
      @CreateDateColumn({ name: 'created_at' })
      createdAt: Date;
    
      @UpdateDateColumn({ name: 'updated_at' })
      updatedAt: Date;

      @OneToMany(() => ProductEntity, (product) => product.category)
      products: ProductEntity[]
  
    }