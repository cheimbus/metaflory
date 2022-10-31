import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserPurchaseList } from './User.purchase.list';
import { UserRounge } from './User.rounge';
import { UserRoungeList } from './User.rounge.list';
import { UserRoungeStory } from './User.rounge.stories';
import { UserSendList } from './User.send.list';
import { UserTokenList } from './User.token.info';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty({
    example: '황시우',
    description: 'OAuth 2.0 닉네임, 최대 10길이까지 가능',
    required: true,
  })
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @IsEmail()
  @MinLength(10)
  @MaxLength(30)
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'siu@naver.com',
    description:
      'OAuth 2.0 이메일, 최대 이메일 제외 20길이까지 가능, 또한 이메일 형식을 갖춰야 함',
    required: true,
  })
  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @IsNotEmpty()
  @Min(0)
  @Max(1)
  @IsString()
  @ApiProperty({
    example: '0',
    description: '0 => 남자, 1 => 여자',
    required: true,
  })
  @Column({ type: 'int', name: 'gender' })
  gender: number;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '10.30',
    description: '생일',
    required: true,
  })
  @Column({ type: 'datetime', name: 'birthday' })
  birthday: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  @ApiProperty({
    example: '카카오',
    description: 'OAuth 2.0으로 어떤 플랫폼으로 로그인 한 상태를 저장',
    required: true,
  })
  @Column({ type: 'varchar', name: 'account_status' })
  accountStatus: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => UserPurchaseList,
    (userPurchaseList) => userPurchaseList.userId,
  )
  userPurchaseList: UserPurchaseList;

  @OneToMany(() => UserTokenList, (userTokenList) => userTokenList.userId)
  useTokenList: UserTokenList;

  @OneToMany(() => UserRoungeStory, (userRoungeStory) => userRoungeStory.userId)
  userRoungeStory: UserRoungeStory;

  @OneToMany(() => UserSendList, (userSendList) => userSendList.userId)
  userSendList: UserSendList;

  @OneToMany(() => UserRounge, (userRounge) => userRounge.userId)
  userRounge: UserRounge;

  @OneToMany(() => UserRoungeList, (userRoungeList) => userRoungeList.userId)
  userRoungeList: UserRoungeList;
}