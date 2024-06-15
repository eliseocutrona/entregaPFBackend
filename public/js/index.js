const socket = io();

function deleteProduct(pid) {
    socket.emit('deleteProduct', { pid });
}

window.deleteProduct = deleteProduct;

document.addEventListener('DOMContentLoaded', () => {
    function $(selector) {
        return document.querySelector(selector);
    }

    function displayError(message) {
        console.error(message);
        alert(message);
    }

    function createProductCard(product) {
        return `
            <div class="product-card">
                <h3>${product.title}</h3>
                <hr>
                <p>Categoria: ${product.category}</p>
                <p>Descripción: ${product.description}</p>
                <p>Precio: $${product.price}</p>
                <button id="button-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
            </div>
        `;
    }

    socket.on('statusError', data => {
        displayError(data);
    });

    socket.on('publishProducts', data => {
        const productsBox = $('.products-box');
        productsBox.innerHTML = '';

        data.forEach(product => {
            productsBox.innerHTML += createProductCard(product);
        });
    });

    function createProduct(event) {
        event.preventDefault();

        const newProduct = {
            title: $('#title').value,
            description: $('#description').value,
            code: $('#code').value,
            price: $('#price').value,
            stock: $('#stock').value,
            category: $('#category').value
        };

        cleanForm();

        socket.emit('createProduct', newProduct);
    }

    function cleanForm() {
        $('#title').value = '';
        $('#description').value = '';
        $('#code').value = '';
        $('#price').value = '';
        $('#stock').value = '';
        $('#category').value = '';
    }

    document.querySelector('#product-form').addEventListener('submit', createProduct);
});
