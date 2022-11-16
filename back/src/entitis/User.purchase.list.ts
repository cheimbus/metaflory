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

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '10000',
    description: '구매한 가격',
    required: true,
  })
  @Column({ type: 'int', name: 'price' })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '카드, 메타마스크',
    description: '구매 유형',
    required: true,
  })
  @Column({ type: 'varchar', name: 'type' })
  type: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.userPurchaseList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  productId: number;

  @ManyToOne(() => User, (user) => user.userPurchaseList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: number;

  @OneToMany(() => UserSendList, (userSendList) => userSendList.purchaseListId)
  userSendList: UserSendList[];
}
