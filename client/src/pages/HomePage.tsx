import { Link, useLocation } from "wouter";
import { Music, Trophy, BookOpen, Volume2, Target, Puzzle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const gameTypes = [
  {
    id: 'theory',
    title: 'Teoria Musical',
    description: 'Aprèn els fonaments de la teoria musical amb exercicis interactius',
    icon: BookOpen,
    color: 'bg-blue-500/20 text-blue-400',
    path: '/theory'
  },
  {
    id: 'speed',
    title: 'Velocitat',
    description: 'Millora la teva velocitat de reconeixement musical',
    icon: Volume2,
    color: 'bg-green-500/20 text-green-400',
    path: '/game/speed'
  },
  {
    id: 'memory',
    title: 'Memòria',
    description: 'Exercita la memòria musical amb patrons i seqüències',
    icon: Trophy,
    color: 'bg-purple-500/20 text-purple-400',
    path: '/game/memory'
  },
  {
    id: 'target',
    title: 'Objectiu',
    description: 'Desafia\'t amb objectius musicals específics',
    icon: Target,
    color: 'bg-orange-500/20 text-orange-400',
    path: '/game/target'
  },
  {
    id: 'puzzle',
    title: 'Trencaclosques',
    description: 'Resol problemes musicals complexos',
    icon: Puzzle,
    color: 'bg-red-500/20 text-red-400',
    path: '/game/puzzle'
  },
  {
    id: 'arcade',
    title: 'Arcade',
    description: 'Jocs musicals d\'entreteniment i diversió',
    icon: Music,
    color: 'bg-pink-500/20 text-pink-400',
    path: '/game/arcade'
  }
];

export default function HomePage() {
  const [, setLocation] = useLocation();

  const handleCardClick = (path: string) => {
    console.log('Navigating to:', path);
    setLocation(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mobile-safe">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center mb-6 flex-col sm:flex-row">
            <div className="relative mb-4 sm:mb-0 sm:mr-4">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse"></div>
              <Music className="relative h-12 w-12 sm:h-16 sm:w-16 text-blue-400 animate-bounce" style={{animationDuration: '3s'}} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Teoria Musical
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto sm:mx-0"></div>
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
            🎵 Descobreix el món de la música amb els nostres jocs i exercicis interactius 🎵
            <br />
            <span className="text-base sm:text-lg text-gray-400 mt-2 block">
              Des de conceptes bàsics fins a temes avançats
            </span>
          </p>
        </div>

        {/* Game Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {gameTypes.map((game, index) => {
            const IconComponent = game.icon;
            
            return (
              <div 
                key={game.id} 
                onClick={() => handleCardClick(game.path)} 
                className="touch-manipulation group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <Card className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-500/10 active:scale-95 transition-all duration-300 cursor-pointer h-full backdrop-blur-sm overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardHeader className="pb-3 sm:pb-4 relative z-10">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${game.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 filter drop-shadow-sm" />
                    </div>
                    <CardTitle className="text-white text-xl sm:text-2xl font-bold group-hover:text-blue-300 transition-colors duration-300">
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(game.path);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 active:from-blue-500/40 active:to-purple-500/40 text-white border border-blue-500/30 hover:border-blue-400/50 mobile-button text-sm sm:text-base font-semibold shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                      variant="outline"
                    >
                      <span className="relative z-10">Començar</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded"></div>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">6</div>
              <div className="text-gray-300 text-sm sm:text-base">Modes de Joc</div>
              <div className="text-xs text-gray-500 mt-1">Diferents estils d'aprenentatge</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">11</div>
              <div className="text-gray-300 text-sm sm:text-base">Nivells</div>
              <div className="text-xs text-gray-500 mt-1">De principiant a expert</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-sm">
              <div className="text-3xl sm:text-4xl font-bold text-pink-400 mb-2">∞</div>
              <div className="text-gray-300 text-sm sm:text-base">Exercicis</div>
              <div className="text-xs text-gray-500 mt-1">Pràctica il·limitada</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-20 text-gray-400 px-4">
          <div className="max-w-md mx-auto">
            <p className="text-lg sm:text-xl font-medium text-white mb-2">
              🎼 Comença ara la teva aventura musical! 🎼
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Selecciona un mode de joc per començar el teu viatge d'aprenentatge
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}