import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
  
    @Entity({ name: 'product' })
    export class ProductEntity {
      @PrimaryGeneratedColumn('increment')
      id: number;
    
      @Column({ name: 'name', nullable: false })
      name: string;
    
      @Column({ name: 'description', nullable: false})
      description: string;
    
      @Column({ name: 'image', nullable: true })
      image: string;
      
      @Column({ name: 'oldPrice', nullable: false })
      oldPrice: number;
    
      @Column({ name: 'newPrice', nullable: false })
      newPrice: number;

      @Column({name: 'status', nullable: false, default: 0})
      status: number;

      @Column({ name: 'sku', nullable: false })
      sku: string;
    
      @CreateDateColumn({ name: 'created_at' })
      createdAt: Date;
    
      @UpdateDateColumn({ name: 'updated_at' })
      updatedAt: Date;

      @ManyToOne(() => CategoryEntity, (category) => category.products)
      category: CategoryEntity;
    }