import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './Category';
import { Product } from './Product';

@Entity('product_category_lists')
export class ProductCategoryList {
  @ApiProperty({
    example: 1,
    description: '상품 카테고리 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'product_id', nullable: true })
  productId: number | null;

  @Column('int', { name: 'category_id', nullable: true })
  categoryId: number | null;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.productCategoryList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  ProductId: number;

  @ManyToOne(() => Category, (category) => category.productCategoryList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  CategoryId: number;
}
