const socket = io()

document.getElementById('prod-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const idInput = document.getElementById('productId');
    const id = idInput.value;
    idInput.value = '';

    const descInput = document.getElementById('desc');
    const description = descInput.value;
    descInput.value = '';

    const imgInput = document.getElementById('img');
    const image = imgInput.value;
    imgInput.value = '';

    const priceInput = document.getElementById('price');
    const price = priceInput.value;
    priceInput.value = '';

    const stockInput = document.getElementById('stock');
    const stock = stockInput.value;
    stockInput.value = '';


    const availableInput = document.getElementById('available');
    const available = availableInput.value;

    const ownerInput = document.getElementById('owner');
    const owner = ownerInput.value;
    ownerInput.value = '';


    const eliminarProductoCheckbox = document.getElementById('eliminarProducto');
    const eliminarProducto = eliminarProductoCheckbox.checked;

    if (eliminarProducto) {

        socket.emit("delProd", { id: id });
    }else{
        const newProduct = {
            description: description,
            image:image,
            price: price,
            stock: stock,
            availability: available,
            owner: owner,
        }
    
        if (id === '') {

            socket.emit("newProd", newProduct);
        } else {

            socket.emit("updProd", { id: id, newProduct });
        }
    }
});

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `A continuación verás la lista actualizada`,
        confirmButtonText: 'Aceptar', 
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); 
        }
    });
});

socket.on("errorUserPremium", (data) => {
    Swal.fire({
        icon: 'error',
        title: data,
        confirmButtonText: 'Aceptar', 
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); 
        }
    });
});


/*
socket.on("test", data => {
console.log(data)
})

const socket = io()

//Envía

socket.emit("message", "!Hola, me estoy comunicando desde un websocket!")

//Recibe en la consola del Navegador

socket.on("test", data => {
console.log(data)
})

*/