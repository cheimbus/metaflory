import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserPurchaseList } from './User.purchase.list';
import { UserRoungeStory } from './User.rounge.stories';

@Entity('products')
export class Product {
  @ApiProperty({
    example: 1,
    description: '상품 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '활짝 핀 데이지 꽃',
    description: '상품 이름',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name', unique: true, length: 30 })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '10000',
    description: '가격',
    required: true,
  })
  @Column({ type: 'int', name: 'price' })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '이 꽃은 피었을 때 정말 이쁜 꽃이에요 마치 당신의 웃음과 같죠',
    description: '꽃에 대한 설명이나 하고싶은 말',
    required: true,
  })
  @Column({ type: 'text', name: 'content' })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '순결, 미인',
    description: '꽃말',
    required: true,
  })
  @Column({
    type: 'varchar',
    name: 'flower_language',
  })
  flowerLanguage: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 10,
    description: '총 수량. 즉, 총 10개 판매가능',
    required: true,
  })
  @Column({
    type: 'int',
    name: 'quantity_max',
    nullable: true,
    default: null,
  })
  quantityMax: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: '남은 수량. 즉, 총 10개를 판매한다면 5개가 남음',
    required: true,
  })
  @Column({
    type: 'int',
    name: 'quantity_now',
    nullable: true,
    default: null,
  })
  quantityNow: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '.image/flower.jpg',
    description: '이미지 경로',
    required: true,
  })
  @Column({
    type: 'varchar',
    name: 'image_path',
  })
  imagePath: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => UserPurchaseList,
    (userPurchaseList) => userPurchaseList.productId,
  )
  userPurchaseList: UserPurchaseList;

  @OneToMany(
    () => UserRoungeStory,
    (userRoungeStory) => userRoungeStory.productId,
  )
  userRoungeStory: UserRoungeStory;
}
