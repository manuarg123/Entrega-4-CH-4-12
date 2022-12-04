const { Router } = require('express');
const express = require('express');
const app = express();

const routeProducto = express.Router();
const router = Router();

app.use('/api/productos', routeProducto)

routeProducto.use(express.json())
routeProducto.use(express.urlencoded({ extended: true }))

let productos = [];

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

routeProducto.get('/listar', (req,res) => {
    res.json(productos)
})


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http levantado en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Eror en el servidor ${error}`));