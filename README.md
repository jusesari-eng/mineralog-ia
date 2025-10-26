# Mineralog-IA  mineralog-ia

Herramienta educativa impulsada por IA, desarrollada con Python (Flask) y JavaScript, diseñada para que estudiantes de Geología puedan identificar minerales de forma rápida e interactiva a partir de sus propiedades físicas.

## Tabla de Contenidos
- [Descripción del Problema](#descripción-del-problema)
- [Solución Propuesta](#solución-propuesta)
- [Características Principales](#características-principales)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación y Uso Local](#instalación-y-uso-local)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Próximos Pasos](#próximos-pasos)
- [Autores](#autores)

## Descripción del Problema

Los estudiantes de Geología tradicionalmente dependen de guías de campo impresas y libros de texto densos para la identificación de minerales. Este proceso, aunque fundamental, puede ser lento, propenso a errores y poco interactivo, dificultando el aprendizaje activo y la memorización de las propiedades clave de cientos de minerales.

## Solución Propuesta

**Mineralog-IA** es una aplicación web que moderniza este proceso. Ofrece una interfaz intuitiva donde el usuario puede seleccionar las propiedades físicas observadas (color, dureza, brillo, etc.) y obtener una lista de posibles minerales coincidentes al instante. El objetivo es transformar la identificación de minerales de una tarea tediosa a una experiencia de aprendizaje dinámica y eficiente.

## Características Principales

- **Catálogo Interactivo:** Visualiza la base de datos completa de minerales con sus imágenes y propiedades.
- **Identificación por Propiedades:** Un formulario dinámico que permite a los usuarios filtrar y encontrar minerales basados en múltiples criterios.
- **Backend Robusto:** Construido con Flask para gestionar la lógica de negocio y servir los datos desde un archivo JSON.
- **Frontend Reactivo:** Interfaz de usuario construida con HTML, CSS y JavaScript puro para enviar datos al backend sin recargar la página.

## Stack Tecnológico

- **Backend:**
  - ![Python](https://img.shields.io/badge/Python-3.12.3-3776AB?style=for-the-badge&logo=python&logoColor=white)
  - ![Flask](https://img.shields.io/badge/Flask-3.1.2-000000?style=for-the-badge&logo=flask&logoColor=white)
- **Frontend:**
  - ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  - ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  - ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- **Base de Datos:**
  - ![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)
- **Control de Versiones:**
  - ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
  - ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## Instalación y Uso Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/jusesari-eng/mineralog-ia.git
    cd mineralog-ia
    ```

2.  **Crea y activa un entorno virtual (recomendado):**
    ```bash
    # Para Windows
    python -m venv .venv
    .\venv\Scripts\activate

    # Para macOS/Linux
    python3 -m venv .venv
    source venv/bin/activate
    ```

3.  **Instala las dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Ejecuta la aplicación:**
    ```bash
    python app.py
    ```

5.  **Abre tu navegador y ve a `http://127.0.0.1:5000`**

## Estructura del Proyecto
```plaintext
mineralog-ia/
├── app.py # Lógica principal de Flask (backend)
├── requirements.txt # Dependencias de Python
├── minerales.json # Base de datos de minerales
├── templates/
│ └── index.html # Estructura HTML de la página
└── static/
  ├── css/
  │ └── styles.css # Estilos de la aplicación
  └── js/
    └── script.js # Lógica del frontend (JavaScript)
```

## Próximos Pasos

- [ ] Implementar un sistema de búsqueda por nombre de mineral.
- [ ] Mejorar la interfaz de usuario y la experiencia de usuario (UX/UI).

## Autores

- **Juan Manuel Torres Guevara** - *Desarrollo Full-Stack y Lógica del Proyecto* - [jmtg-GH](https://github.com/jmtg-GH)
- **Juan Sebastián Saavedra Riaño** - *Desarrollo Full-Stack y Lógica del Proyecto* - [jusesari-eng](https://github.com/jusesari-eng)
