# PatientCare Backend

Backend API para la aplicación PatientCare construida con Node.js y Express.

## Requisitos

- Node.js (v14 o superior)
- npm o yarn

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` según tus necesidades.

## Uso

### Modo desarrollo (con auto-reload)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

## Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/    # Controladores de la aplicación
│   ├── models/        # Modelos de datos
│   ├── routes/        # Definición de rutas
│   ├── middlewares/   # Middlewares personalizados
│   └── index.js       # Punto de entrada de la aplicación
├── .env               # Variables de entorno (no commitear)
├── .env.example       # Ejemplo de variables de entorno
├── .gitignore         # Archivos ignorados por git
├── package.json       # Dependencias y scripts
└── README.md          # Este archivo
```

## Endpoints Disponibles

- `GET /` - Mensaje de bienvenida
- `GET /api/health` - Estado de la API
- `GET /api/patients` - Obtener todos los pacientes (ejemplo)
- `POST /api/patients` - Crear un nuevo paciente (ejemplo)

## Tecnologías

- **Express** - Framework web
- **CORS** - Manejo de CORS
- **Morgan** - Logger HTTP
- **Dotenv** - Gestión de variables de entorno
- **Nodemon** - Auto-reload en desarrollo
