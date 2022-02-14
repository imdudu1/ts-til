import { Column, Entity, ManyToMany } from "typeorm";
import { BaseTimeEntity } from "./base-time.entity";
import { Movie } from "./movie.entity";

@Entity({ name: "users" })
export class User extends BaseTimeEntity {
  @Column({ unique: true, length: 35 })
  email: string;

  @Column({ length: 10 })
  nickname: string;

  @ManyToMany((type) => Movie, (movie) => movie.recommendations)
  movies: Movie[];
}
