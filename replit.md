# Bible Reader Application

## Overview

A Spanish Bible reader web application designed for comfortable long-form reading. The application prioritizes text legibility, minimal distraction, and reading-optimized interfaces following Apple HIG and Kindle/reading app design principles. Built as a full-stack TypeScript application with React frontend and Express backend.

## Recent Changes (January 2026)

- **Audiobook System**: Added audio playback for verses and chapters with external audio URL support
- **Bookmark Persistence**: Bookmarks now save to localStorage and persist across sessions
- **SEO Optimization**: Added meta tags, Open Graph tags, and structured data for search engines
- **Terms & Conditions**: New `/terminos` page with legal information
- **Instructions File**: Created `INSTRUCCIONES_BIBLIA.md` for adding Bible content and audio URLs

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack React Query for server state, React useState for local state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with HMR support

The frontend follows a component-based architecture with:
- Feature components organized in `client/src/components/bible/` for Bible-specific UI
- Reusable UI primitives in `client/src/components/ui/` (shadcn/ui components)
- Custom hooks in `client/src/hooks/` for shared logic (theme, mobile detection, toast)
- Path aliases configured: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with development/production mode handling
- **API Pattern**: RESTful routes prefixed with `/api`
- **Static Serving**: Vite dev server in development, static file serving in production

The server uses a modular structure:
- `server/index.ts` - Main entry point with middleware setup
- `server/routes.ts` - API route registration
- `server/storage.ts` - Data access layer with interface-based storage abstraction
- `server/vite.ts` - Vite integration for development
- `server/static.ts` - Static file serving for production

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Storage Pattern**: Interface-based storage (`IStorage`) with in-memory implementation (`MemStorage`) that can be swapped for database implementation

### Design System
- Reading-optimized typography with generous line heights (1.7-1.8)
- Dark/light mode support with CSS custom properties
- Warm amber accent color palette for Bible reading context
- Mobile-first responsive design with 768px breakpoint
- Sidebar navigation (280px fixed on desktop, overlay on mobile)

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations in `./migrations` directory
- **connect-pg-simple**: PostgreSQL session storage support

### UI Components
- **Radix UI**: Headless UI primitives (dialog, popover, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Lucide React**: Icon library
- **Embla Carousel**: Chapter navigation carousel
- **class-variance-authority**: Component variant styling

### Build & Development
- **Vite**: Frontend build tool with React plugin
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development
- **Replit plugins**: Dev banner, error overlay, cartographer for Replit environment