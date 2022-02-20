import { Column, Entity } from 'typeorm';
import { BaseTimeEntity } from '../../../../../common/entities/base.entity';

export type UserEssentialProperties = {
  name: string;
  email: string;
  description: string;
};

@Entity({ name: 'users' })
export class User extends BaseTimeEntity {
  @Column({ length: 25 })
  name: string;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 150 })
  description: string;

  static create(name: string, email: string, description: string) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.description = description;
    return user;
  }

  static of(props: UserEssentialProperties) {
    const user = new User();
    user.name = props.name;
    user.email = props.email;
    user.description = props.description;
    return user;
  }
}
