const socket = io()

const producto1 = {
    title: "TV LG 44 Pulgadas",
    description: "Televisor muy bueno para toda la familia",
    price: 25000,
    img: ["https://www.centrogar.com.ar/5711-large_default/tv-50-lg-50up7750-ultra-hd-4k-smart.jpg"],
    stock: 5,
    status: true,
    id: 1
}

const producto2 = {
    title: "Aspiradora Ultracomb",
    description: "Aspiradora multiuso para toda la casa",
    price: 12000,
    img: "https://www.ultracomb.com.ar/Image/0/500_500-AS-4201.png",
    stock: 7,
    id: 2
}

const producto3 = {
    title: "Ventilador Indelplas V16",
    description: "Ventilador de piso para el verano",
    price: 7000,
    img: "https://www.sumaelectrohogar.com.ar/7616-large_default/turbo-ventilador-indelplas-iv16.jpg",
    stock: 9,
    status: true,
    id: 3
}

socket.on('getproducts', prod => {
    renderProds(prod)
})

socket.on('actualizarProductos', prods => {
    return renderProds(prods)
})

socket.on('deleteProduct', data => console.log(data))

const formEliminar = document?.getElementById('productForm')
const inputEliminar = document?.getElementById('eliminar')
const formAddProduct = document?.getElementById('addProduct')
const newProduct = document?.getElementById('product')
const buttonEliminar = document?.getElementById('buttonEliminar')

formEliminar?.addEventListener('submit', e => {
    e.preventDefault()
    console.log("InputEliminar: ", inputEliminar.value)
    if (inputEliminar.value > 0) {
        console.log("InputEliminar: ", inputEliminar.value)
        return socket.emit('deleteProduct', inputEliminar.value)
    }
})

console.log(formAddProduct)

formAddProduct?.addEventListener('submit', e => {
    e.preventDefault()
    console.log(newProduct.value)
    let product

    switch (parseInt(newProduct.value)) {
        case 1:
            product = producto1
            break
        case 2:
            product = producto2
            break
        case 3:
            product = producto2
            break
        default:
            break
    }

    socket.emit('addProduct', product)
})

function renderProds(prods) {

    const productsContainer = document?.getElementById('productos-lista')
    if (prods === null) {
        if (productsContainer === null) {
            return
        }
        productsContainer.innerHTML = '<h1>No hay productos</h1>'
        return
    }
    if (productsContainer === null) {
        return
    }
    productsContainer.innerHTML = ''

    prods.forEach(producto => {
        const productDiv = document.createElement('div')
        productDiv.innerHTML += `
        <h2>${producto.title}</h2>
        <p>${producto.description}</p>
        <p>Precio: ${producto.price}</p>
        <img src='${producto.img}' alt='${producto.title}' height="auto" width="100"/>
        <p>Stock: ${producto.stock}</p>
        <p>ID: ${producto.id}</p>
      `
        productsContainer.appendChild(productDiv).className = 'prodContainer'
    })
}