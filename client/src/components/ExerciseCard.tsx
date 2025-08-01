import React from 'react';
import { Music, Eye, Ear, Edit } from 'lucide-react';
import { Exercise } from '../data/levels';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'identify':
        return <Eye className="w-5 h-5" />;
      case 'listen':
        return <Ear className="w-5 h-5" />;
      case 'construct':
        return <Edit className="w-5 h-5" />;
      default:
        return <Music className="w-5 h-5" />;
    }
  };

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'identify':
        return 'Identificació';
      case 'listen':
        return 'Audició';
      case 'construct':
        return 'Construcció';
      default:
        return 'Exercici';
    }
  };

  return (
    <div className="exercise-card bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
      {/* Exercise Type Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm">
          {getExerciseIcon(exercise.type)}
          <span>{getExerciseTypeLabel(exercise.type)}</span>
        </div>
      </div>

      {/* Exercise Question */}
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-3">{exercise.question}</h3>
        
        {exercise.example && (
          <div className="bg-black/20 rounded-lg p-4 border border-white/10">
            <p className="text-white/80 text-sm mb-2">Exemple:</p>
            <p className="text-white font-mono text-sm sm:text-base">{exercise.example}</p>
          </div>
        )}
      </div>

      {/* Exercise Content */}
      {exercise.content && (
        <div className="mb-4">
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-lg p-3 sm:p-4">
            <p className="text-amber-200 text-sm sm:text-base">{exercise.content}</p>
          </div>
        </div>
      )}

      {/* Hints */}
      {exercise.hint && (
        <div className="mb-4">
          <details className="group">
            <summary className="cursor-pointer text-white/60 hover:text-white/80 transition-colors text-xs sm:text-sm">
              💡 Pista (clica per veure)
            </summary>
            <div className="mt-2 text-white/70 text-xs sm:text-sm bg-white/5 p-3 rounded-lg">
              {exercise.hint}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}