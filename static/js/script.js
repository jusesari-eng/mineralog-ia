document.addEventListener('DOMContentLoaded', function() {
    
    // --- CONFIGURACIÓN DE COLORIS ---
    Coloris({
        el: '[data-coloris]',
        themeMode: 'light',
        swatches: [
            '#FFFFFF', '#000000', '#FFFF00', '#FFD700', '#C0C0C0',
            '#B87333', '#008000', '#FF0000', '#0000FF', '#800080',
            '#FFC0CB', '#A52A2A', '#3B3C36'
        ]
    });

    // --- ALGORITMO DE APROXIMACIÓN DE COLOR ---

    const colorMap = {
        '#FFFFFF': 'Blanco / Incoloro', '#000000': 'Negro', '#FFFF00': 'Amarillo',
        '#FFD700': 'Dorado', '#C0C0C0': 'Plateado', '#B87333': 'Cobre',
        '#000000': 'Verde', '#FF0000': 'Rojo', '#0000FF': 'Azul',
        '#800080': 'Violeta', '#FFC0CB': 'Rosa', '#A52A2A': 'Marrón',
        '#3B3C36': 'Negro Verdoso'
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

        const closestColor = findClosestColor(userColorHex);
        const closestRaya = findClosestColor(userRayaHex);

        const formData = {
            color: closestColor,
            raya: closestRaya,
            dureza: dureza,
            brillo: brillo
        };

        console.log('Color elegido por el usuario:', {color: userColorHex, raya: userRayaHex});
        console.log('Enviando al backend (color aproximado):', formData);

        try {
            const response = await fetch('/identificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log('Respuesta del backend:', result);

        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    });

});