import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { levels } from '../data/levels';

interface GameState {
  currentLevel: number;
  currentExercise: number;
  isPlaying: boolean;
  gameMode: 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade';
  gameStats: {
    totalScore: number;
    completedLevels: number[];
    achievements: string[];
    streakCount: number;
  };
  userProgress: {
    [levelId: number]: {
      completed: boolean;
      score: number;
      attempts: number;
      bestTime: number;
    };
  };
}

type GameAction =
  | { type: 'SET_LEVEL'; payload: number }
  | { type: 'SET_EXERCISE'; payload: number }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_GAME_MODE'; payload: 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade' }
  | { type: 'COMPLETE_EXERCISE'; payload: { score: number; time: number } }
  | { type: 'COMPLETE_LEVEL'; payload: { levelId: number; score: number } }
  | { type: 'ADD_ACHIEVEMENT'; payload: string }
  | { type: 'UPDATE_STREAK'; payload: number };

const initialState: GameState = {
  currentLevel: 1,
  currentExercise: 0,
  isPlaying: false,
  gameMode: 'theory',
  gameStats: {
    totalScore: 0,
    completedLevels: [],
    achievements: [],
    streakCount: 0,
  },
  userProgress: {},
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_LEVEL':
      return { ...state, currentLevel: action.payload, currentExercise: 0 };
    case 'SET_EXERCISE':
      return { ...state, currentExercise: action.payload };
    case 'SET_PLAYING':
      return { ...state, isPlaying: action.payload };
    case 'SET_GAME_MODE':
      return { ...state, gameMode: action.payload };
    case 'COMPLETE_EXERCISE':
      return {
        ...state,
        gameStats: {
          ...state.gameStats,
          totalScore: state.gameStats.totalScore + action.payload.score,
          streakCount: state.gameStats.streakCount + 1,
        },
      };
    case 'COMPLETE_LEVEL':
      return {
        ...state,
        gameStats: {
          ...state.gameStats,
          completedLevels: [...state.gameStats.completedLevels, action.payload.levelId],
          totalScore: state.gameStats.totalScore + action.payload.score,
        },
        userProgress: {
          ...state.userProgress,
          [action.payload.levelId]: {
            completed: true,
            score: action.payload.score,
            attempts: (state.userProgress[action.payload.levelId]?.attempts || 0) + 1,
            bestTime: 0, // Will be implemented later
          },
        },
      };
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        gameStats: {
          ...state.gameStats,
          achievements: [...state.gameStats.achievements, action.payload],
        },
      };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  return {
    ...context.state,
    dispatch: context.dispatch,
  };
}