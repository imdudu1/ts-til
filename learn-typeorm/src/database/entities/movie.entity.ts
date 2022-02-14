import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseTimeEntity } from "./base-time.entity";
import { Director } from "./director.entity";
import { Genre } from "./genre.entity";
import { User } from "./user.entity";

@Entity({ name: "movies" })
export class Movie extends BaseTimeEntity {
  @Column({ length: 25 })
  title: string;

  @Column()
  price: number;

  @ManyToOne((type) => Director, (director) => director.movies)
  director: Director;

  @ManyToMany((type) => Genre)
  @JoinTable()
  genre: Genre;

  @ManyToMany(() => User, (user) => user.movies)
  recommendations: User[];
}
