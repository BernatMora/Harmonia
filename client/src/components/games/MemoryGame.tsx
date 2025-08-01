import React, { useState, useEffect } from 'react';
import { Brain, Play, RotateCcw } from 'lucide-react';

const chords = ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'];

export default function MemoryGame() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    addToSequence();
  };

  const addToSequence = () => {
    const newChord = chords[Math.floor(Math.random() * chords.length)];
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

  const handleChordClick = (chord: string) => {
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
      setScore(score + 1);
      setTimeout(() => {
        addToSequence();
      }, 1000);
    }
  };

  if (gameOver) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Joc Acabat!</h2>
        <p className="text-xl text-white mb-2">Puntuació: {score}</p>
        <p className="text-white/60 mb-6">Seqüències completades: {score}</p>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Jugar Altra Vegada
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Memòria Harmònica</h2>
        <p className="text-white/80 mb-6">Recorda i repeteix la seqüència d'acords!</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors text-lg"
        >
          <Play className="w-5 h-5 inline mr-2" />
          Començar Joc
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Nivell {score + 1}</h3>
        <p className="text-white/60">
          {showingSequence ? 'Memoritza la seqüència...' : 
           isPlayerTurn ? 'El teu torn!' : 'Preparant...'}
        </p>
      </div>

      {/* Sequence Display */}
      <div className="mb-6 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {sequence.map((chord, index) => (
            <div
              key={index}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center font-bold ${
                showingSequence ? 'bg-purple-500/30 border-purple-400' : 'bg-white/10 border-white/20'
              }`}
            >
              <span className="text-white text-sm">{chord}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chord Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {chords.map((chord) => (
          <button
            key={chord}
            onClick={() => handleChordClick(chord)}
            disabled={!isPlayerTurn}
            className={`p-4 rounded-lg border-2 font-bold transition-all ${
              isPlayerTurn 
                ? 'bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 text-white' 
                : 'bg-white/5 border-white/10 text-white/50 cursor-not-allowed'
            }`}
          >
            {chord}
          </button>
        ))}
      </div>

      {/* Player Progress */}
      <div className="mt-4 text-center">
        <p className="text-white/60 text-sm">
          Progrés: {playerSequence.length} / {sequence.length}
        </p>
      </div>
    </div>
  );
}