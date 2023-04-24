import { Router } from 'express'
import ProductManager from '../utils/productManager.js'
const viewsRoutes = Router()
const manager = new ProductManager()

viewsRoutes.get('/', async (req, res) => {
    try{
        const allProducts = await manager.getProducts()
        res.render('products', { products: allProducts, title: "Todos los porductos"})
    }
    catch(e){
        console.log(e)
    }
})

viewsRoutes.get('/realtimeproducts', async (req, res) => {
    const prods = await manager.getProducts()
    res.render('realtimeproducts', {title: 'Realtime products', prods})
})

export default viewsRoutes