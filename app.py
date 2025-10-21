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
    datos_usuario = request.get_json()
    color_usuario = datos_usuario.get('color')
    raya_usuario = datos_usuario.get('raya')
    brillo_usuario = datos_usuario.get('brillo')
    exfoliacion_usuario = datos_usuario.get('exfoliacion')
    
    # Intentamos convertir la dureza a un número
    try:
        dureza_usuario = float(datos_usuario.get('dureza'))
    except (ValueError, TypeError):
        dureza_usuario = None

    todos_los_minerales = cargar_minerales()
    resultados = []
    for mineral in todos_los_minerales:
        coincidencias = 0
        
        # Comprobar color
        if color_usuario and color_usuario['hex'] in mineral.get('colores', []):
            coincidencias += 1
        
        # Comprobar raya
        if raya_usuario and raya_usuario['hex'] in mineral.get('raya', []):
            coincidencias += 1

        # Comprobar brillo
        if brillo_usuario and brillo_usuario == mineral.get('brillo'):
            coincidencias += 1

        # Comprobar exfoliación
        if exfoliacion_usuario and exfoliacion_usuario == mineral.get('exfoliacion', '').lower():
            coincidencias += 1

        # ¡NUEVA LÓGICA DE DUREZA!
        if dureza_usuario is not None:
            dureza_min = mineral.get('dureza_min')
            dureza_max = mineral.get('dureza_max')
            if dureza_min is not None and dureza_max is not None:
                if dureza_min <= dureza_usuario <= dureza_max:
                    coincidencias += 1
        
        if coincidencias > 0:
            mineral['coincidencias'] = coincidencias 
            resultados.append(mineral)

    resultados_ordenados = sorted(resultados, key=lambda x: x['coincidencias'], reverse=True)

    return jsonify({
        "status": "ok",
        "resultados": resultados_ordenados
    })

if __name__ == "__main__":
    app.run(debug=True)