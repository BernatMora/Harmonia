// Progressions musicals reals importades del fitxer proporcionat
export const progressions = [
  {
    "tonalitat": "F#m",
    "mode": "minor",
    "progressio_romana": "VI – v – VII",
    "acords": [
      { "acord": "D7", "tipus": "dominant" },
      { "acord": "C#m7", "tipus": "minor seventh" },
      { "acord": "E", "tipus": "major" }
    ]
  },
  {
    "tonalitat": "A",
    "mode": "major",
    "progressio_romana": "IV – vi – V",
    "acords": [
      { "acord": "D7", "tipus": "dominant" },
      { "acord": "F#m", "tipus": "minor" },
      { "acord": "E", "tipus": "major" }
    ]
  },
  {
    "tonalitat": "Cm",
    "mode": "minor",
    "progressio_romana": "III – III – v – i – iv – VII",
    "acords": [
      { "acord": "Eb", "tipus": "major" },
      { "acord": "Eb", "tipus": "major" },
      { "acord": "Gm", "tipus": "minor" },
      { "acord": "Cm", "tipus": "minor" },
      { "acord": "Fm", "tipus": "minor" },
      { "acord": "Bb", "tipus": "major" }
    ]
  },
  {
    "tonalitat": "F",
    "mode": "major",
    "progressio_romana": "vi – I – ii – IV – IV",
    "acords": [
      { "acord": "Dm", "tipus": "minor" },
      { "acord": "F", "tipus": "major" },
      { "acord": "Gm", "tipus": "minor" },
      { "acord": "Bb", "tipus": "major" },
      { "acord": "Bb", "tipus": "major" }
    ]
  },
  {
    "tonalitat": "D",
    "mode": "major",
    "progressio_romana": "ii – vii° – vii° – I – iii – V",
    "acords": [
      { "acord": "Em", "tipus": "minor" },
      { "acord": "C#°", "tipus": "diminished" },
      { "acord": "C#°", "tipus": "diminished" },
      { "acord": "D7", "tipus": "dominant" },
      { "acord": "F#m", "tipus": "minor" },
      { "acord": "A", "tipus": "major" }
    ]
  },
  {
    "tonalitat": "Gm",
    "mode": "minor",
    "progressio_romana": "ii° – VI – VII – III – III",
    "acords": [
      { "acord": "Aø7", "tipus": "half-diminished" },
      { "acord": "Ebmaj7", "tipus": "major seventh" },
      { "acord": "F", "tipus": "major" },
      { "acord": "Bb", "tipus": "major" },
      { "acord": "Bb", "tipus": "major" }
    ]
  },
  {
    "tonalitat": "Am",
    "mode": "minor",
    "progressio_romana": "v – III – VII – ii° – i",
    "acords": [
      { "acord": "Em", "tipus": "minor" },
      { "acord": "C7", "tipus": "dominant" },
      { "acord": "G", "tipus": "major" },
      { "acord": "B°", "tipus": "diminished" },
      { "acord": "Am7", "tipus": "minor seventh" }
    ]
  },
  {
    "tonalitat": "Eb",
    "mode": "major",
    "progressio_romana": "I – iii – vi – IV – IV",
    "acords": [
      { "acord": "Eb7", "tipus": "dominant" },
      { "acord": "Gm", "tipus": "minor" },
      { "acord": "Cm", "tipus": "minor" },
      { "acord": "Ab", "tipus": "major" },
      { "acord": "Ab", "tipus": "major" }
    ]
  }
];

// Funcions d'utilitat per treballar amb les progressions
export const getRandomProgression = () => {
  return progressions[Math.floor(Math.random() * progressions.length)];
};

export const getProgressionsByKey = (key: string) => {
  return progressions.filter(p => p.tonalitat === key);
};

export const getProgressionsByMode = (mode: 'major' | 'minor') => {
  return progressions.filter(p => p.mode === mode);
};

export const getChordTypes = () => {
  const types = new Set<string>();
  progressions.forEach(p => {
    p.acords.forEach(acord => {
      types.add(acord.tipus);
    });
  });
  return Array.from(types);
};