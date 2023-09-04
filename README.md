


<img src="./img/Rappi_logo.svg.webp" style="zoom:45">



Rappi es una aplicacion movil donde puedes ser o un usuario para realizar pedidos, una empresa para vender tus productos o un rapitendero para realizar los domicilios de los productos de la empresa al domicilio del usuario que lo pidio.



<img src="./img/funciRappi.jpg" style="zoom:45">



#### ¿Como funciona Rappi?

1. **Aplicación Móvil y Plataforma Web:** Rappi opera a través de una aplicación móvil para dispositivos iOS y Android, así como una plataforma web. Los usuarios pueden descargar la aplicación, registrarse y comenzar a usarla para realizar pedidos de productos y servicios.
2. **Registro y Autenticación:** Los usuarios se registran en la aplicación proporcionando su información personal y detalles de pago. Una vez registrados, pueden autenticarse para acceder a la plataforma.
3. **Exploración y Pedido de Productos**: Los usuarios pueden explorar una amplia variedad de categorías de productos, como alimentos, medicamentos, supermercado, productos de cuidado personal, entre otros. Pueden seleccionar productos específicos y agregarlos a su carrito de compras.
4. **Gestión de Pedidos**: Una vez que los usuarios han agregado todos los productos que desean comprar a su carrito, pueden proceder a realizar el pedido. Aquí es donde comienza el proceso de gestión de pedidos.
5. **Asignación de Entregas**: Una vez que se realiza un pedido, el sistema asigna a un repartidor (conocidos como "Rappitenderos") para recoger los productos de las tiendas asociadas y entregarlos al cliente. La asignación puede basarse en la ubicación, la disponibilidad del repartidor y otros factores.
6. **Rastreo en Tiempo Real**: Los usuarios pueden rastrear el progreso de su pedido en tiempo real a medida que el repartidor se acerca a su ubicación. Esto proporciona una experiencia transparente y actualizada sobre el estado del pedido.
7. **Pago y Calificación**: Una vez que se completa la entrega, los usuarios pueden realizar el pago a través de la aplicación, utilizando los métodos de pago que hayan configurado previamente. Después de la entrega, también tienen la opción de calificar y dejar comentarios sobre la experiencia.
8. **Integración con Establecimientos**: Rappi trabaja en colaboración con una variedad de establecimientos, como restaurantes, supermercados y farmacias. Estos establecimientos proporcionan sus catálogos de productos y servicios a Rappi, que luego están disponibles para los usuarios en la aplicación.
9. **Optimización de Rutas y Logística**: El sistema de Rappi debe ser eficiente en la asignación de repartidores y la planificación de rutas para garantizar entregas rápidas y precisas. Esto implica tecnologías de geolocalización y algoritmos de optimización de rutas.
10. **Atención al Cliente**: Rappi también ofrece atención al cliente a través de la aplicación y otros canales para resolver problemas, responder preguntas y brindar asistencia en caso de problemas con pedidos.



Ademas de eso Rappi tiene muchas otras funcionalidades tales como:

-  RappiCreditos
- RappiPay
- RappiCash
- RappiFavor





  

- ##### ¿Qué es un sistema marketplace?

El Marketplace es un sitio donde los productos son ofrecidos por los comerciantes para ser adquiridos por consumidores, es decir, un mercado en el mundo online. En él, varios comerciantes colocan sus productos a la venta en un sólo canal.


## Instrucciones de uso

#### Instalacion y uso de nvm
Para usar este proyecto despues de descargarlo asegurate de estar usando la version `18.16.1` de `nvm`, para eso vas a mandar el siguiente comando en la terminal.

```
nvm install 18.16.1
```

Ahora vas a poner la version en uso con el siguiente comando.

```
nvm use 18.16.1
```

#### Variables de entorno

Para las variables de entorno tienes el archivo `.env.example`, en ese archivo solo debes llenar los espacios vacios con los datos correspondientes y luego renombrar el archivo eliminando la parte `.example`, dejando unicamente el `.env`.

#### Instalacion de dependencias

Para descargar las dependencias utilizadas en el proyecto vas utilizar el siguiente comando.

```
npm install
```

Una vez descargadas las dependencias para asegurarte de que todo quedo bien mas a arrancar el `nodemon` con el siguiente comando

```
npm run dev
``` 

Si todo esta bien deberia darte la siguiente respuesta.

<img src="./img/nodemon.jpg" style="zoom:45">

#### Base de datos

Para generar la base de datos primero debes entrar a mongoDB Atlas y copar el link de coneccion por string, y lo vas a pegar en el archivo `atlas.js`, cambiando las partes correspondientes por las variables de entorno.

El archivo lo encuentras en la siguiente direccion `/config/connection/atlas.js`

Ahora con la extension `MongoDB for VS Code` vas a conectarlo con Atlas.

Ahora vas a ir al script de la base de datos que esta en `config/db/schema.mongodb` y lo vas a ejecutar todo el script.



#### Collaboradores

- latinoamericacampus233@gmail.com

#### Autores

- John Gonzalez 

- Luis Rueda

