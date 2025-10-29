# GEMINI.md

## Project Overview

This is a React and TypeScript project, built with Vite. It serves as a demonstration for Redux Toolkit, with a focus on middleware. The application includes custom middleware for logging, performance monitoring, and an authorization guard.

The main technologies used are:
- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A typed superset of JavaScript.
- **Vite:** A fast build tool and development server.
- **Redux Toolkit:** The official, opinionated, batteries-included toolset for efficient Redux development.
- **ESLint:** A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

The project is structured with a `src` directory containing the main application logic, components, and Redux Toolkit features.

## Building and Running

The following commands are available to build, run, and test the project:

- **`npm run dev`**: Starts the development server with Hot Module Replacement (HMR).
- **`npm run build`**: Builds the application for production.
- **`npm run lint`**: Lints the codebase for potential errors and style issues.
- **`npm run preview`**: Serves the production build locally for previewing.

## Development Conventions

- **Coding Style:** The project uses ESLint with plugins for TypeScript and React to enforce a consistent coding style.
- **State Management:** State is managed using Redux Toolkit, with a clear separation of concerns into "slices" for different features.
- **Typing:** TypeScript is used throughout the project to ensure type safety.
- **Middleware:** Custom middleware is used to handle cross-cutting concerns like logging, performance, and authorization.
