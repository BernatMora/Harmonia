
import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Target, Brain, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface StudySession {
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  focus: 'intervals' | 'scales' | 'chords' | 'harmony' | 'mixed';
  goals: string[];
}

interface StudyPlan {
  name: string;
  sessions: StudySession[];
  totalDuration: number;
  description: string;
}

const studyPlans: StudyPlan[] = [
  {
    name: 'Fonaments Bàsics',
    description: 'Perfecte per començar amb la teoria musical',
    totalDuration: 45,
    sessions: [
      {
        duration: 15,
        difficulty: 'beginner',
        focus: 'intervals',
        goals: ['Dominar intervals bàsics', 'Identificar 3es i 5es']
      },
      {
        duration: 15,
        difficulty: 'beginner',
        focus: 'scales',
        goals: ['Construir escales majors', 'Entendre armadures']
      },
      {
        duration: 15,
        difficulty: 'beginner',
        focus: 'chords',
        goals: ['Triades bàsiques', 'Inversions simples']
      }
    ]
  },
  {
    name: 'Harmonia Intermèdia',
    description: 'Progressions i acords més complexos',
    totalDuration: 60,
    sessions: [
      {
        duration: 20,
        difficulty: 'intermediate',
        focus: 'chords',
        goals: ['Acords de 7a', 'Extensions bàsiques']
      },
      {
        duration: 20,
        difficulty: 'intermediate',
        focus: 'harmony',
        goals: ['Progressions I-IV-V', 'Cadències']
      },
      {
        duration: 20,
        difficulty: 'intermediate',
        focus: 'mixed',
        goals: ['Integrar conceptes', 'Aplicació pràctica']
      }
    ]
  },
  {
    name: 'Mestre Avançat',
    description: 'Per a músics experimentats que volen perfeccionar-se',
    totalDuration: 90,
    sessions: [
      {
        duration: 30,
        difficulty: 'advanced',
        focus: 'harmony',
        goals: ['Substitucions tritonals', 'Dominants secundaris']
      },
      {
        duration: 30,
        difficulty: 'advanced',
        focus: 'mixed',
        goals: ['Harmonia modal', 'Reharmonització']
      },
      {
        duration: 30,
        difficulty: 'expert',
        focus: 'mixed',
        goals: ['Harmonia negativa', 'Conceptes contemporanis']
      }
    ]
  }
];

const spacedRepetitionIntervals = [1, 3, 7, 14, 30]; // dies

export default function StudyMode() {
  const { gameStats, userProgress } = useGame();
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [studyNotes, setStudyNotes] = useState<{[key: string]: string}>({});
  const [reminders, setReminders] = useState<string[]>([]);

  // Timer per la sessió d'estudi
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStudying && currentSession) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          if (prev >= currentSession.duration * 60) {
            setIsStudying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying, currentSession]);

  // Algorisme de repetició espaciada
  const getNextReviewDate = (concept: string, performance: number) => {
    const lastReview = localStorage.getItem(`lastReview_${concept}`);
    const reviewCount = parseInt(localStorage.getItem(`reviewCount_${concept}`) || '0');
    
    let intervalIndex = Math.min(reviewCount, spacedRepetitionIntervals.length - 1);
    if (performance < 3) intervalIndex = Math.max(0, intervalIndex - 1);
    
    const nextInterval = spacedRepetitionIntervals[intervalIndex];
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + nextInterval);
    
    return nextReview;
  };

  // Recomanacions personalitzades basades en rendiment
  const getPersonalizedRecommendations = () => {
    const accuracy = Object.values(userProgress).reduce((acc, level: any) => {
      return acc + (level.score / (level.attempts * 100) || 0);
    }, 0) / Object.keys(userProgress).length || 0;

    if (accuracy < 0.6) {
      return {
        plan: studyPlans[0],
        reason: 'Et recomano començar pels fonaments per consolidar la base.'
      };
    } else if (accuracy < 0.8) {
      return {
        plan: studyPlans[1],
        reason: 'Estàs preparat per a conceptes d\'harmonia més avançats.'
      };
    } else {
      return {
        plan: studyPlans[2],
        reason: 'Excel·lent rendiment! És hora de dominar la teoria avançada.'
      };
    }
  };

  const recommendation = getPersonalizedRecommendations();

  const startSession = (session: StudySession) => {
    setCurrentSession(session);
    setSessionTime(0);
    setIsStudying(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <h2 className="text-white font-semibold mb-4 flex items-center">
        <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
        Mode d'Estudi Personalitzat
      </h2>

      {/* Recomanació IA */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
        <h3 className="text-blue-400 font-semibold mb-2 flex items-center">
          <Brain className="w-4 h-4 mr-1" />
          Recomanació Personalitzada
        </h3>
        <div className="text-white mb-2 font-medium">{recommendation.plan.name}</div>
        <p className="text-white/70 text-sm mb-3">{recommendation.reason}</p>
        <button 
          onClick={() => setSelectedPlan(recommendation.plan)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
        >
          Seguir Recomanació
        </button>
      </div>

      {/* Sessió activa */}
      {currentSession && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-green-400 font-semibold flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Sessió Activa: {currentSession.focus.charAt(0).toUpperCase() + currentSession.focus.slice(1)}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setIsStudying(!isStudying)}
                className={`p-2 rounded ${isStudying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
              >
                {isStudying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setCurrentSession(null);
                  setIsStudying(false);
                  setSessionTime(0);
                }}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Progress timer */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-white/70 mb-1">
              <span>{formatTime(sessionTime)}</span>
              <span>{formatTime(currentSession.duration * 60)}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((sessionTime / (currentSession.duration * 60)) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Objectius de la sessió */}
          <div>
            <h4 className="text-white text-sm font-medium mb-2">Objectius d'aquesta sessió:</h4>
            <ul className="space-y-1">
              {currentSession.goals.map((goal, index) => (
                <li key={index} className="text-green-200 text-sm flex items-center">
                  <Target className="w-3 h-3 mr-2" />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Plans d'estudi */}
      <div className="mb-6">
        <h3 className="text-white/80 text-sm font-medium mb-3">Plans d'Estudi Disponibles</h3>
        <div className="space-y-3">
          {studyPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedPlan?.name === plan.name 
                  ? 'bg-blue-500/20 border-blue-500/40' 
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{plan.name}</h4>
                <span className="text-blue-400 text-sm">{plan.totalDuration} min</span>
              </div>
              <p className="text-white/70 text-sm mb-2">{plan.description}</p>
              <div className="text-xs text-white/60">
                {plan.sessions.length} sessions • Nivells: {plan.sessions.map(s => s.difficulty).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions del pla seleccionat */}
      {selectedPlan && (
        <div className="mb-6">
          <h3 className="text-white/80 text-sm font-medium mb-3">
            Sessions de "{selectedPlan.name}"
          </h3>
          <div className="space-y-2">
            {selectedPlan.sessions.map((session, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">
                      Sessió {index + 1}: {session.focus.charAt(0).toUpperCase() + session.focus.slice(1)}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      session.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      session.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      session.difficulty === 'advanced' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {session.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">{session.duration} min</span>
                    <button
                      onClick={() => startSession(session)}
                      disabled={isStudying}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white text-sm rounded transition-colors"
                    >
                      Començar
                    </button>
                  </div>
                </div>
                <div className="text-xs text-white/70">
                  Objectius: {session.goals.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes d'estudi */}
      <div>
        <h3 className="text-white/80 text-sm font-medium mb-3 flex items-center">
          <Settings className="w-4 h-4 mr-1" />
          Notes d'Estudi
        </h3>
        <textarea
          placeholder="Escriu les teves notes i reflexions sobre l'aprenentatge..."
          className="w-full h-20 p-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/50 resize-none focus:outline-none focus:border-blue-500/50"
          value={studyNotes.general || ''}
          onChange={(e) => setStudyNotes({...studyNotes, general: e.target.value})}
        />
      </div>
    </div>
  );
}
