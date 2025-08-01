import React from 'react';
import { Music, Trophy, Settings, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export default function GameHeader() {
  const { gameStats, currentLevel } = useGame();
  const [isMuted, setIsMuted] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Aquí es podria implementar la lògica real de so
    console.log(isMuted ? 'So activat' : 'So desactivat');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 relative">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">HarmoniaMaster</h1>
              <p className="text-xs sm:text-sm text-white/60 hidden sm:block">Teoria Musical Interactiva</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1 sm:gap-2 text-white/80">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-sm sm:text-base">{gameStats.totalScore}</span>
              <span className="text-xs sm:text-sm hidden sm:inline">punts</span>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs sm:text-sm">N{currentLevel}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${
                  isMuted ? 'text-red-400' : 'text-white/60 hover:text-white/80'
                }`}
                title={isMuted ? 'Activar so' : 'Desactivar so'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <button 
                onClick={toggleSettings}
                className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${
                  showSettings ? 'text-amber-400' : 'text-white/60 hover:text-white/80'
                }`}
                title="Configuració"
              >
                <Settings className="w-5 h-5 text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      {showSettings && (
        <div className="fixed top-16 right-2 sm:right-4 w-56 sm:w-64 bg-slate-900 backdrop-blur-sm border border-white/20 rounded-lg p-3 sm:p-4 shadow-2xl" style={{ zIndex: 99999 }}>
          <h3 className="text-white font-semibold mb-3">Configuració</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">So activat</span>
              <button
                onClick={toggleMute}
                className={`w-10 h-6 rounded-full transition-colors ${
                  isMuted ? 'bg-red-500' : 'bg-green-500'
                } relative`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                  isMuted ? 'translate-x-1' : 'translate-x-5'
                }`} />
              </button>
            </div>
            
            <div className="border-t border-white/10 pt-3">
              <span className="text-white/80 text-sm">Volum</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="70"
                className="w-full mt-2 accent-amber-500"
                disabled={isMuted}
              />
            </div>
            
            <div className="border-t border-white/10 pt-3">
              <button 
                onClick={() => {
                  if (confirm('Estàs segur que vols reiniciar tot el progrés?')) {
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                className="w-full py-2 px-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-sm transition-colors"
              >
                Reiniciar Progrés
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}