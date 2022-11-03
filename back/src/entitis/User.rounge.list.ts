import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => User, (user) => user.userRoungeList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId: User;

  @ManyToOne(() => UserRounge, (userRounge) => userRounge.userRoungeList, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rounge_id', referencedColumnName: 'id' }])
  roungeId: User[];
}
