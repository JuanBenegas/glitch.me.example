import express from 'express'
import { engine } from 'express-handlebars'
import { resolve } from 'path'
import __dirname from './utils.js'
import { Server } from 'socket.io'
import productsRoutes from './src/routes/productsRoutes.js'
import ProductManager from './src/utils/productManager.js'
import viewsRoutes from './src/routes/viewsRoutes.js'

const manager = new ProductManager()


const SERVER_PORT = 8080
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/src/public'))
app.use('/', viewsRoutes)

const viewsPath = resolve('src/views')

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`
}))
app.set('view engine', 'handlebars')
app.set('views', viewsPath)

const httpServer = app.listen(SERVER_PORT, () => {
    console.log(`Conectado al server en el puerto: ${SERVER_PORT}`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', async socket => {
    try {
        console.log("Nuevo cliente conectado")
        socket.emit('getproducts', await manager.getProducts())

        socket.on('deleteProduct', async id => {
            await manager.deleteProduct(parseInt(id))
            socketServer.emit('actualizarProductos', await manager.getProducts())
        })

        socket.on('addProduct', async product => {
            console.log("Este prdo se añadio ", product)
            await manager.addProductFile(product)
            socketServer.emit('actualizarProductos', await manager.getProducts())
        })
    }
    catch (e) {
        console.log(e)
    }
})