import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

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
    totalScore: 150, // Estadístiques d'exemple
    completedLevels: [1, 2, 3],
    achievements: ['Primers Passos', 'Dimoni de Velocitat'],
    streakCount: 5,
  },
  userProgress: {
    1: { completed: true, score: 85, attempts: 2, bestTime: 45 },
    2: { completed: true, score: 92, attempts: 1, bestTime: 38 },
    3: { completed: true, score: 78, attempts: 3, bestTime: 52 },
    4: { completed: false, score: 0, attempts: 1, bestTime: 0 },
  },
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
  const queryClient = useQueryClient();
  
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }

  const { state, dispatch } = context;

  // Mutations for API calls
  const saveProgressMutation = useMutation({
    mutationFn: (progressData: any) => apiRequest('/api/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });

  const updateStatsMutation = useMutation({
    mutationFn: (statsData: any) => apiRequest('/api/stats', {
      method: 'PATCH',
      body: JSON.stringify(statsData),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    }
  });

  // Helper functions
  const setLevel = (levelId: number) => {
    dispatch({ type: 'SET_LEVEL', payload: levelId });
  };

  const setExercise = (exerciseId: number) => {
    dispatch({ type: 'SET_EXERCISE', payload: exerciseId });
  };

  const setPlaying = (playing: boolean) => {
    dispatch({ type: 'SET_PLAYING', payload: playing });
  };

  const setGameMode = (mode: 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade') => {
    dispatch({ type: 'SET_GAME_MODE', payload: mode });
  };

  const completeExercise = async (score: number, time: number) => {
    dispatch({ type: 'COMPLETE_EXERCISE', payload: { score, time } });
    
    // Save progress to API
    try {
      await saveProgressMutation.mutateAsync({
        levelId: state.currentLevel,
        score,
        attempts: 1,
        completed: false,
        bestTime: time
      });
    } catch (error) {
      console.error('Failed to save exercise progress:', error);
    }
  };

  const completeLevel = async (levelId: number, score: number) => {
    dispatch({ type: 'COMPLETE_LEVEL', payload: { levelId, score } });
    
    // Save progress and update stats
    try {
      await saveProgressMutation.mutateAsync({
        levelId,
        score,
        attempts: 1,
        completed: true,
        bestTime: null
      });

      await updateStatsMutation.mutateAsync({
        completedLevels: [...state.gameStats.completedLevels, levelId],
        totalScore: state.gameStats.totalScore + score,
        streakCount: state.gameStats.streakCount + 1
      });
    } catch (error) {
      console.error('Failed to save level completion:', error);
    }
  };

  const addAchievement = async (achievement: string) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
    
    try {
      await updateStatsMutation.mutateAsync({
        achievements: [...state.gameStats.achievements, achievement]
      });
    } catch (error) {
      console.error('Failed to save achievement:', error);
    }
  };

  return {
    // State
    currentLevel: state.currentLevel,
    currentExercise: state.currentExercise,
    isPlaying: state.isPlaying,
    gameMode: state.gameMode,
    gameStats: state.gameStats,
    userProgress: state.userProgress,
    
    // Actions
    setLevel,
    setExercise,
    setPlaying,
    setGameMode,
    completeExercise,
    completeLevel,
    addAchievement,
    
    // Mutation states
    isSavingProgress: saveProgressMutation.isPending,
    isUpdatingStats: updateStatsMutation.isPending,
  };
}