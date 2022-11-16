import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
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
import { User } from './User';
import { UserPurchaseList } from './User.purchase.list';
import { UserRounge } from './User.rounge';

@Entity('user_send_lists')
export class UserSendList {
  @ApiProperty({
    example: 1,
    description: 'send 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(3)
  @ApiProperty({
    example: '0',
    description:
      '유저가 선물을 보내거나 라운지를 보내는 타입. 0 => 꽃 선물, 1 => 라운지 보내기',
    required: true,
  })
  @Column({ type: 'int', name: 'type' })
  type: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @ApiProperty({
    example: '황시우',
    description: '보내는 사람의 이름 또는 닉네임',
    required: true,
  })
  @Column({ type: 'varchar', name: 'from_name' })
  fromName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @ApiProperty({
    example: '박기완',
    description: '받는 사람의 이름 또는 닉네임',
    required: true,
  })
  @Column({ type: 'varchar', name: 'to_name' })
  toName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty({
    example: '010000000000, 0200000000',
    description: '-을 제외하고 숫자로만 입력, 최대 11자리까지 입력 가능',
    required: true,
  })
  @Column({ type: 'varchar', name: 'from_phone' })
  fromPhone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(11)
  @ApiProperty({
    example: '010000000000, 0200000000',
    description: '-을 제외하고 숫자로만 입력, 최대 11자리까지 입력 가능',
    required: true,
  })
  @Column({ type: 'varchar', name: 'to_phone' })
  toPhone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @ApiProperty({
    example: '최소 6길이를 시작으로 20길이까지 입력가능',
    description: '받는 사람이 입력해야 알 수 있는 key',
    required: true,
  })
  @Column({ type: 'varchar', name: 'product_key' })
  productKey: string;

  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  @ApiProperty({
    example: '안녕하세요. 00님 당신을 위한 겁니다~',
    description: '편지를 보내는 내용 제한 길이 500자',
  })
  @Column({
    type: 'text',
    name: 'content',
  })
  content: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.userSendList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: User;

  @ManyToOne(
    () => UserPurchaseList,
    (userPurchaseList) => userPurchaseList.userSendList,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'purchase_list_id', referencedColumnName: 'id' }])
  purchaseListId: UserPurchaseList;

  @ManyToOne(() => UserRounge, (userRounge) => userRounge.userSendList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rounge_id', referencedColumnName: 'id' }])
  roungeId: UserRounge;
}
