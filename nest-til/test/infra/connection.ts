import { createConnection, getConnection } from 'typeorm';

const connection = {
  async create(entities: any[]) {
    await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1q2w3e4r',
      logging: true,
      entities: entities,
    });
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
