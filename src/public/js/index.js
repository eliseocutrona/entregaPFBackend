const socket = io();
console.log('Conectado al servidor WebSocket');

// Referencias a los elementos del DOM
const productsForm = document.getElementById('productsForm');
const productsList = document.getElementById('products-list');

// Manejar el envío del formulario para agregar productos
productsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Crear un FormData para enviar con fetch
  const data = new FormData(productsForm);
  console.log([...data.entries()]);

  // Enviar los datos al servidor
  fetch('/api/products', {
    method: 'POST',
    body: data,
  })
  .then(response => response.json())
  .then(product => {
    console.log('Producto creado:', product);
    // Emitir un evento al servidor para notificar a todos los clientes
    socket.emit('newProduct', product);
  })
  .catch(error => console.error('Error:', error));

  // Resetear el formulario
  productsForm.reset();
});

// Manejar el evento 'newProduct' del servidor
socket.on('newProduct', (data) => {
  const productElement = document.createElement('div');
  productElement.className = 'card';
  productElement.id = `product-${data._id}`;
  productElement.style.backgroundSize = 'cover';
  productElement.style.backgroundPosition = 'center';
  productElement.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <img src="${data.thumbnails[0].path}" alt="${data.title}" style="max-width: 100%">
    <p><strong>Price:</strong> $${data.price}</p>
    <p><strong>Stock:</strong> ${data.stock}</p>
    <p><strong>Code:</strong> ${data.code}</p>
    <p><strong>Category:</strong> ${data.category}</p>
    <button class="delete-btn" data-id="${data._id}">Delete</button>
  `;
  productsList.appendChild(productElement);

  // Manejar el clic en el botón de eliminar
  const deleteButton = productElement.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    console.log(`Eliminando producto con ID: ${data._id}`);
    fetch(`/api/products/${data._id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          console.log(`Producto con ID: ${data._id} eliminado correctamente`);
          productElement.remove();
        } else {
          console.error(`No se pudo eliminar el producto con ID: ${data._id}`);
        }
      })
      .catch(error => console.error('Error:', error));
  });
});
