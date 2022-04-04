export const User = class {
  #id;
  #name;
  #email;
  #createdAt;
  #updatedAt;
  #deletedAt;

  constructor({ id, name, email, created_at, updated_at, deleted_at }) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#createdAt = created_at;
    this.#updatedAt = updated_at;
    this.#deletedAt = deleted_at;
  }

  static fromEntity(entity) {
    return new User(entity);
  }

  // methods
  isDeleted() {
    return !!this.#deletedAt;
  }

  // getter
  get id() {
    return this.#id;
  }
};
