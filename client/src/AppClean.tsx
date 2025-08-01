import { useState, useEffect } from "react";
import { Music, Trophy, BookOpen, Volume2, Target, Puzzle, ArrowLeft, Play, Clock, CheckCircle, XCircle } from "lucide-react";

type GameMode = 'home' | 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade';

// Contingut educatiu real per cada joc
const gameContent = {
  theory: [
    {
      question: "Quantes notes té l'escala major?",
      options: ["5", "7", "8", "12"],
      correct: 1,
      explanation: "L'escala major té 7 notes diferents més l'octava repetició.",
      level: "Principiant"
    },
    {
      question: "Quin és l'interval entre Do i Sol?",
      options: ["Quarta", "Quinta", "Sexta", "Sèptima"],
      correct: 1,
      explanation: "Entre Do i Sol hi ha una quinta justa (7 semitons).",
      level: "Principiant"
    },
    {
      question: "Quantes línies té el pentagrama?",
      options: ["4", "5", "6", "7"],
      correct: 1,
      explanation: "El pentagrama té 5 línies horitzontals.",
      level: "Principiant"
    },
    {
      question: "L'acord de Do major consta de:",
      options: ["Do-Mi-Sol", "Do-Re-Mi", "Do-Fa-Sol", "Do-Mi-La"],
      correct: 0,
      explanation: "L'acord de Do major consta de Do, Mi i Sol.",
      level: "Principiant"
    },
    {
      question: "Quin és el relatiu menor de Do major?",
      options: ["Re menor", "La menor", "Mi menor", "Sol menor"],
      correct: 1,
      explanation: "La menor és el relatiu menor de Do major (mateix armadura).",
      level: "Intermedi"
    },
    {
      question: "Una escala cromàtica té:",
      options: ["7 notes", "12 notes", "8 notes", "24 notes"],
      correct: 1,
      explanation: "L'escala cromàtica conté les 12 notes possibles dins d'una octava.",
      level: "Intermedi"
    },
    {
      question: "L'interval de tritó té:",
      options: ["5 semitons", "6 semitons", "7 semitons", "8 semitons"],
      correct: 1,
      explanation: "El tritó (quarta augmentada o quinta disminuïda) té 6 semitons.",
      level: "Intermedi"
    },
    {
      question: "En una cadència V-I, l'acord V és:",
      options: ["Subdominant", "Dominant", "Tònic", "Supertònic"],
      correct: 1,
      explanation: "L'acord V és el dominant, que resol naturalment al tònic (I).",
      level: "Avançat"
    },
    {
      question: "Un acord de sèptima dominant en Do major és:",
      options: ["Do7", "Sol7", "Fa7", "Re7"],
      correct: 1,
      explanation: "Sol7 és l'acord de sèptima dominant en Do major (V7).",
      level: "Avançat"
    },
    {
      question: "El mode dòric es caracteritza per:",
      options: ["2a menor, 7a major", "2a menor, 6a menor", "3a menor, 6a major", "3a menor, 7a menor"],
      correct: 2,
      explanation: "El mode dòric té 3a menor i 6a major, donant-li un caràcter únic.",
      level: "Avançat"
    }
  ],
  speed: [
    {
      question: "Do# és igual a:",
      options: ["Reb", "Mib", "Fab", "Solb"],
      correct: 0,
      explanation: "Do# i Reb són enharmonies - la mateixa nota.",
      timeLimit: 5
    },
    {
      question: "Quants semitons té una octava?",
      options: ["10", "11", "12", "13"],
      correct: 2,
      explanation: "Una octava té 12 semitons.",
      timeLimit: 4
    },
    {
      question: "La nota La central té la frequència:",
      options: ["220 Hz", "440 Hz", "880 Hz", "110 Hz"],
      correct: 1,
      explanation: "La nota La central (A4) té 440 Hz.",
      timeLimit: 6
    },
    {
      question: "Do a Mi és un interval de:",
      options: ["2a", "3a", "4a", "5a"],
      correct: 1,
      explanation: "Do a Mi és una tercera major.",
      timeLimit: 3
    },
    {
      question: "Sol# és igual a:",
      options: ["Lab", "Sib", "Fab", "Mib"],
      correct: 0,
      explanation: "Sol# i Lab són enharmonies.",
      timeLimit: 4
    },
    {
      question: "Una blanca dura:",
      options: ["1 temps", "2 temps", "3 temps", "4 temps"],
      correct: 1,
      explanation: "Una blanca equival a 2 temps en 4/4.",
      timeLimit: 3
    },
    {
      question: "L'armadura de Sol major té:",
      options: ["0 alteracions", "1#", "2#", "1b"],
      correct: 1,
      explanation: "Sol major té un sostingut (Fa#).",
      timeLimit: 4
    },
    {
      question: "Un acord augmentat té:",
      options: ["3a major + 5a justa", "3a major + 5a augmentada", "3a menor + 5a justa", "3a menor + 5a augmentada"],
      correct: 1,
      explanation: "L'acord augmentat conté tercera major i quinta augmentada.",
      timeLimit: 5
    }
  ],
  memory: [
    {
      pattern: ["Do", "Re", "Mi"],
      description: "Memoritza aquesta seqüència de 3 notes",
      difficulty: "Fàcil"
    },
    {
      pattern: ["Do", "Mi", "Sol", "Do"],
      description: "Acord de Do major",
      difficulty: "Fàcil"
    },
    {
      pattern: ["Do", "Re", "Mi", "Fa", "Sol"],
      description: "Escala major (primera meitat)",
      difficulty: "Mitjà"
    },
    {
      pattern: ["Do", "Mib", "Sol"],
      description: "Acord de Do menor",
      difficulty: "Mitjà"
    },
    {
      pattern: ["Do", "Re", "Mi", "Fa", "Sol", "La"],
      description: "Sis notes consecutives",
      difficulty: "Mitjà"
    },
    {
      pattern: ["Do", "Mi", "Sol", "Si", "Re"],
      description: "Acord de Do major amb 7a i 9a",
      difficulty: "Difícil"
    },
    {
      pattern: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"],
      description: "Escala major completa",
      difficulty: "Difícil"
    },
    {
      pattern: ["Do", "Reb", "Mi", "Fa", "Sol", "Lab", "Si"],
      description: "Escala harmònica menor",
      difficulty: "Difícil"
    }
  ],
  target: [
    {
      challenge: "Identifica 5 intervals correctament",
      goal: 5,
      reward: "Bronze en Intervals",
      questions: [
        { question: "Do a Mi", options: ["2a", "3a", "4a"], correct: 1 },
        { question: "Do a Fa", options: ["3a", "4a", "5a"], correct: 1 },
        { question: "Do a Sol", options: ["4a", "5a", "6a"], correct: 1 },
        { question: "Do a La", options: ["5a", "6a", "7a"], correct: 1 },
        { question: "Do a Si", options: ["6a", "7a", "8a"], correct: 1 },
        { question: "Mi a Sol", options: ["2a", "3a", "4a"], correct: 1 },
        { question: "Fa a La", options: ["2a", "3a", "4a"], correct: 1 }
      ]
    },
    {
      challenge: "Completa 3 escales majors",
      goal: 3,
      reward: "Plata en Escales",
      questions: [
        { question: "Do major: Do, Re, ?, Fa, Sol, ?, Si", options: ["Mi, La", "Re, La", "Mi, Si"], correct: 0 },
        { question: "Sol major: Sol, La, ?, Do, Re, ?, Fa#", options: ["Si, Mi", "La, Mi", "Si, Fa"], correct: 0 },
        { question: "Fa major: Fa, Sol, ?, Sib, Do, ?, Mi", options: ["La, Re", "Si, Re", "La, Mi"], correct: 0 }
      ]
    },
    {
      challenge: "Reconeix 4 acords majors i menors",
      goal: 4,
      reward: "Or en Acords",
      questions: [
        { question: "Do-Mi-Sol és:", options: ["Major", "Menor", "Augmentat"], correct: 0 },
        { question: "Do-Mib-Sol és:", options: ["Major", "Menor", "Disminuït"], correct: 1 },
        { question: "Re-Fa#-La és:", options: ["Major", "Menor", "Augmentat"], correct: 0 },
        { question: "La-Do-Mi és:", options: ["Major", "Menor", "Disminuït"], correct: 1 },
        { question: "Mi-Sol#-Si és:", options: ["Major", "Menor", "Augmentat"], correct: 0 },
        { question: "Fa-Lab-Do és:", options: ["Major", "Menor", "Disminuït"], correct: 1 }
      ]
    }
  ],
  puzzle: [
    {
      question: "Completa l'escala de Do major:",
      text: "Do, Re, __, Fa, Sol, __, Si, Do",
      blanks: 2,
      options: ["Mi", "Fa#", "La", "Sib", "Mib", "Lab"],
      correct: [0, 2],
      explanation: "L'escala de Do major és: Do, Re, Mi, Fa, Sol, La, Si, Do"
    },
    {
      question: "Completa l'acord de La menor:",
      text: "La, __, Mi",
      blanks: 1,
      options: ["Do", "Do#", "Reb", "Re"],
      correct: [0],
      explanation: "L'acord de La menor és: La, Do, Mi"
    },
    {
      question: "Completa l'escala de Sol major:",
      text: "Sol, La, __, Do, Re, __, Fa#, Sol",
      blanks: 2,
      options: ["Si", "Sib", "Mi", "Mib", "Fa"],
      correct: [0, 2],
      explanation: "L'escala de Sol major és: Sol, La, Si, Do, Re, Mi, Fa#, Sol"
    },
    {
      question: "Completa la progressió d'acords:",
      text: "Do major - __ menor - Sol major - __ major",
      blanks: 2,
      options: ["La", "Re", "Mi", "Fa", "Si"],
      correct: [0, 3],
      explanation: "Progressió típica: Do major - La menor - Sol major - Fa major (vi-IV-V-I)"
    },
    {
      question: "Completa l'interval:",
      text: "Do a __ = Quinta justa",
      blanks: 1,
      options: ["Fa", "Sol", "La", "Si"],
      correct: [1],
      explanation: "Una quinta justa des de Do és Sol (7 semitons)"
    }
  ],
  arcade: [
    {
      name: "Note Catcher",
      description: "Atrapa les notes que cauen del cel!",
      instructions: "Utilitza les fletxes per moure't i atrapa les notes correctes.",
      type: "action"
    },
    {
      name: "Rhythm Master",
      description: "Segueix el ritme perfecte!",
      instructions: "Prem espai al ritme de la música.",
      type: "rhythm"
    },
    {
      name: "Chord Builder",
      description: "Construeix acords ràpidament!",
      instructions: "Selecciona les notes correctes per formar l'acord demanat.",
      type: "construction"
    },
    {
      name: "Scale Runner",
      description: "Corre per les escales musicals!",
      instructions: "Salta només sobre les notes de l'escala correcta.",
      type: "platform"
    }
  ]
};

const gameTypes = [
  {
    id: 'theory',
    title: 'Teoria Musical',
    description: 'Aprèn els fonaments de la teoria musical',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'speed',
    title: 'Joc de Velocitat',
    description: 'Respon ràpidament a preguntes musicals',
    icon: Volume2,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'memory',
    title: 'Joc de Memòria',
    description: 'Memoritza patrons musicals',
    icon: Trophy,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'target',
    title: 'Joc d\'Objectiu',
    description: 'Assoleix objectius específics',
    icon: Target,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'puzzle',
    title: 'Trencaclosques Musical',
    description: 'Resol problemes musicals complexos',
    icon: Puzzle,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'arcade',
    title: 'Arcade Musical',
    description: 'Jocs musicals divertits',
    icon: Music,
    color: 'from-pink-500 to-pink-600'
  }
];

// Component de joc específic
function GameComponent({ mode, onBack }: { mode: GameMode; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [memoryPhase, setMemoryPhase] = useState<'show' | 'input' | 'result'>('show');
  const [userPattern, setUserPattern] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [puzzleAnswers, setPuzzleAnswers] = useState<string[]>([]);
  const [arcadeGame, setArcadeGame] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const game = gameTypes.find(g => g.id === mode);
  const content = gameContent[mode as keyof typeof gameContent];

  // Timer per jocs de velocitat
  useEffect(() => {
    if (mode === 'speed' && timeLeft !== null && timeLeft > 0 && gameStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (mode === 'speed' && timeLeft === 0) {
      handleAnswer(-1); // Temps esgotat
    }
  }, [timeLeft, mode, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setUserPattern([]);
    setMemoryPhase('show');
    setCurrentChallenge(0);
    setTargetProgress(0);
    setPuzzleAnswers([]);
    setGameCompleted(false);
    
    if (mode === 'speed' && content && content[0] && 'timeLimit' in content[0]) {
      setTimeLeft(content[0].timeLimit || 5);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (mode === 'theory' || mode === 'speed') {
      const questions = content as any[];
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
            if (mode === 'speed' && questions[currentQuestion + 1] && 'timeLimit' in questions[currentQuestion + 1]) {
              setTimeLeft(questions[currentQuestion + 1].timeLimit || 5);
            }
          } else {
            // Fi del joc
            setGameStarted(false);
            setGameCompleted(true);
          }
        }, 2000);
      }
    }
  };

  const handleTargetAnswer = (answerIndex: number) => {
    const challenge = content[currentChallenge] as any;
    if (challenge && challenge.questions) {
      const question = challenge.questions[currentQuestion];
      const isCorrect = answerIndex === question.correct;
      
      if (isCorrect) {
        setTargetProgress(targetProgress + 1);
        setScore(score + 1);
      }
      
      setSelectedAnswer(answerIndex);
      setShowResult(true);
      
      setTimeout(() => {
        if (targetProgress + (isCorrect ? 1 : 0) >= challenge.goal) {
          // Repte completat
          setGameCompleted(true);
          setGameStarted(false);
        } else if (currentQuestion < challenge.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // Més preguntes necessàries, reiniciar
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setShowResult(false);
        }
      }, 2000);
    }
  };

  const handlePuzzleAnswer = (optionIndex: number) => {
    const newAnswers = [...puzzleAnswers, content[currentQuestion].options[optionIndex]];
    setPuzzleAnswers(newAnswers);
    
    const puzzle = content[currentQuestion] as any;
    if (newAnswers.length === puzzle.blanks) {
      // Comprovar resposta
      const isCorrect = puzzle.correct.every((correctIndex: number, i: number) => 
        newAnswers[i] === puzzle.options[correctIndex]
      );
      
      if (isCorrect) setScore(score + 1);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentQuestion < content.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setPuzzleAnswers([]);
          setShowResult(false);
        } else {
          setGameStarted(false);
          setGameCompleted(true);
        }
      }, 3000);
    }
  };

  const handleMemoryInput = (note: string) => {
    const newPattern = [...userPattern, note];
    setUserPattern(newPattern);
    
    const currentMemoryGame = content[currentQuestion] as any;
    if (newPattern.length === currentMemoryGame.pattern.length) {
      // Comprovar si és correcte
      const isCorrect = newPattern.every((note, index) => note === currentMemoryGame.pattern[index]);
      if (isCorrect) setScore(score + 1);
      setMemoryPhase('result');
      
      setTimeout(() => {
        if (currentQuestion < content.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setUserPattern([]);
          setMemoryPhase('show');
        } else {
          setGameStarted(false);
          setGameCompleted(true);
        }
      }, 2000);
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className={`w-24 h-24 bg-gradient-to-r ${game?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {game?.icon && <game.icon className="h-12 w-12 text-white" />}
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">{game?.title}</h2>
        <p className="text-gray-300 mb-8 text-lg">{game?.description}</p>
        
        <div className="bg-slate-700/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Com jugar:</h3>
          {mode === 'theory' && (
            <p className="text-gray-300">Respon preguntes sobre teoria musical. Cada resposta correcta suma un punt.</p>
          )}
          {mode === 'speed' && (
            <p className="text-gray-300">Respon tan ràpid com puguis! Tens temps limitat per cada pregunta.</p>
          )}
          {mode === 'memory' && (
            <p className="text-gray-300">Memoritza les seqüències de notes i reprodueix-les correctament.</p>
          )}
          {mode === 'target' && (
            <p className="text-gray-300">Completa reptes específics per guanyar medalles i recompenses.</p>
          )}
          {mode === 'puzzle' && (
            <p className="text-gray-300">Resol trencaclosques musicals completant escales, acords i progressions.</p>
          )}
          {mode === 'arcade' && (
            <p className="text-gray-300">Jocs d'acció musicals divertits amb diferents mecàniques de joc.</p>
          )}
        </div>
        
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all inline-flex items-center"
        >
          <Play className="h-6 w-6 mr-2" />
          Començar Joc
        </button>
      </div>
    );
  }

  // Joc de teoria i velocitat
  if (mode === 'theory' || mode === 'speed') {
    const questions = content as any[];
    const question = questions[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Header del joc */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <span className="text-lg">Pregunta {currentQuestion + 1} de {questions.length}</span>
            <div className="text-sm text-gray-400">Puntuació: {score}/{questions.length}</div>
          </div>
          {mode === 'speed' && timeLeft !== null && (
            <div className={`text-2xl font-bold flex items-center ${timeLeft <= 2 ? 'text-red-400' : 'text-blue-400'}`}>
              <Clock className="h-6 w-6 mr-2" />
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
            {question.options.map((option: string, index: number) => (
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
                <div className="flex items-center justify-center">
                  {showResult && index === question.correct && <CheckCircle className="h-5 w-5 mr-2" />}
                  {showResult && index === selectedAnswer && index !== question.correct && <XCircle className="h-5 w-5 mr-2" />}
                  {option}
                </div>
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
      </div>
    );
  }

  // Joc de memòria
  if (mode === 'memory') {
    const memoryGames = content as any[];
    const currentMemoryGame = memoryGames[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-lg text-white">Nivell {currentQuestion + 1} de {memoryGames.length}</span>
          <div className="text-sm text-gray-400">Puntuació: {score}/{memoryGames.length}</div>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            {currentMemoryGame.description}
          </h3>

          {memoryPhase === 'show' && (
            <div className="text-center">
              <div className="mb-6">
                <h4 className="text-lg text-white mb-4">Memoritza aquesta seqüència:</h4>
                <div className="flex justify-center space-x-4 mb-6">
                  {currentMemoryGame.pattern.map((note: string, index: number) => (
                    <div key={index} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setMemoryPhase('input')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Continuar
              </button>
            </div>
          )}

          {memoryPhase === 'input' && (
            <div className="text-center">
              <h4 className="text-lg text-white mb-4">Repeteix la seqüència:</h4>
              <div className="flex justify-center space-x-4 mb-6">
                {userPattern.map((note, index) => (
                  <div key={index} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                    {note}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'].map((note) => (
                  <button
                    key={note}
                    onClick={() => handleMemoryInput(note)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded font-semibold transition-colors"
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          )}

          {memoryPhase === 'result' && (
            <div className="text-center">
              <div className={`text-6xl mb-4 ${userPattern.every((note, index) => note === currentMemoryGame.pattern[index]) ? 'text-green-400' : 'text-red-400'}`}>
                {userPattern.every((note, index) => note === currentMemoryGame.pattern[index]) ? '✓' : '✗'}
              </div>
              <p className="text-white text-lg">
                {userPattern.every((note, index) => note === currentMemoryGame.pattern[index]) ? 'Correcte!' : 'Incorrecte!'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Joc de Target (Objectius)
  if (mode === 'target') {
    const challenge = content[currentChallenge] as any;
    
    if (gameCompleted) {
      return (
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Repte Completat!</h2>
          <p className="text-white text-xl mb-2">Has guanyat:</p>
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 font-bold text-lg">{challenge.reward}</p>
          </div>
          <p className="text-gray-300 mb-6">Puntuació final: {targetProgress}/{challenge.goal}</p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Jugar de nou
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Tornar al menú
            </button>
          </div>
        </div>
      );
    }
    
    const question = challenge.questions[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Header del repte */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 mb-6 border border-orange-500/30">
          <h3 className="text-xl font-bold text-white mb-2">{challenge.challenge}</h3>
          <div className="flex justify-between items-center">
            <span className="text-orange-400">Progrés: {targetProgress}/{challenge.goal}</span>
            <span className="text-gray-300">Recompensa: {challenge.reward}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(targetProgress / challenge.goal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Pregunta actual */}
        <div className="bg-slate-800/80 rounded-lg p-8 mb-6 border border-slate-700">
          <h4 className="text-2xl font-bold text-white mb-6 text-center">
            {question.question}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && handleTargetAnswer(index)}
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
        </div>
      </div>
    );
  }

  // Joc de Puzzle
  if (mode === 'puzzle') {
    const puzzle = content[currentQuestion] as any;
    
    if (gameCompleted) {
      return (
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🧩</div>
          <h2 className="text-3xl font-bold text-green-400 mb-4">Trencaclosques Completats!</h2>
          <p className="text-white text-xl mb-6">Puntuació final: {score}/{content.length}</p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Jugar de nou
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Tornar al menú
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-lg text-white">Trencaclosques {currentQuestion + 1} de {content.length}</span>
          <div className="text-sm text-gray-400">Puntuació: {score}/{content.length}</div>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {puzzle.question}
          </h3>
          
          {/* Text del puzzle amb espais en blanc */}
          <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
            <p className="text-xl text-center text-gray-300 font-mono">
              {puzzle.text.split('__').map((part: string, index: number) => (
                <span key={index}>
                  {part}
                  {index < puzzle.blanks && (
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 mx-2 rounded font-semibold min-w-16 text-center">
                      {puzzleAnswers[index] || '___'}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Opcions disponibles */}
          {!showResult && puzzleAnswers.length < puzzle.blanks && (
            <div>
              <h4 className="text-lg text-white mb-4 text-center">
                Selecciona la resposta {puzzleAnswers.length + 1}:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {puzzle.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handlePuzzleAnswer(index)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultat i explicació */}
          {showResult && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Explicació:</h4>
              <p className="text-gray-300">{puzzle.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Joc d'Arcade
  if (mode === 'arcade') {
    const games = content as any[];
    const selectedGame = games[arcadeGame];
    
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Selecciona un Joc d'Arcade</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold text-pink-400 mb-3">{game.name}</h3>
              <p className="text-gray-300 mb-4">{game.description}</p>
              <p className="text-sm text-gray-400 mb-4">{game.instructions}</p>
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-white px-4 py-2 rounded font-semibold">
                Aviat disponible
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <p className="text-gray-400 mb-4">
            Els jocs d'arcade estan en desenvolupament. Aviat podràs jugar a tots aquests modes emocionants!
          </p>
          <button
            onClick={onBack}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Tornar al menú
          </button>
        </div>
      </div>
    );
  }

  // Altres jocs (fallback)
  return (
    <div className="text-center">
      <div className={`w-24 h-24 bg-gradient-to-r ${game?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
        {game?.icon && <game.icon className="h-12 w-12 text-white" />}
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">{game?.title}</h2>
      <p className="text-gray-300 mb-8">{game?.description}</p>
      <button
        onClick={onBack}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
      >
        Tornar al menú
      </button>
    </div>
  );
}

function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('home');
  
  console.log('Current mode:', currentMode);

  const handleNavigate = (mode: GameMode) => {
    console.log('Navigating to:', mode);
    setCurrentMode(mode);
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Music className="h-16 w-16 text-blue-400 mr-4 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Teoria Musical
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            🎵 Descobreix el món de la música amb els nostres jocs i exercicis interactius 🎵
          </p>
        </div>

        {/* Grid de jocs */}
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

        {/* Estadístiques */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/20 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
            <div className="text-gray-300">Modes de Joc</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-2xl border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
            <div className="text-gray-300">Exercicis</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-6 rounded-2xl border border-pink-500/20 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">11</div>
            <div className="text-gray-300">Nivells</div>
          </div>
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

export default App;