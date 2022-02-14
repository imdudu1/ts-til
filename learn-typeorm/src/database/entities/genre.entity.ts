import { Column, Entity } from "typeorm";
import { BaseTimeEntity } from "./base-time.entity";

@Entity({ name: "genres" })
export class Genre extends BaseTimeEntity {
  @Column({ length: 10 })
  name: string;
}
