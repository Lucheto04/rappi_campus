import express from "express";
import dotenv from 'dotenv';
import appCupones from "./app/routes/cupones.routes.js";
dotenv.config();

const server = express();

server.use(express.json());

const config = JSON.parse(process.env.MY_SERVER);

server.use('/cupones', appCupones)

server.listen(config, () => {
    console.log(`Server listening on http://${config.hostname}:${config.port}`); 
});