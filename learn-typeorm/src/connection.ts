import { createConnection, getConnection } from "typeorm";

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(entities.map((e) => this.deleteAll(e.name)));
  },

  async deleteAll(entityName: string) {
    const connection = getConnection();
    const repository = connection.getRepository(entityName);
    return repository.delete({});
  },
};

export default connection;
