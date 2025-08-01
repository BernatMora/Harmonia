import { useState, useEffect } from "react";
import { Music, Trophy, BookOpen, Volume2, Target, Puzzle, ArrowLeft, Play, Clock, CheckCircle, XCircle } from "lucide-react";
import { getRandomProgression, getProgressionsByMode, getChordTypes } from "./data/progressions";

type GameMode = 'home' | 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade' | 'harmonia' | 'advanced-theory' | 'composition-lab' | 'analysis-master';

// Contingut educatiu ultra-avançat per cada joc
const gameContent = {
  theory: [
    {
      question: "En la progressió Cmaj7-E7alt-Am7-D7alt-Dm7-G7alt-Cmaj7, el E7alt funciona com:",
      options: ["V7/vi amb altered scale", "Substitució tritònica de Bb7", "Secondary dominant cromàtic", "Intercambio modal"],
      correct: 0,
      explanation: "E7alt és V7/vi (dominant secundari d'Am7) amb escala altered per crear tensió màxima.",
      level: "Master"
    },
    {
      question: "En armonia negativa de C major, la progressió Am7-Dm7-G7-Cmaj7 es transforma en:",
      options: ["Fmaj7-Bmaj7-Fm(maj7)-Fmaj7", "F(maj7)-B(maj7)-F7-Fmaj7", "Fm(maj7)-Bm(maj7)-Fm7-Fmaj7", "Fmaj7-Bmaj7-F(maj7)-Fmaj7"],
      correct: 0,
      explanation: "En negative harmony, cada acord es reflecteix al voltant de l'axis E-Ab: Am7→Fmaj7, Dm7→Bmaj7, G7→Fm(maj7).",
      level: "Master"
    },
    {
      question: "La reharmonització de 'All The Things You Are' primer 8 compassos utilitza:",
      options: ["Tritone subs consecutius", "Coltrane matrix", "Chromatic voice leading", "Quartal harmony"],
      correct: 2,
      explanation: "ATTYA usa chromatic voice leading: Fm7-Bb7/D-EbMaj7-AbMaj7 amb baixos cromàtics F-D-Eb-Ab.",
      level: "Professional"
    },
    {
      question: "Sobre Cmaj7#11, l'upper structure triad més efectiu és:",
      options: ["D/C", "F#dim/C", "Em/C", "Bm/C"],
      correct: 0,
      explanation: "D major triad sobre C7 crea C13#11, amb tensions 9(D), #11(F#), 13(A).",
      level: "Expert"
    },
    {
      question: "En Giant Steps, la modulació de B a G segueix el principi:",
      options: ["Cycle of 5ths", "Chromatic mediant", "Major 3rd root motion", "Tritone substitution"],
      correct: 2,
      explanation: "Giant Steps usa major 3rd root motion: B-G-Eb-B, dividint l'octava en tres parts iguals.",
      level: "Professional"
    },
    {
      question: "La progressió Em7b5-A7alt-Dm7-G7-Cmaj7 en minor ii-V indica:",
      options: ["Tonicització de Dm", "Substitució de Am", "Modal interchange", "Relative minor approach"],
      correct: 0,
      explanation: "Em7b5-A7alt és ii-V/ii, tonicitzant Dm7 abans de continuar amb ii-V-I principal.",
      level: "Expert"
    },
    {
      question: "El voicing de Cmaj9 en Drop 2 des de la 5a inversió és:",
      options: ["G-B-D-E", "G-E-B-D", "E-G-B-D", "B-D-E-G"],
      correct: 1,
      explanation: "Drop 2 de Cmaj9 (5a inversió): G al baix, després E-B-D from top-down.",
      level: "Expert"
    },
    {
      question: "En Cherokee Bar 9-12, la progressió Gm7b5-C7-Fm indica:",
      options: ["ii-V-i en F menor", "Tonicització temporal", "Modal shift", "Relative approach"],
      correct: 0,
      explanation: "Gm7b5-C7-Fm és un ii-V-i clàssic en F menor, canvi modal temporal dins Cherokee.",
      level: "Professional"
    },
    {
      question: "L'escala sobre G7alt en resolució a Cmaj7 més apropiada és:",
      options: ["G altered (Ab melodic minor)", "G mixolydian b6", "G whole-half diminished", "G harmonic minor 5th mode"],
      correct: 0,
      explanation: "G altered scale (Ab melodic minor) conté totes les alteracions: b9, #9, #11, b13.",
      level: "Master"
    },
    {
      question: "El polychord Dm/G indica funcionalment:",
      options: ["G11", "G13sus4", "Gmaj9no3", "G7add11"],
      correct: 1,
      explanation: "Dm/G = G13sus4, amb Dm triad (D-F-A) proporcionant 5th, b7th, 9th sobre G.",
      level: "Expert"
    },
    {
      question: "En 'Stella By Starlight', el Gm7b5 funciona com:",
      options: ["ii7b5/V del Bb major", "Modal interchange", "Chromatic approach", "Substitute dominant"],
      correct: 0,
      explanation: "Gm7b5 és ii7b5 que resol a C7, V7 del F major, tonicització clàssica.",
      level: "Professional"
    },
    {
      question: "La progressió Cmaj7-B7-Em7-Eb7-Dm7-G7 usa el principi:",
      options: ["Chromatic root motion", "Circle of 5ths", "Tritone substitution", "Modal interchange"],
      correct: 0,
      explanation: "Root motion cromàtic: C-B-E-Eb-D-G, alternant moviment cromàtic amb resolucions.",
      level: "Master"
    },
    {
      question: "Sobre EMaj7#11, l'upper structure més efectiu és:",
      options: ["F#m/E", "G#dim/E", "Bm/E", "D#m/E"],
      correct: 0,
      explanation: "F#m triad sobre E crea EMaj13#11, amb tensions 9(F#), #11(A#), 13(C#).",
      level: "Expert"
    },
    {
      question: "En análisi de 'Body and Soul', el Ebm6 funciona com:",
      options: ["iv6 en Bb major", "Modal interchange", "Chromatic mediant", "Parallel minor chord"],
      correct: 1,
      explanation: "Ebm6 ve del Bb menor (parallel minor), exemple clàssic d'interchange modal.",
      level: "Professional"
    },
    {
      question: "La resolució de F#ø7-B7alt-Em7 segueix el principi:",
      options: ["ii-V-i relatiu", "Tonicització cromàtica", "Negative harmony", "Modal substitution"],
      correct: 0,
      explanation: "F#ø7-B7alt-Em7 és ii-V-i en Em, tonicització del relatiu menor.",
      level: "Expert"
    }
  ],
  speed: [
    {
      question: "En un ii-V-I en Bb major, el tritó del V7 es resol a:",
      options: ["3a i 7a del Imaj7", "Root i 5a del Imaj7", "9a i 13a del Imaj7", "11a i b13a del Imaj7"],
      correct: 0,
      explanation: "El tritó F-B del F7 es resol a Eb-F (3a i 7a del Bbmaj7).",
      timeLimit: 4
    },
    {
      question: "En Cherokee (Bb), l'acord Gm7b5 funciona com a:",
      options: ["vi7b5/vi", "ii7b5/V", "iii7b5/ii", "iv7b5/I"],
      correct: 1,
      explanation: "Gm7b5 és ii7b5 que resol a C7 (V7/V) creant una progressió secundària.",
      timeLimit: 3
    },
    {
      question: "Quina escala s'usa sobre Am7b5 en un ii-V menor?",
      options: ["A locri", "A frigi", "A dòric b2", "A melòdic menor"],
      correct: 0,
      explanation: "Am7b5 usa A locri (del Bb major) per mantenir les notes del ii-V menor.",
      timeLimit: 4
    },
    {
      question: "En Giant Steps, la progressió B-D7-G utilitza:",
      options: ["Cicle de 5es", "Substitució tritònica", "Coltrane changes", "Intercambio modal"],
      correct: 2,
      explanation: "Coltrane changes: moviment de terceres majors (B-G-Eb) amb dominants intermedis.",
      timeLimit: 5
    },
    {
      question: "Sobre Cmaj7#11, quina escala genera l'#11?",
      options: ["C lidi", "C mixolidi", "C jònic", "C dòric"],
      correct: 0,
      explanation: "C lidi (del G major) conté F# que és l'#11 característica.",
      timeLimit: 3
    },
    {
      question: "En un blues menor, el bVI7 (Ab7 en Cm) és:",
      options: ["Substitució tritònica", "Dominant secundari", "bVII del relatiu major", "Interchange modal"],
      correct: 3,
      explanation: "Ab7 ve del C menor natural (interchange modal del parallel major).",
      timeLimit: 4
    },
    {
      question: "La progressió Cm-F7-Bbmaj7-Ebmaj7 usa el principi de:",
      options: ["Voice leading cromàtic", "Moviment de 4es", "Progressió plagal", "Circle of 5ths"],
      correct: 0,
      explanation: "Voice leading: C-C-Bb-Bb (cromàtic) i Eb-F-F-Eb (stepwise motion).",
      timeLimit: 5
    },
    {
      question: "En 'Autumn Leaves', Am7b5-D7-Gm usa quina relació harmònica?",
      options: ["ii-V-i menor", "iii-VI-ii relatiu", "Tonicització a Gm", "Modulació directa"],
      correct: 0,
      explanation: "ii7b5-V7-i: progressió modal menor clàssica en Gm.",
      timeLimit: 4
    }
  ],
  memory: [
    {
      pattern: ["Cmaj7#11", "A7alt", "Dm7", "G7sus4"],
      description: "Reharmonització de ii-V-I amb extensions",
      difficulty: "Expert"
    },
    {
      pattern: ["Bb", "G7/B", "Cm7", "F7/A", "Dm7b5", "G7", "Cm"],
      description: "Cherokee - primera línia amb voice leading cromàtic",
      difficulty: "Professional"
    },
    {
      pattern: ["Em7b5", "A7alt", "Dm7", "G7", "Cmaj7", "Am7", "D7", "Gmaj7"],
      description: "Rhythm Changes bridge - Giant Steps approach",
      difficulty: "Expert"
    },
    {
      pattern: ["F#ø7", "B7alt", "Em(maj7)", "Em7", "Am7", "D7"],
      description: "ii-V menor amb resolució deceptiva",
      difficulty: "Avançat"
    },
    {
      pattern: ["B", "D7", "G", "Bb7", "Eb", "F#7", "B"],
      description: "Giant Steps - Coltrane matrix complet",
      difficulty: "Professional"
    },
    {
      pattern: ["Cm(maj7)", "F13", "BbMaj7#11", "EbMaj7", "Am7b5", "D7alt"],
      description: "Sophisticat reharmonització amb upper structures",
      difficulty: "Expert"
    },
    {
      pattern: ["DbMaj7", "Gb7#11", "Cmaj7", "E7alt", "Amaj7", "D7sus4", "GMaj7"],
      description: "All The Things You Are - modulació per terceres",
      difficulty: "Professional"
    },
    {
      pattern: ["C7alt", "F7alt", "BbMaj7", "G7#5", "Cm7", "F7", "BbMaj7"],
      description: "Strasbourg/St Denis - tritone substitutions cadenes",
      difficulty: "Master"
    }
  ],
  target: [
    {
      challenge: "Mestre en Armonia Negativa",
      goal: 8,
      reward: "🌑 Master en Negative Harmony",
      questions: [
        { question: "En C major, l'equivalent negatiu de Am7 és:", options: ["Fm7", "Fm(maj7)", "F7", "Fmaj7"], correct: 1 },
        { question: "G7 → Cmaj7 en negatiu és:", options: ["F7 → Cmaj7", "Fm7 → Fmaj7", "Fm(maj7) → Fmaj7", "F7 → Fmaj7"], correct: 2 },
        { question: "El Dm7 negatiu de ii-V-I en C:", options: ["Bmaj7", "Bm(maj7)", "B7", "Bmaj7#11"], correct: 1 },
        { question: "V7/V (D7) en negatiu:", options: ["Bb7", "Bbmaj7", "Bm(maj7)", "Bb(maj7)"], correct: 2 },
        { question: "L'axis tonal en C major està entre:", options: ["G-F", "E-Ab", "D-A", "C-G"], correct: 1 },
        { question: "Em7b5 negatiu en armonia de C:", options: ["Amaj7#11", "A(maj7)", "Am(maj7)", "A7#11"], correct: 0 },
        { question: "Progressió negativa de vi-IV-I-V:", options: ["bIII-bVI-I-bII", "bIII(maj7)-bVImaj7-Imaj7-bII(maj7)", "iii-VI-I-ii", "bIII7-bVI7-I7-bII7"], correct: 1 },
        { question: "F#ø7 negatiu en harmonia C:", options: ["Fm(maj7)", "F(maj7)", "Fmaj7#11", "F7alt"], correct: 0 }
      ]
    },
    {
      challenge: "Expert en Reharmonització Avançada",
      goal: 6,
      reward: "⚡ Reharmonization Genius",
      questions: [
        { question: "Reharmonitza Cmaj7 amb upper structure:", options: ["Em7/C", "G7sus4/C", "Am7/C", "F#ø7/C"], correct: 0 },
        { question: "Substitució tritònica de G7 amb extensions:", options: ["Db13", "Db7alt", "Db7#11", "DbMaj7#11"], correct: 1 },
        { question: "Chromatic voice leading per Dm7-G7-C:", options: ["Dm7-G7/B-C", "Dm7-Db7-C", "D#ø7-G7-C", "Dm7-G7/Ab-C"], correct: 1 },
        { question: "Modal interchange per Am7:", options: ["Amaj7", "Am(maj7)", "A7", "Am7b5"], correct: 1 },
        { question: "Upper structure triad sobre C13:", options: ["Dm/C", "D/C", "Em/C", "F#ø/C"], correct: 1 },
        { question: "Coltrane substitution per V7:", options: ["bII7-V7", "bV7-IV7", "VII7-bVI7", "bIII7-bVI7"], correct: 0 }
      ]
    },
    {
      challenge: "Master en Voice Leading & Counterpoint",
      goal: 7,
      reward: "🎼 Counterpoint Master",
      questions: [
        { question: "En Cmaj7-A7alt-Dm7, el voice leading òptim és:", options: ["C-C#-D", "B-Bb-A", "E-E-F", "G-G-F"], correct: 1 },
        { question: "Parallel motion prohibit en contrapunt:", options: ["5es perfectes", "3es majors", "6es majors", "4es justes"], correct: 0 },
        { question: "Voice leading cromàtic en ii-V:", options: ["Root motion", "3rd-7th resolution", "5th movement", "9th tension"], correct: 1 },
        { question: "En Giant Steps, voice leading entre B-D7:", options: ["F#-F", "D#-D", "B-A", "F#-C"], correct: 2 },
        { question: "Drop 2 voicing de Cmaj9:", options: ["E-G-B-D", "C-E-B-D", "G-B-D-E", "C-B-D-E"], correct: 1 },
        { question: "Leading tone resolution en Bb:", options: ["A→Bb", "F→G", "D→Eb", "C→D"], correct: 0 },
        { question: "Best voice leading Fm7-Bb7-Eb:", options: ["Stepwise motion", "Contrary motion", "Common tones", "Chromatic lines"], correct: 2 }
      ]
    },
    {
      challenge: "Ultimate Jazz Harmony & Modal Theory",
      goal: 10,
      reward: "👑 Supreme Jazz Master",
      questions: [
        { question: "Escala sobre Cmaj7#11 en contexte lidi:", options: ["C lidi", "G major", "F# locri", "D mixolidi"], correct: 0 },
        { question: "Altered scale conté quines alteracions:", options: ["b9,#9,#11,b13", "b9,#9,b13,b7", "b9,#9,#11,b13,b7", "#9,#11,b13"], correct: 0 },
        { question: "Sobre G7alt en ii-V, millor opció:", options: ["G altered", "G mixolidi b6", "G whole-half dim", "Ab lidi b7"], correct: 0 },
        { question: "Quartal harmony sobre Dm7:", options: ["D-G-C-F", "A-D-G-C", "G-C-F-Bb", "F-Bb-Eb-Ab"], correct: 1 },
        { question: "Polychord C/D indica:", options: ["Dmaj9sus4", "D13sus4", "Dmaj13no3", "D7add9"], correct: 1 },
        { question: "Best scale per Am7b5 en ii-V menor:", options: ["A locri #2", "A locri", "A frigi", "A aeoli b5"], correct: 1 },
        { question: "Harmonic minor V7 conté:", options: ["Natural 7th", "b9 i natural 13", "b9,b13", "#5,b9"], correct: 2 },
        { question: "En Cherokee, Gm7b5-C7 analitzar com:", options: ["ii-V/V", "ii-V/ii", "ii-V/vi", "iv-V/I"], correct: 2 },
        { question: "Tension notes per Fmaj7#11:", options: ["9,#11,13", "9,11,13", "b9,#11,b13", "9,#11,b13"], correct: 0 },
        { question: "Giant Steps key centers són:", options: ["B-G-Eb", "C-A-F#", "Db-A-F", "F#-D-Bb"], correct: 0 }
      ]
    }
  ],
  puzzle: [
    {
      question: "Completa la substitució tritònica amb extensions:",
      text: "Dm7 - __ - Cmaj7 (en lloc de Dm7-G7-Cmaj7)",
      blanks: 1,
      options: ["Db13", "Db7alt", "Db7#11", "DbMaj7"],
      correct: [1],
      explanation: "Db7alt substitueix G7 per tritò, mantenint la tensió de resolució"
    },
    {
      question: "Completa l'armonia negativa de G7→C:",
      text: "__ → Fmaj7 (equivalent negatiu)",
      blanks: 1,
      options: ["Fm7", "Fm(maj7)", "F7", "F#ø7"],
      correct: [1],
      explanation: "G7→C es transforma en Fm(maj7)→Fmaj7 en armonia negativa"
    },
    {
      question: "Completa la progressió de Giant Steps:",
      text: "B - __ - G - __ - Eb",
      blanks: 2,
      options: ["D7", "F#7", "Bb7", "C7", "A7"],
      correct: [0, 2],
      explanation: "Giant Steps: B-D7-G-Bb7-Eb (Coltrane changes per terceres majors)"
    },
    {
      question: "Completa la reharmonització modal:",
      text: "Cmaj7 - __ - Am7 - __ (intercambio modal)",
      blanks: 2,
      options: ["Fm7", "F7", "Dm7b5", "DbMaj7", "Fm(maj7)"],
      correct: [0, 2],
      explanation: "Intercambio modal: Cmaj7-Fm7-Am7-Dm7b5 (del C menor)"
    },
    {
      question: "Completa l'upper structure triad:",
      text: "C13 = __ triangle sobre C7",
      blanks: 1,
      options: ["Am", "Dm", "D", "Em"],
      correct: [2],
      explanation: "C13 conté D triad (D-F#-A) sobre C7 per crear C13"
    },
    {
      question: "Completa el voice leading cromàtic:",
      text: "Am7 - __ - G7 - __ (bass line cromàtic)",
      blanks: 2,
      options: ["Ab7", "Abmaj7", "C6", "C/G", "Gmaj7"],
      correct: [0, 3],
      explanation: "Voice leading: Am7-Ab7-G7-C/G (baixos A-Ab-G-G cromàtics)"
    },
    {
      question: "Completa la substitució Coltrane:",
      text: "Cmaj7 → __ → F#maj7 (terceres majors)",
      blanks: 1,
      options: ["A7", "E7", "Ab7", "Eb7"],
      correct: [0],
      explanation: "Coltrane changes: moviment per terceres majors C-A-F# amb A7 com dominant"
    },
    {
      question: "Completa l'anàlisi de Cherokee:",
      text: "Bb - __ - Cm7 - F7 (tonicització)",
      blanks: 1,
      options: ["G7/B", "Gm7", "G7", "Gm7b5"],
      correct: [0],
      explanation: "Cherokee: Bb-G7/B-Cm7-F7 (voice leading cromàtic amb inversió)"
    }
  ],
  arcade: [
    {
      name: "Note Catcher",
      description: "Atrapa les notes que cauen del cel!",
      instructions: "Utilitza les fletxes per moure't i atrapa les notes correctes.",
      type: "action"
    },
    {
      name: "Rhythm Master",
      description: "Segueix el ritme perfecte!",
      instructions: "Prem espai al ritme de la música.",
      type: "rhythm"
    },
    {
      name: "Chord Builder",
      description: "Construeix acords ràpidament!",
      instructions: "Selecciona les notes correctes per formar l'acord demanat.",
      type: "construction"
    },
    {
      name: "Scale Runner",
      description: "Corre per les escales musicals!",
      instructions: "Salta només sobre les notes de l'escala correcta.",
      type: "platform"
    },
    {
      name: "Progression Master",
      description: "Identifica progressions harmòniques reals!",
      instructions: "Escolta la progressió i identifica els acords correctes.",
      type: "progression"
    }
  ],
  harmonia: () => {
    // Generar preguntes dinàmiques basades en les progressions reals
    const progression = getRandomProgression();
    const wrongProgressions = getProgressionsByMode(progression.mode).filter(p => p.tonalitat !== progression.tonalitat).slice(0, 2);
    const allChordTypes = getChordTypes();
    
    return [
      {
        type: "identify_progression",
        progression: progression,
        question: `Identifica la progressió en ${progression.tonalitat} ${progression.mode}:`,
        chords: progression.acords.map(a => a.acord).join(" - "),
        options: [
          progression.progressio_romana,
          wrongProgressions[0]?.progressio_romana || "I - V - vi - IV",
          wrongProgressions[1]?.progressio_romana || "vi - IV - I - V",
          "ii - V - I - vi"
        ],
        correct: 0,
        explanation: `Aquesta progressió ${progression.progressio_romana} és característica del mode ${progression.mode} en ${progression.tonalitat}.`
      },
      {
        type: "chord_analysis",
        progression: progression,
        question: `Quin tipus d'acord és ${progression.acords[0].acord}?`,
        options: [
          progression.acords[0].tipus,
          allChordTypes.filter(t => t !== progression.acords[0].tipus)[0] || "major",
          allChordTypes.filter(t => t !== progression.acords[0].tipus)[1] || "minor",
          allChordTypes.filter(t => t !== progression.acords[0].tipus)[2] || "diminished"
        ],
        correct: 0,
        explanation: `${progression.acords[0].acord} és un acord ${progression.acords[0].tipus}.`
      }
    ];
  }
};

const gameTypes = [
  {
    id: 'theory',
    title: 'Teoria Musical',
    description: 'Aprèn els fonaments de la teoria musical',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'speed',
    title: 'Joc de Velocitat',
    description: 'Respon ràpidament a preguntes musicals',
    icon: Volume2,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'memory',
    title: 'Joc de Memòria',
    description: 'Memoritza patrons musicals',
    icon: Trophy,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'target',
    title: 'Joc d\'Objectiu',
    description: 'Assoleix objectius específics',
    icon: Target,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'puzzle',
    title: 'Trencaclosques Musical',
    description: 'Resol problemes musicals complexos',
    icon: Puzzle,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'arcade',
    title: 'Arcade Musical',
    description: 'Jocs musicals divertits',
    icon: Music,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'harmonia',
    title: 'Harmonia Avançada',
    description: 'Progressions harmòniques reals',
    icon: Trophy,
    color: 'from-gold-500 to-yellow-600'
  },
  {
    id: 'advanced-theory',
    title: 'Teoria Musical Avançada',
    description: 'Estudi complet dels conceptes més complexos',
    icon: BookOpen,
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'composition-lab',
    title: 'Laboratori de Composició',
    description: 'Crea progressions amb restriccions complexes',
    icon: Trophy,
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'analysis-master',
    title: 'Anàlisi de Masters',
    description: 'Desxifra transcripcions de Bill Evans, Herbie Hancock',
    icon: Music,
    color: 'from-amber-500 to-orange-600'
  }
];

// Component de joc específic
function GameComponent({ mode, onBack }: { mode: GameMode; onBack: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timeSettings, setTimeSettings] = useState({
    speed: 5,
    memory: 8,
    general: 30
  });
  const [showSettings, setShowSettings] = useState(false);
  const [memoryPhase, setMemoryPhase] = useState<'show' | 'input' | 'result'>('show');
  const [userPattern, setUserPattern] = useState<string[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [puzzleAnswers, setPuzzleAnswers] = useState<string[]>([]);
  const [arcadeGame, setArcadeGame] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentHarmonia, setCurrentHarmonia] = useState(0);
  const [harmoniaQuestions, setHarmoniaQuestions] = useState<any[]>([]);
  const [chordTarget] = useState(['Do', 'Mi', 'Sol']);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  // useEffect per al mode harmonia - ha d'estar al principi
  useEffect(() => {
    if (mode === 'harmonia' && gameStarted && harmoniaQuestions.length === 0) {
      const questions = [];
      for (let i = 0; i < 5; i++) {
        const progression = getRandomProgression();
        const wrongProgressions = getProgressionsByMode(progression.mode)
          .filter(p => p.tonalitat !== progression.tonalitat)
          .slice(0, 2);
        
        questions.push({
          type: "identify_progression",
          progression: progression,
          question: `Identifica la progressió en ${progression.tonalitat} ${progression.mode}:`,
          chords: progression.acords.map((a: any) => a.acord).join(" - "),
          romanNumerals: progression.progressio_romana,
          options: [
            progression.progressio_romana,
            wrongProgressions[0]?.progressio_romana || "I - V - vi - IV",
            wrongProgressions[1]?.progressio_romana || "vi - IV - I - V",
            "ii - V - I - vi"
          ],
          correct: 0,
          explanation: `Aquesta progressió ${progression.progressio_romana} és característica del mode ${progression.mode} en ${progression.tonalitat}.`
        });
      }
      setHarmoniaQuestions(questions);
    }
  }, [mode, gameStarted, harmoniaQuestions.length]);

  const game = gameTypes.find(g => g.id === mode);
  const content = gameContent[mode as keyof typeof gameContent];

  // Timer per jocs de velocitat
  useEffect(() => {
    if (mode === 'speed' && timeLeft !== null && timeLeft > 0 && gameStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (mode === 'speed' && timeLeft === 0) {
      handleAnswer(-1); // Temps esgotat
    }
  }, [timeLeft, mode, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setUserPattern([]);
    setMemoryPhase('show');
    setCurrentChallenge(0);
    setTargetProgress(0);
    setPuzzleAnswers([]);
    setGameCompleted(false);
    setCurrentHarmonia(0);
    setHarmoniaQuestions([]);
    setArcadeGame(0);
    setSelectedNotes([]);
    
    if (mode === 'speed' && content && content[0] && 'timeLimit' in content[0]) {
      setTimeLeft(content[0].timeLimit || timeSettings.speed);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (mode === 'theory' || mode === 'speed') {
      const questions = content as any[];
      if (questions && questions[currentQuestion]) {
        const isCorrect = answerIndex === questions[currentQuestion].correct;
        if (isCorrect) setScore(score + 1);
        
        setSelectedAnswer(answerIndex);
        setShowResult(true);
        
        setTimeout(() => {
          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            if (mode === 'speed' && questions[currentQuestion + 1] && 'timeLimit' in questions[currentQuestion + 1]) {
              setTimeLeft(questions[currentQuestion + 1].timeLimit || 5);
            }
          } else {
            // Fi del joc
            setGameStarted(false);
            setGameCompleted(true);
          }
        }, 2000);
      }
    }

    // Handlejar preguntes d'harmonia
    if (mode === 'harmonia') {
      const isCorrect = answerIndex === harmoniaQuestions[currentHarmonia]?.correct;
      if (isCorrect) setScore(score + 1);
      
      setSelectedAnswer(answerIndex);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentHarmonia < harmoniaQuestions.length - 1) {
          setCurrentHarmonia(currentHarmonia + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          setGameStarted(false);
          setGameCompleted(true);
        }
      }, 3000);
      return;
    }
  };

  const handleTargetAnswer = (answerIndex: number) => {
    const challenge = content[currentChallenge] as any;
    if (challenge && challenge.questions) {
      const question = challenge.questions[currentQuestion];
      const isCorrect = answerIndex === question.correct;
      
      if (isCorrect) {
        setTargetProgress(targetProgress + 1);
        setScore(score + 1);
      }
      
      setSelectedAnswer(answerIndex);
      setShowResult(true);
      
      setTimeout(() => {
        if (targetProgress + (isCorrect ? 1 : 0) >= challenge.goal) {
          // Repte completat
          setGameCompleted(true);
          setGameStarted(false);
        } else if (currentQuestion < challenge.questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else {
          // Més preguntes necessàries, reiniciar
          setCurrentQuestion(0);
          setSelectedAnswer(null);
          setShowResult(false);
        }
      }, 2000);
    }
  };

  const handlePuzzleAnswer = (optionIndex: number) => {
    const newAnswers = [...puzzleAnswers, content[currentQuestion].options[optionIndex]];
    setPuzzleAnswers(newAnswers);
    
    const puzzle = content[currentQuestion] as any;
    if (newAnswers.length === puzzle.blanks) {
      // Comprovar resposta
      const isCorrect = puzzle.correct.every((correctIndex: number, i: number) => 
        newAnswers[i] === puzzle.options[correctIndex]
      );
      
      if (isCorrect) setScore(score + 1);
      setShowResult(true);
      
      setTimeout(() => {
        if (currentQuestion < content.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setPuzzleAnswers([]);
          setShowResult(false);
        } else {
          setGameStarted(false);
          setGameCompleted(true);
        }
      }, 3000);
    }
  };

  const handleMemoryInput = (note: string) => {
    const newPattern = [...userPattern, note];
    setUserPattern(newPattern);
    
    const currentMemoryGame = content[currentQuestion] as any;
    if (newPattern.length === currentMemoryGame.pattern.length) {
      // Comprovar si és correcte
      const isCorrect = newPattern.every((note, index) => note === currentMemoryGame.pattern[index]);
      if (isCorrect) setScore(score + 1);
      setMemoryPhase('result');
      
      setTimeout(() => {
        if (currentQuestion < content.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setUserPattern([]);
          setMemoryPhase('show');
        } else {
          setGameStarted(false);
          setGameCompleted(true);
        }
      }, 2000);
    }
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className={`w-24 h-24 bg-gradient-to-r ${game?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {game?.icon && <game.icon className="h-12 w-12 text-white" />}
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">{game?.title}</h2>
        <p className="text-gray-300 mb-8 text-lg">{game?.description}</p>
        
        <div className="bg-slate-700/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Com jugar:</h3>
          {mode === 'theory' && (
            <p className="text-gray-300">Respon preguntes ultra-avançades sobre jazz i harmonia complexa. Només per professionals.</p>
          )}
          {mode === 'speed' && (
            <>
              <p className="text-gray-300">Análisi harmònic ràpid! Temps personalitzable per pregunta.</p>
              <div className="mt-4 space-y-2">
                <label className="text-sm text-gray-400">Temps per pregunta: {timeSettings.speed}s</label>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  value={timeSettings.speed}
                  onChange={(e) => setTimeSettings({...timeSettings, speed: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </>
          )}
          {mode === 'memory' && (
            <>
              <p className="text-gray-300">Memoritza progressions complexes i patrons harmònics.</p>
              <div className="mt-4 space-y-2">
                <label className="text-sm text-gray-400">Temps de memorització: {timeSettings.memory}s</label>
                <input 
                  type="range" 
                  min="3" 
                  max="20" 
                  value={timeSettings.memory}
                  onChange={(e) => setTimeSettings({...timeSettings, memory: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </>
          )}
          {mode === 'target' && (
            <p className="text-gray-300">Completa reptes específics per guanyar medalles i recompenses.</p>
          )}
          {mode === 'puzzle' && (
            <p className="text-gray-300">Resol trencaclosques musicals completant escales, acords i progressions.</p>
          )}
          {mode === 'arcade' && (
            <p className="text-gray-300">Jocs d'acció musicals divertits amb diferents mecàniques de joc.</p>
          )}
          {mode === 'harmonia' && (
            <p className="text-gray-300">Analitza progressions harmòniques reals de milers de cançons i aprèn harmonia avançada.</p>
          )}
        </div>
        
        <button
          onClick={startGame}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all inline-flex items-center"
        >
          <Play className="h-6 w-6 mr-2" />
          Començar Joc
        </button>
      </div>
    );
  }

  // Joc de teoria i velocitat
  if (mode === 'theory' || mode === 'speed') {
    const questions = content as any[];
    const question = questions[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Header del joc */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-white">
            <span className="text-lg">Pregunta {currentQuestion + 1} de {questions.length}</span>
            <div className="text-sm text-gray-400">Puntuació: {score}/{questions.length}</div>
          </div>
          {mode === 'speed' && timeLeft !== null && (
            <div className={`text-2xl font-bold flex items-center ${timeLeft <= 2 ? 'text-red-400' : 'text-blue-400'}`}>
              <Clock className="h-6 w-6 mr-2" />
              {timeLeft}s
            </div>
          )}
        </div>

        {/* Pregunta */}
        <div className="bg-slate-800/80 rounded-lg p-8 mb-6 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {question.question}
          </h3>
          
          {/* Opcions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all text-lg font-semibold ${
                  showResult
                    ? index === question.correct
                      ? 'bg-green-600 border-green-500 text-white'
                      : index === selectedAnswer
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-gray-300'
                    : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-center">
                  {showResult && index === question.correct && <CheckCircle className="h-5 w-5 mr-2" />}
                  {showResult && index === selectedAnswer && index !== question.correct && <XCircle className="h-5 w-5 mr-2" />}
                  {option}
                </div>
              </button>
            ))}
          </div>

          {/* Explicació */}
          {showResult && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Explicació:</h4>
              <p className="text-gray-300">{question.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Joc de memòria
  if (mode === 'memory') {
    const memoryGames = content as any[];
    const currentMemoryGame = memoryGames[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-lg text-white">Nivell {currentQuestion + 1} de {memoryGames.length}</span>
          <div className="text-sm text-gray-400">Puntuació: {score}/{memoryGames.length}</div>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            {currentMemoryGame.description}
          </h3>

          {memoryPhase === 'show' && (
            <div className="text-center">
              <div className="mb-6">
                <h4 className="text-lg text-white mb-4">Memoritza aquesta seqüència:</h4>
                <div className="flex justify-center space-x-4 mb-6">
                  {currentMemoryGame.pattern.map((note: string, index: number) => (
                    <div key={index} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setMemoryPhase('input')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Continuar
              </button>
            </div>
          )}

          {memoryPhase === 'input' && (
            <div className="text-center">
              <h4 className="text-lg text-white mb-4">Repeteix la seqüència:</h4>
              <div className="flex justify-center space-x-4 mb-6">
                {userPattern.map((note, index) => (
                  <div key={index} className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold">
                    {note}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'].map((note) => (
                  <button
                    key={note}
                    onClick={() => handleMemoryInput(note)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded font-semibold transition-colors"
                  >
                    {note}
                  </button>
                ))}
              </div>
            </div>
          )}

          {memoryPhase === 'result' && (
            <div className="text-center">
              <div className={`text-6xl mb-4 ${userPattern.every((note, index) => note === currentMemoryGame.pattern[index]) ? 'text-green-400' : 'text-red-400'}`}>
                {userPattern.every((note, index) => note === currentMemoryGame.pattern[index]) ? '✓' : '✗'}
              </div>
              <p className="text-white text-lg">
                {userPattern.every((note, index) => note === currentMemoryGame.pattern[index]) ? 'Correcte!' : 'Incorrecte!'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Joc de Target (Objectius)
  if (mode === 'target') {
    const challenge = content[currentChallenge] as any;
    
    if (gameCompleted) {
      return (
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Repte Completat!</h2>
          <p className="text-white text-xl mb-2">Has guanyat:</p>
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 font-bold text-lg">{challenge.reward}</p>
          </div>
          <p className="text-gray-300 mb-6">Puntuació final: {targetProgress}/{challenge.goal}</p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Jugar de nou
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Tornar al menú
            </button>
          </div>
        </div>
      );
    }
    
    const question = challenge.questions[currentQuestion];
    
    return (
      <div className="max-w-2xl mx-auto">
        {/* Header del repte */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 mb-6 border border-orange-500/30">
          <h3 className="text-xl font-bold text-white mb-2">{challenge.challenge}</h3>
          <div className="flex justify-between items-center">
            <span className="text-orange-400">Progrés: {targetProgress}/{challenge.goal}</span>
            <span className="text-gray-300">Recompensa: {challenge.reward}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(targetProgress / challenge.goal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Pregunta actual */}
        <div className="bg-slate-800/80 rounded-lg p-8 mb-6 border border-slate-700">
          <h4 className="text-2xl font-bold text-white mb-6 text-center">
            {question.question}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {question.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && handleTargetAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all text-lg font-semibold ${
                  showResult
                    ? index === question.correct
                      ? 'bg-green-600 border-green-500 text-white'
                      : index === selectedAnswer
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-gray-300'
                    : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Joc de Puzzle
  if (mode === 'puzzle') {
    const puzzle = content[currentQuestion] as any;
    
    if (gameCompleted) {
      return (
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🧩</div>
          <h2 className="text-3xl font-bold text-green-400 mb-4">Trencaclosques Completats!</h2>
          <p className="text-white text-xl mb-6">Puntuació final: {score}/{content.length}</p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Jugar de nou
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Tornar al menú
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-lg text-white">Trencaclosques {currentQuestion + 1} de {content.length}</span>
          <div className="text-sm text-gray-400">Puntuació: {score}/{content.length}</div>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {puzzle.question}
          </h3>
          
          {/* Text del puzzle amb espais en blanc */}
          <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
            <p className="text-xl text-center text-gray-300 font-mono">
              {puzzle.text.split('__').map((part: string, index: number) => (
                <span key={index}>
                  {part}
                  {index < puzzle.blanks && (
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 mx-2 rounded font-semibold min-w-16 text-center">
                      {puzzleAnswers[index] || '___'}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Opcions disponibles */}
          {!showResult && puzzleAnswers.length < puzzle.blanks && (
            <div>
              <h4 className="text-lg text-white mb-4 text-center">
                Selecciona la resposta {puzzleAnswers.length + 1}:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {puzzle.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handlePuzzleAnswer(index)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resultat i explicació */}
          {showResult && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Explicació:</h4>
              <p className="text-gray-300">{puzzle.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Joc d'Arcade
  if (mode === 'arcade') {
    const games = content as any[];
    
    // Joc seleccionat per jugar
    if (arcadeGame > 0) {
      const selectedGame = games[arcadeGame - 1];
      
      // Note Catcher Game
      if (selectedGame.type === 'action') {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🎵</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              <p className="text-sm text-gray-400 mb-8">{selectedGame.instructions}</p>
              
              {/* Simulació del joc */}
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <div className="text-lg text-white mb-4">🎼 Anàlisi Harmònic Instantani 🎼</div>
                <div className="text-sm text-gray-300 mb-4">Identifica progressions, extensions i substitucions en temps real!</div>
                
                {/* Progressions harmòniques complexes que apareixen */}
                <div className="flex justify-center space-x-2 mb-4 flex-wrap">
                  {[
                    { chord: "Cmaj7#11", analysis: "I lidi" },
                    { chord: "Am7", analysis: "vi" },
                    { chord: "F#ø7", analysis: "viiø/V" },
                    { chord: "B7alt", analysis: "V7/iii" },
                    { chord: "Em7b5", analysis: "iii7b5" },
                    { chord: "A7alt", analysis: "V7/ii" },
                    { chord: "Dm9", analysis: "ii9" },
                    { chord: "G13", analysis: "V13" },
                    { chord: "DbMaj7#11", analysis: "bII lidi" },
                    { chord: "Fm(maj7)", analysis: "iv(maj7)" }
                  ].slice(0, 5 + Math.floor(Math.random() * 3)).map((item, i) => {
                    const difficulty = Math.random();
                    const color = difficulty > 0.7 ? 'bg-red-600' : difficulty > 0.4 ? 'bg-orange-600' : 'bg-green-600';
                    const isActive = Math.random() > 0.3;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const points = Math.floor(difficulty * 100) + 20;
                          console.log(`🎼 ${item.chord} analitzat com ${item.analysis}! +${points} punts!`);
                        }}
                        className={`p-3 rounded border-2 flex flex-col items-center justify-center text-white font-bold text-xs transition-all cursor-pointer hover:scale-110 ${color} ${
                          isActive ? 'animate-pulse' : ''
                        } shadow-lg border-white/20`}
                      >
                        <div>{item.chord}</div>
                        <div className="text-xs opacity-75">{item.analysis}</div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-yellow-400 font-bold">Puntuació: {Math.floor(Math.random() * 1000) + 100}</div>
                  <div className="text-red-400 font-bold">Combo: x{Math.floor(Math.random() * 10) + 1}</div>
                  <div className="text-green-400">Velocitat: {Math.floor(Math.random() * 3) + 1}x</div>
                  <div className="text-blue-400">Nivell: {Math.floor(Math.random() * 20) + 1}</div>
                </div>
                
                <div className="text-xs text-gray-400">💡 Extensions i alteracions valen més punts! Anàlisi correcte incrementa la dificultat!</div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
                <button
                  onClick={() => {
                    setScore(score + Math.floor(Math.random() * 10) + 1);
                    setTimeout(() => setArcadeGame(0), 1000);
                  }}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Jugar una ronda
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Rhythm Master Game
      if (selectedGame.type === 'rhythm') {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🥁</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              
              {/* Simulació del ritme */}
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <div className="text-lg text-white mb-4">🎭 Voice Leading Master 🎭</div>
                <div className="text-sm text-gray-300 mb-4">Resolucions cromàtiques, moviment de veus, counterpoint avançat!</div>
                
                {/* Patrons rítmics complexos i aleatòris */}
                <div className="space-y-4 mb-6">
                  {/* Línia rítmica 1 - Principal */}
                  <div className="flex justify-center space-x-1">
                    <div className="text-xs text-gray-400 w-16">4/4:</div>
                    {Array.from({length: 16}, (_, i) => {
                      const isActive = Math.random() > 0.4;
                      const intensity = Math.random();
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            const timing = i % 4 === 0 ? 'DOWNBEAT' : i % 2 === 0 ? 'Strong' : 'Weak';
                            console.log(`🥁 Beat ${i + 1}/16 - ${timing} - Intensitat: ${(intensity * 100).toFixed(0)}%`);
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isActive 
                              ? intensity > 0.7 ? 'bg-red-500 animate-pulse shadow-md' 
                                : intensity > 0.4 ? 'bg-orange-500' 
                                : 'bg-yellow-500'
                              : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        >
                          {isActive ? '●' : '○'}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Línia rítmica 2 - Sincopat */}
                  <div className="flex justify-center space-x-1">
                    <div className="text-xs text-gray-400 w-16">Sync:</div>
                    {Array.from({length: 12}, (_, i) => {
                      const isActive = Math.random() > 0.6;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            console.log(`🎵 Syncopation ${i + 1}/12 - ${isActive ? 'HIT' : 'rest'}`);
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isActive ? 'bg-blue-500 animate-bounce' : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          {isActive ? '♪' : '∅'}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Línia rítmica 3 - Polyrhythm */}
                  <div className="flex justify-center space-x-1">
                    <div className="text-xs text-gray-400 w-16">3/4:</div>
                    {Array.from({length: 9}, (_, i) => {
                      const isActive = Math.random() > 0.5;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            console.log(`🎶 Polyrhythm ${i + 1}/9 - ${i % 3 === 0 ? 'STRONG' : 'weak'}`);
                          }}
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-all cursor-pointer ${
                            isActive 
                              ? i % 3 === 0 ? 'bg-purple-500 animate-pulse' : 'bg-indigo-500'
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        >
                          {isActive ? '♫' : '·'}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="text-yellow-400 font-bold">Precisió: {Math.floor(Math.random() * 40) + 60}%</div>
                  <div className="text-green-400">BPM: {Math.floor(Math.random() * 100) + 80}</div>
                  <div className="text-red-400">Streak: {Math.floor(Math.random() * 25)}</div>
                </div>
                
                <div className="text-xs text-gray-400 mb-4">💡 Moviment de veus simultàni! Cada línia = veu independent</div>
                <div className="flex space-x-2 justify-center">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm font-bold">
                    🎼 SOPRANO
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-bold">
                    🎵 ALTO
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-bold">
                    🎶 BASS
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Chord Builder Game
      if (selectedGame.type === 'construction') {
        const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
        
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🎼</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                {(() => {
                  // Acords aleatoris complexos
                  const chordTypes = [
                    { name: "Do Major", notes: ["Do", "Mi", "Sol"], difficulty: "Fàcil" },
                    { name: "La menor", notes: ["La", "Do", "Mi"], difficulty: "Fàcil" },
                    { name: "Sol7", notes: ["Sol", "Si", "Re", "Fa"], difficulty: "Mitjà" },
                    { name: "Dm7b5", notes: ["Re", "Fa", "Lab", "Do"], difficulty: "Difícil" },
                    { name: "C#dim7", notes: ["Do#", "Mi", "Sol", "Sib"], difficulty: "Difícil" },
                    { name: "Fmaj9", notes: ["Fa", "La", "Do", "Mi", "Sol"], difficulty: "Expert" },
                    { name: "B♭13", notes: ["Sib", "Re", "Fa", "Lab", "Do", "Sol"], difficulty: "Expert" },
                    { name: "E♭aug", notes: ["Mib", "Sol", "Si"], difficulty: "Mitjà" }
                  ];
                  const randomChord = chordTypes[Math.floor(Math.random() * chordTypes.length)];
                  
                  return (
                    <>
                      <div className="text-lg text-white mb-4">🎼 Construeix l'acord: {randomChord.name} 🎼</div>
                      <div className="text-sm text-gray-300 mb-4">
                        Objectiu: {randomChord.notes.join(' - ')} | Dificultat: {randomChord.difficulty}
                      </div>
                      <div className="text-xs text-blue-300 mb-4">
                        💡 Acord generat aleatòriament - {randomChord.notes.length} notes necessàries
                      </div>
                    </>
                  );
                })()}
                
                <div className="mb-6">
                  <div className="text-white mb-2">🎵 Notes seleccionades:</div>
                  <div className="flex justify-center space-x-2 mb-4">
                    {selectedNotes.map((note, i) => (
                      <div key={i} className="bg-green-600 text-white px-3 py-2 rounded shadow-lg shadow-green-500/30">
                        {note}
                      </div>
                    ))}
                  </div>
                  {selectedNotes.length > 0 && (
                    <div className="text-xs text-blue-300 mb-2">
                      🔊 Cada nota que afegeixes fa el seu so característic
                    </div>
                  )}
                </div>
                
                {/* Notes cromàtiques completes amb enharmonies */}
                <div className="grid grid-cols-6 gap-1 mb-6">
                  {['Do', 'Do#/Db', 'Re', 'Re#/Eb', 'Mi', 'Fa', 'Fa#/Gb', 'Sol', 'Sol#/Ab', 'La', 'La#/Bb', 'Si',
                    'Dob', 'Reb', 'Mib', 'Fab', 'Solb', 'Lab', 'Sib', 'Dox', 'Rex', 'Mix', 'Fax', 'Solx', 'Lax', 'Six']
                    .slice(0, 24).map((note, i) => {
                    const isChromatic = note.includes('#') || note.includes('b') || note.includes('x');
                    const octave = Math.floor(Math.random() * 4) + 3; // Octaves 3-6
                    const fullNote = `${note}${octave}`;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (!selectedNotes.includes(note) && selectedNotes.length < 6) {
                            setSelectedNotes([...selectedNotes, note]);
                            const frequency = 440 * Math.pow(2, (i - 9) / 12); // Càlcul de freqüència
                            console.log(`🎵 ${fullNote} afegida! Freq: ${frequency.toFixed(1)}Hz, ${isChromatic ? 'Cromàtica' : 'Diatònica'}`);
                          }
                        }}
                        disabled={selectedNotes.includes(note)}
                        className={`p-2 rounded text-xs font-semibold transition-all ${
                          selectedNotes.includes(note)
                            ? 'bg-green-600 text-white shadow-lg'
                            : isChromatic
                            ? 'bg-purple-700 hover:bg-purple-600 text-white'
                            : 'bg-slate-700 hover:bg-slate-600 text-white'
                        } ${isChromatic ? 'border border-purple-400' : ''}`}
                      >
                        {note}
                      </button>
                    );
                  })}
                </div>
                
                {/* Inversions i voicings */}
                <div className="mb-4">
                  <div className="text-white text-sm mb-2">🔄 Inversions disponibles:</div>
                  <div className="flex space-x-2 justify-center">
                    {['Root', '1st Inv', '2nd Inv', '3rd Inv'].map((inversion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          console.log(`🎼 Inversió ${inversion} seleccionada - notes reordenades!`);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                      >
                        {inversion}
                      </button>
                    ))}
                  </div>
                </div>
                
                {selectedNotes.length === 3 && (
                  <div className={`text-lg font-bold mb-4 ${
                    JSON.stringify(selectedNotes.sort()) === JSON.stringify(chordTarget.sort())
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}>
                    {JSON.stringify(selectedNotes.sort()) === JSON.stringify(chordTarget.sort())
                      ? '🎊 ¡Correcte! Acord perfecte - Escolta com sona! 🎵'
                      : '🤔 Prova de nou - L\'acord no sona bé'}
                  </div>
                )}
                
                {selectedNotes.length === 3 && JSON.stringify(selectedNotes.sort()) === JSON.stringify(chordTarget.sort()) && (
                  <div className="text-center mb-4">
                    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                      <div className="text-green-300 text-sm">🔊 Som simulat: "Do-Mi-Sol" (acord major perfecte)</div>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedNotes([])}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4"
                >
                  Reiniciar
                </button>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
              </div>
            </div>
          </div>
        );
      }
      
      // Scale Runner Game
      if (selectedGame.type === 'platform') {
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-pink-400 mb-6">{selectedGame.name}</h2>
            
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-8 mb-6">
              <div className="text-6xl mb-6">🏃‍♂️</div>
              <p className="text-gray-300 mb-6">{selectedGame.description}</p>
              
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                {(() => {
                  // Escales aleatòries complexes
                  const scales = [
                    { name: "Do Major", notes: ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"], mode: "Ionian" },
                    { name: "La menor natural", notes: ["La", "Si", "Do", "Re", "Mi", "Fa", "Sol"], mode: "Aeolian" },
                    { name: "Re Dòric", notes: ["Re", "Mi", "Fa", "Sol", "La", "Si", "Do"], mode: "Dorian" },
                    { name: "Mi Frigi", notes: ["Mi", "Fa", "Sol", "La", "Si", "Do", "Re"], mode: "Phrygian" },
                    { name: "Fa Lidi", notes: ["Fa", "Sol", "La", "Si", "Do", "Re", "Mi"], mode: "Lydian" },
                    { name: "Sol Mixolidi", notes: ["Sol", "La", "Si", "Do", "Re", "Mi", "Fa"], mode: "Mixolydian" },
                    { name: "Si Locri", notes: ["Si", "Do", "Re", "Mi", "Fa", "Sol", "La"], mode: "Locrian" },
                    { name: "Blues Do", notes: ["Do", "Mib", "Fa", "Fa#", "Sol", "Sib"], mode: "Blues" },
                    { name: "Pentatònica La", notes: ["La", "Do", "Re", "Mi", "Sol"], mode: "Pentatonic" },
                    { name: "Cromàtica", notes: ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"], mode: "Chromatic" }
                  ];
                  const randomScale = scales[Math.floor(Math.random() * scales.length)];
                  const tempo = Math.floor(Math.random() * 60) + 80; // 80-140 BPM
                  
                  return (
                    <>
                      <div className="text-lg text-white mb-4">🏃‍♂️ Escala: {randomScale.name} ({randomScale.mode}) 🏃‍♂️</div>
                      <div className="text-sm text-gray-300 mb-4">Velocitat: {tempo} BPM - Obstacles aleatoris apareixen!</div>
                      <div className="text-xs text-blue-300 mb-4">
                        🔊 Notes correctes ({randomScale.notes.length}): {randomScale.notes.join(', ')}
                      </div>
                    </>
                  );
                })()}
                
                {/* Plataformes dinàmiques amb obstacles múltiples */}
                <div className="space-y-3 mb-6">
                  {/* Línia 1 - Notes cromàtiques */}
                  <div className="flex justify-center space-x-1">
                    {Array.from({length: 20}, (_, i) => {
                      const allNotes = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
                      const note = allNotes[i % 12];
                      const scaleNotes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']; // This would be dynamic
                      const isCorrect = scaleNotes.includes(note);
                      const hasObstacle = Math.random() > 0.7;
                      const height = Math.floor(Math.random() * 3) + 1;
                      
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            const points = isCorrect ? (height * 10) : -5;
                            console.log(`🎵 ${note} ${isCorrect ? '✅' : '❌'} ${points > 0 ? '+' : ''}${points} punts! Altura: ${height}`);
                          }}
                          className={`w-8 rounded border-2 flex items-center justify-center text-xs font-bold transition-all cursor-pointer relative ${
                            isCorrect
                              ? 'bg-green-500 border-green-400 text-white hover:bg-green-400 hover:scale-110 shadow-lg shadow-green-500/50'
                              : 'bg-red-500 border-red-400 text-white hover:bg-red-400 hover:scale-105'
                          }`}
                          style={{ height: `${height * 16 + 16}px` }}
                        >
                          {note}
                          {hasObstacle && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center">
                              ⚡
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Línia 2 - Power-ups i bonus */}
                  <div className="flex justify-center space-x-2">
                    {['2x', '♪', '🔥', '⭐', '💎', '🎵', '⚡', '🌟'].map((powerup, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          const effect = ['Doble punts', 'Nota perfecta', 'Combo multiplier', 'Estrella bonus', 'Diamant rar', 'So especial', 'Velocitat+', 'Super estrella'][i];
                          console.log(`✨ Power-up! ${powerup} - ${effect}`);
                        }}
                        className="w-8 h-8 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white font-bold text-xs transition-all hover:scale-125 animate-pulse shadow-lg shadow-yellow-500/50"
                      >
                        {powerup}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-sm mb-4">
                  <div className="text-yellow-400 font-bold">Distància: {Math.floor(Math.random() * 2000) + 500}m</div>
                  <div className="text-green-400">Velocitat: {Math.floor(Math.random() * 50) + 10} km/h</div>
                  <div className="text-blue-400">Combo: x{Math.floor(Math.random() * 15) + 1}</div>
                  <div className="text-purple-400">Vides: {Math.floor(Math.random() * 3) + 1}/5</div>
                </div>
                <div className="text-sm text-gray-300 mb-2">Plataformes dinàmiques, obstacles mòbils, power-ups temporals!</div>
                <div className="text-xs text-blue-300">💡 Altures variables = punts diferents | ⚡ = obstacles | ✨ = power-ups</div>
              </div>
              
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setArcadeGame(0)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Tornar a selecció
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
    
    // Selecció de jocs d'arcade
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Selecciona un Joc d'Arcade</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => setArcadeGame(index + 1)}
              className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-lg p-6 cursor-pointer hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold text-pink-400 mb-3">{game.name}</h3>
              <p className="text-gray-300 mb-4">{game.description}</p>
              <p className="text-sm text-gray-400 mb-4">{game.instructions}</p>
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded font-semibold hover:from-pink-600 hover:to-purple-600 transition-all">
                Jugar ara!
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <button
            onClick={onBack}
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Tornar al menú
          </button>
        </div>
      </div>
    );
  }

  // Joc d'Harmonia (amb progressions reals)
  if (mode === 'harmonia') {

    if (gameCompleted) {
      return (
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-6">🎼</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">Mestre d'Harmonia!</h2>
          <p className="text-white text-xl mb-6">Puntuació final: {score}/{harmoniaQuestions.length}</p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={startGame}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Jugar de nou
            </button>
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Tornar al menú
            </button>
          </div>
        </div>
      );
    }

    if (harmoniaQuestions.length === 0) {
      return (
        <div className="text-center">
          <div className="text-4xl mb-4">🎼</div>
          <p className="text-white">Generant progressions harmòniques...</p>
        </div>
      );
    }

    const currentQuestion = harmoniaQuestions[currentHarmonia];
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-lg text-white">Progressió {currentHarmonia + 1} de {harmoniaQuestions.length}</span>
          <div className="text-sm text-gray-400">Puntuació: {score}/{harmoniaQuestions.length}</div>
        </div>

        <div className="bg-slate-800/80 rounded-lg p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {currentQuestion.question}
          </h3>

          {/* Progressió d'acords */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-6 mb-6 border border-yellow-500/20">
            <div className="text-center">
              <h4 className="text-lg text-yellow-400 font-semibold mb-3">Progressió d'Acords:</h4>
              <div className="text-2xl font-mono text-white mb-2">{currentQuestion.chords}</div>
              <div className="text-sm text-gray-400">en {currentQuestion.progression.tonalitat} {currentQuestion.progression.mode}</div>
            </div>
          </div>

          {/* Opcions de progressions romanes */}
          <h4 className="text-lg text-white mb-4 text-center">Quin és l'anàlisi en xifra romana?</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                className={`p-4 rounded-lg border-2 transition-all text-lg font-semibold font-mono ${
                  showResult
                    ? index === currentQuestion.correct
                      ? 'bg-green-600 border-green-500 text-white'
                      : index === selectedAnswer
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-gray-300'
                    : 'bg-slate-700 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Explicació */}
          {showResult && (
            <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Explicació:</h4>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
              <div className="mt-3 text-sm text-gray-400">
                <strong>Detalls de la progressió:</strong>
                <ul className="mt-2">
                  {currentQuestion.progression.acords.map((acord: any, i: number) => (
                    <li key={i}>• {acord.acord} ({acord.tipus})</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Altres jocs (fallback)
  return (
    <div className="text-center">
      <div className={`w-24 h-24 bg-gradient-to-r ${game?.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
        {game?.icon && <game.icon className="h-12 w-12 text-white" />}
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">{game?.title}</h2>
      <p className="text-gray-300 mb-8">{game?.description}</p>
      <button
        onClick={onBack}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
      >
        Tornar al menú
      </button>
    </div>
  );
}

function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('home');
  
  console.log('Current mode:', currentMode);

  const handleNavigate = (mode: GameMode) => {
    console.log('Navigating to:', mode);
    setCurrentMode(mode);
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Music className="h-16 w-16 text-blue-400 mr-4 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Teoria Musical
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            🎵 Descobreix el món de la música amb els nostres jocs i exercicis interactius 🎵
          </p>
        </div>

        {/* Grid de jocs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gameTypes.map((game) => {
            const IconComponent = game.icon;
            return (
              <div
                key={game.id}
                onClick={() => handleNavigate(game.id as GameMode)}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white px-4 py-2 rounded text-center font-semibold">
                  Començar
                </div>
              </div>
            );
          })}
        </div>

        {/* Estadístiques */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 rounded-2xl border border-blue-500/20 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">10</div>
            <div className="text-gray-300">Modes de Joc</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 rounded-2xl border border-purple-500/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">Chess-level</div>
            <div className="text-gray-300">Dificultat Mental</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 p-6 rounded-2xl border border-pink-500/20 text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">9966</div>
            <div className="text-gray-300">Progressions Reals</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Component del Laboratori de Composició
  const CompositionLabComponent = () => {
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [userProgression, setUserProgression] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [score, setScore] = useState(0);

    const challenges = [
      {
        title: "Progressió Cromàtica Descendente",
        instruction: "Crea una progressió de 8 acords on cada root baixi cromàticament, mantenint voice leading suau",
        constraints: ["Root motion cromàtic", "Voice leading < 2 semitons", "Mínim 3 extensions"],
        startingChord: "Cmaj9",
        targetLength: 8
      },
      {
        title: "Reharmonització Modal",
        instruction: "Reharmonitza 'Autumn Leaves' bars 1-8 usant només acords de D mixolidi",
        constraints: ["Només D mixolidi", "Mantén la melodia", "Voice leading cromàtic"],
        startingChord: "Dm11",
        targetLength: 8
      },
      {
        title: "Negative Harmony Challenge",
        instruction: "Crea la versió negative harmony de ii-V-I-vi amb substitucions tritòniques",
        constraints: ["Armonia negativa", "Substitucions tritòniques", "Upper structures"],
        startingChord: "Dm7",
        targetLength: 4
      }
    ];

    const availableChords = [
      "Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bø7",
      "C7alt", "F#ø7", "B7alt", "Ebmaj7#11", "Abmaj7", "Dbmaj7",
      "Fm(maj7)", "Bb13", "E7#11", "A7alt", "D7alt", "G7alt"
    ];

    const addChord = (chord: string) => {
      if (userProgression.length < challenges[currentChallenge].targetLength) {
        setUserProgression([...userProgression, chord]);
      }
      if (userProgression.length + 1 === challenges[currentChallenge].targetLength) {
        setIsComplete(true);
        setScore(score + 75); // Puntuació base per completar
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">Laboratori de Composició</h1>
              <p className="text-gray-300">Crea progressions amb restriccions harmòniques ultra-complexes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Challenge Info */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Desafiament {currentChallenge + 1}</h3>
                <h4 className="text-emerald-400 font-semibold mb-3">{challenges[currentChallenge].title}</h4>
                <p className="text-gray-300 mb-4">{challenges[currentChallenge].instruction}</p>
                
                <div className="mb-4">
                  <h5 className="font-semibold mb-2">Restriccions:</h5>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {challenges[currentChallenge].constraints.map((constraint, i) => (
                      <li key={i}>• {constraint}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-700/50 p-3 rounded">
                  <div className="text-sm text-gray-400">Acord inicial:</div>
                  <div className="text-emerald-400 font-bold">{challenges[currentChallenge].startingChord}</div>
                </div>
              </div>
            </div>

            {/* Composition Area */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">La teva progressió:</h3>
                
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {Array.from({ length: challenges[currentChallenge].targetLength }).map((_, i) => (
                    <div key={i} className={`h-16 rounded border-2 border-dashed flex items-center justify-center ${
                      userProgression[i] ? 'bg-emerald-600 border-emerald-500' : 'border-gray-600'
                    }`}>
                      <span className="font-bold">{userProgression[i] || `${i + 1}`}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Acords disponibles:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {availableChords.map((chord, i) => (
                      <button
                        key={i}
                        onClick={() => addChord(chord)}
                        disabled={userProgression.length >= challenges[currentChallenge].targetLength}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded text-sm disabled:opacity-50"
                      >
                        {chord}
                      </button>
                    ))}
                  </div>
                </div>

                {isComplete && (
                  <div className="bg-emerald-600/20 border border-emerald-500 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-400 mb-2">Progressió completada!</h4>
                    <p className="text-gray-300 mb-2">Puntuació: {score}/100</p>
                    <button 
                      onClick={() => {
                        setCurrentChallenge((currentChallenge + 1) % challenges.length);
                        setUserProgression([]);
                        setIsComplete(false);
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded"
                    >
                      Següent desafiament
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGame = (mode: GameMode) => {
    const game = gameTypes.find(g => g.id === mode);
    
    if (mode === 'advanced-theory') {
      return <AdvancedTheoryComponent onBack={() => handleNavigate('home')} />;
    }
    
    if (mode === 'composition-lab') {
      return <CompositionLabComponent />;
    }
    
    if (mode === 'analysis-master') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900 text-white p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-4xl font-bold mb-2">Anàlisi de Masters</h1>
                <p className="text-gray-300">Desxifra transcripcions reals dels grans del jazz</p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-amber-400 mb-2">Bill Evans - Waltz for Debby</h2>
                <p className="text-gray-300 mb-4">Compassos 1-8</p>
                <p className="text-amber-300">Identifica les funcions harmòniques, voicings i escales apropiades</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {["Fmaj7", "E7alt", "Am7", "D7", "Gm7", "C7", "Fmaj7", "Fmaj7"].map((chord, i) => (
                  <div key={i} className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-center font-bold text-amber-400 mb-3">{chord}</div>
                    
                    <div className="space-y-2">
                      <select className="w-full bg-slate-600 rounded p-1 text-xs">
                        <option value="">Funció</option>
                        <option value="I">I</option>
                        <option value="V/iii">V/iii</option>
                        <option value="iii">iii</option>
                        <option value="V/ii">V/ii</option>
                        <option value="ii">ii</option>
                        <option value="V">V</option>
                      </select>
                      
                      <select className="w-full bg-slate-600 rounded p-1 text-xs">
                        <option value="">Voicing</option>
                        <option value="Drop 2">Drop 2</option>
                        <option value="Rootless A">Rootless A</option>
                        <option value="Rootless B">Rootless B</option>
                        <option value="Shell">Shell</option>
                      </select>
                      
                      <select className="w-full bg-slate-600 rounded p-1 text-xs">
                        <option value="">Escala</option>
                        <option value="Ionian">Ionian</option>
                        <option value="Altered">Altered</option>
                        <option value="Dorian">Dorian</option>
                        <option value="Mixolydian">Mixolydian</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mb-6">
                <button className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded">
                  Comprovar Anàlisi
                </button>
                <button className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded">
                  Següent Transcripció
                </button>
              </div>

              <div className="bg-amber-600/20 border border-amber-500 rounded-lg p-6">
                <h3 className="font-bold text-amber-400 mb-4">Transcripcions Disponibles:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-4 rounded">
                    <h4 className="font-semibold text-white">Bill Evans</h4>
                    <ul className="text-sm text-gray-300 mt-2">
                      <li>• Waltz for Debby (bars 1-8)</li>
                      <li>• Autumn Leaves (solo section)</li>
                      <li>• Blue in Green (intro)</li>
                    </ul>
                  </div>
                  <div className="bg-slate-700/50 p-4 rounded">
                    <h4 className="font-semibold text-white">Herbie Hancock</h4>
                    <ul className="text-sm text-gray-300 mt-2">
                      <li>• Dolphin Dance (bars 9-16)</li>
                      <li>• Maiden Voyage (comping)</li>
                      <li>• Speak Like a Child (intro)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header amb botó de tornada */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => handleNavigate('home')}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6 mr-2" />
              Tornar
            </button>
            <h1 className="text-4xl font-bold text-white">{game?.title}</h1>
          </div>

          {/* Contingut del joc */}
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <GameComponent mode={mode} onBack={() => handleNavigate('home')} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentMode === 'home' ? renderHome() : renderGame(currentMode)}
    </div>
  );
}

export default App;