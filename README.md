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
- Variables de entorno con `dotenv`.
- Documentación de la API.

---

## 🧱 Estructura de Carpetas Sugerida

```
/api
  /controllers
  /models
  /routes
  /middlewares
  /config
  /utils
server.js
.env
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
- Registrar e iniciar sesión.
- Crear, ver, actualizar y eliminar sus propias publicaciones.
- Comentar en cualquier publicación pública.
- No puede editar ni eliminar publicaciones de otros usuarios.

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
- Extensión “REST Client” 

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

### Cómo usar api.http
- Variables globales
@host = http://localhost:8082
@token = TU_TOKEN_AQUI
Se usa así:
Authorization: Bearer {{token}}

### Pequeño ejemplo de la estructura de un request en api.http
POST {{host}}/api/auth/login
Content-Type: application/json

{
  "email": "jose@example.com",
  "password": "123456"
}

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
