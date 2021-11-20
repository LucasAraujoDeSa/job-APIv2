import { createConnection, getConnection } from "typeorm";

export const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async run_migrations() {
    const connection = getConnection();
    await connection.runMigrations();
  },

  async clear() {
    const connection = getConnection();
    await connection.dropDatabase();
  },
};
