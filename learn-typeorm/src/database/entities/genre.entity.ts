import {Column, Entity, ManyToMany} from "typeorm";
import { BaseTimeEntity } from "./base-time.entity";
import {Movie} from "./movie.entity";

@Entity({ name: "genres" })
export class Genre extends BaseTimeEntity {
  @Column({ length: 10 })
  name: string;

  @ManyToMany(type => Movie, movie => movie.genres)
  movies: Movie[];
}
