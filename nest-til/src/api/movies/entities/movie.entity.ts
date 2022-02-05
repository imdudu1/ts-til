import { BaseTimeEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Tag } from '.';

@Entity({ name: 'movies' })
export class Movie extends BaseTimeEntity {
  @Column()
  title: string;

  @OneToMany((type) => Tag, (tag) => tag.movie, { eager: true, cascade: true })
  tags: Tag[] | null;

  static create(title: string, tags: Tag[]): Movie {
    const movie = new Movie();
    movie.title = title;
    movie.tags = tags;
    return movie;
  }
}
