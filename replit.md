# Overview

CareerSync is a comprehensive platform for career and education opportunities, serving as a unified hub for job and scholarship discovery, application tracking, and career development. The application combines job search functionality with academic opportunity management, providing users with a centralized dashboard to manage their professional and educational journey. Built as a full-stack web application with a React frontend and Express backend, it features AI-powered matching, application tracking with Kanban-style boards, and comprehensive profile management including academic transcript handling and GPA calculations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses a modern React-based architecture with TypeScript and Vite for development tooling. The UI is built with shadcn/ui components based on Radix UI primitives, providing a consistent design system with Tailwind CSS for styling. State management is handled through TanStack Query for server state and React hooks for local state. The application uses Wouter for lightweight client-side routing and implements a mobile-first responsive design with dedicated mobile navigation components.

## Backend Architecture
The server is built with Express.js and TypeScript, following a RESTful API design pattern. The application uses a modular architecture with separate concerns for routing, authentication, storage, and business logic. Authentication is handled through Replit's OIDC integration with session management using express-session and PostgreSQL session storage. The backend implements comprehensive error handling and request logging middleware.

## Data Storage Solutions
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations and schema management. The database schema includes tables for users, user profiles, opportunities (jobs/scholarships), applications, and session storage. Neon is used as the PostgreSQL provider with connection pooling for optimal performance. The schema supports complex data types including enums for opportunity types and application statuses.

## Authentication and Authorization
Authentication is implemented using Replit's OIDC (OpenID Connect) integration with Passport.js strategy. The system maintains user sessions in PostgreSQL using connect-pg-simple for session storage. Authorization is handled through middleware that checks for authenticated sessions on protected routes. User profiles are automatically created and managed through the authentication flow.

## External Dependencies
- **Neon Database**: Serverless PostgreSQL database hosting
- **Replit Authentication**: OIDC-based authentication service
- **shadcn/ui**: Component library based on Radix UI primitives
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect
- **TanStack Query**: Server state management and caching
- **Vite**: Build tool and development server with hot module replacement
- **Tailwind CSS**: Utility-first CSS framework for styling

## Key Design Patterns
The application follows a clear separation of concerns with distinct layers for presentation, business logic, and data access. The frontend implements a component-based architecture with reusable UI components and custom hooks for state management. The backend uses a service-oriented approach with storage abstraction patterns for database operations. Error boundaries and loading states are implemented throughout the application for robust user experience.

## API Structure
The REST API follows conventional HTTP methods and status codes with JSON responses. Endpoints are organized by feature domains (auth, profile, opportunities, applications, dashboard) with consistent error handling and response formatting. The API includes proper validation using Zod schemas and implements request/response logging for debugging and monitoring.