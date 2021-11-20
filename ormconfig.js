module.exports = {
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"c137",
    database:"job-api",
    entities:["./src/infra/database/postgres/**/entities/*.ts"],
    migrations:["./src/infra/database/postgres/migrations/*.ts"],
    cli: {
        migrationsDir: "./src/infra/database/postgres/migrations"
    }
}