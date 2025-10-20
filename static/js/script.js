document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('identification-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevenimos la recarga de la página

        // 1. Recolectamos los datos del formulario
        const color = document.getElementById('color').value;
        const dureza = document.getElementById('dureza').value;
        const brillo = document.getElementById('brillo').value;

        // 2. Creamos un objeto con los datos
        const formData = {
            color: color,
            dureza: dureza,
            brillo: brillo
        };

        console.log('Enviando al backend:', formData);

        // 3. Usamos 'fetch' para enviar los datos al servidor (backend)
        try {
            const response = await fetch('/identificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Convertimos el objeto a un string JSON
            });

            const result = await response.json(); // Leemos la respuesta del servidor
            console.log('Respuesta del backend:', result);

        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    });
});