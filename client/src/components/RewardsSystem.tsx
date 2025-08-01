
import React, { useState, useEffect } from 'react';
import { Trophy, Star, Medal, Gift, Crown, Zap, Target, Flame } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  condition: (stats: any) => boolean;
  points: number;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  target: number;
  current: number;
  reward: number;
  type: 'daily' | 'weekly' | 'special';
  icon: React.ComponentType<any>;
}

const badges: Badge[] = [
  {
    id: 'first_steps',
    name: 'Primers Passos',
    description: 'Completa el teu primer exercici',
    icon: Star,
    color: 'text-yellow-400',
    condition: (stats) => stats.totalScore > 0,
    points: 10
  },
  {
    id: 'speed_demon',
    name: 'Dimoni de Velocitat',
    description: 'Completa 10 exercicis en menys de 30 segons',
    icon: Zap,
    color: 'text-blue-400',
    condition: (stats) => stats.fastCompletions >= 10,
    points: 50
  },
  {
    id: 'perfectionist',
    name: 'Perfeccionista',
    description: 'Aconsegueix 100% de precisió en 5 nivells',
    icon: Target,
    color: 'text-green-400',
    condition: (stats) => stats.perfectScores >= 5,
    points: 75
  },
  {
    id: 'fire_streak',
    name: 'Ratxa de Foc',
    description: 'Mantingues una ratxa de 15 exercicis correctes',
    icon: Flame,
    color: 'text-red-400',
    condition: (stats) => stats.streakCount >= 15,
    points: 100
  },
  {
    id: 'theory_master',
    name: 'Mestre de Teoria',
    description: 'Completa tots els nivells de teoria',
    icon: Crown,
    color: 'text-purple-400',
    condition: (stats) => stats.completedLevels.length >= 11,
    points: 200
  }
];

const dailyChallenges: Challenge[] = [
  {
    id: 'daily_practice',
    name: 'Pràctica Diària',
    description: 'Completa 5 exercicis avui',
    target: 5,
    current: 0,
    reward: 25,
    type: 'daily',
    icon: Target
  },
  {
    id: 'speed_challenge',
    name: 'Repte de Velocitat',
    description: 'Completa 3 exercicis en menys de 20 segons',
    target: 3,
    current: 0,
    reward: 40,
    type: 'daily',
    icon: Zap
  },
  {
    id: 'streak_builder',
    name: 'Constructor de Ratxes',
    description: 'Aconsegueix una ratxa de 7 exercicis correctes',
    target: 7,
    current: 0,
    reward: 35,
    type: 'daily',
    icon: Flame
  }
];

export default function RewardsSystem() {
  const { gameStats, userProgress } = useGame();
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [currentChallenges, setCurrentChallenges] = useState<Challenge[]>(dailyChallenges);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const [newReward, setNewReward] = useState<Badge | null>(null);

  // Calcular XP i nivell
  const totalXP = gameStats.totalScore + (unlockedBadges.length * 50);
  const currentLevel = Math.floor(totalXP / 100) + 1;
  const xpToNextLevel = 100 - (totalXP % 100);

  // Comprovar nous badges
  useEffect(() => {
    badges.forEach(badge => {
      if (!unlockedBadges.includes(badge.id) && badge.condition(gameStats)) {
        setUnlockedBadges(prev => [...prev, badge.id]);
        setNewReward(badge);
        setShowRewardAnimation(true);
        setTimeout(() => setShowRewardAnimation(false), 3000);
      }
    });
  }, [gameStats, unlockedBadges]);

  const getLeaderboardPosition = () => {
    // Simulat - en un app real seria des del servidor
    return Math.floor(Math.random() * 100) + 1;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      {/* Animació de nova recompensa */}
      {showRewardAnimation && newReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30 text-center animate-pulse">
            <newReward.icon className={`w-16 h-16 mx-auto mb-4 ${newReward.color}`} />
            <h3 className="text-xl font-bold text-white mb-2">Nou Badge Desbloquejat!</h3>
            <p className="text-yellow-400 font-semibold">{newReward.name}</p>
            <p className="text-white/80 text-sm">{newReward.description}</p>
            <div className="text-green-400 font-bold mt-2">+{newReward.points} XP</div>
          </div>
        </div>
      )}

      <h2 className="text-white font-semibold mb-4 flex items-center">
        <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
        Sistema de Recompenses
      </h2>

      {/* Nivell i XP */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-400" />
            <span className="text-white font-semibold">Nivell {currentLevel}</span>
          </div>
          <span className="text-purple-400 text-sm">{totalXP} XP total</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 mb-1">
          <div 
            className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((100 - xpToNextLevel) / 100) * 100}%` }}
          />
        </div>
        <div className="text-xs text-white/60 text-center">
          {xpToNextLevel} XP fins al següent nivell
        </div>
      </div>

      {/* Reptes diaris */}
      <div className="mb-6">
        <h3 className="text-white/80 text-sm font-medium mb-3 flex items-center">
          <Zap className="w-4 h-4 mr-1 text-blue-400" />
          Reptes Diaris
        </h3>
        <div className="space-y-2">
          {currentChallenges.map(challenge => (
            <div key={challenge.id} className="bg-white/5 p-3 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <challenge.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-sm font-medium">{challenge.name}</span>
                </div>
                <span className="text-green-400 text-xs">+{challenge.reward} XP</span>
              </div>
              <p className="text-white/70 text-xs mb-2">{challenge.description}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/60">{challenge.current}/{challenge.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <h3 className="text-white/80 text-sm font-medium mb-3 flex items-center">
          <Medal className="w-4 h-4 mr-1 text-yellow-400" />
          Badges ({unlockedBadges.length}/{badges.length})
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {badges.map(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                className={`p-2 rounded-lg border text-center transition-all ${
                  isUnlocked 
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30' 
                    : 'bg-white/5 border-white/10 opacity-50'
                }`}
              >
                <badge.icon className={`w-6 h-6 mx-auto mb-1 ${isUnlocked ? badge.color : 'text-gray-500'}`} />
                <div className="text-white text-xs font-medium">{badge.name}</div>
                <div className="text-white/60 text-xs">{badge.description}</div>
                {isUnlocked && (
                  <div className="text-green-400 text-xs font-bold mt-1">+{badge.points} XP</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Classificació */}
      <div>
        <h3 className="text-white/80 text-sm font-medium mb-3 flex items-center">
          <Trophy className="w-4 h-4 mr-1 text-yellow-400" />
          Classificació
        </h3>
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 rounded-lg border border-yellow-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Posició #{getLeaderboardPosition()}</div>
              <div className="text-yellow-400 text-xs">Classificació global</div>
            </div>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="mt-2 text-xs text-white/70">
            Continua practicant per pujar posicions!
          </div>
        </div>
      </div>
    </div>
  );
}
