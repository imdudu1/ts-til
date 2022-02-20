type UserDomainEssentialProps = {
  id?: number;
  name: string;
  email: string;
  description: string;
};

export class UserDomain {
  private _id: number;
  private _name: string;
  private _email: string;
  private _description: string;

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get description(): string {
    return this._description;
  }

  get id(): number {
    return this._id;
  }

  static create(data: UserDomainEssentialProps) {
    const user = new UserDomain();
    user._id = data.id;
    user._name = data.name;
    user._email = data.email;
    user._description = data.description;
    return user;
  }
}
