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
- [x] Converting to modern Replit fullstack architecture
- [x] Adding proper routing with Wouter
- [x] Implementing UI components with Shadcn
- [x] Setting up data persistence
- [x] Testing and validation
- [x] Navigation and button functionality verified
- [ ] Documentation completion

## User Preferences
- Language: Catalan (UI text in Catalan)
- Target User: Advanced jazz guitarist requiring professional-level challenges
- Instrument: Guitar (jazz guitarist - requires guitar-specific voicings, fretboard navigation, and chord shapes)
- Learning approach: Ultra-intensive, mentally challenging exercises
- Philosophy: "Pocs jocs però molt intensos" - fewer games but extremely demanding
- Difficulty level: Expert to Master level only - eliminate simple exercises
- Special focus: Guitar voicings, fretboard mastery, negative harmony, advanced reharmonization, voice leading

## Recent Changes
- **2025-08-01**: Completed migration from Bolt to Replit
- **2025-08-01**: Modernized all game components with Shadcn UI integration
- **2025-08-01**: Fixed navigation issues and verified button functionality
- **2025-08-01**: Integrated API progress tracking and achievements system
- **2025-08-01**: Implemented complete game content for all 6 modes:
  - **Theory Mode**: 10 questions across 3 difficulty levels (Principiant, Intermedi, Avançat)
  - **Speed Mode**: 8 timed questions with varying time limits
  - **Memory Mode**: 8 pattern sequences with increasing difficulty
  - **Target Mode**: 3 challenge types with progress tracking and rewards
  - **Puzzle Mode**: 5 musical puzzles with fill-in-the-blank mechanics
  - **Arcade Mode**: 4 game concepts with preview interfaces
- **2025-08-01**: Added comprehensive gameplay features:
  - Real-time scoring and progress tracking
  - Visual feedback for correct/incorrect answers
  - Game completion screens with replay functionality
  - Challenge progression with rewards system
- **2025-08-01**: Integrated real harmonic progressions database:
  - **Harmonia Mode**: New advanced game mode with 9966+ real progressions
  - Dynamic question generation from authentic musical data
  - Roman numeral analysis with detailed chord breakdowns
  - Progressive difficulty with major/minor mode recognition
- **2025-08-01**: Complete transformation to professional jazz level:
  - **Speed Mode**: Advanced concepts (ii-V-I analysis, Cherokee, Giant Steps, Coltrane changes)
  - **Memory Mode**: Complex progressions (Cherokee voice leading, Giant Steps matrix, negative harmony)
  - **Target Mode**: Four ultra-challenging categories including Negative Harmony mastery
  - **Puzzle Mode**: Advanced harmonic concepts (tritone substitutions, upper structures, voice leading)
  - **Elimination**: Removed all basic exercises (intervals, simple scales, basic chords)
  - **Focus**: Negative harmony, reharmonization, voice leading, modal theory, Coltrane changes
- **2025-08-01**: Complete elimination of simple exercises and sound elements:
  - **Theory Mode**: Ultra-advanced questions (negative harmony, upper structures, Giant Steps analysis)
  - **All Modes**: No basic intervals, simple chords, or elementary concepts
  - **No Sound Elements**: Removed all audio simulations and sound references per user preference
  - **Chess-level Difficulty**: Each exercise requires deep musical analysis and professional knowledge
  - **Arcade Transformation**: Games now focus on harmonic analysis, voice leading, and complex theory
- **2025-08-01**: Major improvements implemented per user feedback:
  - **Adjustable Timing Controls**: Custom tempo settings for Speed and Memory modes (2-15s and 3-20s)
  - **Expanded Exercise Content**: Added 15+ new ultra-advanced questions for Theory mode
  - **Advanced Theory Section**: Complete new learning module with 4 chapters covering negative harmony, upper structures, Coltrane changes, and advanced voice leading
  - **Professional Enhancement**: All content now requires chess-level strategic thinking and professional jazz knowledge
- **2025-08-01**: New puzzle-based learning modes for maximum mental challenge:
  - **Composition Laboratory**: Create progressions with complex harmonic restrictions (chromatic motion, modal constraints, negative harmony challenges)
  - **Analysis Master**: Decode real transcriptions from Bill Evans, Herbie Hancock with function analysis, voicing identification, and scale selection
  - **Musical Theory Easter Egg Hunt**: Progressive treasure hunt through hidden harmonic secrets with unlockable knowledge rewards
  - **Chord Builder Extreme**: Construct ultra-complex chords note by note with real-time harmonic analysis and interval identification
  - **Progression Laboratory**: Advanced harmonic analysis tools for jazz standards with voice leading visualization and substitution suggestions
  - **Guitar Voicings Jazz**: Master advanced guitar voicings with drop 2, drop 3, shell, and quartal harmony shapes
  - **Fretboard Master**: Complete fretboard navigation with scales, modes, CAGED system, and position playing
  - **Interactive Challenges**: 15 total game modes now available, each requiring deep musical analysis and creative problem-solving
  - **Guitar-Specific Focus**: Specialized for jazz guitarist with authentic fingerings, positions, and guitar-centric harmonic concepts
  - **Personal Learning Focus**: Designed for single advanced user with personalized difficulty that scales infinitely
- **2025-08-01**: Revolutionary AI-powered dynamic question generation system:
  - **OpenAI Integration**: Complete GPT-4o integration for generating unique questions each session
  - **Zero Repetition Guarantee**: Advanced caching system ensures no question repeats between sessions
  - **Professional Jazz Focus**: AI generates ultra-advanced questions on negative harmony, voice leading, Giant Steps analysis
  - **Intelligent Fallback**: System gracefully falls back to static questions if API unavailable
  - **User Control**: Toggle option for dynamic vs static questions in Theory and Speed modes
  - **Visual Indicators**: Clear UI feedback when using AI-generated content
  - **Performance Optimized**: Questions generate in ~2 minutes, cached for immediate reuse within session
  - **Cost Effective**: Approximately $0.01 per session for 10 unique professional-level questions
- **2025-08-01**: Complete educational library system integration:
  - **Comprehensive Theory Database**: 8 major chapters covering all advanced jazz concepts
  - **Professional Content**: Harmonia Negativa, Upper Structures, Coltrane Changes, Bebop Theory, Contemporary Harmony, Modal Theory, Advanced Substitutions, Harmonic Analysis
  - **Smart Search System**: Intelligent concept indexing with cross-references
  - **Progressive Learning**: Each chapter with multiple sections and difficulty levels
  - **Guitar-Specific Applications**: All theory adapted for jazz guitar with practical voicings and techniques
  - **Timing Improvements**: Increased speed game time from 8-30s and memory game from 8-25s for complex question reading
  - **Ultra-Advanced Content**: Professional-level theory requiring chess-level strategic thinking
  - **Complete Integration**: Seamless access from main menu with elegant navigation system