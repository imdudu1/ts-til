import { Movie, Tag } from '../entities';

export class MovieItemResponse {
  title: string;
  tags: string[];

  static of(entity: Movie): MovieItemResponse {
    return {
      title: entity.title,
      tags: entity.tags.map((tag) => tag.name),
    };
  }
}
