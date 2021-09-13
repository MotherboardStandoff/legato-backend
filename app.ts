import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import express, { Request, Response, Application } from 'express';

dotenv.config();

const API_PORT_DEF: string = '8080';

createConnection()
    .then(connection => {

        const App: Application = express();
        const PORT: number = parseInt(process.env.API_PORT || API_PORT_DEF);

        App.get(`/`, (req: Request, res: Response) => {

            res.sendStatus(200);
        });

        App.listen(PORT, () => {

            console.log(`API listening on port ${PORT}`);
        });
    })
    .catch(err => {

        console.log(err);
    });