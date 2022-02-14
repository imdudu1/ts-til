import { Column, Entity, OneToMany } from "typeorm";
import { BaseTimeEntity } from "./base-time.entity";
import { Movie } from "./movie.entity";

@Entity({ name: "directors" })
export class Director extends BaseTimeEntity {
  @Column({ length: 15 })
  name: string;

  @OneToMany((type) => Movie, (movie) => movie.director)
  movies: Movie[];
}
