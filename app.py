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
    # Obtenemos los datos JSON que nos envió el JavaScript
    datos_formulario = request.get_json()

    # Imprimimos los datos en la terminal del servidor para verificar que llegaron
    print("--- Datos recibidos del frontend ---")
    print(datos_formulario)
    print("------------------------------------")

    # Por ahora, devolvemos una respuesta simple para confirmar la recepción
    return jsonify({
        "status": "ok",
        "mensaje": "Datos recibidos correctamente",
        "datos_recibidos": datos_formulario
    })

if __name__ == "__main__":
    app.run(debug=True)