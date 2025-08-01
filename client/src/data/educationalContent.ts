// Sistema educatiu complet per a jazz guitarristes avançats
export interface EducationChapter {
  id: string;
  title: string;
  description: string;
  sections: EducationSection[];
  difficulty: 'Expert' | 'Master' | 'Professional';
  prerequisites?: string[];
}

export interface EducationSection {
  id: string;
  title: string;
  content: string;
  examples: string[];
  exercises?: string[];
  relatedConcepts?: string[];
}

export const educationalChapters: EducationChapter[] = [
  {
    id: 'negative-harmony',
    title: 'Harmonia Negativa',
    description: 'Teoria completa d\'harmonia negativa aplicada al jazz contemporani',
    difficulty: 'Master',
    sections: [
      {
        id: 'nh-fundamentals',
        title: 'Fonaments de l\'Harmonia Negativa',
        content: `L'harmonia negativa és un concepte revolucionari que reflecteix les progressions harmòniques al voltant d'un eix tonal específic. Desenvolupada per Ernst Levy i popularitzada per Jacob Collier, aquesta tècnica transforma completament la percepció harmònica tradicional.

En C major, l'eix de reflexió es troba entre E i Ab (Mi i Lab). Cada grau es reflecteix:
- I → bVI (C → Ab)
- ii → V (Dm → G)  
- iii → IV (Em → F)
- IV → III (F → E)
- V → ii (G → Dm)
- vi → I (Am → C)
- vii° → bII (B° → Db)

Transformació de ii-V-I:
- Original: Dm7 - G7 - Cmaj7
- Negatiu: G7 - Dm7 - Abmaj7

Aquest canvi crea una sonoritat completament nova mantenint la força harmònica original.`,
        examples: [
          'All The Things You Are en harmonia negativa',
          'Autumn Leaves amb substitucions negatives',
          'Giant Steps utilitzant reflexions harmòniques'
        ],
        exercises: [
          'Transforma una progressió ii-V-I a harmonia negativa',
          'Crea una reharmonització negativa d\'un standard conegut',
          'Identifica l\'eix de reflexió en diferents tonalitats'
        ],
        relatedConcepts: ['Substitució tritònica', 'Reharmonització', 'Voice leading cromàtic']
      }
    ]
  },
  {
    id: 'upper-structures',
    title: 'Upper Structure Triads',
    description: 'Dominació completa dels upper structures per a sonoritats modernes',
    difficulty: 'Expert',
    sections: [
      {
        id: 'ust-theory',
        title: 'Teoria dels Upper Structures',
        content: `Els Upper Structure Triads són tríades majors o menors construïdes sobre les tensions d'un acord dominant, creant sonoritats complexes i modernes essencials en el jazz contemporani.

Un Upper Structure és una tríada independent superposada sobre un acord base, generalment un dominant 7è. La tríada superior conté les tensions de l'acord (9, 11, 13).

Upper Structures més comuns sobre C7:

D/C (II/I): Tríade de D major sobre C7
- Crea C13(9) - tensions: 9(D), 3(E), 13(A)
- Sonoritat: brillant, oberta

Eb/C (bIII/I): Tríade d'Eb major sobre C7
- Crea C7(#9,#11) - tensions: #9(Eb), #11(F#/Gb), 5(G)
- Sonoritat: outside, bluesy

F#/C (#IV/I): Tríade d'F# major sobre C7
- Crea C7alt - tensions: #11(F#), b13(Ab), #9(Eb)
- Sonoritat: alterada, tensa

Cada upper structure aporta un color harmònic específic i es pot usar segons el context musical.`,
        examples: [
          'D/C sobre Cmaj7 en context de jazz contemporani',
          'Eb/C en progressions blues-jazz',
          'F#/C per crear tensió en resolucions V-I'
        ],
        exercises: [
          'Identifica totes les tensions que crea cada upper structure',
          'Practica voicings de guitarra per cada combinació',
          'Improvisa melodías utilitzant les notes dels upper structures'
        ],
        relatedConcepts: ['Tensions d\'acord', 'Polychords', 'Harmonia contemporània']
      }
    ]
  },
  {
    id: 'voice-leading',
    title: 'Voice Leading Avançat',
    description: 'Tècniques professionals de conducció de veus per a jazz complex',
    difficulty: 'Professional',
    sections: [
      {
        id: 'vl-fundamentals',
        title: 'Principis del Voice Leading',
        content: `El voice leading és l'art de connectar acords de manera fluida i musical, minimitzant els salts entre veus i creant línies melòdiques coherents.

Regles Fonamentals:
1. Moviment Mínim: Cada veu es mou la menor distància possible
2. Contrary Motion: Quan una veu puja, una altra baixa
3. Common Tones: Manté notes comunes entre acords quan sigui possible
4. Step-wise Motion: Prioritza moviments per graus conjunts

Voice Leading en Jazz:
ii-V-I Voice Leading:
Dm7 → G7 → Cmaj7
D-F-A-C → D-F-B-C → E-G-B-C

Moviments mínims: F→F, A→B, C→C, D→E
Només dues veus es mouen, dues es mantenen.

Tècniques Avançades:
- Voice Exchange: Dues veus intercanvien posicions
- Linear Intervallic Patterns: Patrons intervals consistents
- Chromatic Voice Leading: Moviment cromàtic entre acords no relacionats`,
        examples: [
          'All The Things You Are amb voice leading perfecte',
          'Body and Soul bridge analysis',
          'Autumn Leaves amb moviments cromàtics'
        ],
        exercises: [
          'Harmonitza una melodia amb voice leading òptim',
          'Crea reharmonitzacions basades en moviment cromàtic',
          'Analitza el voice leading en transcripcions de Bill Evans'
        ],
        relatedConcepts: ['Reharmonització', 'Substitució d\'acords', 'Harmonia lineal']
      }
    ]
  }
];

// Índex de conceptes per cerca ràpida
export const conceptIndex: Record<string, string[]> = {
  'harmonia negativa': ['negative-harmony'],
  'upper structures': ['upper-structures'],
  'voice leading': ['voice-leading'],
  'substitució tritònica': ['negative-harmony'],
  'reharmonització': ['negative-harmony', 'voice-leading'],
  'tensions': ['upper-structures'],
  'polychords': ['upper-structures'],
  'chromatic motion': ['voice-leading']
};

export function searchConcepts(query: string): EducationChapter[] {
  const queryLower = query.toLowerCase();
  const relevantChapterIds = new Set<string>();
  
  // Cerca directa en l'índex
  Object.entries(conceptIndex).forEach(([concept, chapterIds]) => {
    if (concept.includes(queryLower) || queryLower.includes(concept)) {
      chapterIds.forEach(id => relevantChapterIds.add(id));
    }
  });
  
  // Cerca en títols i contingut
  educationalChapters.forEach(chapter => {
    if (chapter.title.toLowerCase().includes(queryLower) ||
        chapter.description.toLowerCase().includes(queryLower)) {
      relevantChapterIds.add(chapter.id);
    }
    
    chapter.sections.forEach(section => {
      if (section.title.toLowerCase().includes(queryLower) ||
          section.content.toLowerCase().includes(queryLower)) {
        relevantChapterIds.add(chapter.id);
      }
    });
  });
  
  return educationalChapters.filter(chapter => relevantChapterIds.has(chapter.id));
}