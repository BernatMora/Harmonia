import React, { useState, useEffect } from 'react';
import { Gamepad2, Heart, Zap } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const allQuestions = [
  // Harmonia negativa
  { q: 'En harmonia negativa, quin acord correspon a Cmaj7?', a: 'Fm(maj7)', options: ['Fm(maj7)', 'F7', 'Fmaj7', 'Fm7'] },
  { q: 'L\'acord negatiu de G7 és:', a: 'Fm7', options: ['Fm7', 'Gm7', 'F7', 'Cm7'] },
  { q: 'En el sistema negatiu, ii-V-I es converteix en:', a: 'bII-bV-I', options: ['bII-bV-I', 'ii-bV-I', 'bII-V-bI', 'ii-V-bI'] },
  
  // Upper structures i extensions
  { q: 'Un C13#11 conté quines tensions?', a: '7, 9, #11, 13', options: ['7, 9, #11, 13', '7, 9, 11, 13', '7, b9, #11, 13', '9, #11, 13'] },
  { q: 'L\'upper structure triad de G13 sobre la fundamental és:', a: 'D major', options: ['D major', 'Em', 'Am', 'F major'] },
  { q: 'Quin acord conté la tètrada F#7alt?', a: 'F#-A#-C#-E', options: ['F#-A#-C#-E', 'F#-A#-C-E', 'F#-A-C#-E', 'F#-A#-C#-Eb'] },
  
  // Voice leading avançat
  { q: 'En voice leading cromàtic, C-Dm-G7-C, la millor conducció del Do és:', a: 'C-D-B-C', options: ['C-D-B-C', 'C-D-D-C', 'C-C-B-C', 'C-F-B-C'] },
  { q: 'El moviment òptim entre Cmaj7 i Am7 és:', a: 'Moviment cromàtic descendent', options: ['Moviment cromàtic descendent', 'Salts de 4a', 'Movement per graus sencers', 'Moviment paral·lel'] },
  
  // Substitucions tritonals i alteracions
  { q: 'La substitució tritonal de D7 és:', a: 'Ab7', options: ['Ab7', 'G7', 'Eb7', 'A7'] },
  { q: 'Un acord alt dominant conté:', a: 'b9, #9, #11, b13', options: ['b9, #9, #11, b13', '9, #11, 13', 'b9, 11, b13', '#9, #11, 13'] },
  { q: 'En Giant Steps, la progressió B-D7-G és:', a: 'Cicle de terceres majors', options: ['Cicle de terceres majors', 'ii-V-I relatiu', 'Progressió modal', 'Cadència plagal'] },
  
  // Modes i escales avançades
  { q: 'L\'escala bebop dominant té quina nota cromàtica afegida?', a: '7a major', options: ['7a major', '4a augmentada', '2a menor', '6a menor'] },
  { q: 'El mode lidio b7 correspon a:', a: '4t grau de menor melòdica', options: ['4t grau de menor melòdica', '7è grau de major', '5è grau de harmònica', '3r grau de menor natural'] },
  { q: 'Quin mode s\'usa sobre m(maj7)?', a: 'Menor melòdica', options: ['Menor melòdica', 'Dòric', 'Menor harmònica', 'Eòlic'] },
  
  // Anàlisi funcional avançada
  { q: 'En anàlisi funcional, bVImaj7 és:', a: 'Napolitana major', options: ['Napolitana major', 'Substitució tritonal', 'Mediante cromàtica', 'Acord pívot'] },
  { q: 'La funció de #IVdim7 és:', a: 'Dominant secundari de V', options: ['Dominant secundari de V', 'Substitut de ii7', 'Acord de pas', 'Mediante augmentada'] },
  
  // Progressions de jazz standards
  { q: 'La progressió "Rhythm Changes" en Bb és:', a: 'Bb-G7-Cm7-F7', options: ['Bb-G7-Cm7-F7', 'Bb-Dm7-G7-Cm7', 'Bb-F7-Bb-G7', 'Bb-Eb-F7-Bb'] },
  { q: 'En "All The Things You Are", la modulació va de:', a: 'Ab a C a Eb', options: ['Ab a C a Eb', 'C a F a Bb', 'F a A a D', 'Bb a D a F'] },
  
  // Acords quartals i híbrids
  { q: 'Un acord quartal en C és:', a: 'C-F-Bb', options: ['C-F-Bb', 'C-E-G', 'C-F-G', 'C-D-G'] },
  { q: 'L\'acord híbrid D/F# indica:', a: 'D major amb F# al baix', options: ['D major amb F# al baix', 'F# menor sobre D', 'D7 amb F# afegit', 'Acord diminuït'] },
  
  // Reharmonització
  { q: 'Per reharmonitzar Cmaj7, una opció cromàtica és:', a: 'C#dim7', options: ['C#dim7', 'Dm7', 'Em7', 'Am7'] },
  { q: 'La reharmonització per substitució de Am7 pot ser:', a: 'C6/A', options: ['C6/A', 'F/A', 'Dm/A', 'G/A'] },
  
  // Conceptes de Coltrane
  { q: 'Els "Coltrane Changes" utilitzen:', a: 'Terceres majors descendents', options: ['Terceres majors descendents', 'Quintes ascendents', 'Segments cromàtics', 'Cicles de quinzes'] },
  { q: 'En "Giant Steps", després de B7 ve:', a: 'E', options: ['E', 'G', 'D', 'F#'] },
  
  // Tensions i disponibilitat
  { q: 'Sobre Dm7, quines tensions són disponibles?', a: '9, 11, 13', options: ['9, 11, 13', 'b9, 11, b13', '9, #11, 13', 'b9, #11, b13'] },
  { q: 'Un acord maj7#5 conté:', a: '1, 3, #5, 7', options: ['1, 3, #5, 7', '1, 3, 5, #7', '1, #3, 5, 7', '1, 3, 5, 7'] },
  
  // Intercanvi modal
  { q: 'De C menor natural, quin acord prenem?', a: 'Ab, Bb7, Fm', options: ['Ab, Bb7, Fm', 'Eb, F7, Gm', 'Db, Eb7, Abm', 'F, G7, Am'] },
  { q: 'El bVII7 en Do major és:', a: 'Bb7', options: ['Bb7', 'Ab7', 'F7', 'Eb7'] },
  
  // Politonalitat i conceptes avançats
  { q: 'Dos acords politonals simultanis poden ser:', a: 'Cmaj7 + F#maj7', options: ['Cmaj7 + F#maj7', 'Cmaj7 + Gmaj7', 'Cmaj7 + Dmaj7', 'Cmaj7 + Amaj7'] },
  { q: 'Un clúster de segons és:', a: 'C-D-E tocats junts', options: ['C-D-E tocats junts', 'C-E-G alternats', 'C-F-Bb en arpegi', 'C-G-D superposats'] },
  
  // Extensions cromàtiques
  { q: 'L\'escala cromàtica entre Cmaj7-Am7 inclou:', a: 'Totes les 12 notes', options: ['Totes les 12 notes', 'Només diatòniques', '7 notes selectes', 'Pentatòniques'] },
  { q: 'Una aproximació cromàtica a G des de baix és:', a: 'F#-G', options: ['F#-G', 'F-G', 'E-G', 'Ab-G'] }
];

export default function ArcadeGame() {
  const { completeExercise, addAchievement } = useGame();
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionPool, setQuestionPool] = useState<any[]>([]);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      loseLife();
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setLives(3);
    setScore(0);
    setLevel(1);
    setCurrentQuestion(0);
    setStartTime(Date.now());
    // Sempre generar noves preguntes quan es comença
    generateQuestions();
    setTimeLeft(10);
  };

  const generateQuestions = () => {
    // Seleccionar 10 preguntes aleatòries del pool total amb millor barreja
    const shuffled = [...allQuestions];
    
    // Algoritme Fisher-Yates per millor aleatorietat
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    const selectedQuestions = shuffled.slice(0, 10);
    setQuestionPool(selectedQuestions);
  };

  const loseLife = () => {
    const newLives = lives - 1;
    setLives(newLives);
    
    if (newLives <= 0) {
      setGameOver(true);
      setIsPlaying(false);
    } else {
      nextQuestion();
    }
  };

  const handleAnswer = (answer: string) => {
    const question = questionPool[currentQuestion];
    if (answer === question.a) {
      const points = Math.max(1, timeLeft) * level * 10;
      setScore(score + points);
      
      // Augmentar nivell cada 5 preguntes correctes
      if ((score + points) % 500 === 0) {
        setLevel(level + 1);
      }
      
      nextQuestion();
    } else {
      loseLife();
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questionPool.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Regenerar noves preguntes quan s'acaben
      generateQuestions();
      setCurrentQuestion(0);
    }
    
    // Temps decreix amb el nivell
    setTimeLeft(Math.max(5, 15 - level));
  };

  if (gameOver) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <Gamepad2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Game Over!</CardTitle>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-white">Puntuació Final: {score}</p>
            <p className="text-yellow-400">Nivell Assolit: {level}</p>
          </div>
          <Button
            onClick={startGame}
            className="bg-red-500 hover:bg-red-600 text-white font-bold"
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
          <Gamepad2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Mode Arcade</CardTitle>
          <p className="text-gray-300 mb-6">Supervivència musical! Respon correctament o perd vides! 🎮</p>
          <div className="text-gray-400 text-sm mb-6 space-y-1">
            <p>• 3 vides per començar</p>
            <p>• El temps disminueix cada nivell</p>
            <p>• Més punts per respostes ràpides</p>
          </div>
          <Button
            onClick={startGame}
            className="bg-red-500 hover:bg-red-600 text-white font-bold text-lg"
            size="lg"
          >
            Començar Arcade
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questionPool[currentQuestion];
  if (!question) return null;

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardContent className="p-6">
        {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-500'}`} 
              />
            ))}
          </div>
          <div className="text-white">
            <span className="font-bold">Nivell {level}</span>
          </div>
        </div>
        <div className="text-white font-bold">
          {score} punts
        </div>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-bold">{timeLeft}s</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ${
              timeLeft > 5 ? 'bg-green-400' : timeLeft > 2 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${(timeLeft / (15 - level)) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">{question.q}</h3>
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-semibold transition-all hover:scale-105"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Level Progress */}
      <div className="text-center">
        <p className="text-white/60 text-sm">
          Punts per al següent nivell: {500 - (score % 500)}
        </p>
      </div>
      </CardContent>
    </Card>
  );
}