export const Course = class {
  #id;
  #title;
  #description;
  #price;
  #instructor;
  #category;
  #status;
  #createdAt;
  #updatedAt;
  #deletedAt;

  constructor({
    id,
    title,
    description,
    price,
    instructor,
    status,
    category,
    created_at,
    updated_at,
    deleted_at,
  }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#price = price;
    this.#instructor = instructor;
    this.#category = category;
    this.#status = status;
    this.#createdAt = created_at;
    this.#updatedAt = updated_at;
    this.#deletedAt = deleted_at;
  }

  static fromEntity(entity) {
    return new Course(entity);
  }

  get id() {
    return this.#id;
  }
};
