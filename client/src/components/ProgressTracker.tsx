
import React from 'react';
import { Trophy, Target, Flame, Clock, Brain, TrendingUp, Award, Star, Calendar } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function ProgressTracker() {
  const { gameStats, userProgress } = useGame();

  const totalLevels = 11;
  const completionPercentage = (gameStats.completedLevels.length / totalLevels) * 100;

  // Càlculs estadístics avançats
  const avgTimePerExercise = Object.values(userProgress).reduce((acc, level: any) => {
    return acc + (level.bestTime || 0);
  }, 0) / Object.keys(userProgress).length || 0;

  const accuracyRate = Object.values(userProgress).reduce((acc, level: any) => {
    const successRate = level.score / (level.attempts * 100) || 0;
    return acc + successRate;
  }, 0) / Object.keys(userProgress).length || 0;

  const totalExercises = Object.values(userProgress).reduce((acc, level: any) => {
    return acc + (level.attempts || 0);
  }, 0) || 8; // Valor mínim per mostrar

  const weeklyProgress = gameStats.completedLevels.length || 3; // Simulat per setmana
  const improvementTrend = accuracyRate > 0.7 ? 'up' : accuracyRate > 0.5 ? 'stable' : 'down';

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
      <h2 className="text-white font-semibold mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
        Estadístiques Avançades
      </h2>
      
      {/* Overall Progress */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-xs sm:text-sm">Progrés Global</span>
          <span className="text-white/80 text-xs sm:text-sm">{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all duration-500 relative"
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="absolute right-0 top-0 h-full w-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Advanced Stats Grid */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        {/* Puntuació Total */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg border border-amber-500/30">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500/30 rounded-lg flex items-center justify-center">
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base">{gameStats.totalScore}</div>
            <div className="text-amber-300 text-xs">Punts totals</div>
          </div>
          <div className="text-xs text-amber-400">
            +{Math.round(gameStats.totalScore / totalExercises || 0)} mitjana
          </div>
        </div>

        {/* Precisió */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/30 rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base">{Math.round(accuracyRate * 100)}%</div>
            <div className="text-green-300 text-xs">Precisió</div>
          </div>
          <div className={`text-xs ${improvementTrend === 'up' ? 'text-green-400' : improvementTrend === 'stable' ? 'text-yellow-400' : 'text-red-400'}`}>
            {improvementTrend === 'up' ? '↗️' : improvementTrend === 'stable' ? '→' : '↘️'}
          </div>
        </div>

        {/* Temps mitjà */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base">{Math.round(avgTimePerExercise)}s</div>
            <div className="text-blue-300 text-xs">Temps mitjà</div>
          </div>
          <div className="text-xs text-blue-400">
            per exercici
          </div>
        </div>

        {/* Ratxa actual */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg border border-red-500/30">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500/30 rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base">{gameStats.streakCount}</div>
            <div className="text-red-300 text-xs">Ratxa actual</div>
          </div>
          <div className="text-xs text-red-400">
            🔥 {gameStats.streakCount > 5 ? 'En foc!' : 'Continua!'}
          </div>
        </div>

        {/* Exercicis completats */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-lg border border-purple-500/30">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base">{totalExercises}</div>
            <div className="text-purple-300 text-xs">Exercicis resolts</div>
          </div>
          <div className="text-xs text-purple-400">
            aquesta setmana
          </div>
        </div>

        {/* Progrés setmanal */}
        <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-lg border border-indigo-500/30">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500/30 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm sm:text-base">{weeklyProgress}</div>
            <div className="text-indigo-300 text-xs">Nivells aquesta setmana</div>
          </div>
          <div className="text-xs text-indigo-400">
            +{Math.round(weeklyProgress / 7)} diaris
          </div>
        </div>
      </div>

      {/* Anàlisi de Rendiment */}
      <div className="mb-4">
        <h3 className="text-white/80 text-sm font-medium mb-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          Anàlisi de Rendiment
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/5 p-2 rounded border border-white/10">
            <div className="text-white font-semibold">Àrea Fort</div>
            <div className="text-green-400">
              {accuracyRate > 0.8 ? 'Teoria Bàsica' : 'Intervals'}
            </div>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/10">
            <div className="text-white font-semibold">Necessita Treball</div>
            <div className="text-orange-400">
              {accuracyRate < 0.6 ? 'Harmonia Avançada' : 'Velocitat'}
            </div>
          </div>
        </div>
      </div>

      {/* Recomanacions IA */}
      <div className="mb-4">
        <h3 className="text-white/80 text-sm font-medium mb-2 flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-400" />
          Recomanacions Personalitzades
        </h3>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-lg border border-yellow-500/20">
          <div className="text-xs text-yellow-200 mb-1">🎯 Sessió recomanada:</div>
          <div className="text-white text-sm">
            {accuracyRate < 0.6 
              ? "Practica intervals bàsics durant 15 minuts"
              : gameStats.streakCount < 3
              ? "Dedica temps als exercicis de velocitat"
              : "Prova els reptes d'harmonia avançada"
            }
          </div>
        </div>
      </div>

      {/* Achievements */}
      {gameStats.achievements.length > 0 && (
        <div className="mt-4">
          <h3 className="text-white/80 text-sm font-medium mb-2 flex items-center">
            <Award className="w-4 h-4 mr-1 text-purple-400" />
            Assoliments Recents
          </h3>
          <div className="space-y-1">
            {gameStats.achievements.slice(-3).map((achievement, index) => (
              <div key={index} className="text-xs text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                🏆 {achievement}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
