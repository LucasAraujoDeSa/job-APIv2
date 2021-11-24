require("dotenv/config")

module.exports = {
    type:"postgres",
    host: process.env.NODE_ENV  ? "localhost" :process.env.DATABASE_HOST,
    port: process.env.DATABSE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities:["./src/infra/database/postgres/**/entities/*.ts"],
    migrations:["./src/infra/database/postgres/migrations/*.ts"],
    cli: {
        migrationsDir: "./src/infra/database/postgres/migrations"
    }
}