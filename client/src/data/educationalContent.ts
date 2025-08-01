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
      },
      {
        id: 'nh-applications',
        title: 'Aplicacions Pràctiques d\'Harmonia Negativa',
        content: `L'harmonia negativa no és només un exercici teòric, sinó una eina pràctica per crear progressions fresques i sorprenents en el jazz contemporani.

TÈCNIQUES D'APLICACIÓ:

1. Reflexió Parcial: Aplica harmonia negativa només a parts específiques d'una progressió
   - Cherokee: bars 5-8 en harmonia negativa creen un contrast dramàtic
   - Body and Soul: el bridge amb reflexions harmòniques parcials

2. Híbrids Positiu-Negatiu: Combina harmonia positiva i negativa dins la mateixa frase
   - All The Things You Are: A section normal, B section negatiu
   - Giant Steps: alternar entre centres tonals positius i negatius

3. Voice Leading Negatiu: Utilitza la reflexió per crear moviments cromàtics elegants
   - Les transformacions negatives sovint resulten en millor voice leading
   - Especialment efectiu quan es tracta de progressions amb molts bemolls

CONSIDERACIONS PER GUITARRA:
Les transformacions negatives sovint resulten en voicings més còmodes per guitarra. El canvi de sostenits per bemolls pot obrir noves possibilitats d'acords oberts i híbrids.

STANDARDS ADAPTATS:
- Stella by Starlight: transformació negativa dels primers 8 compassos
- Misty: aplicació selectiva en el bridge
- Autumn Leaves: harmonia negativa en la segona meitat`,
        examples: [
          'Cherokee bars 5-8 en harmonia negativa completa',
          'Body and Soul bridge amb transformacions parcials',
          'All The Things You Are - secció A normal, B negativa'
        ],
        exercises: [
          'Aplica harmonia negativa només al bridge d\'un standard',
          'Crea un híbrid positiu-negatiu en 32 compassos',
          'Desenvolupa voicings de guitarra per progressions negatives'
        ],
        relatedConcepts: ['Contrast harmònic', 'Voicings híbrids', 'Reharmonització selectiva']
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
    id: 'coltrane-changes',
    title: 'Coltrane Changes',
    description: 'Anàlisi profunda dels canvis harmònics revolucionaris de John Coltrane',
    difficulty: 'Master',
    prerequisites: ['Substitució tritònica', 'Cicle de quintes'],
    sections: [
      {
        id: 'cc-giant-steps',
        title: 'Giant Steps: La Revolució Harmònica',
        content: `Giant Steps representa una de les innovacions harmòniques més significatives del jazz modern. Coltrane va crear un sistema que divideix l'octava en tres parts iguals mitjançant major thirds root motion.

CONCEPTE DE THIRDS CYCLE:
- B - G - Eb - B (major thirds: 4 semitons)
- Cada centre tonal està separat per una tercera major  
- Crea tres centres tonals equidistants que es repeteixen cíclicament

ANÀLISI HARMÒNICA DE GIANT STEPS:
Compàs 1-4: | B    E7  | A7     D  | G    C#7 | F#7    B  |
Compàs 5-8: | Eb   A7  | D7     G  | C    F#7 | B7     Eb |

PATRONS CLAU:
1. ii-V targeting: Cada centre tonal s'aborda via ii-V
2. Chromatic approach: Moviments cromàtics entre centres
3. Symmetrical construction: Simetria perfecta en l'estructura

ESTRATÈGIES D'IMPROVISACIÓ:
- Escales per Centre: Major per cada centre tonal (B, G, Eb)
- Chromatic approach tones: Notes cromàtiques entre centres
- Arpeggi patterns: Arpeggis que connecten els canvis ràpids
- Pentatonic scales: Una pentatònica per cada centre

Aquest sistema va influenciar generacions de músics i continua sent un repte tècnic i conceptual.`,
        examples: [
          'Anàlisi complet de Giant Steps bar per bar',
          'Variacions de Coltrane sobre el mateix sistema',
          'Aplicacions del thirds cycle en altres standards'
        ],
        exercises: [
          'Memoritza la progressió de Giant Steps en totes les tonalitats',
          'Improvisa utilitzant només arpeggis dels centres tonals',
          'Crea melodies que connectin els tres centres de forma fluida'
        ],
        relatedConcepts: ['Cicle de terceres majors', 'Centres tonals múltiples', 'Harmonia simètrica']
      },
      {
        id: 'cc-countdown',  
        title: 'Countdown i Altres Aplicacions',
        content: `Countdown és un altre exemple brillant de com Coltrane va aplicar el sistem de thirds cycle a progressions més tradicionals.

COUNTDOWN - TRANSFORMACIÓ DE TUNE UP:

Original Tune Up:
| Cmaj7  | Cmaj7  | Em7  A7 | Dmaj7  |
| Dmaj7  | Dmaj7  | F#m7 B7 | Emaj7  |

Countdown (Coltrane):
| Cmaj7  | Eb7  Ab | Bb7  Eb | Dmaj7  |
| Dmaj7  | F7   Bb | C7   F  | Emaj7  |

ANÀLISI DE LA TRANSFORMACIÓ:
1. Substitució Cromàtica: Cada ii-V original es substitueix per una cadena cromàtica
2. Thirds Motion: Movement per terceres majors: C - Ab - E
3. Increased Harmonic Rhythm: Més canvis d'acord per crear moviment

ALTRES APLICACIONS DEL SISTEMA:
- 26-2: Transformació de Confirmation
- Satellite: Aplicació a How High The Moon  
- Some Other Blues: Blues amb Coltrane changes

TÈCNIQUES D'ESTUDI:
1. Aprèn primer els centres tonals
2. Practica les connexions cromàtiques
3. Desenvolupa patrons melòdics per cada transformació
4. Integra gradualment en standards coneguts`,
        examples: [
          'Comparació detallada Tune Up vs Countdown',
          '26-2 com a transformació de Confirmation',
          'Aplicacions contemporànies del sistem Coltrane'
        ],
        exercises: [
          'Transforma un standard conegut aplicant Coltrane changes',
          'Crea línies melòdiques que naveguín els centres tonals',
          'Desenvolupa patterns d\'escales per cada transformació'
        ],
        relatedConcepts: ['Transformació harmònica', 'Centres tonals', 'Improvisació outside']
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

REGLES FONAMENTALS:
1. Moviment Mínim: Cada veu es mou la menor distància possible
2. Contrary Motion: Quan una veu puja, una altra baixa
3. Common Tones: Manté notes comunes entre acords quan sigui possible
4. Step-wise Motion: Prioritza moviments per graus conjunts

VOICE LEADING EN JAZZ:
ii-V-I Voice Leading:
Dm7 → G7 → Cmaj7
D-F-A-C → D-F-B-C → E-G-B-C

Moviments mínims: F→F, A→B, C→C, D→E
Només dues veus es mouen, dues es mantenen.

TÈCNIQUES AVANÇADES:
- Voice Exchange: Dues veus intercanvien posicions
- Linear Intervallic Patterns: Patrons intervals consistents  
- Chromatic Voice Leading: Moviment cromàtic entre acords no relacionats

VOICE LEADING CROMÀTIC:
Cherokee bars 1-4:
Bb6 → G7 → Cm7 → F7
Bb-D-F-G → Bb-D-F-Ab → Bb-Eb-F-G → A-Eb-F-G

Noter el moviment cromàtic: G→Ab, D es manté, Bb es manté.`,
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
      },
      {
        id: 'vl-guitar-techniques',
        title: 'Voice Leading per Guitarra',
        content: `La guitarra presenta desafiaments únics per al voice leading degut a la seva afinació i limitacions físiques, però també ofereix possibilitats úniques.

TÈCNIQUES ESPECÍFIQUES PER GUITARRA:

1. Close Voicings amb Moviment Cromàtic:
   Cmaj7 → C#dim7 → Dm7 → G7
   
   Posició al mànec:
   - Corda E: 0 → 1 → 1 → 3
   - Corda B: 0 → 2 → 3 → 0  
   - Corda G: 0 → 1 → 2 → 0
   - Corda D: 2 → 3 → 3 → 3

2. Drop 2 Voice Leading:
   - Mantén les veus interiors estàtiques
   - Mou només la veu superior i el baix
   - Ideal per progressions ii-V-I

3. Hybrid Voicings:
   - Combina notes obertes amb fretted notes
   - Permet voice leading impossible amb altres sistemes
   - Especialment efectiu en tonalitats amb cordes obertes

CONSIDERACIONS PRÀCTIQUES:
- Fingering Economy: Minimitza moviments de mà esquerra
- String Crossing: Planifica crossing entre cordes
- Position Playing: Mantén-te dins una posició quan sigui possible

APLICACIONS A STANDARDS:
- Misty: Voice leading cromàtic en els primers 8 bars
- Prelude to a Kiss: Moviments cromàtics complexos
- Body and Soul: Bridge amb voice leading challenging

VOICINGS RECOMANATS:
Per Dm7-G7-Cmaj7 en drop 2:
- Dm7: x57565
- G7: x55453  
- Cmaj7: x35453

Noter com les notes interiors es mouen mínimament.`,
        examples: [
          'Misty amb drop 2 voice leading complet',
          'Giant Steps amb voice leading optimitzat per guitarra',
          'Cherokee utilitzant hybrid voicings'
        ],
        exercises: [
          'Crea 5 voicings diferents per cada acord d\'un ii-V-I',
          'Practica voice leading cromàtic en una posició',
          'Desenvolupa progressions amb maximum voice leading smoothness'
        ],
        relatedConcepts: ['Drop 2 voicings', 'Hybrid guitar chords', 'Fingering economy']
      }
    ]
  },
  {
    id: 'modal-theory',
    title: 'Teoria Modal Avançada',
    description: 'Comprensió profunda dels modes i la seva aplicació en jazz contemporani',
    difficulty: 'Expert',
    sections: [
      {
        id: 'mt-beyond-basics',
        title: 'Més Enllà dels Modes Bàsics',
        content: `La teoria modal va molt més enllà de simplement tocar escales dòriques o mixolídies. En jazz avançat, els modes es converteixen en paisatges harmònics complets amb les seves pròpies regles i colors únics.

MODES COM A ENTITATS HARMÒNIQUES:

1. Dorian: El mode de la melancolia jazzística
   - Característiques: 6a major, 7a menor
   - Harmonia típica: im7 - IV7 - im7 - bVII
   - Color: melancòlic però esperançador
   - Standards: So What, Impressions

2. Mixolydian: El dominant natural
   - Característiques: 7a menor sobre acord major
   - Harmonia típica: I7 - bVII - I7 - IV7
   - Color: bluesy, rock, funk
   - Applications: Dominant 7 chords, blues-jazz

3. Lydian: El mode del misteri
   - Característiques: #11 defineix tot el so
   - Harmonia típica: IMaj7#11 - II7 - IMaj7#11
   - Color: etèric, espacial, modern
   - Standards: Carla, Maiden Voyage

SUPERIMPOSICIÓ MODAL:
Tocar un mode sobre una base harmònica diferent:
- C Lydian sobre Fmaj7: crea tensions modernes
- D Dorian sobre G7: alteracions interessants
- E Phrygian sobre Am7: color espanyol

TÈCNIQUES AVANÇADES:
- Modal interchange: prendre acords d'un mode paralel
- Modal substitution: usar acords modals com substituts
- Modal reharmonització: crear noves progressions amb colors modals`,
        examples: [
          'So What: anàlisi modal complet',
          'Maiden Voyage: lydian harmony',
          'Impressions: dorian modal jazz'
        ],
        exercises: [
          'Crea una progressió completament lydian',
          'Reharmonitza un standard usant modal interchange',
          'Desenvolupa improvisacions en cada mode amb les seves harmonies'
        ],
        relatedConcepts: ['Modal interchange', 'Characteristic tones', 'Modal harmony']
      }
    ]
  },
  {
    id: 'advanced-substitutions',
    title: 'Substitucions Avançades',
    description: 'Tècniques de substitució més enllà del tritone sub',
    difficulty: 'Master',
    sections: [
      {
        id: 'as-beyond-tritone',
        title: 'Més Enllà de la Substitució Tritònica',
        content: `Mentre la substitució tritònica és fonamental, hi ha un món sencer de substitucions més sofisticades que poden transformar completament una progressió.

SUBSTITUCIONS CROMÀTIQUES:

1. Chromatic Approach Chords:
   - Acords que s'apropen cromàticament al target
   - Dm7 → Dbmaj7 → Cmaj7 (chromatic approach to C)
   - Pot ser des de dalt o des de baix

2. Diminished Substitutions:
   - Usa acords disminuïts com a passing chords
   - C → C#dim → Dm7 → G7 → C
   - Els disminuïts connecten cromàticament

3. Relative ii-V Substitutions:
   - Substitueix qualsevol major chord pel seu ii-V relatiu
   - Cmaj7 → Am7 D7 → Gmaj7
   - Crea més moviment harmònic

SUBSTITUCIONS PER TERCERES:
Basades en el cicle de terceres majors (Coltrane):
- C → E → Ab → C
- Cada acord es pot abordar pel seu ii-V
- Crea progresions très sofisticades

SUBSTITUCIONS MODALS:
- Usar acords del mode paralel
- Em lloc de C - Am - F - G
- Usa C - Abmaj7 - Fm7 - Bb7 (del parallel menor)

CHORD SCALE SUBSTITUTIONS:
- Canviar l'escala sobre un acord mantenint la funció
- G7 amb mixolydian vs. G7 amb altered
- Mateix acord, diferent color

APLICACIONS PRÀCTIQUES:
Autumn Leaves original:
| Cm7  | F7   | BbMaj7 | EbMaj7 |
| Am7b5| D7   | Gm7    | Gm7    |

Amb substitucions avançades:
| Cm7  | B7   | BbMaj7 | A7     |
| Am7b5| Ab7  | Gm7 C7 | Fm7 Bb7|

Noter com cada substitució manté la funció harmònica però afegeix color i moviment.`,
        examples: [
          'Autumn Leaves amb substitucions cromàtiques completes',
          'All The Things You Are amb relative ii-V subs',
          'Giant Steps approach aplicat a standards clàssics'
        ],
        exercises: [
          'Reharmonitza Rhythm Changes amb només substitucions cromàtiques',
          'Crea una versió de Body and Soul amb substitucions per terceres',
          'Desenvolupa un sistema personal de substitucions per cada standard'
        ],
        relatedConcepts: ['Chromatic harmony', 'Functional harmony', 'Reharmonització avançada']
      }
    ]
  },
  {
    id: 'bebop-theory',
    title: 'Teoria del Bebop',
    description: 'Anàlisi profunda del llenguatge bebop i les seves aplicacions modernes',
    difficulty: 'Expert',
    sections: [
      {
        id: 'bb-scales',
        title: 'Escales Bebop i el seu Ús',
        content: `Les escales bebop són la base del llenguatge melòdic del jazz modern. Afegeixen notes cromàtiques a les escales tradicionals per crear línies fluides que encaixen perfectament amb el beat.

ESCALES BEBOP FONAMENTALS:

1. Bebop Major Scale:
   C-D-E-F-G-A-Bb-B-C
   - Afegeix 7a menor a l'escala major
   - Ideal per acords majors i dominants
   - Permet línies cromàtiques descendents

2. Bebop Dominant Scale:
   C-D-E-F-G-A-Bb-B-C (sobre C7)
   - Afegeix 7a major a mixolydian
   - Perfecta per acords dominants
   - Charlie Parker la usava constantemente

3. Bebop Minor Scale:
   C-D-Eb-F-G-Ab-A-Bb-C
   - Afegeix 7a major a l'escala menor natural
   - Per acords menors i ii-V-i progressions
   - Crea línies melòdiques suaus

4. Bebop Dorian Scale:
   C-D-Eb-E-F-G-A-Bb-C
   - Afegeix 3a major a dorian
   - Molt usada per m7 chords
   - Combinació perfecta amb ii-V progressions

TÈCNIQUES D'APLICACIÓ:
- Strong beats en chord tones
- Weak beats en tensions i cromàtiques
- Direccionalitat melòdica clara
- Resolutions cromàtiques als chord tones

EXEMPLES CLÀSSICS:
- Charlie Parker: Now's The Time solos
- Dizzy Gillespie: A Night in Tunisia melodies
- Bud Powell: Un Poco Loco improvisations`,
        examples: [
          'Charlie Parker solo transcriptions amb anàlisi d\'escales bebop',
          'Bud Powell voicings amb bebop scales aplicades',
          'Dizzy Gillespie trumpet lines adaptades per guitarra'
        ],
        exercises: [
          'Improvisa només amb bebop major scale en ii-V-I',
          'Crea línies melòdiques amb strong beats en chord tones',
          'Transcriu i analitza 3 solos de Charlie Parker'
        ],
        relatedConcepts: ['Chord-tone targets', 'Chromatic approach', 'Jazz phrasing']
      }
    ]
  },
  {
    id: 'contemporary-harmony',
    title: 'Harmonia Contemporània',
    description: 'Tècniques harmòniques modernes des dels anys 70 fins avui',
    difficulty: 'Master',
    sections: [
      {
        id: 'ch-quartal-harmony',
        title: 'Harmonia Quartal i Quintal',
        content: `L'harmonia quartal/quintal abandona les tríades i sèptimes tradicionals per construir acords basats en quarte i quintes, creant sonoritats modernes i ambigües.

CONSTRUCCIÓ D'ACORDS QUARTALS:

1. Acords de 4es Pures:
   C-F-Bb-Eb (C sus quartal)
   - Stack de 4es perfectes
   - Sonoritat oberta, moderna
   - Ambigüitat tonal intencional

2. Mixed Quartal/Quintal:
   C-F-C-F (alternant 4es i 5es)
   - Més estabilitat que quartals purs
   - Manté ambigüitat harmònica
   - Ideal per pads harmònics

3. Quartal Voicings per Guitarra:
   - Frets 5-5-5-5 (mateix fret, cordes adjacents)
   - Moviments paral·lels
   - Drop 2 quartals: x-3-5-3-6-x

APLICACIONS EN JAZZ CONTEMPORANI:
- McCoy Tyner: pionner dels quartals en piano
- Pat Metheny: quartals en guitar comping
- Herbie Hancock: híbrids quartal-tertial

PROGRESSIONS QUARTALS:
Em lloc de Cmaj7 - Am7 - Dm7 - G7:
C-F-Bb - A-D-G - D-G-C - G-C-F

TÈCNIQUES DE COMPING:
- Parallel motion amb quartals
- Pedal tones sota quartals
- Quartal upper structures sobre bass notes

CONSIDERACIONS MELÒDIQUES:
- Les melodies poden seguir la construcció quartal
- Avoid notes tradicionals es converteixen en chord tones
- Intervalic thinking en lloc de scalar thinking`,
        examples: [
          'McCoy Tyner transcriptions amb anàlisi quartal',
          'Pat Metheny guitar quartals en context de band',
          'Herbie Hancock Maiden Voyage quartal analysis'
        ],
        exercises: [
          'Crea progressions de 8 bars només amb quartals',
          'Reharmonitza un standard utilitzant només quartals',
          'Desenvolupa técniques de comping quartal per guitarra'
        ],
        relatedConcepts: ['Modern voicings', 'Ambiguous harmony', 'Contemporary comping']
      }
    ]
  },
  {
    id: 'jazz-rhythm',
    title: 'Conceptes Rítmics Avançats',
    description: 'Polyrrhythms, métrics complexes i groove en jazz contemporani',
    difficulty: 'Professional',
    sections: [
      {
        id: 'jr-polyrhythms',
        title: 'Polirrítmia i Mètrica Complexa',
        content: `El ritme en jazz contemporani va molt més enllà del swing bàsic. Els músics moderns utilitzen polirrítmies complexes, metres asimètrics i superimposicions rítmiques.

CONCEPTES FONAMENTALS:

1. Polyrhythms Simples:
   - 3 contra 2: tres notes en l'espai de dues
   - 4 contra 3: quatre notes en l'espai de tres  
   - Crea tensió i resolució rítmica

2. Metres Asimètrics:
   - 5/4: Take Five (Dave Brubeck)
   - 7/4: Seven Steps to Heaven (Miles Davis)
   - 9/8: Blue Rondo (Dave Brubeck)

3. Metric Modulation:
   - Canviar la sensació de tempo sense canviar BPM
   - Quarter note = dotted eighth note
   - Crea sections contrastants

APLICACIONS EN GUITARRA:
- Comping en metres odds
- Solo lines que crossover barlines
- Polyrhythmic chord voicings

TÈCNIQUES D'ESTUDI:
1. Practricare amb metrònom en agrupacions estranyes
2. Tocar melodies simples en metres complexos
3. Desenvolupar independent coordination

EXEMPLES CLÀSSICS:
- Dave Brubeck Quartet: Time Out album
- Don Ellis Orchestra: experimentació mètrica extreme
- Frank Zappa: polirítmies rock-jazz

SUPERIMPOSICIÓ RÍTMICA:
Tocar patrons de 3 sobre bases de 4:
- Crea tensió sense perdre el pulse
- Resolució en strong beats
- Permet creativitat dins estructura

DESENVOLUPAMENT GRADUAL:
1. Comença amb metres simples (5/4, 3/4)
2. Afegeix polirítmies bàsiques (3 over 2)
3. Combina metres i polirítmies
4. Crea composicions originals amb metres mixtes`,
        examples: [
          'Take Five analysis rítmic complet',
          'Seven Steps to Heaven breakdown',
          'Polyrhythmic guitar comping patterns'
        ],
        exercises: [
          'Compon una peça en 7/8 amb feels canviants',
          'Practica ii-V-I en diferents signatures de temps',
          'Desenvolupa polyrhythmic independence en guitarra'
        ],
        relatedConcepts: ['Complex meters', 'Rhythmic displacement', 'Contemporary groove']
      }
    ]
  },
  {
    id: 'harmonic-analysis',
    title: 'Anàlisi Harmònica Profesional',
    description: 'Metodologies avançades per analitzar i comprendre progressions complexes',
    difficulty: 'Master',
    sections: [
      {
        id: 'ha-functional-analysis',
        title: 'Anàlisi Funcional Avançada',
        content: `L'anàlisi funcional va més enllà dels bàsics I-ii-V-I per comprendre les forces direccionals complexes en harmonia de jazz avançat.

FUNCIONS HARMÒNIQUES EXPANDIDES:

1. Pre-Dominant Extensions:
   - ii7: preparació estàndard
   - IV7: subdominant with dominant flavor  
   - bII7: tritone sub del V
   - bVI7: Neapolitan approach

2. Dominant Extensions:
   - V7: dominant primari
   - VII7: secondary dominant variant
   - bV7: tritone substitution
   - V7/V: tonicization

3. Tonic Extensions:
   - I: tonic primari
   - vi: relative minor substitute
   - iii: mediant substitute
   - bVI: borrowed from parallel minor

ANÀLISI DE PROGRESSIONS COMPLEXES:

Giant Steps (Coltrane):
| B    E7  | A7     D  | G    C#7 | F#7    B  |
Funció: I - V/V - V7 - I - I - V/V - V7 - I

Cada segment segueix la mateixa funció però en centres tonals diferents (B, D, G).

CHORD SUBSTITUTION ANALYSIS:
Quan trobes un acord inesperat, pregunta't:
1. Quin acord substitueix?
2. Quina relació té amb el context?
3. Quina direcció harmònica crea?

ANÀLISI DE VOICE LEADING:
No només QUÈ acords, sinó COM es connecten:
- Moviment cromàtic vs. per graus
- Common tones vs. contrary motion
- Linear vs. functional logic

APLICACIÓ PRÀCTICA:
1. Identifica la tonalitat principal
2. Marca tonicizations i modulations
3. Analitza substitutions i extensions
4. Estudia el voice leading
5. Comprèn l'estructura macro

EXEMPLES D'ANÀLISI:
- All The Things You Are: modulations complexes
- Cherokee: ii-V chains en diferentes keys
- Body and Soul: chromatic voice leading analysis`,
        examples: [
          'All The Things You Are anàlisi funcional complet',
          'Cherokee modulation breakdown',
          'Body and Soul chromatic analysis'
        ],
        exercises: [
          'Analitza 5 standards des d\'una perspectiva funcional',
          'Crea chord charts amb anàlisi funcional inclòs',
          'Desenvolupa un sistema personal d\'anàlisi'
        ],
        relatedConcepts: ['Functional harmony', 'Voice leading analysis', 'Tonal centers']
      }
    ]
  }
];

// Índex de conceptes per cerca ràpida
export const conceptIndex: Record<string, string[]> = {
  'harmonia negativa': ['negative-harmony'],
  'upper structures': ['upper-structures'],
  'voice leading': ['voice-leading'],
  'coltrane changes': ['coltrane-changes'],
  'giant steps': ['coltrane-changes'],
  'bebop': ['bebop-theory'],
  'charlie parker': ['bebop-theory'],
  'escales bebop': ['bebop-theory'],
  'quartal': ['contemporary-harmony'],
  'mccoy tyner': ['contemporary-harmony'],
  'polirítmia': ['jazz-rhythm'],
  'metres complexos': ['jazz-rhythm'],
  'anàlisi funcional': ['harmonic-analysis'],
  'substitució tritònica': ['negative-harmony', 'advanced-substitutions'],
  'reharmonització': ['negative-harmony', 'voice-leading', 'advanced-substitutions'],
  'tensions': ['upper-structures'],
  'polychords': ['upper-structures'],
  'chromatic motion': ['voice-leading'],
  'modal theory': ['modal-theory'],
  'modes': ['modal-theory'],
  'dorian': ['modal-theory'],
  'lydian': ['modal-theory'],
  'rhythm': ['jazz-rhythm'],
  'polyrhythms': ['jazz-rhythm'],
  'take five': ['jazz-rhythm'],
  'dave brubeck': ['jazz-rhythm'],
  'functional analysis': ['harmonic-analysis'],
  'jazz analysis': ['harmonic-analysis'],
  'chord functions': ['harmonic-analysis']
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