const loginForm = document.getElementById('loginForm');

// Agrega un evento al formulario para que se ejecute al enviarlo
loginForm.addEventListener('submit', async (evt) => {
    // Previene el comportamiento predeterminado del formulario (recarga de página)
    evt.preventDefault();
    
    // Obtiene los datos del formulario y los convierte en un objeto
    const data = new FormData(loginForm);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));

    try {
        // Envía una solicitud POST a la ruta de inicio de sesión
        const response = await fetch('/api/sessions/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            // Redirige al usuario a la página de perfil si el inicio de sesión es exitoso
            window.location.href = '/profile';
        } else {
            // Si no es exitoso, muestra un mensaje de error
            const result = await response.json();
            console.log(result.message || 'Login failed');
        }
    } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error('Login error:', error);
    }
});
