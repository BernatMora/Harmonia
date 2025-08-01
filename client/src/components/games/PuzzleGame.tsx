import React, { useState } from 'react';
import { Puzzle, CheckCircle, RotateCcw } from 'lucide-react';

const progressions = [
  {
    name: 'I-V-vi-IV (Pop)',
    key: 'C major',
    correct: ['C', 'G', 'Am', 'F'],
    description: 'La progressió més popular en música pop'
  },
  {
    name: 'ii-V-I (Jazz)',
    key: 'C major', 
    correct: ['Dm', 'G', 'C'],
    description: 'Progressió fonamental del jazz'
  },
  {
    name: 'vi-IV-I-V',
    key: 'G major',
    correct: ['Em', 'C', 'G', 'D'],
    description: 'Progressió emotiva molt utilitzada'
  }
];

const availableChords = {
  'C major': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  'G major': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim']
};

export default function PuzzleGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [playerChords, setPlayerChords] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const puzzle = progressions[currentPuzzle];
  const chords = availableChords[puzzle.key as keyof typeof availableChords];

  const addChord = (chord: string) => {
    if (playerChords.length < puzzle.correct.length) {
      const newChords = [...playerChords, chord];
      setPlayerChords(newChords);
      
      if (newChords.length === puzzle.correct.length) {
        checkSolution(newChords);
      }
    }
  };

  const removeChord = (index: number) => {
    const newChords = playerChords.filter((_, i) => i !== index);
    setPlayerChords(newChords);
    setIsComplete(false);
  };

  const checkSolution = (chords: string[]) => {
    const isCorrect = chords.every((chord, index) => chord === puzzle.correct[index]);
    if (isCorrect) {
      setIsComplete(true);
      setScore(score + 100);
    }
  };

  const nextPuzzle = () => {
    if (currentPuzzle < progressions.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setPlayerChords([]);
      setIsComplete(false);
    } else {
      // Reiniciar joc
      setCurrentPuzzle(0);
      setPlayerChords([]);
      setIsComplete(false);
      setScore(0);
    }
  };

  const resetPuzzle = () => {
    setPlayerChords([]);
    setIsComplete(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Puzzle className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Trencaclosques Tonal</h2>
        </div>
        <div className="text-white font-bold">Punts: {score}</div>
      </div>

      {/* Puzzle Info */}
      <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-400/30 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-2">{puzzle.name}</h3>
        <p className="text-indigo-200 text-sm mb-2">Tonalitat: {puzzle.key}</p>
        <p className="text-white/80 text-sm">{puzzle.description}</p>
      </div>

      {/* Player's Progression */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">La teva progressió:</h4>
        <div className="flex gap-2 mb-4 min-h-[60px] p-4 bg-white/5 rounded-lg border-2 border-dashed border-white/20">
          {playerChords.map((chord, index) => (
            <button
              key={index}
              onClick={() => removeChord(index)}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-colors"
            >
              {chord}
            </button>
          ))}
          {playerChords.length === 0 && (
            <p className="text-white/40 italic">Clica els acords de sota per construir la progressió</p>
          )}
        </div>
      </div>

      {/* Available Chords */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Acords disponibles:</h4>
        <div className="grid grid-cols-4 gap-2">
          {chords.map((chord) => (
            <button
              key={chord}
              onClick={() => addChord(chord)}
              disabled={playerChords.length >= puzzle.correct.length}
              className="p-3 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 border border-white/20 rounded-lg text-white font-semibold transition-colors"
            >
              {chord}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {isComplete && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-200 font-semibold">Correcte!</span>
          </div>
          <p className="text-white/80 text-sm mb-4">
            Has construït correctament la progressió {puzzle.name}!
          </p>
          <button
            onClick={nextPuzzle}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
          >
            {currentPuzzle < progressions.length - 1 ? 'Següent Trencaclosques' : 'Reiniciar Joc'}
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={resetPuzzle}
          className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reiniciar
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          Trencaclosques {currentPuzzle + 1} de {progressions.length}
        </p>
      </div>
    </div>
  );
}