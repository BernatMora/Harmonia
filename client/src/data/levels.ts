export interface Exercise {
  id: number;
  type: 'identify' | 'listen' | 'construct' | 'analyze';
  question: string;
  content?: string;
  example?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  concepts: string[];
  exercises: Exercise[];
  requiredScore: number;
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Notes i Octaves",
    description: "Aprèn les notes musicals i el concepte d'octava",
    difficulty: 'beginner',
    concepts: ['Notes naturals', 'Alteracions', 'Octaves'],
    requiredScore: 80,
    exercises: [
      {
        id: 1,
        type: 'identify',
        question: "Quina nota es troba una octava per sobre de C4?",
        content: "Recorda que una octava conté 12 semitons i torna a la mateixa nota però més aguda.",
        options: ['C5', 'C3', 'G4', 'F4'],
        correctAnswer: 'C5',
        explanation: "Una octava per sobre de C4 és C5. L'octava és la distància de 12 semitons que ens porta de nou a la mateixa nota però en un registre diferent.",
        hint: "L'octava sempre manté el mateix nom de nota però canvia el número."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quantes alteracions (♯/♭) hi ha en una octava cromàtica?",
        content: "L'escala cromàtica conté totes les notes possibles dins d'una octava.",
        options: ['5', '7', '10', '12'],
        correctAnswer: '5',
        explanation: "Hi ha 5 alteracions en una octava: C♯/D♭, D♯/E♭, F♯/G♭, G♯/A♭, A♯/B♭. Entre E-F i B-C no hi ha alteracions.",
        hint: "Pensa en les tecles negres del piano."
      },
      {
        id: 3,
        type: 'construct',
        question: "Construeix la seqüència cromàtica ascendent des de F fins a F (següent octava):",
        content: "Utilitza només sostinguts (♯) per a les alteracions.",
        options: ['F-F♯-G-G♯-A-A♯-B-C-C♯-D-D♯-E-F', 'F-G♭-G-A♭-A-B♭-B-C-D♭-D-E♭-E-F', 'F-G-A-B-C-D-E-F', 'F-F♯-G-A♭-A-B♭-B-C-D♭-D-E♭-E-F'],
        correctAnswer: 'F-F♯-G-G♯-A-A♯-B-C-C♯-D-D♯-E-F',
        explanation: "La seqüència cromàtica amb sostinguts des de F: F-F♯-G-G♯-A-A♯-B-C-C♯-D-D♯-E-F. Cada pas és un semitò.",
        hint: "Cada nota està separada per exactament un semitò (mig to)."
      },
      {
        id: 4,
        type: 'identify',
        question: "Quina nota està 2 octaves per sota de A5?",
        content: "Cada octava baixa el número en 1.",
        options: ['A3', 'A2', 'A4', 'A1'],
        correctAnswer: 'A3',
        explanation: "2 octaves per sota de A5: A5 → A4 (1 octava) → A3 (2 octaves). Cada octava baixa el número en 1.",
        hint: "Resta 2 al número de l'octava original."
      },
      {
        id: 5,
        type: 'analyze',
        question: "En quin ordre apareixen les alteracions dels sostinguts?",
        content: "L'ordre dels sostinguts segueix el cicle de quintes.",
        options: ['F♯-C♯-G♯-D♯-A♯-E♯-B♯', 'C♯-F♯-B♯-E♯-A♯-D♯-G♯', 'F♯-G♯-A♯-B♯-C♯-D♯-E♯', 'G♯-D♯-A♯-E♯-B♯-F♯-C♯'],
        correctAnswer: 'F♯-C♯-G♯-D♯-A♯-E♯-B♯',
        explanation: "L'ordre dels sostinguts és F♯-C♯-G♯-D♯-A♯-E♯-B♯, seguint el cicle de quintes ascendents des de F♯.",
        hint: "Comença per F♯ i segueix el cicle de quintes: F♯ → C♯ → G♯..."
      },
      {
        id: 6,
        type: 'identify',
        question: "Quina nota està 3 semitons per sobre de G?",
        content: "Compta cromàticament: G → G♯ → A → A♯",
        options: ['A♯/B♭', 'A', 'B', 'C'],
        correctAnswer: 'A♯/B♭',
        explanation: "3 semitons per sobre de G: G(0) → G♯(1) → A(2) → A♯/B♭(3).",
        hint: "Compta cada semitò cromàticament."
      },
      {
        id: 7,
        type: 'construct',
        question: "Escriu la seqüència de bemolls en ordre:",
        content: "L'ordre dels bemolls és l'invers dels sostinguts.",
        options: ['B♭-E♭-A♭-D♭-G♭-C♭-F♭', 'F♭-C♭-G♭-D♭-A♭-E♭-B♭', 'E♭-A♭-D♭-G♭-C♭-F♭-B♭', 'B♭-F♭-C♭-G♭-D♭-A♭-E♭'],
        correctAnswer: 'B♭-E♭-A♭-D♭-G♭-C♭-F♭',
        explanation: "L'ordre dels bemolls és B♭-E♭-A♭-D♭-G♭-C♭-F♭, seguint el cicle de quintes descendents.",
        hint: "És l'ordre invers dels sostinguts."
      },
      {
        id: 8,
        type: 'analyze',
        question: "Quantes octaves hi ha en un piano estàndard de 88 tecles?",
        content: "Un piano estàndard va des d'A0 fins a C8.",
        options: ['7 octaves completes', '8 octaves completes', 'Més de 7 però menys de 8', '6 octaves completes'],
        correctAnswer: 'Més de 7 però menys de 8',
        explanation: "Un piano de 88 tecles té 7 octaves completes més algunes notes addicionals (A0-B0 i C8), totalitzant més de 7 però menys de 8 octaves completes.",
        hint: "Compta des d'A0 fins a C8."
      }
    ]
  },
  {
    id: 2,
    title: "Intervals Bàsics",
    description: "Domina els intervals fonamentals i la seva classificació",
    difficulty: 'beginner',
    concepts: ['Intervals simples', 'Qualitat dels intervals', 'Inversió'],
    requiredScore: 85,
    exercises: [
      {
        id: 1,
        type: 'identify',
        question: "Quin interval hi ha entre C i G?",
        content: "Compta les notes incloses: C-D-E-F-G",
        options: ['4a perfecta', '5a perfecta', '6a major', '5a disminuïda'],
        correctAnswer: '5a perfecta',
        explanation: "Entre C i G hi ha una 5a perfecta. Comptant C(1)-D(2)-E(3)-F(4)-G(5) = 5a, i és perfecta perquè conté 7 semitons.",
        hint: "Compta les línies i espais del pentagrama inclosos."
      },
      {
        id: 2,
        type: 'analyze',
        question: "Si inverteixes una 3a major, quin interval obtens?",
        content: "L'inversió d'un interval es calcula: 9 - interval original, i la qualitat canvia (major↔menor, augmentat↔disminuït).",
        options: ['6a menor', '6a major', '3a menor', '7a menor'],
        correctAnswer: '6a menor',
        explanation: "La inversió d'una 3a major és una 6a menor. Fórmula: 9-3=6, i major esdevé menor en la inversió.",
        hint: "Recorda: major es converteix en menor quan s'inverteix."
      },
      {
        id: 3,
        type: 'identify',
        question: "Quants semitons conté una 4a augmentada?",
        content: "La 4a perfecta conté 5 semitons. L'augmentada en té un més.",
        options: ['5', '6', '7', '4'],
        correctAnswer: '6',
        explanation: "Una 4a augmentada conté 6 semitons. És el mateix nombre de semitons que un trító (per exemple, C-F♯).",
        hint: "L'interval augmentat té un semitò més que el perfecte."
      },
      {
        id: 4,
        type: 'construct',
        question: "Construeix una 7a menor des de E:",
        content: "Una 7a menor conté 10 semitons.",
        options: ['E-D', 'E-D♯', 'E-D♭', 'E-C♯'],
        correctAnswer: 'E-D',
        explanation: "Una 7a menor des de E és E-D. Comptant: E(1)-F(2)-G(3)-A(4)-B(5)-C(6)-D(7), i conté 10 semitons.",
        hint: "Compta 7 graus i assegura't que siguin 10 semitons."
      },
      {
        id: 5,
        type: 'analyze',
        question: "Quin interval complementari forma una 4a perfecta quan s'inverteix?",
        content: "Els intervals complementaris sempre sumen 9.",
        options: ['5a perfecta', '5a disminuïda', '5a augmentada', '6a major'],
        correctAnswer: '5a perfecta',
        explanation: "La inversió d'una 4a perfecta és una 5a perfecta. 4+5=9, i perfecte roman perfecte en la inversió.",
        hint: "Els intervals perfectes romanen perfectes quan s'inverteixen."
      },
      {
        id: 6,
        type: 'identify',
        question: "Quants semitons hi ha en una 6a major?",
        content: "La 6a major és un interval molt comú en harmonia.",
        options: ['8', '9', '10', '11'],
        correctAnswer: '9',
        explanation: "Una 6a major conté 9 semitons. Per exemple, C-A: C-C♯-D-D♯-E-F-F♯-G-G♯-A = 9 semitons.",
        hint: "Compta els semitons cromàticament des de la nota inferior."
      },
      {
        id: 7,
        type: 'construct',
        question: "Construeix una 2a augmentada des de F:",
        content: "Una 2a augmentada conté 3 semitons.",
        options: ['F-G♯', 'F-G', 'F-A♭', 'F-A'],
        correctAnswer: 'F-G♯',
        explanation: "Una 2a augmentada des de F és F-G♯. Conté 3 semitons i és enarmònicament equivalent a una 3a menor.",
        hint: "Augmenta la 2a major en un semitò."
      },
      {
        id: 8,
        type: 'identify',
        question: "Quin interval hi ha entre F♯ i D?",
        content: "Compta els graus: F♯-G-A-B-C-D",
        options: ['6a menor', '6a major', '5a augmentada', '6a disminuïda'],
        correctAnswer: '6a menor',
        explanation: "Entre F♯ i D hi ha una 6a menor (8 semitons). F♯(1)-G(2)-A(3)-B(4)-C(5)-D(6) = 6a, i conté 8 semitons.",
        hint: "Compta els graus i després els semitons."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quina relació tenen els intervals 4a augmentada i 5a disminuïda?",
        content: "Ambdós intervals contenen el mateix nombre de semitons.",
        options: ['Són enarmònics', 'Són complementaris', 'Són inversos', 'No tenen relació'],
        correctAnswer: 'Són enarmònics',
        explanation: "La 4a augmentada i la 5a disminuïda són enarmòniques: ambdues contenen 6 semitons (trítò) però s'escriuen diferent.",
        hint: "Ambdós intervals tenen 6 semitons."
      }
    ]
  },
  {
    id: 3,
    title: "Escales Majors i Menors",
    description: "Construeix i analitza escales majors i menors naturals",
    difficulty: 'beginner',
    concepts: ['Escales majors', 'Escales menors naturals', 'Armadures', 'Graus de l\'escala'],
    requiredScore: 85,
    exercises: [
      {
        id: 1,
        type: 'construct',
        question: "Construeix l'escala de G major:",
        content: "Utilitza el patró d'intervals: T-T-ST-T-T-T-ST (T=to, ST=semitò)",
        options: ['G-A-B-C-D-E-F♯-G', 'G-A-B-C-D-E-F-G', 'G-A♯-B-C♯-D-E♯-F♯-G', 'G-A-B♭-C-D-E-F-G'],
        correctAnswer: 'G-A-B-C-D-E-F♯-G',
        explanation: "G major: G-A-B-C-D-E-F♯-G. El F♯ és necessari per mantenir el patró T-T-ST-T-T-T-ST.",
        hint: "Entre el 7è grau i l'octava ha d'haver-hi només un semitò."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quina és l'escala menor natural relativa de C major?",
        content: "L'escala menor relativa comparteix la mateixa armadura però comença en el 6è grau.",
        options: ['A menor', 'E menor', 'F menor', 'D menor'],
        correctAnswer: 'A menor',
        explanation: "A menor és la relativa de C major. Ambdues no tenen alteracions i A és el 6è grau de C major.",
        hint: "Compta 6 graus des de C: C(1)-D(2)-E(3)-F(4)-G(5)-A(6)."
      },
      {
        id: 3,
        type: 'analyze',
        question: "Quantes alteracions té l'armadura de D major?",
        content: "Segueix el cicle de quintes per trobar les alteracions: F♯, C♯, G♯, D♯, A♯, E♯, B♯",
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: "D major té 2 sostinguts: F♯ i C♯. En el cicle de quintes: C(0)-G(1♯)-D(2♯)-A(3♯)...",
        hint: "D està a dues posicions de C en el cicle de quintes."
      },
      {
        id: 4,
        type: 'identify',
        question: "Quina escala major té 4 sostinguts?",
        content: "Segueix el cicle de quintes: C(0)-G(1♯)-D(2♯)-A(3♯)-E(4♯)...",
        options: ['E major', 'A major', 'B major', 'F♯ major'],
        correctAnswer: 'E major',
        explanation: "E major té 4 sostinguts: F♯, C♯, G♯, D♯. En el cicle de quintes: C(0)-G(1)-D(2)-A(3)-E(4).",
        hint: "Compta 4 posicions des de C en el cicle de quintes."
      },
      {
        id: 5,
        type: 'construct',
        question: "Construeix l'escala de F menor natural:",
        content: "Utilitza el patró: T-ST-T-T-ST-T-T",
        options: ['F-G-A♭-B♭-C-D♭-E♭-F', 'F-G-A-B♭-C-D-E-F', 'F-G♭-A♭-B♭-C♭-D♭-E♭-F', 'F-G-A♭-B-C-D♭-E♭-F'],
        correctAnswer: 'F-G-A♭-B♭-C-D♭-E♭-F',
        explanation: "F menor natural: F-G-A♭-B♭-C-D♭-E♭-F. Segueix el patró T-ST-T-T-ST-T-T de l'escala menor natural.",
        hint: "L'escala menor natural té el 3r, 6è i 7è graus bemolls respecte a la major."
      },
      {
        id: 6,
        type: 'analyze',
        question: "Quina relació hi ha entre C major i A menor?",
        content: "Aquestes dues escales comparteixen les mateixes notes.",
        options: ['Escales relatives', 'Escales paral·leles', 'Escales homònimes', 'Escales enarmòniques'],
        correctAnswer: 'Escales relatives',
        explanation: "C major i A menor són escales relatives: comparteixen la mateixa armadura (cap alteració) però tenen centres tonals diferents.",
        hint: "Les escales relatives comparteixen les mateixes notes però diferents tòniques."
      },
      {
        id: 7,
        type: 'construct',
        question: "Construeix l'escala de B♭ major:",
        content: "B♭ major té 2 bemolls: B♭ i E♭.",
        options: ['B♭-C-D-E♭-F-G-A-B♭', 'B♭-C-D-E-F-G-A-B♭', 'B♭-C♭-D-E♭-F-G♭-A-B♭', 'B♭-C-D♭-E♭-F-G-A♭-B♭'],
        correctAnswer: 'B♭-C-D-E♭-F-G-A-B♭',
        explanation: "B♭ major: B♭-C-D-E♭-F-G-A-B♭. Té 2 bemolls (B♭ i E♭) segons l'armadura.",
        hint: "Recorda que B♭ major té B♭ i E♭."
      },
      {
        id: 8,
        type: 'identify',
        question: "Quina escala menor té la mateixa armadura que E major?",
        content: "E major té 4 sostinguts. Busca la seva relativa menor.",
        options: ['C♯ menor', 'F♯ menor', 'G♯ menor', 'A menor'],
        correctAnswer: 'C♯ menor',
        explanation: "C♯ menor és la relativa d'E major. Ambdues tenen 4 sostinguts: F♯, C♯, G♯, D♯.",
        hint: "La relativa menor està al 6è grau de l'escala major."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quin grau de l'escala menor natural té la sensible?",
        content: "La sensible és la nota que està un semitò sota la tònica.",
        options: ['No en té', '7è grau alterat', '6è grau', '2n grau'],
        correctAnswer: '7è grau alterat',
        explanation: "L'escala menor natural no té sensible natural. Cal alterar el 7è grau (pujar-lo un semitò) per crear la sensible.",
        hint: "L'escala menor natural té el 7è grau a un to de la tònica."
      }
    ]
  },
  {
    id: 4,
    title: "Triades Bàsiques",
    description: "Construeix i identifica triades majors, menors i disminuïdes",
    difficulty: 'beginner',
    concepts: ['Triades majors', 'Triades menors', 'Triades disminuïdes', 'Triades augmentades', 'Inversions'],
    requiredScore: 85,
    exercises: [
      {
        id: 1,
        type: 'construct',
        question: "Construeix la triada de F major:",
        content: "Una triada major conté: fonamental, 3a major i 5a perfecta",
        options: ['F-A-C', 'F-A♭-C', 'F-A-C♯', 'F-G-C'],
        correctAnswer: 'F-A-C',
        explanation: "F major: F(fonamental) - A(3a major, 4 semitons) - C(5a perfecta, 7 semitons des de F).",
        hint: "Utilitza les notes de l'escala de F major: F-G-A-B♭-C-D-E."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quin tipus de triada és B-D-F?",
        content: "Analitza els intervals: B a D, i D a F",
        options: ['Major', 'Menor', 'Disminuïda', 'Augmentada'],
        correctAnswer: 'Disminuïda',
        explanation: "B-D-F és disminuïda: B-D (3a menor, 3 semitons) + D-F (3a menor, 3 semitons) = triada disminuïda.",
        hint: "Una triada disminuïda té dues terceres menors consecutives."
      },
      {
        id: 3,
        type: 'analyze',
        question: "Quina és la primera inversió de C major (C-E-G)?",
        content: "En la primera inversió, la tercera de la triada passa al baix",
        options: ['E-G-C', 'G-C-E', 'C-G-E', 'E-C-G'],
        correctAnswer: 'E-G-C',
        explanation: "La primera inversió de C major és E-G-C. La tercera (E) passa al baix, mantenint l'ordre de les altres notes.",
        hint: "Posa la nota del mig (tercera) com a nota més greu."
      },
      {
        id: 4,
        type: 'identify',
        question: "Quin tipus de triada és D-F-A?",
        content: "Analitza els intervals des de la fonamental.",
        options: ['Major', 'Menor', 'Disminuïda', 'Augmentada'],
        correctAnswer: 'Menor',
        explanation: "D-F-A és menor: D-F (3a menor, 3 semitons) + F-A (3a major, 4 semitons) = triada menor.",
        hint: "Una triada menor té 3a menor + 3a major."
      },
      {
        id: 5,
        type: 'construct',
        question: "Construeix la triada augmentada de C:",
        content: "Una triada augmentada té 3a major + 3a major.",
        options: ['C-E-G♯', 'C-E-G', 'C-E♭-G', 'C-E-G♭'],
        correctAnswer: 'C-E-G♯',
        explanation: "C augmentada: C-E-G♯. Conté 3a major (C-E, 4 semitons) + 3a major (E-G♯, 4 semitons).",
        hint: "Augmenta la 5a perfecta en un semitò."
      },
      {
        id: 6,
        type: 'analyze',
        question: "Quina és la segona inversió de F major (F-A-C)?",
        content: "En la segona inversió, la quinta passa al baix.",
        options: ['C-F-A', 'A-C-F', 'F-C-A', 'C-A-F'],
        correctAnswer: 'C-F-A',
        explanation: "La segona inversió de F major és C-F-A. La quinta (C) passa al baix, creant un acord de quarta i sisena.",
        hint: "La nota més aguda (quinta) es converteix en la més greu."
      },
      {
        id: 7,
        type: 'identify',
        question: "Quin tipus de triada és F♯-A-C?",
        content: "Analitza els intervals des de la fonamental.",
        options: ['Major', 'Menor', 'Disminuïda', 'Augmentada'],
        correctAnswer: 'Disminuïda',
        explanation: "F♯-A-C és disminuïda: F♯-A (3a menor, 3 semitons) + A-C (3a menor, 3 semitons) = triada disminuïda.",
        hint: "Dues terceres menors consecutives formen una triada disminuïda."
      },
      {
        id: 8,
        type: 'construct',
        question: "Construeix la triada de A♭ major:",
        content: "Utilitza les notes de l'escala d'A♭ major.",
        options: ['A♭-C-E♭', 'A♭-C-E', 'A♭-B-E♭', 'A♭-C♭-E♭'],
        correctAnswer: 'A♭-C-E♭',
        explanation: "A♭ major: A♭(fonamental) - C(3a major) - E♭(5a perfecta). Utilitza les notes de l'escala d'A♭ major.",
        hint: "A♭ major té 4 bemolls: B♭, E♭, A♭, D♭."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quina inversió de C major té C com a nota més aguda?",
        content: "Analitza la posició de C en cada inversió.",
        options: ['Posició fonamental', 'Primera inversió', 'Segunda inversió', 'Cap de les anteriors'],
        correctAnswer: 'Primera inversió',
        explanation: "En la primera inversió E-G-C, la nota C (originalment fonamental) està a la part superior.",
        hint: "En la primera inversió, la fonamental original passa a ser la nota superior."
      }
    ]
  },
  {
    id: 5,
    title: "Progressions Harmòniques I-IV-V",
    description: "Comprèn les progressions fonamentals de la harmonia tonal",
    difficulty: 'intermediate',
    concepts: ['Graus harmònics', 'Cadències', 'Funcions tonals', 'Xifrat romà'],
    requiredScore: 90,
    exercises: [
      {
        id: 1,
        type: 'analyze',
        question: "En C major, quins acords formen la progressió I-IV-V-I?",
        content: "Utilitza triades diatòniques construïdes sobre cada grau de l'escala",
        options: ['C-F-G-C', 'C-Dm-Em-C', 'C-F-G7-C', 'Ambdues a i c'],
        correctAnswer: 'Ambdues a i c',
        explanation: "En C major: I=C major, IV=F major, V=G major (o G7). Ambdues opcions C-F-G-C i C-F-G7-C són correctes.",
        hint: "El V grau pot ser triada simple o acord de 7a de dominanta."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quin tipus de cadència és V-I?",
        content: "Les cadències defineixen el final de frases musicals",
        options: ['Autèntica', 'Plagal', 'Deceptiva', 'Mitjana'],
        correctAnswer: 'Autèntica',
        explanation: "V-I és una cadència autèntica, la més conclusiva en harmonia tonal. Crea una forta sensació de resolució.",
        hint: "Aquesta cadència implica el moviment de la dominant cap a la tònica."
      },
      {
        id: 3,
        type: 'construct',
        question: "En G major, quina progressió correspon a vi-IV-I-V?",
        content: "Identifica cada grau de l'escala i la seva qualitat (major/menor)",
        options: ['Em-C-G-D', 'E-C-G-D', 'Em-C-Gm-D', 'Em-Cm-G-D'],
        correctAnswer: 'Em-C-G-D',
        explanation: "En G major: vi=Em (menor), IV=C (major), I=G (major), V=D (major). Progressió: Em-C-G-D.",
        hint: "El 6è grau d'una escala major sempre forma una triada menor."
      },
      {
        id: 4,
        type: 'identify',
        question: "Quin tipus de cadència és IV-I?",
        content: "Aquesta cadència també es coneix com a 'cadència d'amén'.",
        options: ['Autèntica', 'Plagal', 'Deceptiva', 'Mitjana'],
        correctAnswer: 'Plagal',
        explanation: "IV-I és una cadència plagal o 'cadència d'amén'. És menys conclusiva que V-I però molt utilitzada en música religiosa.",
        hint: "La cadència plagal utilitza la subdominant (IV) en lloc de la dominant (V)."
      },
      {
        id: 5,
        type: 'analyze',
        question: "En A menor, quins acords formen la progressió i-iv-V-i?",
        content: "En menor, el V grau sovint s'altera per crear una dominant major.",
        options: ['Am-Dm-E-Am', 'Am-Dm-Em-Am', 'Am-D-E-Am', 'A-D-E-A'],
        correctAnswer: 'Am-Dm-E-Am',
        explanation: "En A menor: i=Am, iv=Dm, V=E (major, amb G♯ alterat), i=Am. El V grau s'altera per crear una dominant funcional.",
        hint: "El V grau en menor sovint es fa major per millorar la resolució."
      },
      {
        id: 6,
        type: 'construct',
        question: "Crea una progressió que inclogui una cadència deceptiva en C major:",
        content: "Una cadència deceptiva resol V cap a vi en lloc de I.",
        options: ['C-F-G-Am', 'C-Am-F-G', 'C-G-F-C', 'C-Dm-G-C'],
        correctAnswer: 'C-F-G-Am',
        explanation: "C-F-G-Am conté una cadència deceptiva: G(V) resol cap a Am(vi) en lloc de C(I), creant sorpresa harmònica.",
        hint: "La cadència deceptiva 'enganya' l'oïda resolent cap al vi en lloc del I."
      },
      {
        id: 7,
        type: 'identify',
        question: "En F major, quin acord és el ii grau?",
        content: "El ii grau es construeix sobre la segona nota de l'escala.",
        options: ['Gm', 'Am', 'Dm', 'Em'],
        correctAnswer: 'Gm',
        explanation: "En F major, el ii grau és Gm. F(I)-G(ii)-A(iii)-B♭(IV)-C(V)-D(vi)-E(vii°).",
        hint: "G és el segon grau de F major i forma una triada menor."
      },
      {
        id: 8,
        type: 'construct',
        question: "Crea una progressió ii-V-I en D major:",
        content: "Identifica cada grau en D major.",
        options: ['Em-A-D', 'F♯m-G-D', 'Gm-A-D', 'Em-A7-D'],
        correctAnswer: 'Em-A-D',
        explanation: "En D major: ii=Em, V=A, I=D. La progressió ii-V-I és Em-A-D.",
        hint: "D major té 2 sostinguts: F♯ i C♯."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quina funció harmònica té el iii grau?",
        content: "El iii grau té una funció específica en harmonia tonal.",
        options: ['Tònica', 'Subdominant', 'Dominant', 'Mediante'],
        correctAnswer: 'Mediante',
        explanation: "El iii grau té funció de mediante, actuant com a pont entre tònica i dominant. Pot substituir el I en certes progressions.",
        hint: "El iii grau està entre la tònica (I) i la dominant (V)."
      }
    ]
  },
  {
    id: 6,
    title: "Acords de 7a i Extensions",
    description: "Explora acords de setena i les seves aplicacions",
    difficulty: 'intermediate',
    concepts: ['Acords de 7a major', 'Acords de 7a menor', '7a de dominanta', 'Acords semidisminuïts'],
    requiredScore: 90,
    exercises: [
      {
        id: 1,
        type: 'construct',
        question: "Construeix l'acord Cmaj7:",
        content: "Un acord maj7 conté: fonamental, 3a major, 5a perfecta, 7a major",
        options: ['C-E-G-B', 'C-E-G-B♭', 'C-E♭-G-B', 'C-E-G♯-B'],
        correctAnswer: 'C-E-G-B',
        explanation: "Cmaj7 = C-E-G-B. Conté la triada major C-E-G més la 7a major (B, 11 semitons des de C).",
        hint: "La 7a major està un semitò sota l'octava."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quin tipus d'acord és G-B-D-F?",
        content: "Analitza la qualitat de cada interval des de la fonamental",
        options: ['G7 (7a de dominanta)', 'Gmaj7', 'Gm7', 'G7sus4'],
        correctAnswer: 'G7 (7a de dominanta)',
        explanation: "G-B-D-F és G7: triada major (G-B-D) amb 7a menor (F). Aquest és l'acord de 7a de dominanta.",
        hint: "La 7a menor (F) és característica de l'acord de dominanta."
      },
      {
        id: 3,
        type: 'analyze',
        question: "En quin context harmònic és més comú l'acord Bm7♭5?",
        content: "Aquest acord també es coneix com a acord semidisminuït",
        options: ['ii7 en tonalitat menor', 'viiø7 en tonalitat major', 'V7 en tonalitat major', 'Ambdues a i b'],
        correctAnswer: 'Ambdues a i b',
        explanation: "Bm7♭5 apareix com a ii7 en A menor i com a viiø7 en C major. És el mateix acord en diferents contextos funcionals.",
        hint: "Els acords semidisminuïts tenen múltiples funcions segons el context tonal."
      },
      {
        id: 4,
        type: 'construct',
        question: "Construeix l'acord Am7:",
        content: "Un acord m7 conté: fonamental, 3a menor, 5a perfecta, 7a menor.",
        options: ['A-C-E-G', 'A-C♯-E-G', 'A-C-E-G♯', 'A-C-E♭-G'],
        correctAnswer: 'A-C-E-G',
        explanation: "Am7 = A-C-E-G. Conté la triada menor A-C-E més la 7a menor (G, 10 semitons des d'A).",
        hint: "La 7a menor està 2 semitons sota l'octava."
      },
      {
        id: 5,
        type: 'analyze',
        question: "Quina funció té l'acord Dm7 en C major?",
        content: "Analitza el grau de l'escala sobre el qual es construeix.",
        options: ['ii7', 'iii7', 'vi7', 'vii7'],
        correctAnswer: 'ii7',
        explanation: "Dm7 és ii7 en C major. Es construeix sobre el 2n grau (D) i té funció de subdominant, sovint progressant cap a G7(V7).",
        hint: "D és el 2n grau de C major."
      },
      {
        id: 6,
        type: 'identify',
        question: "Quin acord de 7a es forma naturalment sobre el 4t grau de F major?",
        content: "El 4t grau de F major és B♭.",
        options: ['B♭maj7', 'B♭7', 'B♭m7', 'B♭m7♭5'],
        correctAnswer: 'B♭maj7',
        explanation: "Sobre el 4t grau (B♭) de F major es forma B♭maj7: B♭-D-F-A. És un acord de 7a major diatònic.",
        hint: "El 4t grau d'una escala major sempre forma un acord maj7."
      },
      {
        id: 7,
        type: 'construct',
        question: "Construeix l'acord F♯m7♭5:",
        content: "Un acord m7♭5 conté: fonamental, 3a menor, 5a disminuïda, 7a menor.",
        options: ['F♯-A-C-E', 'F♯-A♯-C-E', 'F♯-A-C♯-E', 'F♯-A-C-E♯'],
        correctAnswer: 'F♯-A-C-E',
        explanation: "F♯m7♭5 = F♯-A-C-E. Conté 3a menor (A), 5a disminuïda (C) i 7a menor (E).",
        hint: "La 5a disminuïda és un semitò més baixa que la perfecta."
      },
      {
        id: 8,
        type: 'identify',
        question: "Quin acord de 7a es forma sobre el 7è grau de G major?",
        content: "El 7è grau de G major és F♯.",
        options: ['F♯m7♭5', 'F♯7', 'F♯maj7', 'F♯dim7'],
        correctAnswer: 'F♯m7♭5',
        explanation: "Sobre el 7è grau (F♯) de G major es forma F♯m7♭5: F♯-A-C-E. És l'acord semidisminuït diatònic.",
        hint: "El 7è grau sempre forma un acord semidisminuït en major."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quina diferència hi ha entre Cm7 i CmMaj7?",
        content: "La diferència està en la qualitat de la setena.",
        options: ['La 7a: menor vs major', 'La 3a: menor vs major', 'La 5a: perfecta vs disminuïda', 'No hi ha diferència'],
        correctAnswer: 'La 7a: menor vs major',
        explanation: "Cm7 té 7a menor (B♭), mentre que CmMaj7 té 7a major (B). Ambdós tenen 3a menor (E♭).",
        hint: "mMaj7 indica triada menor amb 7a major."
      }
    ]
  },
  {
    id: 7,
    title: "Modulació i Tonalitats Veïnes",
    description: "Tècniques de modulació entre tonalitats relacionades",
    difficulty: 'intermediate',
    concepts: ['Modulació diatònica', 'Acords pivot', 'Tonalitats relatives', 'Anàlisi bianal'],
    requiredScore: 90,
    exercises: [
      {
        id: 1,
        type: 'analyze',
        question: "Quins acords poden servir com a pivot entre C major i G major?",
        content: "Els acords pivot existeixen en ambdues tonalitats amb funcions diferents",
        options: ['C, Em, Am', 'C, F, G', 'Em, G, Am', 'Dm, G, C'],
        correctAnswer: 'C, Em, Am',
        explanation: "C(I en C, IV en G), Em(iii en C, vi en G), Am(vi en C, ii en G) són acords comuns a ambdues tonalitats.",
        hint: "Busca acords que no continguin notes que siguin diferents entre les dues tonalitats."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quin és el relatiu menor de E♭ major?",
        content: "El relatiu menor comparteix l'armadura però comença en el 6è grau",
        options: ['C menor', 'G menor', 'F menor', 'B♭ menor'],
        correctAnswer: 'C menor',
        explanation: "C menor és el relatiu de E♭ major. E♭(1)-F(2)-G(3)-A♭(4)-B♭(5)-C(6). Ambdós tenen 3 bemolls.",
        hint: "Compta fins al 6è grau de l'escala major."
      },
      {
        id: 3,
        type: 'construct',
        question: "Crea una modulació de F major a D menor utilitzant un acord pivot:",
        content: "D menor és el relatiu de F major",
        options: ['F-Dm-A7-Dm', 'F-B♭-Gm-A7-Dm', 'F-Am-Dm', 'F-C7-F-Dm'],
        correctAnswer: 'F-B♭-Gm-A7-Dm',
        explanation: "F-B♭-Gm-A7-Dm: Gm és pivot (ii en F major, iv en D menor). A7 confirma D menor com a nova tònica.",
        hint: "Gm existeix naturalment en ambdues tonalitats amb funcions diferents."
      },
      {
        id: 4,
        type: 'identify',
        question: "Quina tonalitat està a una 5a per sobre de D major?",
        content: "Segueix el cicle de quintes ascendents.",
        options: ['A major', 'G major', 'E major', 'B major'],
        correctAnswer: 'A major',
        explanation: "A major està a una 5a per sobre de D major. En el cicle de quintes: ...G-D-A-E... A major té 3 sostinguts.",
        hint: "Una 5a per sobre de D és A."
      },
      {
        id: 5,
        type: 'analyze',
        question: "Quantes notes comunes tenen C major i F major?",
        content: "Compara les notes de ambdues escales.",
        options: ['5', '6', '7', '4'],
        correctAnswer: '6',
        explanation: "C major i F major comparteixen 6 notes: C-D-E-F-G-A. Només difereixen en B(C major) vs B♭(F major).",
        hint: "Les tonalitats veïnes (diferència d'1 alteració) comparteixen 6 notes."
      },
      {
        id: 6,
        type: 'construct',
        question: "Crea una modulació de C major a E menor:",
        content: "E menor és el relatiu de G major (1 sostingut).",
        options: ['C-Am-D7-G-Em', 'C-G-Am-B7-Em', 'C-F-Em', 'C-Em-Am-Em'],
        correctAnswer: 'C-G-Am-B7-Em',
        explanation: "C-G-Am-B7-Em: Am és pivot (vi en C, iv en Em). B7 és el dominant d'Em que confirma la nova tonalitat.",
        hint: "B7 és el dominant natural d'E menor."
      },
      {
        id: 7,
        type: 'construct',
        question: "Crea una modulació de A major a F♯ menor:",
        content: "F♯ menor és el relatiu d'A major.",
        options: ['A-D-Bm-C♯7-F♯m', 'A-E-C♯m-C♯7-F♯m', 'A-F♯m-B7-F♯m', 'A-D-F♯m'],
        correctAnswer: 'A-D-Bm-C♯7-F♯m',
        explanation: "A-D-Bm-C♯7-F♯m: Bm és pivot (ii en A major, iv en F♯ menor). C♯7 confirma F♯ menor.",
        hint: "Bm existeix en ambdues tonalitats amb funcions diferents."
      },
      {
        id: 8,
        type: 'identify',
        question: "Quina tonalitat està a una 4a per sobre de B♭ major?",
        content: "Una 4a per sobre és equivalent a una 5a per sota en el cicle.",
        options: ['E♭ major', 'F major', 'A♭ major', 'D♭ major'],
        correctAnswer: 'E♭ major',
        explanation: "E♭ major està a una 4a per sobre de B♭ major. En el cicle de quintes: ...E♭-B♭-F...",
        hint: "Una 4a per sobre de B♭ és E♭."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quantes alteracions de diferència hi ha entre D major i B♭ major?",
        content: "D major té 2♯, B♭ major té 2♭.",
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
        explanation: "D major (2♯) i B♭ major (2♭) difereixen en 4 alteracions: F♯→F, C♯→C, B→B♭, E→E♭.",
        hint: "Suma les alteracions de cada tonalitat: 2♯ + 2♭ = 4 diferències."
      }
    ]
  },
  {
    id: 8,
    title: "Substitucions Harmòniques",
    description: "Dominants secundàries i substitucions tritonals",
    difficulty: 'advanced',
    concepts: ['Dominants secundàries', 'Substitució tritonal', 'Acords de pas cromàtic', 'tonicització'],
    requiredScore: 95,
    exercises: [
      {
        id: 1,
        type: 'identify',
        question: "En C major, quin és el V7/vi (dominant secundari del vi grau)?",
        content: "El V7/vi és el dominant del 6è grau (Am en C major)",
        options: ['E7', 'A7', 'D7', 'B7'],
        correctAnswer: 'E7',
        explanation: "V7/vi en C major és E7, que resol cap a Am. E7 conté G♯, nota estrangera a C major que crea tensió cap a Am.",
        hint: "Busca el dominant de A menor (que és E7)."
      },
      {
        id: 2,
        type: 'analyze',
        question: "Quina substitució tritonal de G7 pots utilitzar?",
        content: "La substitució tritonal manté el trító característic però canvia la fonamental",
        options: ['D♭7', 'C7', 'F7', 'B7'],
        correctAnswer: 'D♭7',
        explanation: "D♭7 substitueix G7. Ambdós comparteixen el trítò F-B, però D♭7 crea un moviment cromàtic descendent cap a C.",
        hint: "La fonamental substituta està a un trítò de distància (G → D♭)."
      },
      {
        id: 3,
        type: 'construct',
        question: "Harmonitza aquesta progressió amb dominants secundaris: C-Am-F-G:",
        content: "Afegeix dominants secundaris abans d'Am i F",
        options: ['C-E7-Am-C7-F-G', 'C-D7-Am-B♭7-F-G', 'C-A7-Am-F7-F-G', 'C-E7-Am-A7-F-G'],
        correctAnswer: 'C-E7-Am-C7-F-G',
        explanation: "C-E7-Am-C7-F-G: E7 és V7/vi (tonicitza Am), C7 és V7/IV (tonicitza F). Crea més direccionalitat harmònica.",
        hint: "E7 va abans d'Am, C7 va abans de F."
      },
      {
        id: 4,
        type: 'analyze',
        question: "Quin acord pots utilitzar com a V7/V en C major?",
        content: "El V7/V és el dominant del dominant (G7 en C major).",
        options: ['D7', 'A7', 'E7', 'B7'],
        correctAnswer: 'D7',
        explanation: "D7 és V7/V en C major. És el dominant de G7, creant la progressió D7-G7-C amb doble resolució dominant.",
        hint: "El dominant de G és D."
      },
      {
        id: 5,
        type: 'identify',
        question: "Quina nota característica conté E7 que no està en C major?",
        content: "E7 = E-G♯-B-D",
        options: ['G♯', 'B', 'D', 'E'],
        correctAnswer: 'G♯',
        explanation: "E7 conté G♯, que no existeix en C major (on seria G natural). Aquesta alteració crea la tensió dominant cap a Am.",
        hint: "Busca l'alteració que crea el caràcter dominant."
      },
      {
        id: 6,
        type: 'construct',
        question: "Harmonitza amb substitucions tritonals: C-G7-C:",
        content: "Substitueix G7 pel seu tritonal.",
        options: ['C-D♭7-C', 'C-C♯7-C', 'C-F♯7-C', 'C-B7-C'],
        correctAnswer: 'C-D♭7-C',
        explanation: "C-D♭7-C: D♭7 substitueix G7. Ambdós comparteixen el trítò F-B, però D♭7 crea moviment cromàtic descendent.",
        hint: "El tritonal de G7 és D♭7."
      },
      {
        id: 7,
        type: 'identify',
        question: "En F major, quin és el V7/ii?",
        content: "El ii grau de F major és Gm.",
        options: ['D7', 'A7', 'C7', 'B♭7'],
        correctAnswer: 'D7',
        explanation: "V7/ii en F major és D7, que resol cap a Gm. D7 conté F♯, nota estrangera que crea tensió cap a Gm.",
        hint: "El dominant de Gm és D7."
      },
      {
        id: 8,
        type: 'construct',
        question: "Harmonitza amb dominants secundaris: F-Dm-B♭-C:",
        content: "Afegeix dominants abans de Dm i B♭.",
        options: ['F-A7-Dm-F7-B♭-C', 'F-G7-Dm-D7-B♭-C', 'F-E7-Dm-E♭7-B♭-C', 'F-A7-Dm-C7-B♭-C'],
        correctAnswer: 'F-A7-Dm-F7-B♭-C',
        explanation: "F-A7-Dm-F7-B♭-C: A7 és V7/vi (tonicitza Dm), F7 és V7/IV (tonicitza B♭).",
        hint: "A7 va abans de Dm, F7 va abans de B♭."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quina substitució tritonal pots usar per A7?",
        content: "La substitució tritonal està a un trítò de distància.",
        options: ['E♭7', 'D♯7', 'Ambdues a i b', 'Cap de les anteriors'],
        correctAnswer: 'Ambdues a i b',
        explanation: "E♭7 i D♯7 són enarmònics i ambdós substitueixen A7. Comparteixen el trítò C♯-G amb A7.",
        hint: "E♭ i D♯ són la mateixa nota escrita diferent."
      }
    ]
  },
  {
    id: 9,
    title: "Harmonia Modal i Acords Alterats",
    description: "Modes de l'escala major i harmonia modal avançada",
    difficulty: 'advanced',
    concepts: ['Modes gregorials', 'Harmonia modal', 'Acords sus', 'Poliacords'],
    requiredScore: 95,
    exercises: [
      {
        id: 1,
        type: 'identify',
        question: "Quin mode començaria en D utilitzant les notes de C major?",
        content: "Els modes utilitzen les mateixes notes però amb diferents centres tonals",
        options: ['Dòric', 'Frigi', 'Lidi', 'Mixolidi'],
        correctAnswer: 'Dòric',
        explanation: "D Dòric utilitza les notes de C major començant des de D: D-E-F-G-A-B-C. És el 2n mode de C major.",
        hint: "D és el 2n grau de C major, correspon al mode Dòric."
      },
      {
        id: 2,
        type: 'construct',
        question: "Construeix un poliacord combinant C major i F♯ major:",
        content: "Un poliacord superposa dues triades diferents",
        options: ['C-E-G-F♯-A♯-C♯', 'C-E-F♯-A♯', 'C-F♯-G-A♯', 'E-G-A♯-C♯'],
        correctAnswer: 'C-E-G-F♯-A♯-C♯',
        explanation: "El poliacord C/F♯ conté totes les notes de ambdues triades: C major (C-E-G) sobre F♯ major (F♯-A♯-C♯).",
        hint: "Combina totes les notes de les dues triades."
      },
      {
        id: 3,
        type: 'analyze',
        question: "Quin efecte harmònic crea l'acord Csus4?",
        content: "Els acords sus substitueixen la tercera per la quarta",
        options: ['Elimina la qualitat major/menor', 'Crea tensió que demana resolució', 'Ambdues anteriors', 'Cap de les anteriors'],
        correctAnswer: 'Ambdues anteriors',
        explanation: "Csus4 (C-F-G) elimina la tercera (E), perdent la qualitat major/menor, i la 4a (F) crea tensió que vol resoldre cap a la 3a.",
        hint: "La suspensió crea ambigüitat tonal i tensió melòdica."
      },
      {
        id: 4,
        type: 'construct',
        question: "Construeix l'escala E Mixolídia:",
        content: "El mode Mixolidi és el 5è mode, amb 7a menor.",
        options: ['E-F♯-G♯-A-B-C♯-D-E', 'E-F♯-G-A-B-C♯-D-E', 'E-F-G-A-B-C-D-E', 'E-F♯-G♯-A-B-C-D-E'],
        correctAnswer: 'E-F♯-G♯-A-B-C♯-D-E',
        explanation: "E Mixolidi utilitza les notes d'A major començant des d'E: E-F♯-G♯-A-B-C♯-D-E. Té la 7a menor (D) característica.",
        hint: "Mixolidi és com major però amb 7a menor."
      },
      {
        id: 5,
        type: 'analyze',
        question: "Quin efecte crea l'acord Csus2?",
        content: "Sus2 substitueix la tercera per la segona.",
        options: ['Sonoritat oberta i ambigua', 'Dissonància forta', 'Resolució definitiva', 'Tensió cromàtica'],
        correctAnswer: 'Sonoritat oberta i ambigua',
        explanation: "Csus2 (C-D-G) crea una sonoritat oberta i ambigua. La 2a (D) elimina la definició major/menor i aporta color modal.",
        hint: "La suspensió de 2a crea obertura harmònica."
      },
      {
        id: 6,
        type: 'identify',
        question: "Quina característica defineix el mode Frigi?",
        content: "El mode Frigi té una sonoritat distintiva i fosca.",
        options: ['2a menor', '3a menor', '6a menor', '7a menor'],
        correctAnswer: '2a menor',
        explanation: "El mode Frigi es caracteritza per la 2a menor, que li dona una sonoritat molt distintiva i exòtica, especialment en música flamenca.",
        hint: "La 2a menor crea el caràcter únic del mode Frigi."
      },
      {
        id: 7,
        type: 'construct',
        question: "Construeix l'escala A Lídica:",
        content: "El mode Lidi és el 4t mode, amb 4a augmentada.",
        options: ['A-B-C♯-D♯-E-F♯-G♯-A', 'A-B-C-D♯-E-F♯-G-A', 'A-B-C♯-D-E-F♯-G-A', 'A-B♭-C-D-E-F-G-A'],
        correctAnswer: 'A-B-C♯-D♯-E-F♯-G♯-A',
        explanation: "A Lídica utilitza les notes d'E major començant des d'A: A-B-C♯-D♯-E-F♯-G♯-A. Té la 4a augmentada (D♯) característica.",
        hint: "Lidi és com major però amb 4a augmentada."
      },
      {
        id: 8,
        type: 'identify',
        question: "Quin mode començaria en B utilitzant les notes de G major?",
        content: "G major: G-A-B-C-D-E-F♯",
        options: ['Dòric', 'Frigi', 'Lidi', 'Mixolidi'],
        correctAnswer: 'Frigi',
        explanation: "B Frigi utilitza les notes de G major començant des de B: B-C-D-E-F♯-G-A. És el 3r mode de G major.",
        hint: "B és el 3r grau de G major, correspon al mode Frigi."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quin efecte crea l'acord Dsus4/9?",
        content: "Aquest acord combina suspensió i extensió.",
        options: ['Tensió i color modal', 'Resolució definitiva', 'Dissonància forta', 'Sonoritat clàssica'],
        correctAnswer: 'Tensió i color modal',
        explanation: "Dsus4/9 (D-G-A-E) crea tensió per la suspensió (G) i color modal per la 9a (E), donant una sonoritat moderna i oberta.",
        hint: "Les suspensions i extensions creen sonoritats modernes."
      }
    ]
  },
  {
    id: 10,
    title: "Harmonia Negativa i Conceptes d'Avantguarda",
    description: "Explora l'harmonia negativa, clusters i tècniques contemporànies",
    difficulty: 'expert',
    concepts: ['Harmonia negativa', 'Clusters tonals', 'Serialisme dodecafònic', 'Espectralisme'],
    requiredScore: 100,
    exercises: [
      {
        id: 1,
        type: 'analyze',
        question: "En harmonia negativa, quin seria l'equivalent negatiu de C major?",
        content: "L'harmonia negativa inverteix els intervals cap avall des del centre harmònic",
        options: ['F minor', 'G minor', 'F♯ minor', 'A♭ minor'],
        correctAnswer: 'F minor',
        explanation: "En harmonia negativa de C major, l'acord negatiu és F menor. El centre harmònic està entre F i G, i C major es reflecteix cap a F menor.",
        hint: "L'harmonia negativa reflecteix els acords respecte a un eix simètric."
      },
      {
        id: 2,
        type: 'identify',
        question: "Quin tipus d'estructura harmònica és C-D♭-D-E♭?",
        content: "Aquesta estructura utilitza semitons consecutius",
        options: ['Cluster cromàtic', 'Acord per quartes', 'Acord politonal', 'Sèrie dodecafònica'],
        correctAnswer: 'Cluster cromàtic',
        explanation: "C-D♭-D-E♭ és un cluster cromàtic de 4 notes consecutives. Els clusters creen sonoritats denses i no tradicionals.",
        hint: "Les notes estan totes a distància de semitò."
      },
      {
        id: 3,
        type: 'construct',
        question: "Crea una sèrie dodecafònica començant per B♭:",
        content: "Una sèrie utilitza les 12 notes cromàtiques sense repetir cap",
        options: ['B♭-F-C-G-D-A-E-B-F♯-C♯-G♯-D♯', 'B♭-C-D-E♭-F-G-A-B-C♯-D♯-F♯-G♯', 'B♭-A-G-F-E-D-C-B-A♯-G♯-F♯-C♯', 'B♭-D-F♯-A-C-E-G♯-B-D♯-F-G-C♯'],
        correctAnswer: 'B♭-F-C-G-D-A-E-B-F♯-C♯-G♯-D♯',
        explanation: "Aquesta sèrie utilitza el cicle de quintes des de B♭, una tècnica compositiva vàlida en serialisme. Cada nota apareix exactament una vegada.",
        hint: "Assegura't que apareguin les 12 notes diferents exactament una vegada."
      },
      {
        id: 4,
        type: 'analyze',
        question: "Quin principi segueix l'espectralisme?",
        content: "L'espectralisme es basa en fenòmens acústics naturals.",
        options: ['Sèrie harmònica', 'Sèrie dodecafònica', 'Modes gregorials', 'Progressions funcionals'],
        correctAnswer: 'Sèrie harmònica',
        explanation: "L'espectralisme utilitza la sèrie harmònica natural com a base compositiva, creant sonoritats basades en fenòmens acústics reals.",
        hint: "L'espectralisme imita els harmònics naturals del so."
      },
      {
        id: 5,
        type: 'construct',
        question: "Crea un cluster diatònic en C major:",
        content: "Utilitza notes consecutives de l'escala diatònica.",
        options: ['C-D-E-F', 'C-D♭-D-E♭', 'C-E-G-B', 'C-F-B♭-E♭'],
        correctAnswer: 'C-D-E-F',
        explanation: "C-D-E-F és un cluster diatònic que utilitza 4 notes consecutives de C major, creant una sonoritat densa però tonal.",
        hint: "Utilitza graus consecutius de l'escala major."
      },
      {
        id: 6,
        type: 'identify',
        question: "Quina tècnica compositiva utilitza la rotació de sèries?",
        content: "Aquesta tècnica transforma sistemàticament el material serial.",
        options: ['Serialisme integral', 'Minimalisme', 'Espectralisme', 'Neoclassicisme'],
        correctAnswer: 'Serialisme integral',
        explanation: "El serialisme integral utilitza rotacions, inversions i retrogradacions de sèries per organitzar tots els paràmetres musicals.",
        hint: "El serialisme transforma sistemàticament les sèries originals."
      },
      {
        id: 7,
        type: 'construct',
        question: "Crea un cluster pentatònic en C major:",
        content: "Utilitza 5 notes consecutives de l'escala pentatònica.",
        options: ['C-D-E-G-A', 'C-D-E-F-G', 'C-E-F-G-A', 'C-D-F-G-A'],
        correctAnswer: 'C-D-E-G-A',
        explanation: "C-D-E-G-A utilitza les 5 notes de l'escala pentatònica de C major, creant un cluster amb sonoritat asiàtica.",
        hint: "L'escala pentatònica de C major és C-D-E-G-A."
      },
      {
        id: 8,
        type: 'identify',
        question: "Quin principi segueix la música aleatòria?",
        content: "La música aleatòria utilitza elements d'atzar.",
        options: ['Indeterminació', 'Sèrie harmònica', 'Progressions funcionals', 'Modes gregorials'],
        correctAnswer: 'Indeterminació',
        explanation: "La música aleatòria segueix el principi d'indeterminació, on elements musicals es deixen a l'atzar o a la decisió de l'intèrpret.",
        hint: "Aleatòria significa que alguns elements no estan predeterminats."
      },
      {
        id: 9,
        type: 'analyze',
        question: "Quina tècnica utilitza la microtonalitat?",
        content: "La microtonalitat va més enllà dels 12 semitons tradicionals.",
        options: ['Intervals menors que el semitò', 'Només intervals perfectes', 'Escales pentatòniques', 'Harmonia funcional'],
        correctAnswer: 'Intervals menors que el semitò',
        explanation: "La microtonalitat utilitza intervals menors que el semitò (quarts de to, sisens de to, etc.), expandint les possibilitats harmòniques.",
        hint: "Micro significa més petit que els intervals tradicionals."
      }
    ]
  },
  {
    id: 11,
    title: "Preguntes Trampa 🎭",
    description: "Exercicis enganyosos que posen a prova la teva atenció i coneixement profund",
    difficulty: 'expert',
    concepts: ['Atenció al detall', 'Coneixement profund', 'Pensament crític', 'Trampes comunes'],
    requiredScore: 100,
    exercises: [
      {
        id: 1,
        type: 'identify',
        question: "Quantes notes diferents hi ha en l'acord C-E-G-C-E?",
        content: "Compte! Algunes notes es repeteixen...",
        options: ['5 notes', '3 notes', '4 notes', '2 notes'],
        correctAnswer: '3 notes',
        explanation: "Només hi ha 3 notes diferents: C, E i G. El fet que C i E es repeteixin no les converteix en notes diferents!",
        hint: "Compta només les notes úniques, no les repeticions."
      },
      {
        id: 2,
        type: 'analyze',
        question: "Quin interval hi ha entre C4 i C5?",
        content: "Aquesta sembla fàcil... o no?",
        options: ['Unísó', 'Octava', '8a perfecta', 'Ambdues b i c'],
        correctAnswer: 'Ambdues b i c',
        explanation: "Una octava ÉS una 8a perfecta! Són dos noms per al mateix interval. La trampa era pensar que eren diferents.",
        hint: "Octava i 8a perfecta són sinònims."
      },
      {
        id: 3,
        type: 'identify',
        question: "Quina escala NO té F♯?",
        content: "Pensa bé en les armadures...",
        options: ['G major', 'D major', 'F major', 'E major'],
        correctAnswer: 'F major',
        explanation: "F major té B♭ (1 bemoll), no F♯. Les altres (G, D, E major) totes tenen F♯ en les seves armadures.",
        hint: "F major té bemolls, no sostinguts."
      },
      {
        id: 4,
        type: 'construct',
        question: "Construeix un acord de C major sense utilitzar la nota C:",
        content: "És possible? Pensa en les inversions...",
        options: ['Impossible', 'E-G-C', 'G-E-C', 'E-G (sense C)'],
        correctAnswer: 'Impossible',
        explanation: "Un acord de C major SEMPRE ha de contenir C (la fonamental). Sense C, seria un acord diferent, no C major.",
        hint: "La fonamental defineix el nom de l'acord."
      },
      {
        id: 5,
        type: 'analyze',
        question: "Quants semitons hi ha en una 3a major?",
        content: "Resposta directa... o hi ha trampa?",
        options: ['4 semitons', '3 semitons', '5 semitons', 'Depèn de l\'escala'],
        correctAnswer: '4 semitons',
        explanation: "Una 3a major SEMPRE té 4 semitons, independentment de l'escala o context. No hi ha trampa aquí!",
        hint: "Alguns cops la resposta òbvia és la correcta."
      },
      {
        id: 6,
        type: 'identify',
        question: "Quin acord és més gran: C major o C menor?",
        content: "Pensa en el nombre de notes, no en la sonoritat...",
        options: ['C major', 'C menor', 'Són iguals', 'Depèn de la inversió'],
        correctAnswer: 'Són iguals',
        explanation: "Ambdós acords tenen exactament 3 notes. La diferència està en la qualitat (major vs menor), no en la quantitat!",
        hint: "Compta les notes, no analitzis la qualitat."
      },
      {
        id: 7,
        type: 'construct',
        question: "Quina nota està més a prop de C: B o D♭?",
        content: "Mesura la distància en semitons...",
        options: ['B (1 semitò)', 'D♭ (1 semitò)', 'Estan igual de lluny', 'D♭ (2 semitons)'],
        correctAnswer: 'Estan igual de lluny',
        explanation: "B està 1 semitò per sota de C, i D♭ està 1 semitò per sobre de C. Ambdues notes estan a la mateixa distància!",
        hint: "Compte amb la direcció: amunt vs avall."
      },
      {
        id: 8,
        type: 'analyze',
        question: "Quantes alteracions té l'escala cromàtica?",
        content: "L'escala cromàtica conté totes les notes...",
        options: ['12 alteracions', '5 alteracions', '7 alteracions', 'Depèn de com s\'escrigui'],
        correctAnswer: 'Depèn de com s\'escrigui',
        explanation: "L'escala cromàtica pot escriure's amb sostinguts, bemolls, o una barreja. El nombre d'alteracions depèn de la notació escollida!",
        hint: "C♯ i D♭ són la mateixa nota però amb diferent notació."
      },
      {
        id: 9,
        type: 'identify',
        question: "Quin interval és més gran: 4a augmentada o 5a disminuïda?",
        content: "Analitza els semitons...",
        options: ['4a augmentada', '5a disminuïda', 'Són iguals', 'Depèn del context'],
        correctAnswer: 'Són iguals',
        explanation: "Ambdós intervals tenen exactament 6 semitons (trítò). Són enarmònics: sonen igual però s'escriuen diferent!",
        hint: "Els intervals enarmònics tenen la mateixa mida sonora."
      },
      {
        id: 10,
        type: 'construct',
        question: "Construeix l'acord de F♯ major utilitzant només tecles blanques del piano:",
        content: "És possible sense alteracions?",
        options: ['F♯-A♯-C♯', 'F-A-C', 'Impossible', 'G-B-D'],
        correctAnswer: 'Impossible',
        explanation: "F♯ major requereix F♯, A♯ i C♯ - totes tecles negres o alteracions. No es pot construir només amb tecles blanques!",
        hint: "F♯ major té 6 sostinguts en l'armadura."
      },
      {
        id: 11,
        type: 'analyze',
        question: "Quina progressió és més llarga: I-V-vi-IV o ii-V-I?",
        content: "Compta els acords...",
        options: ['I-V-vi-IV (4 acords)', 'ii-V-I (3 acords)', 'Són igual de llargues', 'Depèn del tempo'],
        correctAnswer: 'I-V-vi-IV (4 acords)',
        explanation: "I-V-vi-IV té 4 acords, ii-V-I en té 3. El tempo no afecta el nombre d'acords en la progressió!",
        hint: "Compta els símbols romans, no la durada temporal."
      },
      {
        id: 12,
        type: 'identify',
        question: "Quina nota NO existeix?",
        content: "Totes les opcions semblen reals...",
        options: ['E♯', 'B♯', 'C♭', 'Totes existeixen'],
        correctAnswer: 'Totes existeixen',
        explanation: "E♯=F, B♯=C, C♭=B. Encara que siguin poc comunes, totes aquestes notes existeixen com a equivalents enarmònics!",
        hint: "Les notes enarmòniques són reals, encara que poc usades."
      }
    ]
  }
];