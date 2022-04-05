export const Category = class {
  #id;
  #name;
  #createdAt;
  #updatedAt;
  #deletedAt;

  constructor({ id, name, created_at, updated_at, deleted_at }) {
    this.#id = id;
    this.#name = name;
    this.#createdAt = created_at;
    this.#updatedAt = updated_at;
    this.#deletedAt = deleted_at;
  }

  static fromEntity(entity) {
    return new Category(entity);
  }

  get id() {
    return this.#id;
  }
};
