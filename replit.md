# PPR Gym Website - Replit Project Documentation

## Overview

This is a full-stack web application for PPR Gym (Pull. Push. Run.) - a fitness gym website with a modern, dark-themed design located at Al Rayyan Plaza, 2nd floor. The application features a landing page with sections for hero, about, real coaches, testimonials, and a contact form. It's built using a modern tech stack with TypeScript, React, and Express.js with clean, minimalistic Inter font for headings.

## User Preferences

Preferred communication style: Simple, everyday language.
Font preference: Minimalistic Inter font for headings instead of decorative fonts
Real coach integration: Uses actual coach photos and information from PPR Gym

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Animations**: Framer Motion with intersection observer for scroll animations
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas for type-safe data validation
- **Session Management**: Basic in-memory storage with future PostgreSQL support

### Project Structure
```
├── client/          # Frontend React application
├── server/          # Backend Express.js application
├── shared/          # Shared types and schemas
└── migrations/      # Database migration files
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication structure (id, username, password)
- **Contact Messages Table**: Stores contact form submissions (id, firstName, lastName, email, message, createdAt)
- Uses UUID primary keys with PostgreSQL's `gen_random_uuid()`

### API Endpoints
- `POST /api/contact` - Submit contact form with validation
- `GET /api/contact` - Retrieve all contact messages (admin functionality)

### Frontend Pages
- **Home Page**: Single-page application with scrollable sections
- **404 Page**: Simple not found page with helpful messaging

### UI Sections
- **Navigation**: Fixed header with PPR logo and smooth scroll navigation
- **Hero**: Full-screen banner with PPR logo, "Pull Push Run" branding, and motivational tagline
- **About**: Information about PPR's training philosophy and Al Rayyan Plaza location
- **Coaches**: Real coach profiles (Francois, Ahmed Dimassi, Mohamed, Ahmed Alazab) with actual photos
- **Testimonials**: Customer reviews reflecting PPR's approach and Qatar location
- **Footer/Contact**: Contact form with actual gym hours (Sat-Thu 5am-12am, Fri 4pm-9pm) and valet parking info

## Data Flow

1. **Contact Form Submission**:
   - User fills out form in Footer section
   - Form data validated using Zod schema
   - Submitted via POST to `/api/contact` endpoint
   - Server validates and stores in database
   - Success/error feedback shown via toast notifications

2. **Page Navigation**:
   - Smooth scroll navigation between sections
   - Mobile-responsive hamburger menu
   - Fixed header with active section highlighting

3. **Animation Flow**:
   - Intersection Observer triggers animations
   - Framer Motion handles enter/exit animations
   - Staggered animations for lists and cards

## External Dependencies

### Frontend Dependencies
- **UI/UX**: Radix UI components, Framer Motion, React Intersection Observer
- **Forms**: React Hook Form with Hookform Resolvers
- **HTTP Client**: TanStack Query with native fetch
- **Styling**: Tailwind CSS, Class Variance Authority, clsx
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Bebas Neue, Montserrat)

### Backend Dependencies
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL sessions
- **Development**: tsx for TypeScript execution

### Build Tools
- **Frontend**: Vite with React plugin, PostCSS, Autoprefixer
- **Backend**: esbuild for production builds
- **TypeScript**: Shared tsconfig with path mapping
- **Database**: Drizzle Kit for migrations

## Deployment Strategy

### Development
- Frontend served by Vite dev server with HMR
- Backend runs with tsx for TypeScript execution
- Database migrations handled by Drizzle Kit
- Replit-specific plugins for error overlay and cartographer

### Production Build
- Frontend: Vite builds to `dist/public` directory
- Backend: esbuild bundles server to `dist/index.js`
- Static files served by Express in production
- Environment variables required: `DATABASE_URL`

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite middleware
- **Production**: `NODE_ENV=production` with static file serving
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **Replit Integration**: Special handling for Repl environment

### Key Architectural Decisions

1. **Monorepo Structure**: Keeps frontend, backend, and shared code together for easier development
2. **TypeScript Throughout**: Ensures type safety across the entire stack
3. **Drizzle ORM**: Chosen for type-safe database queries and easy migrations
4. **Shadcn/ui**: Provides consistent, accessible UI components
5. **Memory Storage Fallback**: Allows development without database setup
6. **Single Page Application**: Optimizes user experience with smooth scrolling
7. **Dark Theme**: Matches gym branding with midnight/electric blue color scheme