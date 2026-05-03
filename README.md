# 📋 Gestión de Tareas — Proyecto Final React

Aplicación web de gestión de tareas (To-Do List) desarrollada como proyecto final del Diplomado de React. Permite crear, editar, eliminar y cambiar el estado de tareas conectadas a un backend REST.

## 🌐 Demo en vivo

🔗 [Ver aplicación en GitHub Pages](https://luisfernandoangulo28.github.io/Gesti-n-de-Tareas-con-React/)

## 🚀 Funcionalidades

| Acción | Método API | Descripción |
|---|---|---|
| **Visualizar tareas** | `GET /api/tasks` | Lista dinámica con filtros por estado |
| **Crear tarea** | `POST /api/tasks` | Formulario modal con validación |
| **Editar tarea** | `PUT /api/tasks/:id` | Modificar el nombre de una tarea |
| **Eliminar tarea** | `DELETE /api/tasks/:id` | Borrar con confirmación |
| **Cambiar estado** | `PATCH /api/tasks/:id` | Alternar entre Pendiente ↔ Finalizada |

### Extras implementados
- 🔐 Autenticación con JWT (login y registro)
- 🏷️ Filtros por pestañas: Todas / Pendientes / Finalizadas
- 🎨 Estilos visuales distintos por estado (verde/naranja, tachado)
- 💬 Alertas de feedback en cada operación

## 🛠️ Tecnologías

- **React 19** + **TypeScript**
- **Vite** (bundler)
- **Material UI v9** (componentes de UI)
- **Axios** (cliente HTTP)
- **React Router v7** (navegación)
- **Zod** (validación de formularios)

## 🔗 Backend

- **URL Base:** `https://taskdone-node.onrender.com`
- **API Docs:** [Swagger UI](https://taskdone-node.onrender.com/api-docs)

## ⚙️ Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/luisfernandoAngulo28/Gesti-n-de-Tareas-con-React.git
cd Gesti-n-de-Tareas-con-React

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.sample .env
# Editar .env: VITE_API_URL=https://taskdone-node.onrender.com/api

# 4. Iniciar en desarrollo
npm run dev
```

## 📦 Deploy en GitHub Pages

```bash
npm run build
npm run deploy
```

## 📂 Estructura del proyecto

```
src/
├── components/
│   ├── layout/        # Header, Menu, Footer, Layout
│   └── tasks/         # TaskForm, TaskItem
├── context/           # AuthContext, AlertContext
├── hooks/             # useAuth, useTasks, useAxios, useAlert
├── models/            # Task, Login, User interfaces/schemas
├── pages/
│   ├── private/       # TaskPage, PerfilPage
│   └── public/        # LoginPage, UserPage, NotFoundPage
└── routes/            # AppRouter
```

---

*Proyecto desarrollado para el Diplomado React — USIP*

**Repositorio:** https://github.com/luisfernandoAngulo28/Gesti-n-de-Tareas-con-React
