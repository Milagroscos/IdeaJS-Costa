const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})

let productos= [
    {
        id:"campera-grecia",
        titulo:"Campera Grecia",
        imagen: "./imagenes/campera-grecia.jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 1200
    },
    {
        id:"deportivo-indiana",
        titulo:"Deportivo Indiana",
        imagen: "./imagenes/deportivo-indiana.jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 1300
    },
    {
        id:"jean-tiziana",
        titulo:"Jean Tiziana",
        imagen: "./imagenes/jean-tiziana.jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 700
    },
    {
        id:"conjunto-roma",
        titulo:"Conjunto Roma",
        imagen: "./imagenes/conjuntos-roma.jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 900
    },
    {
        id:"conjunto-beltran",
        titulo:"Conjunto Beltran",
        imagen: "./imagenes/conjunto-beltran.JPG",
        categoria: {
            nombre:"ninio",
            id:"ninio"
        },
        precio: 1000
    },
    {
        id:"conjunto-genaro",
        titulo:"Conjunto Genaro",
        imagen: "./imagenes/conjunto-genaro.jpg",
        categoria: {
            nombre:"bebe",
            id:"bebe"
        },
        precio: 900
    },
    {
        id:"conjunto-lorenzo",
        titulo:"Conjunto Lorenzo",
        imagen: "./imagenes/conjunto-lorenzo.jpg",
        categoria: {
            nombre:"bebe",
            id:"bebe"
        },
        precio: 900
    },
    {
        id:"conjunto-vicente",
        titulo:"Conjunto Vicente",
        imagen: "./imagenes/conjunto-vicente.jpg",
        categoria: {
            nombre:"ninio",
            id:"ninio"
        },
        precio: 900
    },
    {
        id:"maya-tiburon",
        titulo:"Maya Tiburon",
        imagen: "./imagenes/maya-tiburon.JPG",
        categoria: {
            nombre:"ninio",
            id:"ninio"
        },
        precio: 600
    },
    {
        id:"enterito-nieve",
        titulo:"Enterito Nieve",
        imagen: "./imagenes/enterito-nieve.jpg",
        categoria: {
            nombre:"bebe",
            id:"bebe"
        },
        precio: 1100
    },
    {
        id:"enterito-osito",
        titulo:"Enterito Osito",
        imagen: "./imagenes/enterito-osito.jpg",
        categoria: {
            nombre:"bebe",
            id:"bebe"
        },
        precio: 1100
    },
    {
        id:"maya-arcoiris",
        titulo:"Maya Arcoiris",
        imagen: "./imagenes/maya-arcoiris.jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 600
    },
    {
        id:"tapado-oriana",
        titulo:"Tapado Oriana",
        imagen: "./imagenes/tapado-oriana.jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 1500
    },
    {
        id:"vestido-juana",
        titulo:"Vestido Juana",
        imagen: "./imagenes.vestido-juana(1).jpg",
        categoria: {
            nombre:"ninia",
            id:"ninia"
        },
        precio: 800
    }

];


fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}