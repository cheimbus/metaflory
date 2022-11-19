import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategoryList } from './Product.category.list';
@Entity('categories')
export class Category {
  @ApiProperty({
    example: 1,
    description: '카테고리 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '이쁜꽃',
    description: '카테고리 이름',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '이쁜 꽃 모음',
    description: '카테고리 설명',
    required: true,
  })
  @Column({ type: 'text', name: 'content' })
  content: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(
    () => ProductCategoryList,
    (productCategoryList) => productCategoryList.CategoryId,
  )
  productCategoryList: ProductCategoryList[];
}
