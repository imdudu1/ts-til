import { BaseTimeEntity } from '../../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';

@Entity({ name: 'tags' })
export class Tag extends BaseTimeEntity {
  @Column()
  name: string;

  @ManyToOne((type) => Movie, (movie) => movie.tags, {
    onDelete: 'CASCADE',
    createForeignKeyConstraints: false,
  })
  movie: Movie;

  static create(name: string) {
    const tag = new Tag();
    tag.name = name;
    return tag;
  }
}
