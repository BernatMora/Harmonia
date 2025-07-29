import React from 'react';
import { Trophy, Target, Flame } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function ProgressTracker() {
  const { gameStats, userProgress } = useGame();

  const totalLevels = 10;
  const completionPercentage = (gameStats.completedLevels.length / totalLevels) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
      <h2 className="text-white font-semibold mb-4">El teu Progrés</h2>
      
      {/* Overall Progress */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-xs sm:text-sm">Progrés Global</span>
          <span className="text-white/80 text-xs sm:text-sm">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm sm:text-base">{gameStats.totalScore}</div>
            <div className="text-white/60 text-xs">Punts</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm sm:text-base">{gameStats.completedLevels.length}</div>
            <div className="text-white/60 text-xs">Nivells</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded-lg">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm sm:text-base">{gameStats.streakCount}</div>
            <div className="text-white/60 text-xs">Ratxa</div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      {gameStats.achievements.length > 0 && (
        <div className="mt-4">
          <h3 className="text-white/80 text-sm font-medium mb-2">Assoliments</h3>
          <div className="space-y-1">
            {gameStats.achievements.map((achievement, index) => (
              <div key={index} className="text-xs text-amber-300 bg-amber-500/10 px-2 py-1 rounded">
                🏆 {achievement}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}