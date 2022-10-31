import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';
import { UserSendList } from './User.send.list';

@Entity('user_purchase_lists')
export class UserPurchaseList {
  @ApiProperty({
    example: 1,
    description: '유저가 구매한 상품의 id',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNumber()
  @ApiProperty({
    example: '1',
    description: '유저 아이디',
  })
  @Column({
    type: 'int',
    name: 'user_id',
    nullable: true,
  })
  userId: number;

  @IsNumber()
  @ApiProperty({
    example: '1',
    description: '상품 아이디',
  })
  @Column({
    type: 'int',
    name: 'product_id',
    nullable: true,
  })
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '10000',
    description: '구매한 가격',
    required: true,
  })
  @Column({ type: 'int', name: 'price' })
  price: number;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.userPurchaseList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  ProductId: Product;

  @ManyToOne(() => User, (user) => user.userPurchaseList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  UserId: User;

  @OneToMany(() => UserSendList, (userSendList) => userSendList.purchaseListId)
  userSendList: UserSendList;
}
