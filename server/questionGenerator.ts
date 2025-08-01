import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'principiant' | 'intermedi' | 'avançat';
  topic: string;
}

export class QuestionGenerator {
  private static instance: QuestionGenerator;
  private generatedQuestions: Map<string, Set<string>> = new Map(); // gameMode -> set of question IDs

  public static getInstance(): QuestionGenerator {
    if (!QuestionGenerator.instance) {
      QuestionGenerator.instance = new QuestionGenerator();
    }
    return QuestionGenerator.instance;
  }

  async generateQuestions(gameMode: string, count: number = 10): Promise<GeneratedQuestion[]> {
    const prompts = this.getPromptForGameMode(gameMode);
    const questions: GeneratedQuestion[] = [];
    
    for (let i = 0; i < count; i++) {
      try {
        const question = await this.generateSingleQuestion(gameMode, prompts);
        if (question && !this.isDuplicate(gameMode, question.id)) {
          questions.push(question);
          this.markQuestionAsGenerated(gameMode, question.id);
        }
      } catch (error) {
        console.error(`Error generating question ${i + 1}:`, error);
      }
    }
    
    return questions;
  }

  private async generateSingleQuestion(gameMode: string, prompts: any): Promise<GeneratedQuestion | null> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: prompts.system
          },
          {
            role: "user", 
            content: prompts.user
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.9, // Alta creativitat per evitar repeticions
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        id: `${gameMode}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        question: result.question,
        options: result.options,
        correct: result.correct,
        explanation: result.explanation,
        difficulty: result.difficulty || 'avançat',
        topic: result.topic || gameMode
      };
    } catch (error) {
      console.error('Error generating single question:', error);
      return null;
    }
  }

  private getPromptForGameMode(gameMode: string) {
    const baseSystem = `Ets un expert en teoria musical jazz ultra-avançada. Genera preguntes extremadament difícils per a guitarristes professionals de jazz. Les preguntes han de requerir coneixements d'harmonia avançada, reharmonització, negative harmony, voice leading complex, i teoria modal profunda. Respon sempre en JSON amb aquest format exacte:
    {
      "question": "pregunta en català",
      "options": ["opció1", "opció2", "opció3", "opció4"],
      "correct": 0,
      "explanation": "explicació detallada en català",
      "difficulty": "avançat",
      "topic": "tema específic"
    }`;

    const prompts: Record<string, any> = {
      theory: {
        system: baseSystem,
        user: "Genera una pregunta ultra-avançada sobre teoria harmònica jazz. Inclou conceptes com: negative harmony, upper structure triads, altered dominants, reharmonització cromàtica, voice leading de Bill Evans/Herbie Hancock, anàlisi de Giant Steps o Cherokee, substitucions tritòniques complexes, harmonia quartal, polychords, o modes exòtics. La pregunta ha de ser tan difícil que només un professional podria respondre-la."
      },
      speed: {
        system: baseSystem,
        user: "Genera una pregunta ràpida però ultra-complexa sobre reconeixement harmònic instantani. Ha d'involucrar identificació ràpida de: cadenes ii-V-I amb substitucions, progressions de Coltrane changes, anàlisi funcional de Cherokee o All The Things You Are, reconeixement d'upper structures, o identificació de reharmonitzacions. La resposta ha de ser immediata per un expert."
      },
      memory: {
        system: baseSystem,
        user: "Genera una pregunta sobre memorització de patrons harmònics complexos. Inclou sequències com: voice leading a 4 veus de Cherokee, matriu de Giant Steps, progressions amb negative harmony, cadenes de dominants amb substitucions, o moviments cromàtics en progressions de Debussy/Ravel. Ha de desafiar la memòria harmònica professional."
      },
      target: {
        system: baseSystem,
        user: "Genera un desafiament específic d'objectiu harmònic. Pot ser: construir una reharmonització completa d'Autumn Leaves, aplicar negative harmony a All The Things You Are, crear voice leading cromàtic per Body and Soul, dissenyar substitucions per Giant Steps, o harmonitzar una melodia amb upper structures. L'objectiu ha de ser extremadament específic i tècnic."
      },
      puzzle: {
        system: baseSystem,
        user: "Genera un puzzle harmònic complex que requereixi anàlisi profunda. Pot involucrar: completar progressions amb restriccions de voice leading, identificar l'escala correcta per acords politonals, trobar la reharmonització que connecta dos acords distants, o desxifrar l'harmonia d'un passage de Keith Jarrett/Brad Mehldau. Ha de ser com un trencaclosques musical."
      },
      harmonia: {
        system: baseSystem,
        user: "Genera una pregunta sobre anàlisi harmònica de progressions reals de jazz standards. Utilitza progressions autèntiques de: All The Things You Are, Giant Steps, Cherokee, Body and Soul, Stella by Starlight, o Have You Met Miss Jones. Inclou anàlisi funcional romana, substitucions possibles, i extensions. La pregunta ha de requerir comprensió profunda del llenguatge harmònic jazz."
      }
    };

    return prompts[gameMode] || prompts.theory;
  }

  private isDuplicate(gameMode: string, questionId: string): boolean {
    const generated = this.generatedQuestions.get(gameMode);
    return generated ? generated.has(questionId) : false;
  }

  private markQuestionAsGenerated(gameMode: string, questionId: string): void {
    if (!this.generatedQuestions.has(gameMode)) {
      this.generatedQuestions.set(gameMode, new Set());
    }
    this.generatedQuestions.get(gameMode)!.add(questionId);
  }

  // Neteja les preguntes generades per permetre nous cicles (opcional)
  clearGeneratedQuestions(gameMode?: string): void {
    if (gameMode) {
      this.generatedQuestions.delete(gameMode);
    } else {
      this.generatedQuestions.clear();
    }
  }

  // Estadístiques de preguntes generades
  getGeneratedCount(gameMode: string): number {
    return this.generatedQuestions.get(gameMode)?.size || 0;
  }
}