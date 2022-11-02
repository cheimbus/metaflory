import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
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
import { Product } from './Product';
import { User } from './User';
import { UserRounge } from './User.rounge';

@Entity('user_rounge_stories')
export class UserRoungeStory {
  @ApiProperty({
    example: 1,
    description: '스토리 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({
    example: '너와 나의 스토리',
    description: '스토리 이름',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2022-10-30',
    description: '스토리 생성 날짜',
    required: true,
  })
  @Column({ type: 'datetime', name: 'date' })
  date: Date;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({
    example: '너가 처음 다가온 날 난 너무 행복했어 ㅎㅎ',
    description: '스토리',
    required: true,
  })
  @Column({ type: 'text', name: 'story' })
  story: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: 'false',
    description: 'false => 존재함, true => 삭제됨',
  })
  @Column({
    type: 'boolean',
    name: 'is_deleted',
    default: false,
  })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.userRoungeStory, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  productId: Product;

  @ManyToOne(() => User, (user) => user.userRoungeStory, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: User;

  @ManyToOne(() => UserRounge, (userRounge) => userRounge.userRoungeStory, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rounge_id', referencedColumnName: 'id' }])
  roungeId: UserRounge;
}
