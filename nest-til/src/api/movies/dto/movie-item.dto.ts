import { Movie, Tag } from '../entities';

export class MovieItem {
  title: string;
  tags: string[];

  static of(entity: Movie): MovieItem {
    return {
      title: entity.title,
      tags: entity.tags.map((tag) => tag.name),
    };
  }
}
