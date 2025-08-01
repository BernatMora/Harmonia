// Service per gestionar la generació dinàmica de preguntes
interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'principiant' | 'intermedi' | 'avançat';
  topic: string;
}

interface QuestionResponse {
  questions: GeneratedQuestion[];
  count: number;
}

class QuestionService {
  private cache = new Map<string, GeneratedQuestion[]>();
  private loading = new Set<string>();

  async getQuestionsForGame(gameMode: string, count: number = 10): Promise<GeneratedQuestion[]> {
    // Evita múltiples requests simultanis per el mateix game mode
    if (this.loading.has(gameMode)) {
      await this.waitForLoading(gameMode);
    }

    // Si ja tenim preguntes cached, les retornem
    const cached = this.cache.get(gameMode);
    if (cached && cached.length >= count) {
      const selected = cached.splice(0, count); // Agafa les primeres i les elimina del cache
      return selected;
    }

    // Genera noves preguntes
    return this.generateNewQuestions(gameMode, count);
  }

  private async generateNewQuestions(gameMode: string, count: number): Promise<GeneratedQuestion[]> {
    this.loading.add(gameMode);
    
    try {
      console.log(`🧠 Generating ${count} new questions for ${gameMode}...`);
      
      const response = await fetch(`/api/questions/${gameMode}?count=${count}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to generate questions: ${response.statusText}`);
      }

      const data: QuestionResponse = await response.json();
      console.log(`✅ Generated ${data.count} questions successfully`);
      
      // Cache extra questions for next time
      if (data.questions.length > count) {
        const toReturn = data.questions.slice(0, count);
        const toCache = data.questions.slice(count);
        this.cache.set(gameMode, toCache);
        return toReturn;
      }

      return data.questions;
    } catch (error) {
      console.error('Error generating questions:', error);
      // Fallback to empty array so the app doesn't crash
      return [];
    } finally {
      this.loading.delete(gameMode);
    }
  }

  private async waitForLoading(gameMode: string): Promise<void> {
    while (this.loading.has(gameMode)) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  // Neteja el cache per un joc específic
  clearCache(gameMode?: string): void {
    if (gameMode) {
      this.cache.delete(gameMode);
    } else {
      this.cache.clear();
    }
  }

  // Precarrega preguntes per un joc
  async preloadQuestions(gameMode: string, count: number = 20): Promise<void> {
    if (!this.cache.has(gameMode) || this.cache.get(gameMode)!.length < 10) {
      const questions = await this.generateNewQuestions(gameMode, count);
      this.cache.set(gameMode, questions);
    }
  }

  // Estadístiques del cache
  getCacheStats(): Record<string, number> {
    const stats: Record<string, number> = {};
    this.cache.forEach((questions, gameMode) => {
      stats[gameMode] = questions.length;
    });
    return stats;
  }
}

// Singleton instance
export const questionService = new QuestionService();
export type { GeneratedQuestion };