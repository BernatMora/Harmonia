import React from 'react';
import { Music, Gamepad2, Brain, Zap, Target, Puzzle } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function GameSelector() {
  const { dispatch } = useGame();

  const games = [
    {
      id: 'theory',
      title: 'Teoria Musical',
      description: 'Aprèn conceptes fonamentals',
      icon: <Music className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      onClick: () => dispatch({ type: 'SET_GAME_MODE', payload: 'theory' })
    },
    {
      id: 'speed',
      title: 'Velocitat Musical',
      description: 'Respon ràpid intervals i acords',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      onClick: () => dispatch({ type: 'SET_GAME_MODE', payload: 'speed' })
    },
    {
      id: 'memory',
      title: 'Memòria Harmònica',
      description: 'Recorda seqüències d\'acords',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      onClick: () => dispatch({ type: 'SET_GAME_MODE', payload: 'memory' })
    },
    {
      id: 'target',
      title: 'Diana Musical',
      description: 'Encerta la nota correcta',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      onClick: () => dispatch({ type: 'SET_GAME_MODE', payload: 'target' })
    },
    {
      id: 'puzzle',
      title: 'Trencaclosques Tonal',
      description: 'Construeix progressions',
      icon: <Puzzle className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      onClick: () => dispatch({ type: 'SET_GAME_MODE', payload: 'puzzle' })
    },
    {
      id: 'arcade',
      title: 'Mode Arcade',
      description: 'Supervivència musical!',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      onClick: () => dispatch({ type: 'SET_GAME_MODE', payload: 'arcade' })
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Selecciona el teu Joc</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={game.onClick}
            className="group relative overflow-hidden rounded-xl p-6 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
            
            <div className="relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                {game.icon}
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{game.title}</h3>
              <p className="text-white/70 text-sm">{game.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}