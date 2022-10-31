import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { UserRounge } from './User.rounge';

@Entity('user_rounge_lists')
export class UserRoungeList {
  @ApiProperty({
    example: 1,
    description: '라운지 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: '유저 아이디',
    required: true,
  })
  @Column({
    type: 'int',
    name: 'user_id',
    nullable: true,
  })
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: '1',
    description: '라운지 아이디',
    required: true,
  })
  @Column({
    type: 'int',
    name: 'rounge_id',
    nullable: true,
  })
  roungeId: number;

  @ManyToOne(() => User, (user) => user.userRoungeList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  UserId: User;

  @ManyToOne(() => UserRounge, (userRounge) => userRounge.userRoungeList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rounge_id', referencedColumnName: 'id' }])
  RoungeId: User;
}
