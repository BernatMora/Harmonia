import React, { useState, useEffect } from 'react';
import { Clock, Zap, Trophy } from 'lucide-react';

const intervals = [
  { name: '2a major', semitones: 2, example: 'C-D' },
  { name: '3a major', semitones: 4, example: 'C-E' },
  { name: '4a perfecta', semitones: 5, example: 'C-F' },
  { name: '5a perfecta', semitones: 7, example: 'C-G' },
  { name: '6a major', semitones: 9, example: 'C-A' },
  { name: '7a major', semitones: 11, example: 'C-B' },
  { name: '3a menor', semitones: 3, example: 'C-E♭' },
  { name: '6a menor', semitones: 8, example: 'C-A♭' },
];

export default function SpeedGame() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    generateQuestions();
  }, []);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < 50; i++) {
      const interval = intervals[Math.floor(Math.random() * intervals.length)];
      const wrongAnswers = intervals.filter(int => int.name !== interval.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      newQuestions.push({
        question: `Quants semitons té una ${interval.name}?`,
        correct: interval.semitones.toString(),
        options: [interval.semitones, ...wrongAnswers.map(w => w.semitones)]
          .sort(() => 0.5 - Math.random())
          .map(n => n.toString())
      });
    }
    setQuestions(newQuestions);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(60);
    generateQuestions();
  };

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion]?.correct) {
      setScore(score + 10);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  if (gameOver) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Joc Acabat!</h2>
        <p className="text-xl text-white mb-2">Puntuació Final: {score}</p>
        <p className="text-white/60 mb-6">Preguntes correctes: {score / 10}</p>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors"
        >
          Jugar Altra Vegada
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Velocitat Musical</h2>
        <p className="text-white/80 mb-6">Respon tantes preguntes com puguis en 60 segons!</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition-colors text-lg"
        >
          Començar Joc
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{score}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-white/10 rounded-full h-2 mb-6">
        <div 
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">{question.question}</h3>
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}