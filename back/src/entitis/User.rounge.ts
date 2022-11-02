import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
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
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { UserRoungeList } from './User.rounge.list';
import { UserRoungeStory } from './User.rounge.stories';
import { UserSendList } from './User.send.list';

@Entity('user_rounges')
export class UserRounge {
  @ApiProperty({
    example: 1,
    description: '라운지 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @ApiProperty({
    example: '시우s 라운지',
    description: '라운지 이름',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2022.10.30',
    description: '라운지 날짜',
    required: true,
  })
  @Column({ type: 'datetime', name: 'date' })
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(10)
  @Max(100)
  @ApiProperty({
    example: '10',
    description: '라운지 총 갯수. 처음에는 10개가 default',
    default: 10,
  })
  @Column({ type: 'int', name: 'quantity_max', default: 10 })
  quantityMax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({
    example: '1',
    description: '라운지 현재 갯수 하루에 한 개만 추가 가능함',
    default: 0,
  })
  @Column({ type: 'int', name: 'quantity_min', default: 0 })
  quantityMin: number;

  @IsNotEmpty()
  @IsBoolean()
  @MaxLength(5)
  @ApiProperty({
    example: 'false',
    description: 'soft delete false => 삭제안됨, true => 삭제 됨',
    default: false,
  })
  @Column({ type: 'boolean', name: 'is_deleted', default: false })
  isDeleted: boolean;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.userRounge, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: User;

  @OneToMany(() => UserRoungeList, (userRoungeList) => userRoungeList.roungeId)
  userRoungeList: UserRounge;

  @OneToMany(() => UserSendList, (userSendList) => userSendList.roungeId)
  userSendList: UserSendList;

  @OneToMany(
    () => UserRoungeStory,
    (userRoungeStory) => userRoungeStory.roungeId,
  )
  userRoungeStory: UserRoungeStory;
}
