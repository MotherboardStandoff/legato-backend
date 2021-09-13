import 'reflect-metadata';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config();

createConnection()
    .then(connection => {

    })
    .catch(err => {

        console.log(err);
    });