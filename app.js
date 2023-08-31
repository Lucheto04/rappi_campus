import express from "express";
import dotenv from 'dotenv';
import appCupones from "./app/routes/cupones.routes.js";
import appDirecciones from "./app/routes/direcciones.routes.js";
import appPedidos from "./app/routes/pedidos.routes.js";
dotenv.config();

const server = express();

server.use(express.json());

const config = JSON.parse(process.env.MY_SERVER);

server.use('/cupones', appCupones);
server.use('/direcciones', appDirecciones);
server.use('/pedidos', appPedidos);

server.listen(config, () => {
    console.log(`Server listening on http://${config.hostname}:${config.port}`); 
});