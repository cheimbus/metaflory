import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
@Entity('product_authors')
export class Product_author {
  @ApiProperty({
    example: 1,
    description: '작가 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'siu',
    description: '작가 이름',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: '조회수',
    default: 0,
  })
  @Column({ type: 'int', name: 'hits', default: 0 })
  hits: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '이미지 경로',
    description: '이미지 경로',
  })
  @Column({ type: 'varchar', name: 'image_path' })
  imagePath: string;

  @OneToMany(() => Product, (product) => product.AuthorId)
  product: Product[];
}
