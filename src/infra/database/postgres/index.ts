import { createConnection, getConnection } from "typeorm";

export const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async create_database(database: string) {
    const connection = getConnection();
    connection.query(`CREATE DATABASE ${database};`);
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const entityDeletionPromises = entities.map((entity) => async () => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
    await Promise.all(entityDeletionPromises);
  },
};
