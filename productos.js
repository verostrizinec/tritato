// quierocomprar.html
const tritato = []

class producto {
    constructor(id, tipoDeProducto, precio, especialidad, img) {
        this.id = id;
        this.tipoDeProducto = tipoDeProducto;
        this.precio = precio;
        this.especialidad = especialidad;
        this.img = img;
    }
}

tritato.push(new producto (1, "Picada", 2750, "Comen 2 Pican 4", '../images/picadaa.JPG')),
tritato.push(new producto (2, "Picada", 5500, "Comen 4 Pican 8", '../images/picadaa.JPG'))
tritato.push(new producto (3, "Picada", 8200, "Comen 6 Pican 10", '../images/picadaa.JPG'))
tritato.push(new producto (4, "Brunch", 3500, "Sandwich de Lomo y Queso, en Pan de Masa Madre. Scones de Queso y Tomillo. Mini Budines de Naranja y Amapolas. Lingote de Chocotorta. Juego de Naranja exprimido. Infusiones", '../images/brunchs.jpg'))
tritato.push(new producto (5, "Panificados", 850, "Focaccia Grande", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (6, "Panificados", 550, "Focaccia Chica", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (7, "Panificados", 650, "Chips Brioche (12 unidades)", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (8, "Panificados", 400, "Pan de Papa para Burguer (4 unidades)", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (9, "Panificados", 850, "Pan de Masa Madre Grande", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (10, "Panificados", 550, "Pan de Masa Madre Chico", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (11, "Panificados", 500, "Pan Lacteado Artesano", '../images/panMasaMadre2.jpg'))
tritato.push(new producto (12, "Panificados", 500, "Pan Lactal Integral", '../images/panMasaMadre2.jpg'))

// Desestructuracion del array tritato

const [a, b, c] = tritato
console.log(a)
console.log(b)
console.log(c)

// spread del array tritato

console.log(...tritato)

// MODAL //
const modalContainer = document.querySelector('#modal-container')
const carritoContenedor = document.querySelector('#modal')

const abrirModal = document.querySelector('#modal-open')
const cerrarModal = document.querySelector('#modal-close')
const btnModal = document.querySelector('#modal-open')
const precioTotal = document.querySelector('#precioTotal')

abrirModal.addEventListener('click', () => {
    modalContainer.classList.toggle('modal-container-active')
})

cerrarModal.addEventListener('click',() =>{
    modalContainer.classList.toggle('modal-container-active')
})

carritoContenedor.addEventListener('click', (event)=>{
    event.stopPropagation()
})


// Aplicando Libreria al Modal

btnModal.addEventListener('click', () => {

    Swal.fire({
        title: 'Este es tu carrito!',
        text: 'Estas a tiempo de hacer modificaciones',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#412F26',
})
})

// renderizado productos
const productos = document.querySelector('#productosContenedor')

tritato.forEach( (producto) => {
    const div = document.createElement('div')

    div.className = "producto"
    div.innerHTML = `
                 <img class="comida" src=${producto.img} alt="">
                 <h5 class="card-title mt-3 mb-3">${producto.tipoDeProducto}</h5><hr>
                 <p class="tipoDeProducto">${producto.especialidad}</p>
                 <p class="precioProducto">Precio: $${producto.precio}</p>
                 <img src="../images/icons8-carro-favorito-24.png" width="30px" alt="Agregar al Carrito">
                 <button id="agregar-${producto.id}" class="btn btn-outline-success suma">+</button>
                 <button id="eliminar-${producto.id}" class="btn btn-outline-danger resta">-</button>
    `
    productos.append(div)

// crear id para que agregue y elimine producto al carrito con los botones + y -

    const btnAgregar = document.querySelector(`#agregar-${producto.id}`)

    btnAgregar.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

    const btnEliminar = document.querySelector(`#eliminar-${producto.id}`)

    btnEliminar.addEventListener('click', () => {
        eliminarDelCarrito(producto.id)
    } )
})  


// hacer que los botones de agregar al carrito funcionen / operador lógico OR ( || )
let carrito = JSON.parse(localStorage.getItem('carrito')) || []
const productosContenedor = document.querySelector('#productosEnCarrito')

const agregarAlCarrito = (id) => {
    const producto = tritato.find( (prod) => prod.id === id)

    carrito.push(producto)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)

    renderCarrito()
} 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((prod) => prod.id === id)
    const indice = carrito.indexOf(producto)

    carrito.splice(indice, 1)

    localStorage.setItem('carrito', JSON.stringify(carrito))

    renderCarrito()
}
const btnVaciar = document.querySelector('#vaciarCarrito')

const vaciarCarrito = () => {
    carrito = []
    localStorage.removeItem('carrito')
    productosContenedor.innerHTML = null

    renderCarrito()
}

btnVaciar.addEventListener('click', vaciarCarrito)


// agregando productos al carrito

const renderCarrito = () => {
    productosContenedor.innerHTML = null;

    carrito.forEach((prod) => { 
               const div = document.createElement('div')
               div.className = "productoEnCarrito"

               div.innerHTML = `
                        <p>${prod.tipoDeProducto}</p>
                        <p>Precio: $${prod.precio}</p>
                        <button onclick="eliminarDelcarrito(${prod.id})" class="boton-eliminar"><i class="fa fa-trash-alt"></i></button>
                `

               productosContenedor.append(div)
           
    })

actualizarCantidad()
actualizarTotal()
}

const contadorCarrito = document.querySelector('#contadorCarrito')

const actualizarCantidad = () => {
    contadorCarrito.innerText = carrito.length
}

// operador ternario AND

carrito.length === 0 && console.log("El carrito está vacío!")

// reflejar el precio en el carrito

const actualizarTotal = () => {
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}

renderCarrito()

// agregando opciones de bebidas con fetch

const bebidas = document.querySelector('#bebidas')

fetch('/data.json')
    .then( (res) => res.json())
    .then( (data) => {

        data.forEach((producto) => {
            const li = document.createElement('li')
            li.innerHTML = `
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
                <p>Código: ${producto.id}</p>
                <hr/>
            `
   
            bebidas.append(li)
        })
    })
