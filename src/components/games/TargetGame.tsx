import React, { useState, useEffect } from 'react';
import { Target, Crosshair } from 'lucide-react';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function TargetGame() {
  const [targetNote, setTargetNote] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

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
    generateTarget();
  };

  const generateTarget = () => {
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    setTargetNote(randomNote);
  };

  const handleNoteClick = (note: string) => {
    if (!isPlaying) return;

    if (note === targetNote) {
      setScore(score + 10);
      setHits(hits + 1);
      generateTarget();
    } else {
      setScore(Math.max(0, score - 5));
      setMisses(misses + 1);
    }
  };

  if (gameOver) {
    const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;
    
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Diana Completada!</h2>
        <div className="space-y-2 mb-6">
          <p className="text-xl text-white">Puntuació: {score}</p>
          <p className="text-green-400">Encerts: {hits}</p>
          <p className="text-red-400">Errors: {misses}</p>
          <p className="text-blue-400">Precisió: {accuracy}%</p>
        </div>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
        >
          Jugar Altra Vegada
        </button>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <Target className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Diana Musical</h2>
        <p className="text-white/80 mb-6">Clica la nota correcta el més ràpid possible!</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors text-lg"
        >
          Començar Joc
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-white">
          <span className="font-bold">Temps: {timeLeft}s</span>
        </div>
        <div className="text-white">
          <span className="font-bold">Punts: {score}</span>
        </div>
      </div>

      {/* Target */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-green-500/20 border-2 border-green-400 rounded-xl p-6">
          <Crosshair className="w-8 h-8 text-green-400" />
          <div>
            <p className="text-white/80 text-sm">Objectiu:</p>
            <p className="text-3xl font-bold text-white">{targetNote}</p>
          </div>
        </div>
      </div>

      {/* Piano Keys */}
      <div className="flex justify-center mb-6">
        <div className="flex">
          {/* White keys */}
          {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
            <button
              key={note}
              onClick={() => handleNoteClick(note)}
              className={`w-12 h-32 bg-white border border-gray-300 hover:bg-gray-100 transition-colors ${
                targetNote === note ? 'ring-4 ring-green-400' : ''
              }`}
            >
              <span className="text-black font-bold text-sm">{note}</span>
            </button>
          ))}
        </div>
        
        {/* Black keys overlay */}
        <div className="flex absolute ml-6">
          {['C#', '', 'D#', '', '', 'F#', '', 'G#', '', 'A#'].map((note, index) => (
            note ? (
              <button
                key={note}
                onClick={() => handleNoteClick(note)}
                className={`w-8 h-20 bg-black hover:bg-gray-800 text-white text-xs font-bold transition-colors ${
                  targetNote === note ? 'ring-4 ring-green-400' : ''
                }`}
                style={{ marginLeft: index === 0 ? '0' : '1rem' }}
              >
                {note}
              </button>
            ) : (
              <div key={index} className="w-8" style={{ marginLeft: '1rem' }} />
            )
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-sm">
        <span className="text-green-400">Encerts: {hits}</span>
        <span className="text-red-400">Errors: {misses}</span>
      </div>
    </div>
  );
}