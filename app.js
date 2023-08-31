import express from 'express';
import dotenv from 'dotenv';
import appUsuarios from './app/routes/usuario.routes.js';
import appRestaurante from './app/routes/restaurante.routes.js';
import appProducto from './app/routes/producto.routes.js';
import appTendero from './app/routes/tendero.routes.js';
import appCupones from "./app/routes/cupones.routes.js";
import appDirecciones from "./app/routes/direcciones.routes.js";
import appPedidos from "./app/routes/pedidos.routes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use('/usuarios', appUsuarios);
app.use('/restaurantes', appRestaurante);
app.use('/productos', appProducto);
app.use('/tenderos', appTendero);
app.use('/cupones', appCupones);
app.use('/direcciones', appDirecciones);
app.use('/pedidos', appPedidos);

const config = JSON.parse(process.env.MY_SERVER);
app.listen(config, () => {
    console.log(`Server listening on http://${config.hostname}:${config.port}`);
})
