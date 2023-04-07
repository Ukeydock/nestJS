import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common } from './common.entity';
import { Video } from './video.entity';
import { User } from './user.entity';

@Entity()
export class Keyword extends Common {
  @Column({ type: 'varchar', length: 128, nullable: false, default: '미정' })
  keyword: string;

  @Column({ type: 'varchar', length: 128, nullable: false, default: 0 })
  count: number;
}

@Entity({ name: 'KeywordUser' })
export class KeywordUser extends Common {
  @OneToOne(() => User, (user) => user.id, { cascade: true })
  @JoinColumn()
  user;

  @OneToOne(() => Keyword, (keyword) => keyword.id, { cascade: true })
  @JoinColumn()
  keyword;
}

@Entity({ name: 'KeywordVideo' })
export class KeywordVideo extends Common {
  @OneToOne(() => Video, (video) => video.id, { cascade: true })
  @JoinColumn()
  video;

  @OneToOne(() => Keyword, (keyword) => keyword.id, { cascade: true })
  @JoinColumn()
  keyword;
}
