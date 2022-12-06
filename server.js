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

routeProducto.post('/guardar', (req,res) => {
    if (productos.length == 0) {
        req.body.id = 1;
        productos.push(req.body)
        res.send(req.body)
    } else {
        req.body.id = productos[productos.length-1].id + 1;
        productos.push(req.body)
        res.send(req.body)
    }
})

routeProducto.get('/:id', (req,res) => {
    let id = req.params.id;
    if (!isNaN(id)) {
        if (id > productos.length) {
            res.send("Error: Producto no encontrado")
        } else {
            productos.forEach(prod => {
                if (prod.id == id) {
                    res.send(prod)
                }            
            });
        }       
    } else {
        res.send({ error: 'El parametro ingresado no es numerico' })
    }
})

//Cuando se ejecuta en el postman actualiza el procuto agregándole una clave valor ( actualizado = true)
routeProducto.put('/actualizar/:id', (req, res) => {
    let {id} = req.params
    if (!isNaN(id)) {
        if (id > productos.length) {
            res.send("Error: Producto no encontrado")
        } else {
            productos.forEach(prod => {
                if (prod.id == id) {
                    prod.actualizado = true
                    res.send(prod)
                }            
            });
        }       
    } else {
        res.send({ error: 'El parametro ingresado no es numerico' })
    }
})

//Probar con postman. Borra el producto según el id ingresado y modifica el array de productos que quedan solo con los no borrados. 
// el res.send muestra estos productos sin el borrado
routeProducto.delete('/borrar/:id', (req, res) => {
    let {id} = req.params
    if (!isNaN(id)) {
        if (id > productos.length) {
            res.send("Error: Producto no encontrado")
        } else {
           let new_product = [];
           productos.forEach(product => {
              if (product.id != id) {
                new_product.push(product);
              }
           });
           productos = new_product
           res.send(productos)
        }       
    } else {
        res.send({ error: 'El parametro ingresado no es numerico' })
    }
})


const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http levantado en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Eror en el servidor ${error}`));