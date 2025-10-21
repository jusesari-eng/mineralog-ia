from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Función para cargar los datos de los minerales desde el archivo JSON
def cargar_minerales():
    with open('minerales.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route("/")
def index():
    minerales = cargar_minerales()
    # Pasamos la lista de minerales a la plantilla HTML
    return render_template("index.html", minerales=minerales)

# NUEVO ENDPOINT PARA RECIBIR DATOS DEL FORMULARIO
@app.route("/identificar", methods=['POST'])
def identificar_mineral():
    # 1. Recibir los datos del formulario (esto ya lo tenías)
    datos_usuario = request.get_json()
    color_usuario = datos_usuario.get('color')
    dureza_usuario = datos_usuario.get('dureza')
    brillo_usuario = datos_usuario.get('brillo')
    raya_usuario = datos_usuario.get('raya')

    # 2. Cargar nuestra base de datos de minerales
    todos_los_minerales = cargar_minerales()
    
    # 3. Filtrar los minerales - ¡Aquí está la lógica!
    resultados = []
    for mineral in todos_los_minerales:
        coincidencias = 0
        
        # Comprobar el color
        if color_usuario and color_usuario['hex'] in mineral.get('colores', []):
            coincidencias += 1
        
        # Comprobar la raya
        if raya_usuario and raya_usuario['hex'] in mineral.get('raya', []):
            coincidencias += 1

        # Comprobar el brillo
        if brillo_usuario and brillo_usuario == mineral.get('brillo'):
            coincidencias += 1
        
        # Comprobar la dureza (lógica simple por ahora)
        # Nota: Esto es muy básico. Lo mejoraremos después.
        if dureza_usuario and dureza_usuario == mineral.get('dureza'):
            coincidencias += 1

        # Si hay al menos una coincidencia, lo añadimos a los resultados
        if coincidencias > 0:
            # Añadimos el número de coincidencias para poder ordenarlos después
            mineral['coincidencias'] = coincidencias 
            resultados.append(mineral)

    # 4. Ordenar los resultados por el número de coincidencias (de mayor a menor)
    resultados_ordenados = sorted(resultados, key=lambda x: x['coincidencias'], reverse=True)

    # 5. Devolver los resultados al frontend
    return jsonify({
        "status": "ok",
        "resultados": resultados_ordenados
    })

if __name__ == "__main__":
    app.run(debug=True)