import React, { useState, useEffect } from 'react';
import { Gamepad2, Heart, Zap } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const questions = [
  { q: 'Quants semitons té una 5a perfecta?', a: '7', options: ['5', '6', '7', '8'] },
  { q: 'Quin acord és C-E-G?', a: 'C major', options: ['C major', 'C menor', 'C7', 'Cdim'] },
  { q: 'Quina escala té 2 sostinguts?', a: 'D major', options: ['G major', 'D major', 'A major', 'E major'] },
  { q: 'Quin interval és C-F?', a: '4a perfecta', options: ['3a major', '4a perfecta', '5a perfecta', '4a augmentada'] },
  { q: 'Quina triada és F-A-C?', a: 'F major', options: ['F major', 'F menor', 'F7', 'Fdim'] }
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
    generateQuestions();
    setTimeLeft(10);
  };

  const generateQuestions = () => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuestionPool(shuffled);
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
      generateQuestions();
      setCurrentQuestion(0);
    }
    
    // Temps decreix amb el nivell
    setTimeLeft(Math.max(5, 15 - level));
  };

  if (gameOver) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Gamepad2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
        <div className="space-y-2 mb-6">
          <p className="text-xl text-white">Puntuació Final: {score}</p>
          <p className="text-yellow-400">Nivell Assolit: {level}</p>
        </div>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors"
        >
          Jugar Altra Vegada
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Gamepad2 className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Mode Arcade</h2>
        <p className="text-white/80 mb-6">Supervivència musical! Respon correctament o perd vides!</p>
        <div className="text-white/60 text-sm mb-6">
          <p>• 3 vides per començar</p>
          <p>• El temps disminueix cada nivell</p>
          <p>• Més punts per respostes ràpides</p>
        </div>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors text-lg"
        >
          Començar Arcade
        </button>
      </div>
    );
  }

  const question = questionPool[currentQuestion];
  if (!question) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
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
    </div>
  );
}