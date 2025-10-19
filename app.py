from flask import Flask, render_template
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

if __name__ == "__main__":
    app.run(debug=True)