import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import SpeedGame from "@/components/games/SpeedGame";
import MemoryGame from "@/components/games/MemoryGame";
import TargetGame from "@/components/games/TargetGame";
import PuzzleGame from "@/components/games/PuzzleGame";
import ArcadeGame from "@/components/games/ArcadeGame";

export default function GamePage() {
  const { gameMode } = useParams<{ gameMode: string }>();
  const { setGameMode } = useGame();

  // Set the game mode in context
  if (gameMode && ['speed', 'memory', 'target', 'puzzle', 'arcade'].includes(gameMode)) {
    setGameMode(gameMode as any);
  }

  const renderGame = () => {
    switch (gameMode) {
      case 'speed':
        return <SpeedGame />;
      case 'memory':
        return <MemoryGame />;
      case 'target':
        return <TargetGame />;
      case 'puzzle':
        return <PuzzleGame />;
      case 'arcade':
        return <ArcadeGame />;
      default:
        return (
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Mode de joc no trobat</h2>
            <Link href="/">
              <Button>Tornar al menú principal</Button>
            </Link>
          </div>
        );
    }
  };

  const getGameTitle = () => {
    switch (gameMode) {
      case 'speed': return 'Joc de Velocitat';
      case 'memory': return 'Joc de Memòria';
      case 'target': return 'Joc d\'Objectiu';
      case 'puzzle': return 'Trencaclosques Musical';
      case 'arcade': return 'Arcade Musical';
      default: return 'Joc Musical';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 mobile-safe">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-8 flex-wrap gap-2">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 mr-2 sm:mr-4 mobile-button">
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Tornar</span>
              <span className="sm:hidden">←</span>
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{getGameTitle()}</h1>
        </div>
      </div>

      {/* Game Content */}
      <div className="max-w-4xl mx-auto">
        {renderGame()}
      </div>
    </div>
  );
}