import React, { useState, useEffect } from 'react';
import { Brain, Play, RotateCcw } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const chords = [
  { name: 'C', color: 'bg-red-500', description: 'Do major' },
  { name: 'Dm', color: 'bg-orange-500', description: 'Re menor' },
  { name: 'Em', color: 'bg-yellow-500', description: 'Mi menor' },
  { name: 'F', color: 'bg-green-500', description: 'Fa major' },
  { name: 'G', color: 'bg-blue-500', description: 'Sol major' },
  { name: 'Am', color: 'bg-purple-500', description: 'La menor' },
  { name: 'Bdim', color: 'bg-pink-500', description: 'Si disminuït' }
];

export default function MemoryGame() {
  const { completeExercise, addAchievement } = useGame();
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setStartTime(Date.now());
    addToSequence();
  };

  const addToSequence = () => {
    const newChord = chords[Math.floor(Math.random() * chords.length)].name;
    const newSequence = [...sequence, newChord];
    setSequence(newSequence);
    setPlayerSequence([]);
    showSequence(newSequence);
  };

  const showSequence = (seq: string[]) => {
    setShowingSequence(true);
    setIsPlayerTurn(false);
    
    seq.forEach((chord, index) => {
      setTimeout(() => {
        // Aquí es podria afegir so o animació
        if (index === seq.length - 1) {
          setTimeout(() => {
            setShowingSequence(false);
            setIsPlayerTurn(true);
          }, 800);
        }
      }, (index + 1) * 800);
    });
  };

  const handleChordClick = async (chord: string) => {
    if (!isPlayerTurn) return;

    const newPlayerSequence = [...playerSequence, chord];
    setPlayerSequence(newPlayerSequence);

    // Comprovar si la seqüència és correcta
    if (chord !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    // Si ha completat la seqüència
    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      
      // Save progress
      try {
        await completeExercise(20, (Date.now() - startTime) / 1000);
      } catch (error) {
        console.warn('Failed to save exercise progress:', error);
      }
      
      // Check for achievements
      if (newScore >= 10 && score < 10) {
        try {
          await addAchievement('Mestre de la Memòria - 10 nivells completats');
        } catch (error) {
          console.warn('Failed to save achievement:', error);
        }
      }
      
      setTimeout(() => {
        addToSequence();
      }, 1000);
    }
  };

  if (gameOver) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Joc Acabat!</CardTitle>
          <p className="text-xl text-white mb-2">Puntuació: {score}</p>
          <p className="text-gray-400 mb-6">Seqüències completades: {score}</p>
          <Button
            onClick={startGame}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
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
          <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <CardTitle className="text-2xl text-white mb-4">Memòria Harmònica</CardTitle>
          <p className="text-gray-300 mb-6">Recorda i repeteix la seqüència d'acords!</p>
          <Button
            onClick={startGame}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-lg"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            Començar Joc
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader className="text-center">
        <CardTitle className="text-xl text-white">Nivell {score + 1}</CardTitle>
        <p className="text-gray-400">
          {showingSequence ? 'Memoritza la seqüència...' : 
           isPlayerTurn ? 'El teu torn!' : 'Preparant...'}
        </p>
      </CardHeader>

      <CardContent>
        {/* Sequence Display */}
        <div className="mb-6 text-center">
          <div className="flex justify-center gap-2 mb-4">
            {sequence.map((chord, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold ${
                  showingSequence ? 'bg-purple-500/30 border-purple-400' : 'bg-slate-700/50 border-slate-600'
                }`}
              >
                <span className="text-white text-sm">{chord}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chord Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {chords.map((chord) => (
            <Button
              key={chord.name}
              onClick={() => handleChordClick(chord.name)}
              disabled={!isPlayerTurn}
              variant="outline"
              className={`p-4 font-bold h-auto mobile-button transition-all duration-200 ${
                showingSequence && sequence[sequence.length - 1] === chord.name
                  ? `${chord.color} text-white shadow-lg scale-105`
                  : isPlayerTurn 
                  ? 'bg-slate-700/50 hover:bg-slate-600 active:bg-slate-500 border-slate-600 text-white' 
                  : 'bg-slate-800/50 border-slate-700 text-gray-500 cursor-not-allowed'
              }`}
              title={chord.description}
            >
              {chord.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}