import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common, CommonSoftDelete } from './common.entity';
import { Keyword } from './keyword.entity';
import { Video } from './video.entity';
import { User } from './user.entity';

@Entity({ name: `comment` })
export class Comment extends CommonSoftDelete {
  @Column({ type: 'varchar', length: 64, nullable: false, default: '미정' })
  comment: string;

  @ManyToOne(() => Video, (video) => video.id, { cascade: true })
  @JoinColumn()
  video;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn()
  user;
}
