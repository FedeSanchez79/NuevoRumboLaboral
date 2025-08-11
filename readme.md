# 💼 Nuevo Rumbo Laboral – Página Web Personal

Bienvenido/a al repositorio del sitio web **Nuevo Rumbo Laboral**, una página personal desarrollada como parte de un proyecto de formación profesional y acompañamiento laboral.

---

## 🌐 Descripción

Este sitio fue creado para presentarme como profesional en el ámbito de las **Relaciones Laborales** y **Coaching Ontológico**. Su objetivo es brindar información sobre mi perfil, mis servicios y ofrecer un canal de contacto para personas que buscan orientación o apoyo en su desarrollo laboral.

---

## 📄 Secciones principales

- 🏠 **Inicio** – Página principal de presentación.
- 👩‍💼 **Sobre mí** – Formación, propósito profesional y filosofía de trabajo.
- ✉️ **Contacto** – Formulario validado para enviar dudas e inquietudes con notificaciones visuales.

---

## 🛠️ Tecnologías utilizadas

- **HTML5**
- **CSS3** con diseño responsive
- **JavaScript** (Vanilla)
- **Node.js** y **Express** (para el backend)
- **Toastify JS** (para notificaciones visuales)
- **Font Awesome** (iconografía)
- **Flexbox** (para diseño y distribución)

---

## 📁 Estructura del proyecto

nuevo-rumbo-laboral/
│
├── 📁 api/
│ └── contact.js
│
├── 📁 assets/
│ └── images/
│
├── 📁 js/
│ └── contacto.js
│
├── 📁 node_modules/
│
├── 📁 pages/
│ ├── contacto.html
│ └── sobre_mi.html
│
├── 📁 style/
│ └── style.css
│
├── index.html
├── main.js
├── package-lock.json
├── package.json
└── readme.md

## 🚀 Cómo ejecutar el proyecto

### 🔧 1. Cloná el repositorio

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd nuevo-rumbo-laboral

npm install
npm start

## ✉️ Formulario de contacto

- **Todos los campos son obligatorios.**
- Validación en **tiempo real** con mensajes de error.
- Al enviar, se utiliza **Fetch API** para mandar los datos al backend.
- Se muestra un mensaje con **Toastify** (mensaje de éxito o error).
- El servidor responde simulando una acción de envío (no envía correos reales).

---

## 🧪 Validaciones incluidas

- Campo **Nombre**: requerido, sin números.
- Campo **Email**: formato válido.
- Campo **Mensaje**: mínimo de caracteres.
- Estilos de error visibles en cada campo si hay problemas.

---

## 🧭 Notas

- Asegurate de abrir la página desde `http://localhost:5000/pages/contacto.html` y no desde `file:///`.
- Para usar el backend, el archivo `main.js` debe estar correctamente enlazado y el servidor Express en ejecución.
- El paquete `dotenv` se usa para futuras integraciones (por ejemplo, claves de servicios).

---

## 📌 Autor

**Federico Sánchez**  
_Proyecto realizado como parte de una práctica profesional con enfoque en desarrollo web inicial._
