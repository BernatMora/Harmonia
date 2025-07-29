import React, { useState, useEffect } from 'react';
import { Music, Trophy, BookOpen, Volume2, Settings } from 'lucide-react';
import GameHeader from './components/GameHeader';
import GameSelector from './components/GameSelector';
import LevelSelector from './components/LevelSelector';
import GameArea from './components/GameArea';
import SpeedGame from './components/games/SpeedGame';
import MemoryGame from './components/games/MemoryGame';
import TargetGame from './components/games/TargetGame';
import PuzzleGame from './components/games/PuzzleGame';
import ArcadeGame from './components/games/ArcadeGame';
import ProgressTracker from './components/ProgressTracker';
import { GameProvider, useGame } from './contexts/GameContext';
import './App.css';

function AppContent() {
  const { currentLevel, isPlaying, gameStats, gameMode } = useGame();

  const renderGameContent = () => {
    switch (gameMode) {
      case 'theory':
        return (
          <>
            <div className="lg:col-span-1 space-y-3 lg:space-y-4">
              <ProgressTracker />
              <LevelSelector />
            </div>
            <div className="lg:col-span-3 space-y-3 lg:space-y-4">
              <GameArea />
            </div>
          </>
        );
      case 'speed':
        return (
          <div className="lg:col-span-4">
            <SpeedGame />
          </div>
        );
      case 'memory':
        return (
          <div className="lg:col-span-4">
            <MemoryGame />
          </div>
        );
      case 'target':
        return (
          <div className="lg:col-span-4">
            <TargetGame />
          </div>
        );
      case 'puzzle':
        return (
          <div className="lg:col-span-4">
            <PuzzleGame />
          </div>
        );
      case 'arcade':
        return (
          <div className="lg:col-span-4">
            <ArcadeGame />
          </div>
        );
      default:
        return (
          <div className="lg:col-span-4">
            <GameSelector />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <GameHeader />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {gameMode === 'theory' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
            {renderGameContent()}
          </div>
        ) : (
          <>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                {renderGameContent()}
              </div>
            </div>
            
            {/* Back to Menu Button for Games */}
            <div className="text-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Tornar al Menú Principal
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;