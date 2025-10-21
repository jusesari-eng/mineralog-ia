document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONFIGURACIÓN DE COLORIS ---
    Coloris({
        el: '[data-coloris]',
        themeMode: 'light',
        swatches: [
            '#FFFFFF', '#F8F8F5', '#F2F3F4', '#0B0B0B', '#3B3C36',
            '#FFD700', '#FFFF00', '#D4AF37', '#E3C87C', '#E25822',
            '#FF0000', '#E66B7D', '#FFC0CB', '#9966CC', '#800080',
            '#1034A6', '#1E4D8A', '#3A75C4', '#B7D3E9', '#0000FF',
            '#00A86B', '#00A37A', '#7FFFD4', '#9FE2BF', '#A8C686',
            '#4B6F44', '#008000', '#90EE90'
        ]
    });

    // --- ALGORITMO DE APROXIMACIÓN DE COLOR ---

    const colorMap = {
        // Colores Originales
        '#FFFFFF': 'Blanco / Incoloro',
        '#000000': 'Negro',
        '#FFFF00': 'Amarillo',
        '#FFD700': 'Dorado',
        '#C0C0C0': 'Plateado',
        '#B87333': 'Cobre',
        '#008000': 'Verde Oscuro',
        '#90EE90': 'Verde Claro',
        '#FF0000': 'Rojo',
        '#0000FF': 'Azul',
        '#800080': 'Violeta / Púrpura',
        '#FFC0CB': 'Rosa',
        '#A52A2A': 'Marrón',
        '#3B3C36': 'Negro Verdoso',

        // --- NUEVOS COLORES AÑADIDOS ---
        '#9966CC': 'Amatista (Púrpura)',
        '#7FFFD4': 'Aguamarina',
        '#3A75C4': 'Azul Ágata',
        '#F2F3F4': 'Blanco Nieve / Gris Pálido',
        '#B7D3E9': 'Azul Celeste',
        '#E66B7D': 'Rodonita (Rosa Intenso)',
        '#0B0B0B': 'Negro Obsidiana', // Muy cercano al negro, pero lo añadimos por si acaso
        '#4B6F44': 'Verde Oliva / Hornblenda',
        '#D8B7A4': 'Arena / Rosa del Desierto',
        '#9FE2BF': 'Verde Ópalo',
        '#1034A6': 'Azul Azurita',
        '#E3C87C': 'Crema / Aragonito',
        '#00A86B': 'Verde Jade',
        '#1E4D8A': 'Azul Sodalita',
        '#D4AF37': 'Latón / Calcopirita',
        '#A8C686': 'Verde Prehnita',
        '#F8F8F5': 'Blanco Talco',
        '#E25822': 'Naranja / Carneola',
        '#00A37A': 'Verde Amazonita'
    };

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }
        return { r: +r, g: +g, b: +b };
    }

    function findClosestColor(userHex) {
        const userRgb = hexToRgb(userHex);
        let closestColor = null;
        let minDistance = Infinity;

        for (const paletteHex in colorMap) {
            const paletteRgb = hexToRgb(paletteHex);
            const distance = Math.pow(userRgb.r - paletteRgb.r, 2) +
                           Math.pow(userRgb.g - paletteRgb.g, 2) +
                           Math.pow(userRgb.b - paletteRgb.b, 2);
            
            if (distance < minDistance) {
                minDistance = distance;
                closestColor = { hex: paletteHex, name: colorMap[paletteHex] };
            }
        }
        return closestColor;
    }

    // --- LÓGICA DEL FORMULARIO ---
    const form = document.getElementById('identification-form');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const userColorHex = document.getElementById('color').value;
        const userRayaHex = document.getElementById('raya').value;
        const dureza = document.getElementById('dureza').value;
        const brillo = document.getElementById('brillo').value;
        const exfoliacion = document.getElementById('exfoliacion').value; // LÍNEA NUEVA

        const closestColor = findClosestColor(userColorHex);
        const closestRaya = findClosestColor(userRayaHex);

        const formData = {
            color: closestColor,
            raya: closestRaya,
            dureza: dureza,
            brillo: brillo,
            exfoliacion: exfoliacion // LÍNEA NUEVA
        };

        console.log('Color elegido por el usuario:', {color: userColorHex, raya: userRayaHex});
        console.log('Enviando al backend (color aproximado):', formData);

        try {
            const response = await fetch('/identificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Respuesta del backend:', data);

            mostrarResultados(data.resultados);

        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    }); // Cierre del event listener del FORMULARIO

    // --- FUNCIÓN PARA RENDERIZAR RESULTADOS ---
    function mostrarResultados(resultados) {
        const container = document.getElementById('resultados-container');
        container.innerHTML = '';

        if (!resultados || resultados.length === 0) {
            container.innerHTML = '<p>No se encontraron minerales con esas características.</p>';
            return;
        }

        const mainContent = document.querySelector('.main-content');
        let titulo = document.getElementById('resultados-titulo');
        if (!titulo) {
            titulo = document.createElement('h2');
            titulo.id = 'resultados-titulo';
            titulo.textContent = 'Resultados de la Identificación';
            // Lo insertamos después del formulario
            container.insertAdjacentElement('beforebegin', titulo);
        }
        if (!resultados || resultados.length === 0) {
            // Ocultamos el título si ya existía de una búsqueda anterior
            const tituloExistente = document.getElementById('resultados-titulo');
            if (tituloExistente) tituloExistente.style.display = 'none';
            
            container.innerHTML = '<p>No se encontraron minerales con esas características.</p>';
            return;
        } else {
            // Nos aseguramos de que el título sea visible
            const tituloExistente = document.getElementById('resultados-titulo');
            if (tituloExistente) tituloExistente.style.display = 'block';
        }

        resultados.forEach(mineral => {
            const card = document.createElement('div');
            card.className = 'card';
            // Usamos url_for para las imágenes locales
            const imageUrl = mineral.imagen ? `static/${mineral.imagen}` : '';
            card.innerHTML = `
                <img src="static/${mineral.imagen}" alt="Imagen de ${mineral.nombre}">
                <h3>${mineral.nombre}</h3>
                <!-- LÍNEA NUEVA -->
                <p class="card-description">${mineral.descripcion}</p>
                <p><em>${mineral.clase}</em></p>
                <p><strong>Coincidencias:</strong> ${mineral.coincidencias}</p>
                <p><strong>Fórmula:</strong> ${mineral.formula}</p>
                <p><strong>Dureza:</strong> ${mineral.dureza_min} - ${mineral.dureza_max}</p>
                <p><strong>Exfoliación:</strong> ${mineral.exfoliacion}</p>
                <p><strong>Fractura:</strong> ${mineral.fractura}</p>
                <p><strong>Brillo:</strong> ${mineral.brillo}</p>
                <p><strong>Color(es):</strong> 
                    ${mineral.colores.map(hex => `<span class="color-swatch" style="background-color: ${hex};"></span>`).join(' ')}
                </p>
                <p><strong>Raya:</strong> 
                    ${mineral.raya.map(hex => `<span class="color-swatch" style="background-color: ${hex};"></span>`).join(' ')}
                </p>
            `;
            container.appendChild(card);
        });
    }

});
