# EduQuiz Chile

Proyecto monorepo para una plataforma educativa con identidad visual de trivia lúdica para niños, adolescentes y docentes.

## Estructura
- backend/: API NestJS con módulos base
- frontend/: app React + TypeScript + Vite
- docs/: documentación de arquitectura y reglas del negocio

## Primer entregable
Este repositorio ya incluye una interfaz navegable con:
- landing page
- selector de perfil Kids/Teens
- dashboard de asignaturas
- curso y dificultad
- pantalla de trivia con voz
- resultados y recompensas
- panel docente

## Ejecutar frontend
```bash
cd frontend
npm install
npm run dev
```

## Ejecutar backend
```bash
cd backend
npm install
npm run start:dev
```

## Notas
La base de datos real y la autenticación se agregan en las siguientes iteraciones del proyecto; la arquitectura ya quedó separada por módulos para evitar reescrituras futuras.
