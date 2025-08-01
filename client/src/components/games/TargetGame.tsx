import React, { useState, useEffect } from 'react';
import { Target, Crosshair } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function TargetGame() {
  const { completeExercise, addAchievement } = useGame();
  const [targetNote, setTargetNote] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setHits(0);
    setMisses(0);
    setTimeLeft(30);
    setStartTime(Date.now());
    generateTarget();
  };

  const generateTarget = () => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setTargetNote(randomNote);
  };

  const handleNoteClick = async (note: string) => {
    if (!isPlaying) return;

    if (note === targetNote) {
      const newScore = score + 10;
      const newHits = hits + 1;
      setScore(newScore);
      setHits(newHits);
      
      // Save progress
      try {
        await completeExercise(10, (Date.now() - startTime) / 1000);
      } catch (error) {
        console.warn('Failed to save exercise progress:', error);
      }
      
      // Check for achievements
      if (newHits >= 20 && hits < 20) {
        try {
          await addAchievement('Tirador Expert - 20 notes encertades');
        } catch (error) {
          console.warn('Failed to save achievement:', error);
        }
      }
      
      generateTarget();
    } else {
      setScore(Math.max(0, score - 5));
      setMisses(misses + 1);
    }
  };

  if (gameOver) {
    const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;
    
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Diana Completada!</CardTitle>
          <div className="space-y-2 mb-6">
            <p className="text-xl text-white">Puntuació Final: {score}</p>
            <p className="text-green-400">✅ Encerts: {hits}</p>
            <p className="text-red-400">❌ Errors: {misses}</p>
            <p className="text-blue-400">📊 Precisió: {accuracy}%</p>
          </div>
          <Button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold"
            size="lg"
          >
            Jugar Altra Vegada
          </Button>
        </CardContent>
      </Card>
    );
  }



  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="text-white">
            <span className="font-bold">⏱️ Temps: {timeLeft}s</span>
          </div>
          <div className="text-white">
            <span className="font-bold">🎯 Punts: {score}</span>
          </div>
        </div>
        <Progress value={(timeLeft / 30) * 100} className="mt-2" />
      </CardHeader>
      
      <CardContent>
        {/* Target Display */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-green-500/20 border-2 border-green-400 rounded-xl p-6 animate-pulse">
            <Crosshair className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-gray-300 text-sm">Objectiu:</p>
              <p className="text-3xl font-bold text-white">{targetNote}</p>
            </div>
          </div>
        </div>

        {/* Note Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
          {notes.map((note) => (
            <Button
              key={note}
              onClick={() => handleNoteClick(note)}
              disabled={!isPlaying}
              className={`p-4 text-lg font-bold mobile-button transition-all duration-200 ${
                note === targetNote
                  ? 'bg-green-600 hover:bg-green-700 text-white ring-2 ring-green-400 animate-pulse'
                  : isPlaying
                  ? 'bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white'
                  : 'bg-slate-800 text-gray-400 cursor-not-allowed'
              }`}
            >
              {note}
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm">
          <span className="text-green-400">✅ Encerts: {hits}</span>
          <span className="text-red-400">❌ Errors: {misses}</span>
          <span className="text-blue-400">📊 Precisió: {hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0}%</span>
        </div>
      </CardContent>
    </Card>
  );
}