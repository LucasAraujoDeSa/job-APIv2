require("dotenv/config")
const devDatabase = {
    type:"postgres",
    host: process.env.NODE_ENV === "dev" ? "localhost" : process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities:["./src/infra/database/postgres/**/entities/*.ts"],
    migrations:["./src/infra/database/postgres/migrations/*.ts"],
    cli: {
        migrationsDir: "./src/infra/database/postgres/migrations"
    }
}

const testDatabase = {
    type:"postgres",
    host: "localhost",
    port: process.env.DATABSE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "job-api-test",
    entities:["./src/infra/database/postgres/**/entities/*.ts"],
    migrations:["./src/infra/database/postgres/migrations/*.ts"],
    cli: {
        migrationsDir: "./src/infra/database/postgres/migrations"
    }
}

module.exports = process.env.NODE_ENV === "test" ? testDatabase : devDatabase