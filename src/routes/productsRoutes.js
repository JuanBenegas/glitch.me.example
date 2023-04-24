import { Router } from 'express'
import ProductManager from '../utils/productManager.js'

const productsRoutes = Router()
const manager = new ProductManager()


export default productsRoutes