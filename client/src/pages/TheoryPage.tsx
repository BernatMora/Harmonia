import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useGame } from "@/contexts/GameContext";
import type { Level } from "@shared/schema";

export default function TheoryPage() {
  const { currentLevel, setLevel, gameStats } = useGame();
  
  const { data: levels, isLoading } = useQuery<Level[]>({
    queryKey: ['/api/levels'],
  });

  const { data: userProgress } = useQuery({
    queryKey: ['/api/progress'],
  });

  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-white text-lg">Carregant nivells...</div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-orange-500/20 text-orange-400';
      case 'expert': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Principiant';
      case 'intermediate': return 'Intermedi';
      case 'advanced': return 'Avançat';
      case 'expert': return 'Expert';
      default: return difficulty;
    }
  };

  const isLevelCompleted = (levelId: number) => {
    return stats?.completedLevels?.includes(levelId.toString()) || false;
  };

  const getLevelProgress = (levelId: number) => {
    const progress = userProgress?.find((p: any) => p.levelId === levelId);
    return progress?.score || 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tornar
            </Button>
          </Link>
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-white">Teoria Musical</h1>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-white font-semibold">Puntuació Total</div>
          <div className="text-2xl font-bold text-blue-400">{stats?.totalScore || 0}</div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-slate-800/50 border-slate-700 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
            Progrés General
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats?.completedLevels?.length || 0}</div>
              <div className="text-gray-400">Nivells Completats</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats?.streakCount || 0}</div>
              <div className="text-gray-400">Ratxa Actual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats?.achievements?.length || 0}</div>
              <div className="text-gray-400">Assoliments</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels?.map((level) => {
          const completed = isLevelCompleted(level.id);
          const progress = getLevelProgress(level.id);
          const progressPercentage = level.requiredScore > 0 ? (progress / level.requiredScore) * 100 : 0;
          
          return (
            <Card 
              key={level.id} 
              className={`bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 cursor-pointer ${
                level.id === currentLevel ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => setLevel(level.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getDifficultyColor(level.difficulty)}>
                    {getDifficultyText(level.difficulty)}
                  </Badge>
                  {completed && (
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
                <CardTitle className="text-white text-lg">{level.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {level.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Concepts */}
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Conceptes:</div>
                    <div className="flex flex-wrap gap-1">
                      {level.concepts.slice(0, 3).map((concept, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-slate-600 text-gray-300">
                          {concept}
                        </Badge>
                      ))}
                      {level.concepts.length > 3 && (
                        <Badge variant="outline" className="text-xs border-slate-600 text-gray-400">
                          +{level.concepts.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progrés</span>
                      <span>{progress}/{level.requiredScore}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Exercises Count */}
                  <div className="text-sm text-gray-400">
                    {level.exercises.length} exercicis disponibles
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}