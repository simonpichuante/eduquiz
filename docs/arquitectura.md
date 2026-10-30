# EduQuiz Chile — arquitectura propuesta

## Objetivo
Crear una plataforma educativa full stack orientada a colegios e instituciones chilenas, con una identidad visual que combine juego, gamificación y gestión docente.

## Stack recomendado
- Frontend: React + TypeScript + Vite + Tailwind CSS + React Router + Framer Motion
- Backend: NestJS + JWT + REST + WebSockets
- Base de datos: PostgreSQL + Prisma
- Estado del cliente: Zustand / React Query
- Autenticación: JWT con roles por institución

## Dominio
- Institución
- Usuario
- Curso
- Asignatura
- Pregunta
- Partido / Juego
- Resultado
- Logro

## Capa de negocio
- Un colegio se registra como institución y tiene sus propios cursos, usuarios y preguntas.
- Los docentes gestionan contenido y grupos.
- Los estudiantes responden en modo individual o competitivo.
- El backend valida respuestas y calcula puntajes, XP y nivel.
- Las instituciones están aisladas por tenant lógico para evitar cruzamiento de datos.

## Recomendación inicial
Para el MVP, priorizar: landing page, selector de perfil, dashboard, modo de juego y resultados. El backend puede quedar como API base con módulos y stubs.

## Módulo principal
- auth
- institutions
- users
- courses
- subjects
- questions
- games
- gamification
- rankings
- statistics
