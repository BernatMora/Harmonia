import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { levels } from '../data/levels';
import ExerciseCard from './ExerciseCard';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function GameArea() {
  const { currentLevel, currentExercise, dispatch } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const level = levels.find(l => l.id === currentLevel);
  const exercise = level?.exercises[currentExercise];

  if (!level || !exercise) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center">
        <p className="text-white/60">Selecciona un nivell per començar</p>
      </div>
    );
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    const correct = selectedAnswer === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      dispatch({ type: 'COMPLETE_EXERCISE', payload: { score: 100, time: 0 } });
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    
    if (currentExercise < level.exercises.length - 1) {
      dispatch({ type: 'SET_EXERCISE', payload: currentExercise + 1 });
    } else {
      // Complete level
      dispatch({ type: 'COMPLETE_LEVEL', payload: { levelId: currentLevel, score: 1000 } });
      if (currentLevel < levels.length) {
        dispatch({ type: 'SET_LEVEL', payload: currentLevel + 1 });
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
      {/* Level Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="level-badge px-3 py-1 rounded-full text-sm font-bold text-white">
            Nivell {level.id}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">{level.title}</h2>
        </div>
        <p className="text-sm sm:text-base text-white/60">{level.description}</p>
        <div className="mt-2 text-sm text-white/40">
          Exercici {currentExercise + 1} de {level.exercises.length}
        </div>
      </div>

      {/* Exercise Content */}
      <ExerciseCard exercise={exercise} />

      {/* Answer Options */}
      {exercise.options && (
        <div className="mt-4 sm:mt-6">
          <h3 className="text-white font-semibold mb-3">Selecciona la resposta correcta:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                  selectedAnswer === option
                    ? showResult
                      ? isCorrect && selectedAnswer === option
                        ? 'bg-green-500/20 border-green-400 text-green-200'
                        : !isCorrect && selectedAnswer === option
                        ? 'bg-red-500/20 border-red-400 text-red-200'
                        : 'bg-blue-500/20 border-blue-400'
                      : 'bg-blue-500/20 border-blue-400'
                    : showResult && option === exercise.correctAnswer
                    ? 'bg-green-500/20 border-green-400 text-green-200'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-white/80 font-semibold text-sm flex-shrink-0">
                    {String.fromCharCode(97 + index)}
                  </span>
                  <span className="text-white font-medium text-left">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result Display */}
      {showResult && (
        <div className={`mt-6 p-4 rounded-lg border-2 ${
          isCorrect 
            ? 'bg-green-500/10 border-green-400/30' 
            : 'bg-red-500/10 border-red-400/30'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className={`w-5 h-5 ${isCorrect ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`font-semibold ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
              {isCorrect ? 'Correcte!' : 'Incorrecte'}
            </span>
          </div>
          <p className="text-white/80 mb-4">{exercise.explanation}</p>
          
          <div className="flex gap-3">
            {isCorrect ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                {currentExercise < level.exercises.length - 1 ? 'Següent' : 'Completar Nivell'}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Tornar a intentar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {!showResult && selectedAnswer && (
        <div className="mt-4 sm:mt-6">
          <button
            onClick={handleSubmit}
            className="w-full py-3 sm:py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
          >
            Comprovar Resposta
          </button>
        </div>
      )}
    </div>
  );
}