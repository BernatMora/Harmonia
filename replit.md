# Music Theory Learning App

## Project Overview
A comprehensive music theory learning application featuring multiple game modes, interactive exercises, and progress tracking. Originally migrated from Bolt to Replit environment.

## Application Features
- **Theory Mode**: Interactive exercises with notes, octaves, scales, and chord progressions
- **Speed Game**: Fast-paced music theory challenges
- **Memory Game**: Musical pattern memorization exercises  
- **Target Game**: Specific musical goal-based challenges
- **Puzzle Game**: Complex musical problem-solving
- **Arcade Game**: Gamified music theory learning

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Data**: In-memory storage (MemStorage)
- **UI Components**: Radix UI, Shadcn/UI, Lucide React icons
- **State Management**: React Context + useReducer
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion

## Project Architecture
```
client/
├── src/
│   ├── components/        # UI components
│   │   ├── games/        # Game-specific components
│   │   └── ui/           # Reusable UI components
│   ├── contexts/         # React contexts
│   ├── data/            # Static data and levels
│   └── lib/             # Utilities and configurations
server/
├── index.ts             # Express server entry
├── routes.ts            # API routes
├── storage.ts           # Data storage interface
└── vite.ts              # Vite development server
shared/
└── schema.ts            # Shared types and schemas
```

## Migration Status
- [x] Initial project structure analysis
- [•] Converting to modern Replit fullstack architecture
- [ ] Adding proper routing with Wouter
- [ ] Implementing UI components with Shadcn
- [ ] Setting up data persistence
- [ ] Testing and validation
- [ ] Documentation completion

## User Preferences
- Language: Catalan (UI text in Catalan)
- Learning approach: Interactive, gamified music theory
- Difficulty progression: Beginner to Expert levels

## Recent Changes
- **2025-01-08**: Started migration from Bolt to Replit
- **2025-01-08**: Analyzed existing codebase structure and components