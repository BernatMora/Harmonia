import React, { useState, useEffect } from 'react';
import { Clock, Zap, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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
  const { completeExercise, addAchievement } = useGame();
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

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
    const questionTypes = [
      {
        type: 'interval_semitones',
        generate: () => {
          const interval = intervals[Math.floor(Math.random() * intervals.length)];
          const wrongAnswers = intervals.filter(int => int.name !== interval.name)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          return {
            question: `Quants semitons té una ${interval.name}?`,
            hint: `Exemple: ${interval.example}`,
            correct: interval.semitones.toString(),
            options: [interval.semitones, ...wrongAnswers.map(w => w.semitones)]
              .sort(() => 0.5 - Math.random())
              .map(n => n.toString())
          };
        }
      },
      {
        type: 'interval_name',
        generate: () => {
          const interval = intervals[Math.floor(Math.random() * intervals.length)];
          const wrongAnswers = intervals.filter(int => int.name !== interval.name)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          return {
            question: `Quin interval té ${interval.semitones} semitons?`,
            hint: `Pensa en la distància des de C`,
            correct: interval.name,
            options: [interval.name, ...wrongAnswers.map(w => w.name)]
              .sort(() => 0.5 - Math.random())
          };
        }
      },
      {
        type: 'chord_notes',
        generate: () => {
          const chords = [
            { name: 'C major', notes: ['C', 'E', 'G'], hint: 'Acord de Do major' },
            { name: 'G major', notes: ['G', 'B', 'D'], hint: 'Acord de Sol major' },
            { name: 'F major', notes: ['F', 'A', 'C'], hint: 'Acord de Fa major' },
            { name: 'Am', notes: ['A', 'C', 'E'], hint: 'Acord de La menor' }
          ];
          const chord = chords[Math.floor(Math.random() * chords.length)];
          const allNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
          const wrongAnswers = allNotes.filter(note => !chord.notes.includes(note))
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          const correctNote = chord.notes[Math.floor(Math.random() * chord.notes.length)];
          return {
            question: `Quina nota forma part de l'acord ${chord.name}?`,
            hint: chord.hint,
            correct: correctNote,
            options: [correctNote, ...wrongAnswers]
              .sort(() => 0.5 - Math.random())
          };
        }
      }
    ];

    const newQuestions = [];
    for (let i = 0; i < 50; i++) {
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      newQuestions.push(questionType.generate());
    }
    setQuestions(newQuestions);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(60);
    setStartTime(Date.now());
    generateQuestions();
  };

  const handleAnswer = async (answer: string) => {
    const isCorrect = answer === questions[currentQuestion]?.correct;
    const newScore = isCorrect ? score + 10 : score;
    
    if (isCorrect) {
      setScore(newScore);
      // Save each correct answer
      try {
        await completeExercise(10, (Date.now() - startTime) / 1000);
      } catch (error) {
        console.warn('Failed to save exercise progress:', error);
      }
    }
    
    setCurrentQuestion(currentQuestion + 1);
    
    // Check for achievements
    if (newScore >= 100 && score < 100) {
      try {
        await addAchievement('Velocitat Centurió - 100 punts en velocitat');
      } catch (error) {
        console.warn('Failed to save achievement:', error);
      }
    }
  };

  if (gameOver) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Joc Acabat!</CardTitle>
          <p className="text-xl text-white mb-2">Puntuació Final: {score}</p>
          <p className="text-gray-400 mb-6">Preguntes correctes: {score / 10}</p>
          <Button
            onClick={startGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
            size="lg"
          >
            Jugar Altra Vegada
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!isPlaying) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Velocitat Musical</CardTitle>
          <p className="text-gray-300 mb-6">Respon tantes preguntes com puguis en 60 segons!</p>
          <Button
            onClick={startGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg"
            size="lg"
          >
            Començar Joc
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  if (!question) return null;

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{score}</span>
          </div>
        </div>
        <Progress value={(timeLeft / 60) * 100} className="mt-4" />
      </CardHeader>
      
      <CardContent>
        <CardTitle className="text-xl text-white mb-2">{question.question}</CardTitle>
        {question.hint && (
          <p className="text-sm text-gray-400 mb-4 italic">💡 {question.hint}</p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option: string, index: number) => (
            <Button
              key={index}
              onClick={() => handleAnswer(option)}
              variant="outline"
              className="p-4 bg-slate-700/50 hover:bg-slate-600 active:bg-slate-500 border-slate-600 text-white font-semibold h-auto transition-all duration-200 mobile-button"
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}