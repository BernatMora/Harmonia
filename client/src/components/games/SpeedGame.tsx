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
      // Harmonia negativa
      {
        type: 'negative_harmony',
        generate: () => {
          const pairs = [
            { original: 'Cmaj7', negative: 'Fm(maj7)' },
            { original: 'G7', negative: 'Fm7' },
            { original: 'Am7', negative: 'Bbmaj7' },
            { original: 'F', negative: 'Gm' },
            { original: 'Dm7', negative: 'Cmaj7' }
          ];
          const pair = pairs[Math.floor(Math.random() * pairs.length)];
          const wrong = pairs.filter(p => p.negative !== pair.negative).slice(0, 3);
          return {
            question: `En harmonia negativa, ${pair.original} es converteix en:`,
            hint: `Reflexió sobre l'eix C`,
            correct: pair.negative,
            options: [pair.negative, ...wrong.map(w => w.negative)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Upper structures
      {
        type: 'upper_structures',
        generate: () => {
          const chords = [
            { name: 'G13', upper: 'D major', fundamental: 'G7' },
            { name: 'C13#11', upper: 'A major', fundamental: 'C7' },
            { name: 'F13', upper: 'C major', fundamental: 'F7' },
            { name: 'D13#11', upper: 'B major', fundamental: 'D7' }
          ];
          const chord = chords[Math.floor(Math.random() * chords.length)];
          const wrong = chords.filter(c => c.upper !== chord.upper).slice(0, 3);
          return {
            question: `L'upper structure triad de ${chord.name} és:`,
            hint: `Tètrada major sobre la 5a del dominant`,
            correct: chord.upper,
            options: [chord.upper, ...wrong.map(w => w.upper)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Substitucions tritonals
      {
        type: 'tritone_substitution',
        generate: () => {
          const subs = [
            { original: 'G7', tritone: 'Db7' },
            { original: 'D7', tritone: 'Ab7' },
            { original: 'A7', tritone: 'Eb7' },
            { original: 'E7', tritone: 'Bb7' },
            { original: 'B7', tritone: 'F7' }
          ];
          const sub = subs[Math.floor(Math.random() * subs.length)];
          const wrong = subs.filter(s => s.tritone !== sub.tritone).slice(0, 3);
          return {
            question: `La substitució tritonal de ${sub.original} és:`,
            hint: `b5 del dominant original`,
            correct: sub.tritone,
            options: [sub.tritone, ...wrong.map(w => w.tritone)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Modes avançats
      {
        type: 'advanced_modes',
        generate: () => {
          const modes = [
            { chord: 'Cm(maj7)', mode: 'Menor melòdica' },
            { chord: 'C7#11', mode: 'Lidi dominant' },
            { chord: 'Cm7b5', mode: 'Locri' },
            { chord: 'Cmaj7#5', mode: 'Lidi augmentat' }
          ];
          const mode = modes[Math.floor(Math.random() * modes.length)];
          const wrong = modes.filter(m => m.mode !== mode.mode).slice(0, 3);
          return {
            question: `Sobre ${mode.chord} s'utilitza:`,
            hint: `Mode específic per aquesta sonoritat`,
            correct: mode.mode,
            options: [mode.mode, ...wrong.map(w => w.mode)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Voice leading cromàtic
      {
        type: 'voice_leading',
        generate: () => {
          const progressions = [
            { progression: 'Cmaj7-C#dim7-Dm7', movement: 'Cromàtic ascendent al baix' },
            { progression: 'Am7-Ab7-Gmaj7', movement: 'Substitució tritonal' },
            { progression: 'Cmaj7-E7/B-Am7', movement: 'Línia cromàtica descendent' },
            { progression: 'Fmaj7-B7-Em7', movement: 'Modulació per terceres' }
          ];
          const prog = progressions[Math.floor(Math.random() * progressions.length)];
          const wrong = progressions.filter(p => p.movement !== prog.movement).slice(0, 3);
          return {
            question: `En ${prog.progression}, el voice leading és:`,
            hint: `Analitza el moviment melòdic`,
            correct: prog.movement,
            options: [prog.movement, ...wrong.map(w => w.movement)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Tensions disponibles
      {
        type: 'available_tensions',
        generate: () => {
          const chords = [
            { name: 'Cmaj7', tensions: '9, #11, 13' },
            { name: 'Dm7', tensions: '9, 11, 13' },
            { name: 'G7alt', tensions: 'b9, #9, #11, b13' },
            { name: 'Am7b5', tensions: 'b9, 11, b13' }
          ];
          const chord = chords[Math.floor(Math.random() * chords.length)];
          const wrong = chords.filter(c => c.tensions !== chord.tensions).slice(0, 3);
          return {
            question: `Tensions disponibles sobre ${chord.name}:`,
            hint: `Evita avoid notes`,
            correct: chord.tensions,
            options: [chord.tensions, ...wrong.map(w => w.tensions)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Giant Steps analysis
      {
        type: 'giant_steps',
        generate: () => {
          const segments = [
            { start: 'B', next: 'D7', analysis: 'Tercera major descendent' },
            { start: 'G', next: 'Bb7', analysis: 'Tercera major descendent' },
            { start: 'Eb', next: 'F#7', analysis: 'Tercera major descendent' },
            { start: 'B7', next: 'E', analysis: 'Resolució dominant-tònica' }
          ];
          const segment = segments[Math.floor(Math.random() * segments.length)];
          const wrong = segments.filter(s => s.analysis !== segment.analysis).slice(0, 3);
          return {
            question: `En Giant Steps, ${segment.start} a ${segment.next} és:`,
            hint: `Patró de Coltrane Changes`,
            correct: segment.analysis,
            options: [segment.analysis, ...wrong.map(w => w.analysis)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Intercanvi modal
      {
        type: 'modal_interchange',
        generate: () => {
          const borrowed = [
            { key: 'C major', chord: 'Ab', from: 'C menor natural' },
            { key: 'F major', chord: 'Db', from: 'F menor natural' },
            { key: 'G major', chord: 'Bb7', from: 'G menor natural' },
            { key: 'D major', chord: 'F', from: 'D menor natural' }
          ];
          const borrow = borrowed[Math.floor(Math.random() * borrowed.length)];
          const wrong = borrowed.filter(b => b.from !== borrow.from).slice(0, 3);
          return {
            question: `${borrow.chord} en ${borrow.key} ve de:`,
            hint: `Intercanvi modal`,
            correct: borrow.from,
            options: [borrow.from, ...wrong.map(w => w.from)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Reharmonització
      {
        type: 'reharmonization',
        generate: () => {
          const reharms = [
            { original: 'C-Am-F-G', new: 'C-A7-Dm-G7alt' },
            { original: 'Dm-G7-C', new: 'Dm-Db7-C' },
            { original: 'F-C', new: 'F-E7-Am-C' },
            { original: 'Am-F', new: 'Am-Ab7-Gmaj7' }
          ];
          const reharm = reharms[Math.floor(Math.random() * reharms.length)];
          const wrong = reharms.filter(r => r.new !== reharm.new).slice(0, 3);
          return {
            question: `Reharmonització de ${reharm.original}:`,
            hint: `Substitucions cromàtiques`,
            correct: reharm.new,
            options: [reharm.new, ...wrong.map(w => w.new)].sort(() => 0.5 - Math.random())
          };
        }
      },

      // Acords quartals
      {
        type: 'quartal_harmony',
        generate: () => {
          const quartals = [
            { root: 'C', quartal: 'C-F-Bb' },
            { root: 'D', quartal: 'D-G-C' },
            { root: 'E', quartal: 'E-A-D' },
            { root: 'F', quartal: 'F-Bb-Eb' }
          ];
          const quartal = quartals[Math.floor(Math.random() * quartals.length)];
          const wrong = quartals.filter(q => q.quartal !== quartal.quartal).slice(0, 3);
          return {
            question: `Acord quartal sobre ${quartal.root}:`,
            hint: `Intervals de 4a pura`,
            correct: quartal.quartal,
            options: [quartal.quartal, ...wrong.map(w => w.quartal)].sort(() => 0.5 - Math.random())
          };
        }
      }
    ];

    // Seleccionar 10 tipus de pregunta aleatòris i generar una pregunta de cada tipus
    const selectedTypes = [...questionTypes].sort(() => 0.5 - Math.random()).slice(0, 10);
    const newQuestions = selectedTypes.map(type => type.generate());

    // Barrejar l'ordre de les preguntes generades
    const shuffledQuestions = newQuestions.sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCurrentQuestion(0);
    setTimeLeft(60);
    setStartTime(Date.now());
    // Sempre generar noves preguntes
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