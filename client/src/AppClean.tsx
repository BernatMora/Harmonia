import { useState, useEffect } from "react";
import { Music, Trophy, BookOpen, Volume2, Target, Puzzle, ArrowLeft, Play, Clock, CheckCircle, XCircle } from "lucide-react";
import { getRandomProgression, getProgressionsByMode, getChordTypes } from "./data/progressions";

type GameMode = 'home' | 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade' | 'harmonia';

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
    },
    {
      question: "La progressió vi-IV-I-V és típica en:",
      options: ["Música clàssica", "Música pop", "Jazz", "Blues"],
      correct: 1,
      explanation: "Aquesta progressió és molt comuna en la música pop contemporània.",
      level: "Avançat"
    },
    {
      question: "Un acord half-diminished conté:",
      options: ["3a menor + 5a disminuïda + 7a menor", "3a menor + 5a disminuïda + 7a major", "3a major + 5a disminuïda + 7a menor", "3a menor + 5a justa + 7a menor"],
      correct: 0,
      explanation: "L'acord half-diminished (ø7) té 3a menor, 5a disminuïda i 7a menor.",
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
      reward: "🥉 Bronze en Intervals",
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
      reward: "🥈 Plata en Escales",
      questions: [
        { question: "Do major: Do, Re, ?, Fa, Sol, ?, Si", options: ["Mi, La", "Re, La", "Mi, Si"], correct: 0 },
        { question: "Sol major: Sol, La, ?, Do, Re, ?, Fa#", options: ["Si, Mi", "La, Mi", "Si, Fa"], correct: 0 },
        { question: "Fa major: Fa, Sol, ?, Sib, Do, ?, Mi", options: ["La, Re", "Si, Re", "La, Mi"], correct: 0 }
      ]
    },
    {
      challenge: "Reconeix 4 acords majors i menors",
      goal: 4,
      reward: "🥇 Or en Acords",
      questions: [
        { question: "Do-Mi-Sol és:", options: ["Major", "Menor", "Augmentat"], correct: 0 },
        { question: "Do-Mib-Sol és:", options: ["Major", "Menor", "Disminuït"], correct: 1 },
        { question: "Re-Fa#-La és:", options: ["Major", "Menor", "Augmentat"], correct: 0 },
        { question: "La-Do-Mi és:", options: ["Major", "Menor", "Disminuït"], correct: 1 },
        { question: "Mi-Sol#-Si és:", options: ["Major", "Menor", "Augmentat"], correct: 0 },
        { question: "Fa-Lab-Do és:", options: ["Major", "Menor", "Disminuït"], correct: 1 }
      ]
    },
    {
      challenge: "Mestre en Progressions Harmòniques",
      goal: 5,
      reward: "💎 Diamant en Harmonia",
      questions: [
        { question: "En Fa major, la progressió vi-IV-I-V és:", options: ["Dm-Bb-F-C", "Am-F-C-G", "Gm-Eb-Bb-F"], correct: 0 },
        { question: "Un acord half-diminished té:", options: ["3a menor + 5a dim + 7a menor", "3a menor + 5a dim + 7a major", "3a major + 5a dim + 7a menor"], correct: 0 },
        { question: "La progressió ii°-V-i és típica de:", options: ["Mode major", "Mode menor", "Mode dòric"], correct: 1 },
        { question: "En Am, l'acord VII és:", options: ["G", "G#", "Gmaj7"], correct: 0 },
        { question: "Un acord de dominant conté:", options: ["7a menor", "7a major", "6a major"], correct: 0 },
        { question: "La cadència plagal és:", options: ["V-I", "IV-I", "ii-V"], correct: 1 },
        { question: "En el mode menor, el VI grau és:", options: ["Major", "Menor", "Augmentat"], correct: 0 }
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
    },
    {
      question: "Completa la progressió en F menor:",
      text: "__ - Gm - __ - Bb",
      blanks: 2,
      options: ["Dm", "Fm", "Ab", "C", "Eb"],
      correct: [1, 2],
      explanation: "Progressió vi-I-ii-IV en F major: Dm-F-Gm-Bb"
    },
    {
      question: "Identifica el tipus d'acord:",
      text: "C - E - G - B♭ és un acord __",
      blanks: 1,
      options: ["major", "menor", "dominant", "augmentat"],
      correct: [2],
      explanation: "C7 (Do dominant) conté 3a major i 7a menor, característic dels acords dominants"
    },
    {
      question: "Completa la cadència:",
      text: "Am - __ - G - __",
      blanks: 2,
      options: ["F", "C", "Dm", "Em"],
      correct: [0, 1],
      explanation: "Progressió vi-IV-V-I: Am-F-G-C"
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
    },
    {
      name: "Progression Master",
      description: "Identifica progressions harmòniques reals!",
      instructions: "Escolta la progressió i identifica els acords correctes.",
      type: "progression"
    }
  ],
  harmonia: () => {
    // Generar preguntes dinàmiques basades en les progressions reals
    const progression = getRandomProgression();
    const wrongProgressions = getProgressionsByMode(progression.mode).filter(p => p.tonalitat !== progression.tonalitat).slice(0, 2);
    const allChordTypes = getChordTypes();
    
    return [
      {
        type: "identify_progression",
        progression: progression,
        question: `Identifica la progressió en ${progression.tonalitat} ${progression.mode}:`,
        chords: progression.acords.map(a => a.acord).join(" - "),
        options: [
          progression.progressio_romana,
          wrongProgressions[0]?.progressio_romana || "I - V - vi - IV",
          wrongProgressions[1]?.progressio_romana || "vi - IV - I - V",
          "ii - V - I - vi"
        ],
        correct: 0,
        explanation: `Aquesta progressió ${progression.progressio_romana} és característica del mode ${progression.mode} en ${progression.tonalitat}.`
      },
      {
        type: "chord_analysis",
        progression: progression,
        question: `Quin tipus d'acord és ${progression.acords[0].acord}?`,
        options: [
          progression.acords[0].tipus,
          allChordTypes.filter(t => t !== progression.acords[0].tipus)[0] || "major",
          allChordTypes.filter(t => t !== progression.acords[0].tipus)[1] || "minor",
          allChordTypes.filter(t => t !== progression.acords[0].tipus)[2] || "diminished"
        ],
        correct: 0,
        explanation: `${progression.acords[0].acord} és un acord ${progression.acords[0].tipus}.`
      }
    ];
  }
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
  },
  {
    id: 'harmonia',
    title: 'Harmonia Avançada',
    description: 'Progressions harmòniques reals',
    icon: Trophy,
    color: 'from-gold-500 to-yellow-600'
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
  const [currentHarmonia, setCurrentHarmonia] = useState(0);
  const [harmoniaQuestions, setHarmoniaQuestions] = useState<any[]>([]);
  const [chordTarget] = useState(['Do', 'Mi', 'Sol']);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  // useEffect per al mode harmonia - ha d'estar al principi
  useEffect(() => {
    if (mode === 'harmonia' && gameStarted && harmoniaQuestions.length === 0) {
      const questions = [];
      for (let i = 0; i < 5; i++) {
        const progression = getRandomProgression();
        const wrongProgressions = getProgressionsByMode(progression.mode)
          .filter(p => p.tonalitat !== progression.tonalitat)
          .slice(0, 2);
        
        questions.push({
          type: "identify_progression",
          progression: progression,
          question: `Identifica la progressió en ${progression.tonalitat} ${progression.mode}:`,
          chords: progression.acords.map((a: any) => a.acord).join(" - "),
          romanNumerals: progression.progressio_romana,
          options: [
            progression.progressio_romana,
            wrongProgressions[0]?.progressio_romana || "I - V - vi - IV",
            wrongProgressions[1]?.progressio_romana || "vi - IV - I - V",
            "ii - V - I - vi"
          ],
          correct: 0,
          explanation: `Aquesta progressió ${progression.progressio_romana} és característica del mode ${progression.mode} en ${progression.tonalitat}.`
        });
      }
      setHarmoniaQuestions(questions);
    }
  }, [mode, gameStarted, harmoniaQuestions.length]);

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
    setCurrentHarmonia(0);
    setHarmoniaQuestions([]);
    setArcadeGame(0);
    setSelectedNotes([]);
    
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

    // Handlejar preguntes d'harmonia
    if (mode === 'harmonia') {
      const isCorrect = answerIndex === harmoniaQuestions[currentHarmonia]?.correct;
      if (isCorrect) setScore(score + 1);
      
      setSelectedAnswer(answerIndex);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentHarmonia < harmoniaQuestions.length - 1) {
          setCurrentHarmonia(currentHarmonia + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setGameStarted(false);
          setGameCompleted(true);
        }
      }, 3000);
      return;
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
          {mode === 'harmonia' && (
            <p className="text-gray-300">Analitza progressions harmòniques reals de milers de cançons i aprèn harmonia avançada.</p>
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
    
    // Joc seleccionat per jugar
    if (arcadeGame > 0) {
      const selectedGame = games[arcadeGame - 1];
      
      // Note Catcher Game
      if (selectedGame.type === 'action') {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🎵</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              <p className="text-sm text-gray-400 mb-8">{selectedGame.instructions}</p>
              
              {/* Simulació del joc */}
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <div className="text-lg text-white mb-4">🎵 Notes que cauen - Reacciona ràpid! 🎵</div>
                <div className="text-sm text-gray-300 mb-4">Notes aleatòries, velocitats diferents, múltiples colors!</div>
                
                {/* Notes aleatòries amb dificultats variables */}
                <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                  {['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'].slice(0, 7 + Math.floor(Math.random() * 5)).map((note, i) => {
                    const speed = Math.random() * 3000 + 1000;
                    const color = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'][Math.floor(Math.random() * 6)];
                    const isMoving = Math.random() > 0.3;
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const points = Math.floor(Math.random() * 50) + 10;
                          console.log(`🎵 ${note} capturada! +${points} punts! Velocitat: ${speed.toFixed(0)}ms`);
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs transition-all duration-500 cursor-pointer hover:scale-110 ${color} ${
                          isMoving ? 'animate-bounce' : ''
                        } shadow-lg`}
                        style={{
                          animationDuration: `${speed}ms`,
                          transform: isMoving ? `translateY(${Math.sin(Date.now() / speed) * 10}px)` : 'none'
                        }}
                      >
                        {note}
                      </button>
                    );
                  })}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-yellow-400 font-bold">Puntuació: {Math.floor(Math.random() * 1000) + 100}</div>
                  <div className="text-red-400 font-bold">Combo: x{Math.floor(Math.random() * 10) + 1}</div>
                  <div className="text-green-400">Velocitat: {Math.floor(Math.random() * 3) + 1}x</div>
                  <div className="text-blue-400">Nivell: {Math.floor(Math.random() * 20) + 1}</div>
                </div>
                
                <div className="text-xs text-gray-400">💡 Notes sostingudes valen més punts! Velocitat augmenta cada 10 captures!</div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
                <button
                  onClick={() => {
                    setScore(score + Math.floor(Math.random() * 10) + 1);
                    setTimeout(() => setArcadeGame(0), 1000);
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Jugar una ronda
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Rhythm Master Game
      if (selectedGame.type === 'rhythm') {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🥁</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              
              {/* Simulació del ritme */}
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <div className="text-lg text-white mb-4">🥁 Ritmes complexos en temps real! 🥁</div>
                <div className="text-sm text-gray-300 mb-4">Patrons aleatòris, signatures de temps variables, polyrhythms!</div>
                
                {/* Patrons rítmics complexos i aleatòris */}
                <div className="space-y-4 mb-6">
                  {/* Línia rítmica 1 - Principal */}
                  <div className="flex justify-center space-x-1">
                    <div className="text-xs text-gray-400 w-16">4/4:</div>
                    {Array.from({length: 16}, (_, i) => {
                      const isActive = Math.random() > 0.4;
                      const intensity = Math.random();
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            const timing = i % 4 === 0 ? 'DOWNBEAT' : i % 2 === 0 ? 'Strong' : 'Weak';
                            console.log(`🥁 Beat ${i + 1}/16 - ${timing} - Intensitat: ${(intensity * 100).toFixed(0)}%`);
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isActive 
                              ? intensity > 0.7 ? 'bg-red-500 animate-pulse shadow-md' 
                                : intensity > 0.4 ? 'bg-orange-500' 
                                : 'bg-yellow-500'
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        >
                          {isActive ? '●' : '○'}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Línia rítmica 2 - Sincopat */}
                  <div className="flex justify-center space-x-1">
                    <div className="text-xs text-gray-400 w-16">Sync:</div>
                    {Array.from({length: 12}, (_, i) => {
                      const isActive = Math.random() > 0.6;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            console.log(`🎵 Syncopation ${i + 1}/12 - ${isActive ? 'HIT' : 'rest'}`);
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isActive ? 'bg-blue-500 animate-bounce' : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          {isActive ? '♪' : '∅'}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Línia rítmica 3 - Polyrhythm */}
                  <div className="flex justify-center space-x-1">
                    <div className="text-xs text-gray-400 w-16">3/4:</div>
                    {Array.from({length: 9}, (_, i) => {
                      const isActive = Math.random() > 0.5;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            console.log(`🎶 Polyrhythm ${i + 1}/9 - ${i % 3 === 0 ? 'STRONG' : 'weak'}`);
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isActive 
                              ? i % 3 === 0 ? 'bg-purple-500 animate-pulse' : 'bg-indigo-500'
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          {isActive ? '♫' : '·'}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-yellow-400 font-bold">Precisió: {Math.floor(Math.random() * 40) + 60}%</div>
                  <div className="text-green-400">BPM: {Math.floor(Math.random() * 100) + 80}</div>
                  <div className="text-red-400">Streak: {Math.floor(Math.random() * 25)}</div>
                </div>
                
                <div className="text-xs text-gray-400 mb-4">💡 Múltiples layers rítmics! Cada color = instrument diferent</div>
                <div className="flex space-x-2 justify-center">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-bold">
                    🥁 KICK
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold">
                    🔔 SNARE
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-bold">
                    ⚡ HI-HAT
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Chord Builder Game
      if (selectedGame.type === 'construction') {
        const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
        
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🎼</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                {(() => {
                  // Acords aleatoris complexos
                  const chordTypes = [
                    { name: "Do Major", notes: ["Do", "Mi", "Sol"], difficulty: "Fàcil" },
                    { name: "La menor", notes: ["La", "Do", "Mi"], difficulty: "Fàcil" },
                    { name: "Sol7", notes: ["Sol", "Si", "Re", "Fa"], difficulty: "Mitjà" },
                    { name: "Dm7b5", notes: ["Re", "Fa", "Lab", "Do"], difficulty: "Difícil" },
                    { name: "C#dim7", notes: ["Do#", "Mi", "Sol", "Sib"], difficulty: "Difícil" },
                    { name: "Fmaj9", notes: ["Fa", "La", "Do", "Mi", "Sol"], difficulty: "Expert" },
                    { name: "B♭13", notes: ["Sib", "Re", "Fa", "Lab", "Do", "Sol"], difficulty: "Expert" },
                    { name: "E♭aug", notes: ["Mib", "Sol", "Si"], difficulty: "Mitjà" }
                  ];
                  const randomChord = chordTypes[Math.floor(Math.random() * chordTypes.length)];
                  
                  return (
                    <>
                      <div className="text-lg text-white mb-4">🎼 Construeix l'acord: {randomChord.name} 🎼</div>
                      <div className="text-sm text-gray-300 mb-4">
                        Objectiu: {randomChord.notes.join(' - ')} | Dificultat: {randomChord.difficulty}
                      </div>
                      <div className="text-xs text-blue-300 mb-4">
                        💡 Acord generat aleatòriament - {randomChord.notes.length} notes necessàries
                      </div>
                    </>
                  );
                })()}
                
                <div className="mb-6">
                  <div className="text-white mb-2">🎵 Notes seleccionades:</div>
                  <div className="flex justify-center space-x-2 mb-4">
                    {selectedNotes.map((note, i) => (
                      <div key={i} className="bg-green-600 text-white px-3 py-2 rounded shadow-lg shadow-green-500/30">
                        {note}
                      </div>
                    ))}
                  </div>
                  {selectedNotes.length > 0 && (
                    <div className="text-xs text-blue-300 mb-2">
                      🔊 Cada nota que afegeixes fa el seu so característic
                    </div>
                  )}
                </div>
                
                {/* Notes cromàtiques completes amb enharmonies */}
                <div className="grid grid-cols-6 gap-1 mb-6">
                  {['Do', 'Do#/Db', 'Re', 'Re#/Eb', 'Mi', 'Fa', 'Fa#/Gb', 'Sol', 'Sol#/Ab', 'La', 'La#/Bb', 'Si',
                    'Dob', 'Reb', 'Mib', 'Fab', 'Solb', 'Lab', 'Sib', 'Dox', 'Rex', 'Mix', 'Fax', 'Solx', 'Lax', 'Six']
                    .slice(0, 24).map((note, i) => {
                    const isChromatic = note.includes('#') || note.includes('b') || note.includes('x');
                    const octave = Math.floor(Math.random() * 4) + 3; // Octaves 3-6
                    const fullNote = `${note}${octave}`;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (!selectedNotes.includes(note) && selectedNotes.length < 6) {
                            setSelectedNotes([...selectedNotes, note]);
                            const frequency = 440 * Math.pow(2, (i - 9) / 12); // Càlcul de freqüència
                            console.log(`🎵 ${fullNote} afegida! Freq: ${frequency.toFixed(1)}Hz, ${isChromatic ? 'Cromàtica' : 'Diatònica'}`);
                          }
                        }}
                        disabled={selectedNotes.includes(note)}
                        className={`p-2 rounded text-xs font-semibold transition-all ${
                          selectedNotes.includes(note)
                            ? 'bg-green-600 text-white shadow-lg'
                            : isChromatic
                            ? 'bg-purple-700 hover:bg-purple-600 text-white'
                            : 'bg-slate-700 hover:bg-slate-600 text-white'
                        } ${isChromatic ? 'border border-purple-400' : ''}`}
                      >
                        {note}
                      </button>
                    );
                  })}
                </div>
                
                {/* Inversions i voicings */}
                <div className="mb-4">
                  <div className="text-white text-sm mb-2">🔄 Inversions disponibles:</div>
                  <div className="flex space-x-2 justify-center">
                    {['Root', '1st Inv', '2nd Inv', '3rd Inv'].map((inversion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          console.log(`🎼 Inversió ${inversion} seleccionada - notes reordenades!`);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                      >
                        {inversion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedNotes.length === 3 && (
                  <div className={`text-lg font-bold mb-4 ${
                    JSON.stringify(selectedNotes.sort()) === JSON.stringify(chordTarget.sort())
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    {JSON.stringify(selectedNotes.sort()) === JSON.stringify(chordTarget.sort())
                      ? '🎊 ¡Correcte! Acord perfecte - Escolta com sona! 🎵'
                      : '🤔 Prova de nou - L\'acord no sona bé'}
                  </div>
                )}
                
                {selectedNotes.length === 3 && JSON.stringify(selectedNotes.sort()) === JSON.stringify(chordTarget.sort()) && (
                  <div className="text-center mb-4">
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                      <div className="text-green-300 text-sm">🔊 Som simulat: "Do-Mi-Sol" (acord major perfecte)</div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedNotes([])}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4"
                >
                  Reiniciar
                </button>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Scale Runner Game
      if (selectedGame.type === 'platform') {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🏃‍♂️</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                {(() => {
                  // Escales aleatòries complexes
                  const scales = [
                    { name: "Do Major", notes: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"], mode: "Ionian" },
                    { name: "La menor natural", notes: ["La", "Si", "Do", "Re", "Mi", "Fa", "Sol"], mode: "Aeolian" },
                    { name: "Re Dòric", notes: ["Re", "Mi", "Fa", "Sol", "La", "Si", "Do"], mode: "Dorian" },
                    { name: "Mi Frigi", notes: ["Mi", "Fa", "Sol", "La", "Si", "Do", "Re"], mode: "Phrygian" },
                    { name: "Fa Lidi", notes: ["Fa", "Sol", "La", "Si", "Do", "Re", "Mi"], mode: "Lydian" },
                    { name: "Sol Mixolidi", notes: ["Sol", "La", "Si", "Do", "Re", "Mi", "Fa"], mode: "Mixolydian" },
                    { name: "Si Locri", notes: ["Si", "Do", "Re", "Mi", "Fa", "Sol", "La"], mode: "Locrian" },
                    { name: "Blues Do", notes: ["Do", "Mib", "Fa", "Fa#", "Sol", "Sib"], mode: "Blues" },
                    { name: "Pentatònica La", notes: ["La", "Do", "Re", "Mi", "Sol"], mode: "Pentatonic" },
                    { name: "Cromàtica", notes: ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"], mode: "Chromatic" }
                  ];
                  const randomScale = scales[Math.floor(Math.random() * scales.length)];
                  const tempo = Math.floor(Math.random() * 60) + 80; // 80-140 BPM
                  
                  return (
                    <>
                      <div className="text-lg text-white mb-4">🏃‍♂️ Escala: {randomScale.name} ({randomScale.mode}) 🏃‍♂️</div>
                      <div className="text-sm text-gray-300 mb-4">Velocitat: {tempo} BPM - Obstacles aleatoris apareixen!</div>
                      <div className="text-xs text-blue-300 mb-4">
                        🔊 Notes correctes ({randomScale.notes.length}): {randomScale.notes.join(', ')}
                      </div>
                    </>
                  );
                })()}
                
                {/* Plataformes dinàmiques amb obstacles múltiples */}
                <div className="space-y-3 mb-6">
                  {/* Línia 1 - Notes cromàtiques */}
                  <div className="flex justify-center space-x-1">
                    {Array.from({length: 20}, (_, i) => {
                      const allNotes = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
                      const note = allNotes[i % 12];
                      const scaleNotes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']; // This would be dynamic
                      const isCorrect = scaleNotes.includes(note);
                      const hasObstacle = Math.random() > 0.7;
                      const height = Math.floor(Math.random() * 3) + 1;
                      
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            const points = isCorrect ? (height * 10) : -5;
                            console.log(`🎵 ${note} ${isCorrect ? '✅' : '❌'} ${points > 0 ? '+' : ''}${points} punts! Altura: ${height}`);
                          }}
                          className={`w-8 rounded border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${
                            isCorrect
                              ? 'bg-green-500 border-green-400 text-white hover:bg-green-400 hover:scale-110 shadow-lg shadow-green-500/50'
                              : 'bg-red-500 border-red-400 text-white hover:bg-red-400 hover:scale-105'
                          }`}
                          style={{ height: `${height * 16 + 16}px` }}
                        >
                          {note}
                          {hasObstacle && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center">
                              ⚡
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Línia 2 - Power-ups i bonus */}
                  <div className="flex justify-center space-x-2">
                    {['2x', '♪', '🔥', '⭐', '💎', '🎵', '⚡', '🌟'].map((powerup, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const effect = ['Doble punts', 'Nota perfecta', 'Combo multiplier', 'Estrella bonus', 'Diamant rar', 'So especial', 'Velocitat+', 'Super estrella'][i];
                          console.log(`✨ Power-up! ${powerup} - ${effect}`);
                        }}
                        className="w-8 h-8 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold text-xs transition-all hover:scale-125 animate-pulse shadow-lg shadow-yellow-500/50"
                      >
                        {powerup}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-sm mb-4">
                  <div className="text-yellow-400 font-bold">Distància: {Math.floor(Math.random() * 2000) + 500}m</div>
                  <div className="text-green-400">Velocitat: {Math.floor(Math.random() * 50) + 10} km/h</div>
                  <div className="text-blue-400">Combo: x{Math.floor(Math.random() * 15) + 1}</div>
                  <div className="text-purple-400">Vides: {Math.floor(Math.random() * 3) + 1}/5</div>
                </div>
                <div className="text-sm text-gray-300 mb-2">Plataformes dinàmiques, obstacles mòbils, power-ups temporals!</div>
                <div className="text-xs text-blue-300">💡 Altures variables = punts diferents | ⚡ = obstacles | ✨ = power-ups</div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Selecció de jocs d'arcade
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Selecciona un Joc d'Arcade</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => setArcadeGame(index + 1)}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold text-pink-400 mb-3">{game.name}</h3>
              <p className="text-gray-300 mb-4">{game.description}</p>
              <p className="text-sm text-gray-400 mb-4">{game.instructions}</p>
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded font-semibold hover:from-pink-600 hover:to-purple-600 transition-all">
                Jugar ara!
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
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

  // Joc d'Harmonia (amb progressions reals)
  if (mode === 'harmonia') {

    if (gameCompleted) {
      return (
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🎼</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Mestre d'Harmonia!</h2>
          <p className="text-white text-xl mb-6">Puntuació final: {score}/{harmoniaQuestions.length}</p>
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

    if (harmoniaQuestions.length === 0) {
      return (
        <div className="text-center">
          <div className="text-4xl mb-4">🎼</div>
          <p className="text-white">Generant progressions harmòniques...</p>
        </div>
      );
    }

    const currentQuestion = harmoniaQuestions[currentHarmonia];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-lg text-white">Progressió {currentHarmonia + 1} de {harmoniaQuestions.length}</span>
          <div className="text-sm text-gray-400">Puntuació: {score}/{harmoniaQuestions.length}</div>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {currentQuestion.question}
          </h3>

          {/* Progressió d'acords */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-6 mb-6 border border-yellow-500/20">
            <div className="text-center">
              <h4 className="text-lg text-yellow-400 font-semibold mb-3">Progressió d'Acords:</h4>
              <div className="text-2xl font-mono text-white mb-2">{currentQuestion.chords}</div>
              <div className="text-sm text-gray-400">en {currentQuestion.progression.tonalitat} {currentQuestion.progression.mode}</div>
            </div>
          </div>

          {/* Opcions de progressions romanes */}
          <h4 className="text-lg text-white mb-4 text-center">Quin és l'anàlisi en xifra romana?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all text-lg font-semibold font-mono ${
                  showResult
                    ? index === currentQuestion.correct
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
              <p className="text-gray-300">{currentQuestion.explanation}</p>
              <div className="mt-3 text-sm text-gray-400">
                <strong>Detalls de la progressió:</strong>
                <ul className="mt-2">
                  {currentQuestion.progression.acords.map((acord: any, i: number) => (
                    <li key={i}>• {acord.acord} ({acord.tipus})</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="text-3xl font-bold text-blue-400 mb-2">7</div>
            <div className="text-gray-300">Modes de Joc</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-2xl border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
            <div className="text-gray-300">Exercicis</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-6 rounded-2xl border border-pink-500/20 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">9966</div>
            <div className="text-gray-300">Progressions Reals</div>
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