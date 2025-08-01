import { Link } from "wouter";
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
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Music className="h-12 w-12 text-blue-400 mr-3" />
          <h1 className="text-4xl font-bold text-white">Teoria Musical</h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Descobreix el món de la música amb els nostres jocs i exercicis interactius. 
          Des de conceptes bàsics fins a temes avançats.
        </p>
      </div>

      {/* Game Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {gameTypes.map((game) => {
          const IconComponent = game.icon;
          
          return (
            <Link key={game.id} href={game.path}>
              <div className="block w-full h-full">
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer group h-full">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg ${game.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-white text-xl">{game.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full bg-white/10 hover:bg-white/20 text-white border-0 rounded-md py-2 px-4 text-center transition-colors">
                      Començar
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 text-gray-400">
        <p>Selecciona un mode de joc per començar el teu viatge musical</p>
      </div>
    </div>
  );
}