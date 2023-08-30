import express from 'express';
import dotenv from 'dotenv';
import appUsuarios from './app/routes/usuario.routes.js';
import appRestaurante from './app/routes/restaurante.routes.js';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/usuarios', appUsuarios);
app.use('/restaurantes', appRestaurante);


const config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`http://${config.hostname}:${config.port}`);
})