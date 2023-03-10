import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import formController from './forms/formController';

const DEFAULT_PORT = 3000;

dotenv.config();

const app: Express = express();
const port = process.env.PORT || DEFAULT_PORT;

import { AppDataSource } from "./data-source"

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
        app.use(express.json())

        app.get('/', (req: Request, res: Response) => {
          res.send('Express + TypeScript Server');
        });
        
        app.use(formController);
        
        app.listen(port, () => {
          console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

