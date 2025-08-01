import { useState, useEffect } from "react";
import { Music, Trophy, BookOpen, Volume2, Target, Puzzle, ArrowLeft, Play, Award, Clock, Star } from "lucide-react";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

// Tipus de joc
type GameMode = 'home' | 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade';

// Dades dels jocs amb contingut complet
const gameTypes = [
  {
    id: 'theory',
    title: 'Teoria Musical',
    description: 'Aprèn els fonaments de la teoria musical amb exercicis interactius',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    gradient: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
    levels: ['Principiant', 'Intermedi', 'Avançat']
  },
  {
    id: 'speed',
    title: 'Joc de Velocitat',
    description: 'Respon ràpidament a preguntes musicals per millorar els teus reflexos',
    icon: Volume2,
    color: 'from-green-500 to-green-600',
    gradient: 'from-green-500/20 to-green-600/20',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-400',
    levels: ['Lent', 'Ràpid', 'Ultra-ràpid']
  },
  {
    id: 'memory',
    title: 'Joc de Memòria',
    description: 'Memoritza patrons i seqüències musicals per entrenar la teva ment',
    icon: Trophy,
    color: 'from-purple-500 to-purple-600',
    gradient: 'from-purple-500/20 to-purple-600/20',
    borderColor: 'border-purple-500/30',
    textColor: 'text-purple-400',
    levels: ['2 notes', '4 notes', '8 notes']
  },
  {
    id: 'target',
    title: 'Joc d\'Objectiu',
    description: 'Assoleix objectius musicals específics i supera reptes',
    icon: Target,
    color: 'from-orange-500 to-orange-600',
    gradient: 'from-orange-500/20 to-orange-600/20',
    borderColor: 'border-orange-500/30',
    textColor: 'text-orange-400',
    levels: ['Bronze', 'Plata', 'Or']
  },
  {
    id: 'puzzle',
    title: 'Trencaclosques Musical',
    description: 'Resol problemes musicals complexos i desenvolupa el pensament crític',
    icon: Puzzle,
    color: 'from-red-500 to-red-600',
    gradient: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-400',
    levels: ['Fàcil', 'Mitjà', 'Difícil']
  },
  {
    id: 'arcade',
    title: 'Arcade Musical',
    description: 'Jocs musicals d\'entreteniment, diversió i competició',
    icon: Music,
    color: 'from-pink-500 to-pink-600',
    gradient: 'from-pink-500/20 to-pink-600/20',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
    levels: ['Clàssic', 'Remix', 'Freestyle']
  }
];

// Preguntes i contingut per cada tipus de joc
const gameContent = {
  theory: {
    questions: [
      {
        question: "Quantes notes té l'escala major?",
        options: ["5", "7", "8", "12"],
        correct: 1,
        explanation: "L'escala major té 7 notes diferents més l'octava repetició."
      },
      {
        question: "Quin és l'interval entre Do i Sol?",
        options: ["Quarta", "Quinta", "Sexta", "Sèptima"],
        correct: 1,
        explanation: "Entre Do i Sol hi ha una quinta justa (7 semitons)."
      },
      {
        question: "Quantes línies té el pentagrama?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "El pentagrama té 5 línies horitzontals."
      }
    ]
  },
  speed: {
    questions: [
      {
        question: "Do# és igual a:",
        options: ["Reb", "Mib", "Fab", "Solb"],
        correct: 0,
        explanation: "Do# i Reb són enharmonies - la mateixa nota amb noms diferents.",
        timeLimit: 5
      },
      {
        question: "L'acord de Do major té les notes:",
        options: ["Do-Mi-Sol", "Do-Re-Mi", "Do-Fa-Sol", "Do-Mi-La"],
        correct: 0,
        explanation: "L'acord de Do major consta de Do, Mi i Sol.",
        timeLimit: 3
      }
    ]
  },
  memory: {
    patterns: [
      ["Do", "Re", "Mi"],
      ["Do", "Mi", "Sol", "Do"],
      ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"]
    ]
  },
  target: {
    challenges: [
      {
        goal: "Identifica 5 intervals majors consecutius",
        progress: 0,
        total: 5,
        reward: "Bronze en intervals"
      },
      {
        goal: "Completa 3 escales menors",
        progress: 0,
        total: 3,
        reward: "Plata en escales"
      }
    ]
  },
  puzzle: {
    puzzles: [
      {
        question: "Completa l'escala: Do, Re, __, Fa, Sol, __, Si, Do",
        blanks: [2, 5],
        options: ["Mi", "La", "Fa#", "Sib"],
        correct: [0, 1]
      }
    ]
  },
  arcade: {
    games: [
      {
        name: "Note Rain",
        description: "Atrapa les notes que cauen!"
      },
      {
        name: "Chord Hero",
        description: "Toca els acords al ritme!"
      }
    ]
  }
};

// Component principal d'un joc específic
function GameComponent({ mode, onBack }: { mode: GameMode; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const game = gameTypes.find(g => g.id === mode);
  const content = gameContent[mode as keyof typeof gameContent];

  // Timer per jocs de velocitat
  useEffect(() => {
    if (mode === 'speed' && timeLeft !== null && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (mode === 'speed' && timeLeft === 0) {
      handleAnswer(-1); // Temps esgotat
    }
  }, [timeLeft, mode]);

  const handleAnswer = (answerIndex: number) => {
    if (mode === 'theory' || mode === 'speed') {
      const questions = content.questions;
      if (questions && questions[currentQuestion]) {
        const isCorrect = answerIndex === questions[currentQuestion].correct;
        if (isCorrect) setScore(score + 1);
        
        setSelectedAnswer(answerIndex);
        setShowResult(true);
        
        setTimeout(() => {
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            if (mode === 'speed') {
              setTimeLeft(questions[currentQuestion + 1]?.timeLimit || 5);
            }
          } else {
            // Fi del joc
          }
        }, 2000);
      }
    }
  };

  const startGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    if (mode === 'speed') {
      const questions = content.questions;
      setTimeLeft(questions?.[0]?.timeLimit || 5);
    }
  };

  if (mode === 'theory' || mode === 'speed') {
    const questions = content.questions;
    if (!questions || questions.length === 0) {
      return (
        <div className="text-center text-white">
          <h3 className="text-xl mb-4">Contingut no disponible</h3>
          <button onClick={onBack} className="bg-blue-600 text-white px-6 py-2 rounded">
            Tornar
          </button>
        </div>
      );
    }

    const question = questions[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Header del joc */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <span className="text-lg">Pregunta {currentQuestion + 1} de {questions.length}</span>
            <div className="text-sm text-gray-400">Puntuació: {score}</div>
          </div>
          {mode === 'speed' && timeLeft !== null && (
            <div className={`text-2xl font-bold ${timeLeft <= 2 ? 'text-red-400' : 'text-blue-400'}`}>
              <Clock className="inline h-6 w-6 mr-2" />
              {timeLeft}s
            </div>
          )}
        </div>

        {/* Pregunta */}
        <div className="bg-slate-800/80 rounded-lg p-8 mb-6 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {question.question}
          </h3>
          
          {/* Opcions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all text-lg font-semibold ${
                  showResult
                    ? index === question.correct
                      ? 'bg-green-600 border-green-500 text-white'
                      : index === selectedAnswer
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-gray-300'
                    : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Explicació */}
          {showResult && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Explicació:</h4>
              <p className="text-gray-300">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Botons d'acció */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Tornar al menú
          </button>
          <button
            onClick={startGame}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Play className="inline h-5 w-5 mr-2" />
            Reiniciar
          </button>
        </div>
      </div>
    );
  }

  // Altres tipus de jocs - implementació base
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className={`w-24 h-24 bg-gradient-to-r ${game?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
        {game?.icon && <game.icon className="h-12 w-12 text-white" />}
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">
        {game?.title}
      </h2>
      <p className="text-gray-300 mb-8">
        {game?.description}
      </p>
      <p className="text-gray-400 mb-6">
        Aquest joc està en desenvolupament. Aviat tindrà contingut complet!
      </p>
      <button
        onClick={onBack}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Tornar al menú
      </button>
    </div>
  );
}

function AppContent() {
  const [currentMode, setCurrentMode] = useState<GameMode>('home');
  const [userStats, setUserStats] = useState({
    gamesPlayed: 0,
    bestScore: 0,
    totalScore: 0,
    level: 1
  });

  // Consultes a l'API
  const { data: levels } = useQuery({
    queryKey: ['/api/levels'],
    enabled: false // Només carregar quan sigui necessari
  });

  const { data: progress } = useQuery({
    queryKey: ['/api/progress'],
    enabled: false
  });

  console.log('Current mode:', currentMode);

  const handleNavigate = (mode: GameMode) => {
    console.log('Navigating to:', mode);
    setCurrentMode(mode);
    
    // Actualitzar estadístiques
    if (mode !== 'home') {
      setUserStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1
      }));
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 p-4 sm:p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
      }}></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header principal */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-6 flex-col sm:flex-row">
            <div className="relative mb-4 sm:mb-0 sm:mr-4">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse"></div>
              <Music className="relative h-12 w-12 sm:h-16 sm:w-16 text-blue-400 animate-bounce" style={{animationDuration: '3s'}} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Teoria Musical
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto sm:mx-0"></div>
            </div>
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            🎵 Descobreix el món de la música amb els nostres jocs i exercicis interactius 🎵
            <br />
            <span className="text-base sm:text-lg text-gray-400 mt-2 block">
              Des de conceptes bàsics fins a temes avançats
            </span>
          </p>
        </div>

        {/* Estadístiques de l'usuari */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-xl border border-blue-500/20 backdrop-blur-sm text-center">
              <div className="text-2xl font-bold text-blue-400">{userStats.gamesPlayed}</div>
              <div className="text-sm text-gray-300">Jocs Jugats</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-xl border border-purple-500/20 backdrop-blur-sm text-center">
              <div className="text-2xl font-bold text-purple-400">{userStats.bestScore}</div>
              <div className="text-sm text-gray-300">Millor Puntuació</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-xl border border-green-500/20 backdrop-blur-sm text-center">
              <div className="text-2xl font-bold text-green-400">{userStats.totalScore}</div>
              <div className="text-sm text-gray-300">Punts Totals</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 p-4 rounded-xl border border-orange-500/20 backdrop-blur-sm text-center">
              <div className="text-2xl font-bold text-orange-400">
                <Star className="inline h-6 w-6 mr-1" />
                {userStats.level}
              </div>
              <div className="text-sm text-gray-300">Nivell</div>
            </div>
          </div>
        </div>

        {/* Grid de jocs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {gameTypes.map((game, index) => {
            const IconComponent = game.icon;
            
            return (
              <div
                key={game.id}
                onClick={() => handleNavigate(game.id as GameMode)}
                className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:border-slate-600 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm"

              >
                {/* Efecte de brillantor */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                {/* Contingut */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white filter drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors duration-300">
                    {game.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {game.description}
                  </p>
                  
                  {/* Nivells disponibles */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {game.levels.map((level, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${game.gradient} ${game.textColor} border ${game.borderColor} backdrop-blur-sm`}
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                  
                  {/* Botó d'inici */}
                  <div className={`w-full bg-gradient-to-r ${game.gradient} hover:from-blue-500/30 hover:to-purple-500/30 text-white border ${game.borderColor} hover:border-blue-400/50 rounded-lg px-4 py-3 text-center font-semibold shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden`}>
                    <span className="relative z-10 flex items-center justify-center">
                      <Play className="h-4 w-4 mr-2" />
                      Començar
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secció d'informació */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm text-center">
            <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
            <div className="text-gray-300 font-semibold">Modes de Joc</div>
            <div className="text-xs text-gray-500 mt-1">Diferents estils d'aprenentatge</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm text-center">
            <BookOpen className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
            <div className="text-gray-300 font-semibold">Exercicis</div>
            <div className="text-xs text-gray-500 mt-1">Pràctica il·limitada</div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-6 rounded-2xl border border-pink-500/20 backdrop-blur-sm text-center">
            <Target className="h-12 w-12 text-pink-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-pink-400 mb-2">11</div>
            <div className="text-gray-300 font-semibold">Nivells</div>
            <div className="text-xs text-gray-500 mt-1">De principiant a expert</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 px-4">
          <div className="max-w-md mx-auto">
            <p className="text-lg font-medium text-white mb-2">
              🎼 Comença ara la teva aventura musical! 🎼
            </p>
            <p className="text-sm text-gray-400">
              Selecciona un mode de joc per començar el teu viatge d'aprenentatge
            </p>
          </div>
        </div>
      </div>
      

    </div>
  );

  const renderGame = (mode: GameMode) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header amb navegació */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 hover:border-slate-600 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Tornar al menú
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl font-bold text-white">
                {gameTypes.find(g => g.id === mode)?.title}
              </h1>
            </div>
            
            <div className="w-32"></div> {/* Spacer per centrar el títol */}
          </div>

          {/* Contingut del joc */}
          <div className="bg-slate-800/50 rounded-xl p-6 sm:p-8 border border-slate-700 backdrop-blur-sm">
            <GameComponent mode={mode} onBack={() => handleNavigate('home')} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentMode === 'home' ? renderHome() : renderGame(currentMode)}
    </div>
  );
}

// Component principal amb QueryClient
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
      }));
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Music className="h-16 w-16 text-blue-400 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Teoria Musical
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descobreix el món de la música amb els nostres jocs i exercicis interactius
          </p>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameTypes.map((game) => {
            const IconComponent = game.icon;
            return (
              <div
                key={game.id}
                onClick={() => handleNavigate(game.id as GameMode)}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white px-4 py-2 rounded text-center font-semibold">
                  Començar
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderGame = (mode: GameMode) => {
    const game = gameTypes.find(g => g.id === mode);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header amb botó de tornada */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6 mr-2" />
              Tornar
            </button>
            <h1 className="text-4xl font-bold text-white">{game?.title}</h1>
          </div>

          {/* Contingut del joc */}
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <div className="text-center">
              <div className={`w-24 h-24 bg-gradient-to-r ${game?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {game?.icon && <game.icon className="h-12 w-12 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Mode: {game?.title}
              </h2>
              <p className="text-gray-300 mb-8">
                {game?.description}
              </p>
              
              {/* Exemple de contingut del joc */}
              <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Exercici d'exemple
                </h3>
                <p className="text-gray-300 mb-4">
                  Això és un exemple de com funcionaria el joc {game?.title.toLowerCase()}.
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors">
                    Opció A
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition-colors">
                    Opció B
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded transition-colors">
                    Opció C
                  </button>
                </div>
              </div>
              
              <button 
                onClick={() => handleNavigate('home')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Tornar al menú principal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentMode === 'home' ? renderHome() : renderGame(currentMode)}
    </div>
  );
}

export default App;