import "reflect-metadata"
import { DataSource } from "typeorm"
import { Form } from "./entity/Form"
import { FormEntry } from "./entity/FormEntry"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST || 'localhost',
    port: process.env.PG_PORT && parseInt(process.env.PG_PORT, 10) || 5432,
    username: process.env.PG_USER || "demo",
    password: process.env.PG_PW ||  "demo",
    database: process.env.PG_DB || "demo",
    synchronize: true,
    logging: false,
    entities: [FormEntry, Form],
    migrations: [],
    subscribers: [],
})
