import { useState, useEffect } from "react";
import { Music, Trophy, BookOpen, Volume2, Target, Puzzle, ArrowLeft, Play, Clock, CheckCircle, XCircle } from "lucide-react";
import { getRandomProgression, getProgressionsByMode, getChordTypes } from "./data/progressions";

type GameMode = 'home' | 'theory' | 'speed' | 'memory' | 'target' | 'puzzle' | 'arcade' | 'harmonia' | 'advanced-theory' | 'composition-lab' | 'analysis-master' | 'easter-hunt' | 'chord-builder' | 'progression-lab' | 'guitar-voicings' | 'fretboard-master';

// Sistema de generació aleatòria de preguntes
const generateRandomQuestions = (questionPool: any[], count: number = 25) => {
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

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
    },
    {
      question: "En 'All of Me', el C7-F7-C7 del bridge usa:",
      options: ["Circle of 5ths", "Plagal motion", "Chromatic voice leading", "Secondary dominants"],
      correct: 1,
      explanation: "C7-F7-C7 és una progressió plagal (IV7-I7) típica del blues i jazz tradicional.",
      level: "Professional"
    },
    {
      question: "La progressió DbMaj7-C7-FMaj7 utilitza:",
      options: ["bII-V-I (Neapolitan)", "Tritone substitution", "Chromatic mediant", "Modal interchange"],
      correct: 0,
      explanation: "DbMaj7 és bII de C major, progressió neapolitana que resol cromàticament.",
      level: "Expert"
    },
    {
      question: "En harmonia quartal, Dm11 es construeix amb:",
      options: ["Terceres apilades", "Quartes justes apilades", "Quintes apilades", "Segons apilades"],
      correct: 1,
      explanation: "Harmonia quartal usa intervals de 4a justa: D-G-C-F per Dm11.",
      level: "Master"
    },
    {
      question: "El voicing de E7alt més tens és:",
      options: ["E-G#-Bb-D", "E-Ab-Bb-Db", "E-G-Bb-C#", "E-Ab-A-Db"],
      correct: 3,
      explanation: "E-Ab-A-Db conté b9, #9, #11, b13 - màxima tensió altèria.",
      level: "Master"
    },
    {
      question: "En 'Have You Met Miss Jones', Bbm6 funciona com:",
      options: ["Substitut de G7b13", "Interchange modal", "Relative minor", "Chromatic approach"],
      correct: 1,
      explanation: "Bbm6 ve del parallel minor (Bb menor), exemple d'interchange modal.",
      level: "Professional"
    },
    {
      question: "La progressió Am7-Dm7-GM7-CM7 segueix:",
      options: ["vi-ii-V-I", "Circle of 5ths ascendent", "Diatònic per terceres", "Modal rotation"],
      correct: 2,
      explanation: "Am-Dm-G-C és moviment diatònic per terceres: A-D-G-C.",
      level: "Expert"
    },
    {
      question: "En Giant Steps compassos 5-8, les tonalitats són:",
      options: ["G-Bb-Eb", "G-Eb-B", "B-G-Eb", "Eb-G-B"],
      correct: 1,
      explanation: "Giant Steps modula G-Eb-B, seguint el cicle de terceres majors de Coltrane.",
      level: "Professional"
    },
    {
      question: "L'upper structure A/G indica:",
      options: ["G13", "Gadd9", "G6/9", "G11"],
      correct: 0,
      explanation: "A major triad sobre G7 crea G13 amb tensions 9(A), #11(C#), 13(E).",
      level: "Expert"
    },
    {
      question: "En 'Alone Together', F#m7b5-B7-Em utilitzes:",
      options: ["ii-V menor", "Tonicització relativa", "Modal substitution", "Chromatic approach"],
      correct: 0,
      explanation: "F#m7b5-B7-Em és ii-V-i clàssic en Em menor.",
      level: "Professional"
    },
    {
      question: "La progressió C-E7/B-Am-F#dim-G7 usa:",
      options: ["Chromatic bass line", "Secondary dominants", "Diminished passing", "Totes les anteriors"],
      correct: 3,
      explanation: "Combina chromatic bass (C-B-A-F#-G), V7/vi (E7), i dim passing (F#dim).",
      level: "Master"
    },
    {
      question: "En mode frigildi dominant, sobre G7 uses:",
      options: ["G mixolydian b6", "G altered", "G mixolydian", "G phrygian dominant"],
      correct: 3,
      explanation: "G phrygian dominant (C harmonic minor) té b9, 3, #11, b13 - perfect per resolucions exòtiques.",
      level: "Master"
    },
    {
      question: "El polychord Eb/F indica funcionalment:",
      options: ["F11", "F13sus4", "Fmaj9#11", "F7sus4b9"],
      correct: 1,
      explanation: "Eb/F = F13sus4, amb Eb triad proporcionant 4th, 6th, i root sobre F.",
      level: "Expert"
    },
    {
      question: "En 'Inner Urge', la progressió Em-A7-DM7 usa:",
      options: ["ii-V-I en D", "Modal rotation", "Chromatic approach", "Circle of 5ths"],
      correct: 0,
      explanation: "Em(ii)-A7(V)-DM7(I) és ii-V-I estàndard en D major.",
      level: "Professional"
    },
    {
      question: "La reharmonització de C-Am-F-G amb tritones:",
      options: ["C-Eb7-Bb7-Db7", "C-Eb7-F-Db7", "C-A7-F-G", "Gb7-A7-Bb7-Db7"],
      correct: 1,
      explanation: "C-Eb7(tritone sub d'A7)-F-Db7(tritone sub de G7).",
      level: "Expert"
    },
    {
      question: "En harmonia negativa, el G7-Cmaj7 es converteix en:",
      options: ["F7-Fmaj7", "Fm(maj7)-Fmaj7", "F-C", "Fm7-Fmaj7"],
      correct: 1,
      explanation: "G7→Fm(maj7), Cmaj7→Fmaj7 en l'eix negative E-Ab.",
      level: "Master"
    },
    {
      question: "El voicing més obert per Cmaj9 és:",
      options: ["C-G-B-D-E", "C-E-G-B-D", "G-B-D-E-C", "E-G-B-D-C"],
      correct: 2,
      explanation: "G-B-D-E-C distribueix les tensions àmpliament per màxima ressonància.",
      level: "Expert"
    },
    {
      question: "En 'So What', Dm11-Ebm11 són:",
      options: ["Modal parallel motion", "Chromatic substitution", "Circle of 5ths", "Relative modulation"],
      correct: 0,
      explanation: "Movement parallel cromàtic mantenint la sonoritat modal Dm11.",
      level: "Professional"
    },
    {
      question: "'Round Midnight' usa quin tipus de progressió al bridge?",
      options: ["ii-V chains", "Circle of 5ths", "Chromatic mediants", "Modal interchange"],
      correct: 3,
      explanation: "Modal interchange abundant: Em7b5, EbMaj7, altres acords del minor parallel.",
      level: "Professional"
    },
    {
      question: "La progressió Cm-Fm-Bb7-EbMaj7 en C minor és:",
      options: ["i-iv-V7/bIII-bIII", "i-iv-V7-bVI", "Modal cadence", "Circle progression"],
      correct: 0,
      explanation: "Cm(i)-Fm(iv)-Bb7(V7/bIII)-EbMaj7(bIII), tonicització temporal d'Eb.",
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
    },
    {
      question: "En un reharmonització de 'Fly Me To The Moon', Am7-D7 es pot substituir per:",
      options: ["Ebm7-Ab7", "A7alt-D7alt", "Am11-D13sus4", "F#m7b5-B7"],
      correct: 0,
      explanation: "Ebm7-Ab7 és tritone substitution completa: Am7→Ebm7, D7→Ab7.",
      timeLimit: 5
    },
    {
      question: "Sobre EMaj7#11, quina escala conté l'#11 necessària?",
      options: ["E ionian", "E lydian", "E mixolydian", "E dorian"],
      correct: 1,
      explanation: "E lydian conté A# (l'#11) que crea la sonoritat característica.",
      timeLimit: 3
    },
    {
      question: "En Giant Steps, quin interval separa les tonalitats principals?",
      options: ["4a justa", "3a major", "5a justa", "2a major"],
      correct: 1,
      explanation: "B-G-Eb estan separades per terceres majors (major 3rd intervals).",
      timeLimit: 4
    },
    {
      question: "La progressió Dm-G7/B-Bb-A7 usa:",
      options: ["Circle of 5ths", "Chromatic bass descent", "Modal interchange", "Secondary dominants"],
      correct: 1,
      explanation: "Bass line cromàtic: D-B-Bb-A, típic del bebop.",
      timeLimit: 5
    },
    {
      question: "En harmonia quartal, quin acord es forma amb G-C-F-Bb?",
      options: ["Gm11", "G7sus4", "C6/9", "F11/G"],
      correct: 0,
      explanation: "G-C-F-Bb forma Gm11 amb intervals de quarta perfecta.",
      timeLimit: 4
    },
    {
      question: "La substitució de C7 per F#7 es basa en:",
      options: ["Common tones", "Tritone relationship", "Circle of 5ths", "Modal relationship"],
      correct: 1,
      explanation: "C7 i F#7 comparteixen el mateix tritó (E-Bb), permeten substitució.",
      timeLimit: 3
    },
    {
      question: "En 'Blue Bossa', l'acord Dm7b5 funciona com:",
      options: ["ii7b5/vi", "iv7b5", "Modal interchange", "Passing chord"],
      correct: 0,
      explanation: "Dm7b5 és ii7b5 que resol a G7 (V7/vi) vers Am.",
      timeLimit: 4
    },
    {
      question: "L'upper structure F/G7 indica quines tensions?",
      options: ["b9, #11, b13", "9, #11, 13", "b9, 11, 13", "#9, #11, b13"],
      correct: 1,
      explanation: "F major triad sobre G7: F(b7), A(9), C(#11), tensions naturals.",
      timeLimit: 5
    },
    {
      question: "En modal jazz, Dm11 es pot abordar amb:",
      options: ["D dorian", "D natural minor", "D harmonic minor", "D melodic minor"],
      correct: 0,
      explanation: "D dorian (del C major) és l'escala modal clàssica per Dm11.",
      timeLimit: 3
    },
    {
      question: "La progressió i-bVII-bVI-bVII en Am és:",
      options: ["Am-G-F-G", "Am-F-G-C", "Am-C-F-G", "Am-Dm-G-C"],
      correct: 0,
      explanation: "Am(i)-G(bVII)-F(bVI)-G(bVII), progressió modal menor típica.",
      timeLimit: 4
    },
    {
      question: "En 'Stella by Starlight', Em7b5 funciona com:",
      options: ["ii7b5/V del A", "vi7b5", "Modal interchange", "Passing chord"],
      correct: 0,
      explanation: "Em7b5 és ii7b5 que prepara A7, V7 del D minor.",
      timeLimit: 5
    },
    {
      question: "Quina escala s'usa sobre B7alt en resolució a Em?",
      options: ["B altered", "B mixolydian b6", "B harmonic minor 5th", "B diminished"],
      correct: 0,
      explanation: "B altered (C melodic minor) conté totes les alteracions necessàries.",
      timeLimit: 3
    },
    {
      question: "La reharmonització amb coltrane changes de C-Am-F-G és:",
      options: ["C-A7-DMaj7-G", "C-E7-AMaj7-F#7-BMaj7-G", "C-Em-Am-F-G", "C-F#7-BMaj7-Bb7-EbMaj7-G"],
      correct: 1,
      explanation: "Insereix coltrane changes: E7-AMaj7-F#7-BMaj7 entre C i G.",
      timeLimit: 6
    },
    {
      question: "En 'Body and Soul', l'acord Db7 al bridge funciona com:",
      options: ["bII7", "Tritone sub", "Modal interchange", "Secondary dominant"],
      correct: 1,
      explanation: "Db7 és tritone substitution de G7, creant chromatic motion.",
      timeLimit: 4
    },
    {
      question: "El voicing C-E-Bb-D indica:",
      options: ["C7", "CMaj7", "C9", "C6"],
      correct: 0,
      explanation: "C-E-Bb-D forma C7 amb root, 3rd, b7th, 9th.",
      timeLimit: 3
    },
    {
      question: "En harmonia negativa de G major, Am7 es converteix en:",
      options: ["Fm7", "FMaj7", "Fm(maj7)", "F7"],
      correct: 2,
      explanation: "Am7 en negative harmony (axis D-Ab) esdevé Fm(maj7).",
      timeLimit: 5
    },
    {
      question: "La progressió Gm-C7-F-Bb usa:",
      options: ["ii-V-I-IV", "Circle of 5ths", "Modal sequence", "Parallel motion"],
      correct: 1,
      explanation: "Roots G-C-F-Bb segueixen el circle of 5ths descendent.",
      timeLimit: 4
    },
    {
      question: "En 'Confirmation', el Bb7 funciona com:",
      options: ["I7", "V7/IV", "Tritone sub", "Secondary dominant"],
      correct: 1,
      explanation: "Bb7 és V7/IV (dominant d'EbMaj7) en F major.",
      timeLimit: 3
    },
    {
      question: "Sobre Fmaj7#11, l'upper structure més efectiu és:",
      options: ["Bm/F", "G/F", "Em/F", "Am/F"],
      correct: 1,
      explanation: "G major triad sobre F crea FMaj13#11 amb tensions perfectes.",
      timeLimit: 5
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
    },
    {
      pattern: ["Am7", "D7", "Bm7b5", "E7alt", "Am7", "C#m7b5", "F#7", "Bm7"],
      description: "Circle of 5ths amb tonicitzacions menors",
      difficulty: "Expert"
    },
    {
      pattern: ["FMaj7#11", "Em7", "Dm7", "Cmaj7", "Bm7b5", "Bb7#11", "Am7"],
      description: "Stepwise descending roots amb extensions",
      difficulty: "Professional"
    },
    {
      pattern: ["Ebm7", "Ab7", "DbMaj7", "C7", "Fm7", "Bb7", "EbMaj7"],
      description: "Rhythm Changes bridge reharmonitzat",
      difficulty: "Expert"
    },
    {
      pattern: ["C", "E7/B", "Am", "Am/G", "F", "F#dim", "G7sus4", "G7"],
      description: "Voice leading cromàtic amb acords de pas",
      difficulty: "Professional"
    },
    {
      pattern: ["Gm7", "C7", "Am7b5", "D7", "Gm7", "Eb7", "Dm7b5", "G7"],
      description: "Minor ii-V chains amb substitucions",
      difficulty: "Expert"
    },
    {
      pattern: ["BMaj7", "D#m7", "G#m7", "C#7", "F#Maj7", "Bb7", "EbMaj7"],
      description: "Giant Steps reducit amb voice leading",
      difficulty: "Master"
    },
    {
      pattern: ["Am(maj7)", "Am7", "Am6", "Am", "Dm9", "G13", "Cmaj9"],
      description: "Minor major 7th descendint amb tensions",
      difficulty: "Expert"
    },
    {
      pattern: ["F7", "E7", "Eb7", "D7", "Db7", "C7", "F7"],
      description: "Dominant cycle cromàtic descendent",
      difficulty: "Professional"
    },
    {
      pattern: ["Cmaj7", "Am7", "F#m7b5", "B7", "Em7", "C#m7b5", "F#7", "Bm7"],
      description: "Relatives amb ii-V intercalats",
      difficulty: "Expert"
    },
    {
      pattern: ["DbMaj7", "Dm7", "G7", "Cmaj7", "C#m7", "F#7", "BMaj7"],
      description: "Chromatic mediants amb ii-V resolucions",
      difficulty: "Master"
    },
    {
      pattern: ["Em11", "A7sus4", "Dm11", "G7sus4", "Cmaj9", "Am11", "D7sus4"],
      description: "Sus4 dominants amb moviment quartal",
      difficulty: "Expert"
    },
    {
      pattern: ["Gm6", "C7", "Fm6", "Bb7", "EbMaj7", "Ab7", "DbMaj7"],
      description: "Minor 6th chords amb circle progression",
      difficulty: "Professional"
    },
    {
      pattern: ["B7alt", "E7alt", "A7alt", "D7alt", "G7alt", "C7alt", "F7alt"],
      description: "Altered dominant cycle complet",
      difficulty: "Master"
    },
    {
      pattern: ["Cmaj7/E", "Am7/C", "Fmaj7/A", "Dm7/F", "G7/B", "Em7/G", "Am7"],
      description: "Slash chords amb bass line escalar",
      difficulty: "Expert"
    },
    {
      pattern: ["F#m7", "B7", "EMaj7", "Gm7", "C7", "FMaj7", "F#m7"],
      description: "Remote key tonicizations",
      difficulty: "Professional"
    },
    {
      pattern: ["C69", "Dm11", "Em11", "F#m7b5", "G13sus4", "Am(maj9)", "Bm11b5"],
      description: "Extended harmonies en progressió diatònica",
      difficulty: "Master"
    },
    {
      pattern: ["Db7#11", "C7alt", "B7#5", "Bb7sus4", "A7alt", "Ab7#11", "G7alt"],
      description: "Chromatic dominant descent amb alteracions",
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
        { question: "ii-V-I negatiu complet:", options: ["Bmaj7-Fm(maj7)-Fmaj7", "Bm(maj7)-Fm7-Fmaj7", "BMaj7-F7-Fmaj7", "Bm7-Fm(maj7)-Fmaj7"], correct: 0 },
        { question: "Circle of 5ths negatiu de C:", options: ["C-F-Bb-Eb", "C-Ab-Eb-Bb", "C-G-D-A", "Fmaj7-Bmaj7-Emaj7-Amaj7"], correct: 3 },
        { question: "Dominant substitut de G7:", options: ["Db7", "Fm(maj7)", "F7", "Fm7"], correct: 1 },
        { question: "Am7-D7-Gmaj7 en negatiu:", options: ["Fmaj7-Bm(maj7)-F", "FMaj7-Bb(maj7)-Fmaj7", "Fm7-Bb7-Fmaj7", "F-Bb-F"], correct: 1 }
      ]
    },
    {
      challenge: "Especialista en Upper Structures",
      goal: 10,
      reward: "🏗️ Master en Upper Structures",
      questions: [
        { question: "D/C7 indica quines tensions?", options: ["9, #11, 13", "b9, #11, b13", "#9, #11, 13", "9, 11, 13"], correct: 0 },
        { question: "Bb/Am7 forma quin acord?", options: ["Am11", "Am9", "Am13", "Am7add11"], correct: 0 },
        { question: "E/Dm7 crea:", options: ["Dm(maj9)", "Dm9#11", "Dm13", "DmMaj13"], correct: 2 },
        { question: "F#dim/G7 proporciona:", options: ["Altered tensions", "Sus4 resolution", "Natural tensions", "Modal extensions"], correct: 0 },
        { question: "A/F#m7 esdevé:", options: ["F#m11", "F#m(maj9)", "F#m13", "F#mMaj11"], correct: 2 },
        { question: "Gb/F7 (tritone relation):", options: ["F7alt complet", "F13b5", "F7#11b13", "F7sus4"], correct: 0 },
        { question: "C/Bb7 forma:", options: ["Bb13", "Bb9", "Bb13#11", "Bb7add9"], correct: 2 },
        { question: "Em/D7 crea quina sonoritat?", options: ["D7sus4", "D9", "D13", "D7#11"], correct: 2 },
        { question: "Ab/G7 (upper structure):", options: ["G7b9b13", "G7alt", "G13b5", "G7#11b13"], correct: 1 },
        { question: "Bm/A7 indica:", options: ["A13", "A9", "A11", "A7sus4"], correct: 0 }
      ]
    },
    {
      challenge: "Expert en Coltrane Changes",
      goal: 12,
      reward: "🌊 Master en Coltrane Matrix",
      questions: [
        { question: "Giant Steps cycle primari:", options: ["B-G-Eb-B", "C-A-F-C", "G-E-C-G", "F-D-Bb-F"], correct: 0 },
        { question: "Countdown bridge usa:", options: ["ii-V chains", "Coltrane matrix", "Circle of 5ths", "Modal interchange"], correct: 1 },
        { question: "B7-EMaj7-G7-CMaj7 és:", options: ["V-I-V-I", "Coltrane changes", "ii-V chains", "Circle progression"], correct: 1 },
        { question: "26-2 introdueix Coltrane a:", options: ["Primer A", "Bridge", "Segon A", "Coda"], correct: 1 },
        { question: "Central Park West usa:", options: ["Standard changes", "Modal harmony", "Coltrane harmony", "Rhythm changes"], correct: 2 },
        { question: "Thirds cycle de C:", options: ["C-E-Ab-C", "C-Eb-Gb-A", "C-A-F#-Eb", "C-F-Bb-Eb"], correct: 0 },
        { question: "Resolution Africa uses:", options: ["ii-V chains", "Pentatònic", "Coltrane matrix", "Blues changes"], correct: 2 },
        { question: "Naima harmonia:", options: ["Standard ii-V", "Pedal points", "Coltrane changes", "Circle of 5ths"], correct: 1 },
        { question: "Moment's Notice intro:", options: ["ii-V-I", "Coltrane matrix", "Modal vamp", "Blues form"], correct: 1 },
        { question: "Fifth House progression:", options: ["Rhythm changes", "ii-V chains", "Coltrane matrix", "Modal jazz"], correct: 2 },
        { question: "Satellite cycle base:", options: ["Circle of 5ths", "Coltrane thirds", "Modal rotation", "ii-V chains"], correct: 1 },
        { question: "Impressions vs Giant Steps:", options: ["Modal vs Coltrane", "Blues vs jazz", "Simple vs complex", "Old vs new"], correct: 0 }
      ]
    },
    {
      challenge: "Mestre en Reharmonització",
      goal: 15,
      reward: "🎭 Master en Reharmonització Avançada",
      questions: [
        { question: "C-Am-F-G amb tritones:", options: ["C-Eb7-F-Db7", "C-A7-F-G7", "Gb7-Eb7-B7-Db7", "C-Eb7-Bb7-Db7"], correct: 0 },
        { question: "Autumn Leaves bridge reharmonized:", options: ["Am7b5-D7-Gm", "F#m7b5-B7-Em-C#m7b5-F#7-Bm", "Dm7-G7-C", "Gm7-C7-F"], correct: 1 },
        { question: "All of Me C7-F7 substitute:", options: ["Gb7-B7", "C7alt-F7alt", "Dm7-G7", "C7-Cb7"], correct: 0 },
        { question: "Body and Soul bars 5-8:", options: ["Standard ii-V", "Chromatic mediants", "Circle of 5ths", "Modal interchange"], correct: 3 },
        { question: "Summertime Em-C7:", options: ["Em-C7", "Em-Gb7", "Em-A7", "Em-F#7"], correct: 1 },
        { question: "Cherokee turnaround:", options: ["Bb-G7-Cm7-F7", "Bb-Db7-Cm7-B7", "Bb-E7-Cm7-F7", "Bb-Ab7-Cm7-F7"], correct: 1 },
        { question: "Stella bridge reharmonization:", options: ["Em7b5-A7-Dm", "Em7b5-Eb7-Dm-Db7", "Em7b5-A7alt-Dm-G7", "Bbm7-Eb7-Ab"], correct: 1 },
        { question: "How High the Moon bridge:", options: ["Standard ii-V", "Coltrane changes", "Circle of 5ths", "Chromatic ii-V"], correct: 3 },
        { question: "Fly Me to the Moon bars 1-4:", options: ["Am7-Dm7-G7-C", "Am7-Ab7-Dm7-Db7-G7-C", "Am7-D7-G7-C", "Ebm7-Ab7-Db"], correct: 1 },
        { question: "All the Things bars 1-4:", options: ["Fm7-Bb7-Eb", "Fm7-E7-Eb-D7", "Fm7-Bb7-Eb-Ab", "F#m7-B7-E-A"], correct: 1 },
        { question: "Blue Bossa bars 5-8:", options: ["Dm7b5-G7-Cm", "Dm7b5-Db7-Cm-B7", "Dm7b5-G7alt-Cm", "D7alt-G7alt-Cm"], correct: 1 },
        { question: "There Will Never Be bars 9-12:", options: ["Standard turnaround", "Chromatic descent", "Circle of 5ths", "Modal interchange"], correct: 1 },
        { question: "Solar bars 13-16:", options: ["Gm7-C7-F", "Gm7-Gb7-F-E7", "Gm7-C7-Fm-Bb7", "G7-C7-F"], correct: 1 },
        { question: "On Green Dolphin Street bridge:", options: ["ii-V chains", "Coltrane changes", "Chromatic ii-V", "Circle progression"], correct: 2 },
        { question: "What Is This Thing bars 17-20:", options: ["C-A7-Dm-G7", "C-Eb7-Dm-Db7-G7", "C-F#7-Dm-G7", "C-Ab7-Dm-G7"], correct: 1 }
      ]
    }
  ],
  puzzle: [
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
  arcade: [
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
  },
  {
    id: 'easter-hunt',
    title: 'Caça del Tresor Musical',
    description: 'Descobreix secrets harmònics amagats',
    icon: Target,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'chord-builder',
    title: 'Constructor d\'Acords Extrems',
    description: 'Construeix acords ultra-complexos nota per nota',
    icon: Puzzle,
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'progression-lab',
    title: 'Laboratori de Progressions',
    description: 'Analitza i crea cadenes harmòniques avançades',
    icon: Music,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'guitar-voicings',
    title: 'Voicings de Guitarra Jazz',
    description: 'Domineu els voicings avançats per a guitarra',
    icon: Target,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'fretboard-master',
    title: 'Mestre del Mànec',
    description: 'Navegació avançada per tot el mànec',
    icon: Puzzle,
    color: 'from-green-500 to-emerald-600'
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
            <div className="text-3xl font-bold text-blue-400 mb-2">15</div>
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

  // Component Voicings de Guitarra Jazz
  const GuitarVoicingsComponent = () => {
    const [selectedVoicing, setSelectedVoicing] = useState('');
    const [currentChord, setCurrentChord] = useState('Cmaj7');
    const [fretPosition, setFretPosition] = useState(0);
    const [showFingering, setShowFingering] = useState(false);
    const [masteredVoicings, setMasteredVoicings] = useState<string[]>([]);

    const voicingConcepts = {
      'drop2': {
        description: "Drop 2: Segona veu més aguda baixada una octava",
        theory: "Crea voicings compactes amb bona sonoritat i facilitat de digitació",
        example: "Cmaj7: C-G-B-E (root-5th-7th-3rd)"
      },
      'drop3': {
        description: "Drop 3: Tercera veu més aguda baixada una octava", 
        theory: "Permet extensions naturals i conexions suaus entre acords",
        example: "Cmaj7: C-E-G-B (root-3rd-5th-7th)"
      },
      'shell': {
        description: "Shell Voicing: Només les notes essencials (3a i 7a)",
        theory: "Defineix la qualitat de l'acord amb el mínim de notes",
        example: "Cmaj7: E-B (3rd-7th), root i 5th opcionals"
      },
      'quartal': {
        description: "Quartal: Intervals de 4a justa apilades",
        theory: "Sonoritat moderna, ambigua tonalment, molt utilitzada en jazz contemporani",
        example: "Cmaj7: G-C-F-B (intervals de 4a)"
      }
    };

    const voicingTypes = ['drop2', 'drop3', 'shell', 'quartal'];
    const jazzChords = ['Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7', 'Bø7', 'G7alt', 'Fm7', 'Bb7'];

    const getCurrentVoicingConcept = () => {
      return voicingConcepts[selectedVoicing as keyof typeof voicingConcepts];
    };

    const renderVoicingTheory = () => {
      const concept = getCurrentVoicingConcept();
      if (!concept) return null;
      
      return (
        <div className="bg-amber-900/20 p-6 rounded-lg">
          <h3 className="font-semibold text-orange-300 mb-4">Concepte: {selectedVoicing.toUpperCase()}</h3>
          
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-semibold text-orange-200 mb-2">Definició:</h4>
              <p className="text-gray-300 text-sm">{concept.description}</p>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-semibold text-orange-200 mb-2">Teoria Harmònica:</h4>
              <p className="text-gray-300 text-sm">{concept.theory}</p>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-semibold text-orange-200 mb-2">Exemple amb {currentChord}:</h4>
              <p className="text-gray-300 text-sm font-mono">{concept.example}</p>
            </div>
            
            <div className="bg-orange-600/20 border border-orange-500/30 p-4 rounded">
              <h4 className="font-semibold text-orange-300 mb-2">Aplicació Pràctica:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Busca aquestes notes al mànec en diferents posicions</li>
                <li>• Experimenta amb diferents inversions</li>
                <li>• Connecta amb altres acords usant voice leading</li>
                <li>• Prova substitucions harmòniques mantenint el voicing</li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    const testVoicing = () => {
      const voicingKey = `${currentChord}-${selectedVoicing}`;
      if (!masteredVoicings.includes(voicingKey)) {
        setMasteredVoicings([...masteredVoicings, voicingKey]);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900/30 to-amber-900/20 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">🎸 Voicings de Guitarra Jazz</h1>
              <p className="text-gray-300">Domina els voicings professionals per a guitarra jazz</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-orange-400 mb-4">Selector d'Acords</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Acord:</label>
                  <select 
                    value={currentChord}
                    onChange={(e) => setCurrentChord(e.target.value)}
                    className="w-full bg-slate-700 rounded p-2"
                  >
                    {jazzChords.map(chord => (
                      <option key={chord} value={chord}>{chord}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tipus de Voicing:</label>
                  <select 
                    value={selectedVoicing}
                    onChange={(e) => setSelectedVoicing(e.target.value)}
                    className="w-full bg-slate-700 rounded p-2"
                  >
                    <option value="">Selecciona...</option>
                    {voicingTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'drop2' ? 'Drop 2' : 
                         type === 'drop3' ? 'Drop 3' : 
                         type === 'shell' ? 'Shell Voicing' : 
                         'Quartal Harmony'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setShowFingering(!showFingering)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm"
                  >
                    {showFingering ? 'Amagar' : 'Mostrar'} Digitació
                  </button>
                  
                  <button
                    onClick={testVoicing}
                    disabled={!selectedVoicing}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-600 px-4 py-2 rounded text-sm"
                  >
                    Marcar Dominat
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Progressió ii-V-I Ràpida:</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => { setCurrentChord('Dm7'); setSelectedVoicing('drop2'); }}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/50 p-2 rounded text-left text-sm"
                  >
                    Dm7 (Drop 2) → ii
                  </button>
                  <button 
                    onClick={() => { setCurrentChord('G7alt'); setSelectedVoicing('drop2'); }}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/50 p-2 rounded text-left text-sm"
                  >
                    G7alt (Drop 2) → V
                  </button>
                  <button 
                    onClick={() => { setCurrentChord('Cmaj7'); setSelectedVoicing('drop2'); }}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/50 p-2 rounded text-left text-sm"
                  >
                    Cmaj7 (Drop 2) → I
                  </button>
                </div>
              </div>
            </div>

            {/* Voicing Theory Display */}
            <div className="lg:col-span-2">
              {selectedVoicing && currentChord ? renderVoicingTheory() : (
                <div className="bg-slate-800/50 rounded-lg p-6 text-center text-gray-500">
                  <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Selecciona un acord i tipus de voicing per veure la teoria...</p>
                </div>
              )}

              {/* Mastered Voicings */}
              {masteredVoicings.length > 0 && (
                <div className="mt-6 bg-slate-800/50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">Voicings Dominats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {masteredVoicings.map((voicing, index) => (
                      <div key={index} className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-3 text-center">
                        <div className="text-sm font-semibold text-orange-300">{voicing}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component Mestre del Mànec
  const FretboardMasterComponent = () => {
    const [selectedScale, setSelectedScale] = useState('major');
    const [rootNote, setRootNote] = useState('C');
    const [showNotes, setShowNotes] = useState(true);
    const [showIntervals, setShowIntervals] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [quizMode, setQuizMode] = useState(false);

    const scales = {
      major: [0, 2, 4, 5, 7, 9, 11],
      dorian: [0, 2, 3, 5, 7, 9, 10],
      mixolydian: [0, 2, 4, 5, 7, 9, 10],
      altered: [0, 1, 3, 4, 6, 8, 10],
      diminished: [0, 2, 3, 5, 6, 8, 9, 11],
      wholeTone: [0, 2, 4, 6, 8, 10]
    };

    const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const intervalNames = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];

    const getScaleNotes = () => {
      const rootIndex = chromaticNotes.indexOf(rootNote);
      const scaleIntervals = scales[selectedScale as keyof typeof scales];
      return scaleIntervals.map(interval => chromaticNotes[(rootIndex + interval) % 12]);
    };

    const renderScaleTheory = () => {
      const scaleNotes = getScaleNotes();
      const scaleIntervals = scales[selectedScale as keyof typeof scales];
      
      return (
        <div className="bg-green-900/20 p-6 rounded-lg">
          <h3 className="font-semibold text-green-300 mb-4">
            {rootNote} {selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)}
          </h3>
          
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-semibold text-green-200 mb-2">Notes de l'escala:</h4>
              <div className="flex flex-wrap gap-2">
                {scaleNotes.map((note, index) => (
                  <span key={index} className={`px-3 py-1 rounded text-sm ${
                    note === rootNote ? 'bg-green-500 text-white font-bold' : 'bg-green-600/60 text-white'
                  }`}>
                    {note}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded">
              <h4 className="font-semibold text-green-200 mb-2">Intervals:</h4>
              <div className="flex flex-wrap gap-2">
                {scaleIntervals.map((interval, index) => (
                  <span key={index} className="bg-slate-600 px-2 py-1 rounded text-sm">
                    {intervalNames[interval]}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-green-600/20 border border-green-500/30 p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-2">Conceptes per Guitarrista:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Busca patrons repetitius al llarg del mànec</li>
                <li>• Identifica les notes fonamentals en cada corda</li>
                <li>• Practica canvis de posició mantenint l'escala</li>
                <li>• Combina amb acords de la tonalitat</li>
                <li>• Experimenta amb bending i hammer-ons dins l'escala</li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    const cagShapes = [
      { name: 'Forma C', position: 0, description: 'Acords oberts, posició 1-3' },
      { name: 'Forma A', position: 5, description: 'Barre 5è fret, posició 5-7' },
      { name: 'Forma G', position: 7, description: 'Posició central, 7-10' },
      { name: 'Forma E', position: 10, description: 'Posició aguda, 10-12' },
      { name: 'Forma D', position: 12, description: 'Octava alta, 12-15' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900/30 to-emerald-900/20 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">🎯 Mestre del Mànec</h1>
              <p className="text-gray-300">Navega per tot el mànec amb confiança total</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Controls */}
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4">Controls</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nota Fonamental:</label>
                  <select 
                    value={rootNote}
                    onChange={(e) => setRootNote(e.target.value)}
                    className="w-full bg-slate-700 rounded p-2"
                  >
                    {chromaticNotes.map(note => (
                      <option key={note} value={note}>{note}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Escala/Mode:</label>
                  <select 
                    value={selectedScale}
                    onChange={(e) => setSelectedScale(e.target.value)}
                    className="w-full bg-slate-700 rounded p-2"
                  >
                    <option value="major">Major (Ionian)</option>
                    <option value="dorian">Dorian</option>
                    <option value="mixolydian">Mixolydian</option>
                    <option value="altered">Altered</option>
                    <option value="diminished">Diminished</option>
                    <option value="wholeTone">Whole Tone</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className={`w-full px-4 py-2 rounded text-sm ${
                      showNotes ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-600 hover:bg-slate-700'
                    }`}
                  >
                    {showNotes ? 'Amagar' : 'Mostrar'} Notes
                  </button>
                  
                  <button
                    onClick={() => setShowIntervals(!showIntervals)}
                    className={`w-full px-4 py-2 rounded text-sm ${
                      showIntervals ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-600 hover:bg-slate-700'
                    }`}
                  >
                    {showIntervals ? 'Amagar' : 'Mostrar'} Intervals
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Posicions CAGED:</h3>
                <div className="space-y-2">
                  {cagShapes.map((shape, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPosition(shape.position)}
                      className={`w-full bg-slate-700/50 hover:bg-slate-600/50 p-2 rounded text-left text-sm ${
                        currentPosition === shape.position ? 'bg-green-600/50' : ''
                      }`}
                    >
                      <div className="font-semibold text-green-300">{shape.name}</div>
                      <div className="text-xs text-gray-400">{shape.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Scale Theory */}
            <div className="lg:col-span-3">
              {renderScaleTheory()}
              
              <div className="mt-6 bg-slate-800/50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Informació de l'Escala</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Notes de l'escala:</h4>
                    <div className="flex flex-wrap gap-2">
                      {getScaleNotes().map((note, index) => (
                        <span key={index} className="bg-green-600/30 px-2 py-1 rounded text-sm">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Aplicacions Jazz:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {selectedScale === 'major' && <li>• Acords maj7, progressions ii-V-I</li>}
                      {selectedScale === 'dorian' && <li>• Acords m7, So What, modal jazz</li>}
                      {selectedScale === 'mixolydian' && <li>• Acords 7, dominant, blues</li>}
                      {selectedScale === 'altered' && <li>• Acords 7alt, tensió, bebop</li>}
                      {selectedScale === 'diminished' && <li>• Acords dim, substitucions</li>}
                      {selectedScale === 'wholeTone' && <li>• Acords aug, Debussy, modern</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component Constructor d'Acords Extrems
  const ChordBuilderComponent = () => {
    const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
    const [targetChord, setTargetChord] = useState('');
    const [difficulty, setDifficulty] = useState('extreme');
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [score, setScore] = useState(0);

    const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    const extremeChords = [
      'C13#11', 'Gm(maj9)#11', 'F#7alt', 'Bbmaj7#5', 'Am11b5',
      'D7sus4b9', 'Emaj9#11', 'Abm(maj13)', 'B7#9#11', 'F13sus4'
    ];

    const getRandomChord = () => {
      return extremeChords[Math.floor(Math.random() * extremeChords.length)];
    };

    const analyzeChord = (notes: string[]) => {
      if (notes.length < 3) return "Mínim 3 notes necessàries";
      
      const intervals = [];
      const root = notes[0];
      
      // Calcula intervals des de la root
      for (let i = 1; i < notes.length; i++) {
        const rootIndex = chromaticNotes.indexOf(root);
        const noteIndex = chromaticNotes.indexOf(notes[i]);
        const interval = (noteIndex - rootIndex + 12) % 12;
        intervals.push(interval);
      }
      
      // Identifica el tipus d'acord basat en intervals
      if (intervals.includes(4) && intervals.includes(7)) {
        if (intervals.includes(10)) return `${root}7`;
        return `${root}maj`;
      }
      if (intervals.includes(3) && intervals.includes(7)) {
        return `${root}m`;
      }
      if (intervals.includes(4) && intervals.includes(8)) {
        return `${root}aug`;
      }
      
      return "Acord complex/polychord";
    };

    const toggleNote = (note: string) => {
      if (selectedNotes.includes(note)) {
        setSelectedNotes(selectedNotes.filter(n => n !== note));
      } else {
        setSelectedNotes([...selectedNotes, note]);
      }
    };

    const checkChord = () => {
      const analysis = analyzeChord(selectedNotes);
      setShowAnalysis(true);
      
      if (analysis.includes(targetChord.split(/[0-9#b]+/)[0])) {
        setScore(score + 20);
      }
    };

    const newChallenge = () => {
      setTargetChord(getRandomChord());
      setSelectedNotes([]);
      setShowAnalysis(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/30 to-rose-900/20 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">🎹 Constructor d'Acords Extrems</h1>
              <p className="text-gray-300">Construeix acords ultra-complexos nota per nota</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Piano Interface */}
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-4">Piano Virtual</h2>
              
              <div className="mb-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold">Objectiu: {targetChord || 'Fes clic per començar'}</h3>
                  <button 
                    onClick={newChallenge}
                    className="mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Nou Acord
                  </button>
                </div>
              </div>

              {/* Virtual Piano */}
              <div className="relative bg-gray-900 rounded-lg p-4">
                <div className="flex justify-center space-x-1">
                  {chromaticNotes.map((note, index) => {
                    const isBlack = note.includes('#');
                    const isSelected = selectedNotes.includes(note);
                    
                    return (
                      <button
                        key={note}
                        onClick={() => toggleNote(note)}
                        className={`
                          ${isBlack 
                            ? 'bg-gray-800 text-white w-8 h-20 -mx-2 z-10' 
                            : 'bg-gray-100 text-black w-12 h-32'
                          }
                          ${isSelected ? (isBlack ? 'bg-red-600' : 'bg-red-400') : ''}
                          border border-gray-400 rounded-b-lg font-semibold text-sm
                          hover:opacity-80 transition-all relative
                        `}
                      >
                        <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs`}>
                          {note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Notes seleccionades:</h3>
                <div className="bg-slate-700/50 p-3 rounded-lg min-h-12 flex items-center">
                  {selectedNotes.length > 0 ? (
                    <span className="text-red-300 font-mono text-lg">
                      {selectedNotes.join(' - ')}
                    </span>
                  ) : (
                    <span className="text-gray-500">Selecciona notes al piano...</span>
                  )}
                </div>
              </div>

              <button
                onClick={checkChord}
                disabled={selectedNotes.length < 3}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold"
              >
                Analitzar Acord
              </button>
            </div>

            {/* Analysis Panel */}
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-rose-400 mb-4">Anàlisi Harmònica</h2>
              
              {showAnalysis && selectedNotes.length >= 3 ? (
                <div className="space-y-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-rose-300 mb-2">Identificació:</h3>
                    <p className="text-white text-lg font-mono">{analyzeChord(selectedNotes)}</p>
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-rose-300 mb-2">Intervals (des de {selectedNotes[0]}):</h3>
                    <div className="space-y-1">
                      {selectedNotes.slice(1).map((note, index) => {
                        const rootIndex = chromaticNotes.indexOf(selectedNotes[0]);
                        const noteIndex = chromaticNotes.indexOf(note);
                        const interval = (noteIndex - rootIndex + 12) % 12;
                        const intervalNames = ['Unison', 'm2', 'M2', 'm3', 'M3', 'P4', 'Tritó', 'P5', 'm6', 'M6', 'm7', 'M7'];
                        
                        return (
                          <div key={index} className="text-sm">
                            {note}: {intervalNames[interval]} ({interval} semitons)
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h3 className="font-semibold text-rose-300 mb-2">Funcions Possibles:</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Tònica: {selectedNotes[0]}maj o {selectedNotes[0]}m</li>
                      <li>• Dominant: V7 de {chromaticNotes[(chromaticNotes.indexOf(selectedNotes[0]) + 7) % 12]}</li>
                      <li>• Subdominant: IV de {chromaticNotes[(chromaticNotes.indexOf(selectedNotes[0]) + 5) % 12]}</li>
                    </ul>
                  </div>

                  <div className="bg-rose-600/20 border border-rose-500/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-rose-300 mb-2">Puntuació Actual:</h3>
                    <div className="text-2xl font-bold text-white">{score} punts</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Puzzle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Selecciona almenys 3 notes per veure l'anàlisi harmònica...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component Laboratori de Progressions
  const ProgressionLabComponent = () => {
    const [currentProgression, setCurrentProgression] = useState<string[]>([]);
    const [analysisMode, setAnalysisMode] = useState('functional');
    const [selectedKey, setSelectedKey] = useState('C');
    const [showVoiceLeading, setShowVoiceLeading] = useState(false);

    const jazzStandards = [
      { name: "All The Things You Are", progression: ["Fm7", "Bb7", "EbMaj7", "AbMaj7", "Dm7b5", "G7", "CMaj7"] },
      { name: "Giant Steps", progression: ["BMaj7", "D7", "GMaj7", "Bb7", "EbMaj7"] },
      { name: "Autumn Leaves", progression: ["Cm7", "F7", "BbMaj7", "EbMaj7", "Am7b5", "D7", "Gm7"] },
      { name: "Cherokee", progression: ["BbMaj7", "G7", "Cm7", "F7", "Dm7", "G7", "Cm7", "F7"] }
    ];

    const analyzeProgression = (chords: string[], mode: string) => {
      if (mode === 'functional') {
        return chords.map((chord, i) => `${i + 1}. ${chord} → análisi funcional`);
      }
      if (mode === 'voice-leading') {
        return chords.map((chord, i) => `${chord}: moviment de veus`);
      }
      return chords.map((chord, i) => `${chord}: substitucions possibles`);
    };

    const loadStandard = (standard: any) => {
      setCurrentProgression(standard.progression);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900/30 to-blue-900/20 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">🔬 Laboratori de Progressions</h1>
              <p className="text-gray-300">Analitza cadenes harmòniques complexes amb eines professionals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Standards Library */}
            <div className="bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Biblioteca d'Standards</h2>
              
              <div className="space-y-3">
                {jazzStandards.map((standard, index) => (
                  <button
                    key={index}
                    onClick={() => loadStandard(standard)}
                    className="w-full bg-slate-700/50 hover:bg-slate-600/50 p-3 rounded-lg text-left"
                  >
                    <div className="font-semibold text-cyan-300">{standard.name}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {standard.progression.slice(0, 3).join(' - ')}...
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-3">Controls d'Anàlisi:</h3>
                <select 
                  value={analysisMode}
                  onChange={(e) => setAnalysisMode(e.target.value)}
                  className="w-full bg-slate-700 rounded p-2 mb-3"
                >
                  <option value="functional">Anàlisi Funcional</option>
                  <option value="voice-leading">Voice Leading</option>
                  <option value="substitutions">Substitucions</option>
                </select>

                <select 
                  value={selectedKey}
                  onChange={(e) => setSelectedKey(e.target.value)}
                  className="w-full bg-slate-700 rounded p-2 mb-3"
                >
                  {chromaticNotes.map(note => (
                    <option key={note} value={note}>{note} Major</option>
                  ))}
                </select>

                <button
                  onClick={() => setShowVoiceLeading(!showVoiceLeading)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded"
                >
                  {showVoiceLeading ? 'Amagar' : 'Mostrar'} Voice Leading
                </button>
              </div>
            </div>

            {/* Progression Display */}
            <div className="lg:col-span-2 bg-slate-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-blue-400 mb-4">Progressió Actual</h2>
              
              {currentProgression.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-3">
                    {currentProgression.map((chord, index) => (
                      <div key={index} className="bg-slate-700/50 p-4 rounded-lg text-center">
                        <div className="text-lg font-bold text-blue-300">{chord}</div>
                        <div className="text-sm text-gray-400 mt-1">Comp {index + 1}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-300 mb-3">
                      Anàlisi {analysisMode === 'functional' ? 'Funcional' : analysisMode === 'voice-leading' ? 'Voice Leading' : 'Substitucions'}:
                    </h3>
                    
                    <div className="space-y-2">
                      {analyzeProgression(currentProgression, analysisMode).map((analysis, index) => (
                        <div key={index} className="text-sm bg-slate-800/50 p-2 rounded">
                          {analysis}
                        </div>
                      ))}
                    </div>
                  </div>

                  {showVoiceLeading && (
                    <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-6">
                      <h3 className="font-semibold text-blue-300 mb-3">Moviment de Veus:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Soprano:</h4>
                          <div className="text-sm font-mono bg-slate-800/50 p-2 rounded">
                            {currentProgression.map((_, i) => `${5 + i % 3}`).join(' → ')}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Bass:</h4>
                          <div className="text-sm font-mono bg-slate-800/50 p-2 rounded">
                            {currentProgression.map(chord => chord.charAt(0)).join(' → ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Music className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Selecciona un standard per començar l'anàlisi harmònica...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component de la Caça del Tresor Musical
  const EasterHuntComponent = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [foundSecrets, setFoundSecrets] = useState<string[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [discoveredTreasures, setDiscoveredTreasures] = useState<any[]>([]);

    const easterEggs = [
      {
        title: "El Secret del Tritó",
        clue: "En el centre de l'octava, dividint perfectament... Quants semitons conté el diabolus in musica?",
        hint: "Els medievals el van banir de l'església per la seva sonoritat inquietant",
        answer: "6",
        treasure: {
          name: "Substitució Tritònica",
          description: "Descobreixes que pots substituir qualsevol V7 pel seu tritó! G7 → Db7",
          musical_secret: "El tritó F-B en G7 es converteix en F-Cb (B) en Db7, mantenint la tensió."
        }
      },
      {
        title: "L'Enigma de Coltrane",
        clue: "Tres centres tonals que divideixen l'octava en parts iguals. Comença amb B, continua amb...?",
        hint: "Giant Steps révela la matriu geomètrica de terceres majors",
        answer: "G Eb",
        treasure: {
          name: "Coltrane Matrix",
          description: "Desbloqueja la geometria harmònica de Giant Steps!",
          musical_secret: "B-G-Eb (terceres majors) = 0-4-8 semitons, dividint l'octava en tres."
        }
      },
      {
        title: "El Misteri de l'Harmonia Negativa",
        clue: "Si Am7 es converteix en Fmaj7 quan es reflecteix, quin acord és la reflexió de G7?",
        hint: "L'axis està entre E i Ab en C major...",
        answer: "Fm(maj7)",
        treasure: {
          name: "Reflexió Harmònica",
          description: "Domines l'art de Jacob Collier!",
          musical_secret: "G7 (G-B-D-F) reflectit = F-D-Bb-G# = Fm(maj7)"
        }
      },
      {
        title: "El Código Bill Evans",
        clue: "Rootless voicing tipus A sobre Cmaj7. Quines notes contenen les veus superiors?",
        hint: "So What chord... les veus que Bill Evans feia famoses",
        answer: "E G B D",
        treasure: {
          name: "Voicings Rootless",
          description: "Desbloquejes els voicings de pianista professional!",
          musical_secret: "Tipus A = 3-5-7-9, eliminant la root per evitar conflictes amb el baix."
        }
      },
      {
        title: "L'Upper Structure Secret",
        clue: "D major triad sobre C7. Quines tensions generes?",
        hint: "Pensa en les notes D-F#-A sobre C-E-G-Bb...",
        answer: "9 #11 13",
        treasure: {
          name: "Upper Structures",
          description: "Descobreixes l'alquímia dels polychords!",
          musical_secret: "D/C7 = C7(9,#11,13) - D(9th), F#(#11th), A(13th)"
        }
      },
      {
        title: "El Misteri Modal",
        clue: "Mode amb 3a menor i 6a major, el favorit de Miles Davis...",
        hint: "So What està en aquest mode, començant per D",
        answer: "Dorian",
        treasure: {
          name: "Modalitat Avançada",
          description: "Entens els secrets dels modes grecs!",
          musical_secret: "Dòric = escala menor natural amb 6a major, perfecte per al jazz modal."
        }
      }
    ];

    const checkAnswer = () => {
      const currentEgg = easterEggs[currentLevel];
      const normalizedInput = userInput.toLowerCase().trim();
      const normalizedAnswer = currentEgg.answer.toLowerCase();

      if (normalizedInput === normalizedAnswer || 
          normalizedInput.includes(normalizedAnswer) ||
          (currentEgg.answer === "G Eb" && (normalizedInput.includes("g") && normalizedInput.includes("eb")))) {
        
        setFoundSecrets([...foundSecrets, currentEgg.title]);
        setDiscoveredTreasures([...discoveredTreasures, currentEgg.treasure]);
        
        if (currentLevel < easterEggs.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setUserInput('');
          setShowHint(false);
        }
        return true;
      }
      return false;
    };

    const isComplete = foundSecrets.length === easterEggs.length;
    const progress = (foundSecrets.length / easterEggs.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-pink-900/20 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button onClick={() => handleNavigate('home')} className="mr-4 p-2 rounded-lg bg-white/10 hover:bg-white/20">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-4xl font-bold mb-2">🎯 Caça del Tresor Musical</h1>
              <p className="text-gray-300">Descobreix els secrets harmònics més profunds del jazz</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progres de la caça</span>
              <span>{foundSecrets.length}/{easterEggs.length} secrets descoberts</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Challenge */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
              {!isComplete ? (
                <>
                  <h2 className="text-2xl font-bold text-purple-400 mb-4">
                    {easterEggs[currentLevel].title}
                  </h2>
                  
                  <div className="mb-6">
                    <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-purple-300 mb-2">🔍 Pista:</h3>
                      <p className="text-gray-300">{easterEggs[currentLevel].clue}</p>
                    </div>

                    {showHint && (
                      <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold text-yellow-400 mb-2">💡 Ajuda:</h3>
                        <p className="text-yellow-200">{easterEggs[currentLevel].hint}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Escriu la teva resposta..."
                      className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    />
                    
                    <div className="flex gap-3">
                      <button
                        onClick={checkAnswer}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-semibold"
                      >
                        Comprovar
                      </button>
                      
                      <button
                        onClick={() => setShowHint(!showHint)}
                        className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg font-semibold"
                      >
                        {showHint ? 'Amagar' : 'Ajuda'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-3xl font-bold text-purple-400 mb-4">Caça Completada!</h2>
                  <p className="text-gray-300 mb-6">
                    Has descobert tots els secrets harmònics. Ara ets un veritable mestre del jazz!
                  </p>
                  <button
                    onClick={() => {
                      setCurrentLevel(0);
                      setFoundSecrets([]);
                      setDiscoveredTreasures([]);
                      setUserInput('');
                      setShowHint(false);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold"
                  >
                    Començar Nova Caça
                  </button>
                </div>
              )}
            </div>

            {/* Discovered Treasures */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-pink-500/20">
              <h2 className="text-2xl font-bold text-pink-400 mb-4">🎁 Tresors Descoberts</h2>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {discoveredTreasures.map((treasure, index) => (
                  <div key={index} className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4">
                    <h3 className="font-bold text-pink-300 mb-2">{treasure.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{treasure.description}</p>
                    <div className="bg-slate-700/50 p-2 rounded text-xs">
                      <strong className="text-pink-400">Secret Musical:</strong>
                      <p className="text-gray-400 mt-1">{treasure.musical_secret}</p>
                    </div>
                  </div>
                ))}
                
                {discoveredTreasures.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Els teus tresors apareixeran aquí quan resolguis les pistes...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Secrets Found List */}
          {foundSecrets.length > 0 && (
            <div className="mt-8 bg-slate-800/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-4">🌟 Secrets Desbloquejats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {foundSecrets.map((secret, index) => (
                  <div key={index} className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-3 text-center">
                    <div className="text-sm font-semibold text-purple-300">{secret}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
    
    if (mode === 'easter-hunt') {
      return <EasterHuntComponent />;
    }
    
    if (mode === 'chord-builder') {
      return <ChordBuilderComponent />;
    }
    
    if (mode === 'progression-lab') {
      return <ProgressionLabComponent />;
    }
    
    if (mode === 'guitar-voicings') {
      return <GuitarVoicingsComponent />;
    }
    
    if (mode === 'fretboard-master') {
      return <FretboardMasterComponent />;
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