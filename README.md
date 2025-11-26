# Proyecto: API de Publicaciones y Comentarios (Blog Personal)

## 🧾 Objetivo
Desarrollar una API RESTful utilizando Node.js y Express que permita a los usuarios crear publicaciones tipo blog y comentar en ellas. La API debe incluir autenticación, control de permisos por autor, validaciones, protección contra XSS y estar estructurada bajo el patrón MVC.

---

## ✅ Requisitos Técnicos

- Node.js y Express.
- Base de datos MySQL.
- Autenticación con JWT.
- Encriptación de contraseñas con `argon2`.
- Protección de rutas con middlewares.
- Validación de entradas (campos requeridos, tipos de datos).
- Protección contra XSS.
- Patrón de arquitectura MVC.
- Manejo centralizado de errores.
- Variable de entorno (.env).
- Documentación de la API.
- Docker

---

## 🧱 Estructura del Proyecto

```
api/
  src/
    config/        → Configuración de base de datos y entorno
    controllers/   → Lógica de cada endpoint (C del MVC)
    models/        → Consultas y acceso a la BD (M del MVC)
    routes/        → Define rutas agrupadas por recurso
    middlewares/   → Validación, autenticación, manejo de errores
    utils/         → Funciones auxiliares (sanitización)
server.js        → Servidor principal
.env
docker-compose.yml
Dockerfile
api.http          → Archivo para pruebas desde VSCode

```

---

## 🔐 Autenticación

- Autenticación basada en JWT.
- `POST /api/auth/register`: Registro de usuario.
- `POST /api/auth/login`: Inicio de sesión.
- Middleware `verifyToken` para proteger rutas privadas.

---

## 🧾 Funcionalidad por Rol

### Usuario
👤 Usuario autenticado puede:
Registrar cuenta
Iniciar sesión
Crear publicaciones
Ver cualquier publicación
Editar sus propias publicaciones
Eliminar sus propias publicaciones
Comentar en publicaciones

❌ No puede:
Editar publicaciones de otros
Eliminar publicaciones de otros
---

## 📡 Endpoints Requeridos

### Autenticación

| Método | Ruta                   | Descripción           |
|--------|------------------------|------------------------|
| POST   | /api/auth/register     | Registro de usuario    |
| POST   | /api/auth/login        | Inicio de sesión       |

---

### Publicaciones

| Método | Ruta                       | Descripción                                     | Protegido | Observaciones                    |
|--------|----------------------------|--------------------------------------------------|-----------|----------------------------------|
| GET    | /api/publicaciones         | Listar todas las publicaciones    | No        | Pública                          |
| GET    | /api/publicaciones/:id     | Ver una publicación específica                  | No        | Pública                          |
| POST   | /api/publicaciones         | Crear una nueva publicación                     | Sí        | Solo usuario autenticado         |
| PUT    | /api/publicaciones/:id     | Editar publicación (solo el autor)              | Sí        | Verificar propiedad              |
| DELETE | /api/publicaciones/:id     | Eliminar publicación (solo el autor)            | Sí        | Verificar propiedad              |

---

### Comentarios

| Método | Ruta                                | Descripción                                 | Protegido | Observaciones                    |
|--------|-------------------------------------|----------------------------------------------|-----------|----------------------------------|
| GET    | /api/publicaciones/:id/comentarios  | Ver todos los comentarios de una publicación | No        | Pública                          |
| POST   | /api/publicaciones/:id/comentarios  | Comentar en una publicación                  | Sí        | Usuario autenticado              |

### Descripción General

Este proyecto es una Api diseñar para manejar:
- Usuarios
- Publicaciones
- Comentarios 
Incluye autenticación, autorización, sanitización, validación y arquitectura MVC

Está construido con:
- Node.js + Express – Servidor backend
- MySQL – Base de datos relacional
- Docker + Docker Compose 
- Zod – Validación de datos
- JWT
- argon2 – Hashing de contraseñas
- sanitize-html – Prevención de XSS
- Pruebas del API usando api.http

### Objetivo principal
Crear un servicio de publicaciones donde los usuarios puedan:
- Registrarse y autenticarse
- Crear, editar y eliminar publicaciones
- Comentar en publicaciones
- Leer publicaciones y comentarios

### Arquitectura del proyecto
src/
  config/         → Configuración (DB, variables)
  controllers/    → Lógica de cada endpoint
  middlewares/    → Autenticación, validación, errores
  models/         → Consultas y acceso a la BD
  routes/         → Rutas agrupadas por recurso
  utils/          → Funciones auxiliares (sanitización)
  server.js       → Servidor principal

Pruebas del API
- Archivo api.http

### Requisitos 

- Docker Desktop instalado 
- Node.js (solo para correr fuera de Docker)
- Visual Studio Code
- Extensión “REST Client” -- VS Code → Extensiones → Buscar “REST Client” → Instalar

### Inicialización de la API (IMPORTANTE) ✅✅✅✅✅✅✅✅✅
Principalmente clonar el repositorio
Tener abierto el Docker Desktop
Abrir la terminal y agregar en este orden los comandos:
- npm install
- docker-compose down
- docker-compose build --no-cache
- docker-compose up

### Pasos exteriores pero no menos importantes
### Instalación del Proyecto
- Clonar el proyecto
git clone <repo-url>
cd ProyectoDise-oDigital
- Crea un archivo .env
PORT=8082
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=blogdb
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=7d

- Asegurar no tener node_modules

- Luego utilizar estos comandos:
docker-compose down --volumes
docker-compose build --no-cache
docker-compose up

Si todo correcto bien se podrá observar:
DB connected
Server listening on 8082



### Autenticación

| Método | Ruta                   | Descripción           |
|--------|------------------------|------------------------|
| POST   | /api/auth/register     | Registro de usuario    |
| POST   | /api/auth/login        | Inicio de sesión       |

---

### Publicaciones

| Método | Ruta                       | Descripción                                     | Protegido | Observaciones                    |
|--------|----------------------------|--------------------------------------------------|-----------|----------------------------------|
| GET    | /api/publicaciones         | Listar todas las publicaciones    | No        | Pública                          |
| GET    | /api/publicaciones/:id     | Ver una publicación específica                  | No        | Pública                          |
| POST   | /api/publicaciones         | Crear una nueva publicación                     | Sí        | Solo usuario autenticado         |
| PUT    | /api/publicaciones/:id     | Editar publicación (solo el autor)              | Sí        | Verificar propiedad              |
| DELETE | /api/publicaciones/:id     | Eliminar publicación (solo el autor)            | Sí        | Verificar propiedad              |

---

### Comentarios

| Método | Ruta                                | Descripción                                 | Protegido | Observaciones                    |
|--------|-------------------------------------|----------------------------------------------|-----------|----------------------------------|
| GET    | /api/publicaciones/:id/comentarios  | Ver todos los comentarios de una publicación | No        | Pública                          |
| POST   | /api/publicaciones/:id/comentarios  | Comentar en una publicación                  | Sí        | Usuario autenticado              |

### Uso de api.http, vista de forma más intuitiva
Para ejecutar las peticiones api.http se necesita:
✔ Visual Studio Code
✔ Extensión REST Client

- Este archivo permite probar la API SIN Postman, directamente desde VS Code.
Incluye pruebas para:
Registro
Login
CRUD de publicaciones
CRUD de comentarios
Healthcheck
Autorización con JWT

- Cómo usar el archivo api.http
Abrir el archivo api.http en VS Code
Sobre cada request se verá un botón:
Send Request
Hacer clic para enviar la petición
La respuesta aparecerá en una ventana lateral
Copiar el token del login y pégalo en la variable:
@token = <pega-tu-token-aquí>

- Verificación que la API esté activa
GET http://localhost:8082/
- Registrar usuario
POST /api/auth/register
{
  "username": "Usuario",
  "email": "nombre@test.com",
  "password": "123456"
}
- Login (copiar token)
Se obtiene:
{
  "token": "eyJhbGciOi..."
}
Copiarlo y pegarlo en:
@token = eyJhbGciOi...

- Crear publicación (JWT requerido)
POST /api/publicaciones
Authorization: Bearer {{token}}

- Obtener todas las publicaciones
GET /api/publicaciones

- Obtener una publicación por ID
GET /api/publicaciones/1

- Actualizar publicación (solo autor)
PUT /api/publicaciones/1
Authorization: Bearer {{token}}

- Eliminar publicación
DELETE /api/publicaciones/1
Authorization: Bearer {{token}}

- Crear comentario
POST /api/publicaciones/1/comentarios
Authorization: Bearer {{token}}

- Obtener comentarios
GET /api/publicaciones/1/comentarios


### Puntos importantes
- Hashing con Argon2
- Autenticación JWT
- Solo el autor puede modificar o eliminar sus publicaciones.
- Validación estricta con Zod:
Nadie puede enviar:
Datos incompletos
Tipos incorrectos
Strings vacíos
Contenido inválido
- Todos los comentarios son limpiados usando sanitize-html.
- Los errores no se filtran al usuario final.

### Comandos útiles
- Para levantar contenedores:
docker-compose up
- Para reconstruir:
docker-compose build --no-cache
- Para eliminar todo:
docker-compose down --volumes
