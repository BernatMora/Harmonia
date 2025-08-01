import React from 'react';
import { CheckCircle, Play } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { levels } from '../data/levels';

export default function LevelSelector() {
  const { currentLevel, gameStats, dispatch } = useGame();

  const handleLevelSelect = (levelId: number) => {
    dispatch({ type: 'SET_LEVEL', payload: levelId });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
      <h2 className="text-white font-semibold mb-4">Nivells</h2>
      
      <div className="space-y-2 sm:space-y-3">
        {levels.map((level) => {
          const isCompleted = gameStats.completedLevels.includes(level.id);
          const isUnlocked = true; // Tots els nivells desbloqueats per ús personal
          const isCurrent = currentLevel === level.id;
          
          return (
            <button
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              disabled={false}
              className={`w-full p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                isCurrent
                  ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/30'
                  : isCompleted
                  ? 'bg-green-500/10 border-green-400/30 hover:bg-green-500/20'
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-500'
                    : 'bg-amber-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  )}
                </div>
                
                <div className="text-left">
                  <div className="font-medium text-white text-sm sm:text-base">{level.title}</div>
                  <div className="text-xs sm:text-sm text-white/60 hidden sm:block">{level.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}