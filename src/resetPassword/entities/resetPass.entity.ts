import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'reset-password' })
export class ResetPassEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'uuid', nullable: false })
  uuid: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.resetPass)
  user: UserEntity;
}
