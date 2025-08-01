import { 
  users, 
  type User, 
  type InsertUser, 
  type GameProgress, 
  type InsertGameProgress, 
  type GameStats, 
  type InsertGameStats,
  type Level 
} from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game progress
  getUserProgress(userId: number): Promise<GameProgress[]>;
  getLevelProgress(userId: number, levelId: number): Promise<GameProgress | undefined>;
  saveProgress(progress: InsertGameProgress): Promise<GameProgress>;
  updateProgress(userId: number, levelId: number, updates: Partial<InsertGameProgress>): Promise<GameProgress>;
  
  // Game statistics
  getUserStats(userId: number): Promise<GameStats | undefined>;
  saveStats(stats: InsertGameStats): Promise<GameStats>;
  updateStats(userId: number, updates: Partial<InsertGameStats>): Promise<GameStats>;
  
  // Levels (read-only for now)
  getAllLevels(): Promise<Level[]>;
  getLevel(id: number): Promise<Level | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameProgress: Map<string, GameProgress>; // key: `${userId}-${levelId}`
  private gameStats: Map<number, GameStats>; // key: userId
  private levels: Map<number, Level>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentStatsId: number;

  constructor() {
    this.users = new Map();
    this.gameProgress = new Map();
    this.gameStats = new Map();
    this.levels = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentStatsId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Game progress methods
  async getUserProgress(userId: number): Promise<GameProgress[]> {
    return Array.from(this.gameProgress.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async getLevelProgress(userId: number, levelId: number): Promise<GameProgress | undefined> {
    const key = `${userId}-${levelId}`;
    return this.gameProgress.get(key);
  }

  async saveProgress(progress: InsertGameProgress): Promise<GameProgress> {
    const id = this.currentProgressId++;
    const key = `${progress.userId}-${progress.levelId}`;
    const gameProgress: GameProgress = { 
      ...progress, 
      id,
      userId: progress.userId || null,
      attempts: progress.attempts || 0,
      completed: progress.completed || false,
      bestTime: progress.bestTime || null
    };
    this.gameProgress.set(key, gameProgress);
    return gameProgress;
  }

  async updateProgress(userId: number, levelId: number, updates: Partial<InsertGameProgress>): Promise<GameProgress> {
    const key = `${userId}-${levelId}`;
    const existing = this.gameProgress.get(key);
    
    if (!existing) {
      // Create new progress entry
      return this.saveProgress({
        userId,
        levelId,
        score: 0,
        attempts: 0,
        completed: false,
        bestTime: null,
        ...updates
      });
    }

    const updated: GameProgress = { ...existing, ...updates };
    this.gameProgress.set(key, updated);
    return updated;
  }

  // Game statistics methods
  async getUserStats(userId: number): Promise<GameStats | undefined> {
    return this.gameStats.get(userId);
  }

  async saveStats(stats: InsertGameStats): Promise<GameStats> {
    const id = this.currentStatsId++;
    const gameStats: GameStats = { 
      ...stats, 
      id,
      userId: stats.userId || null,
      totalScore: stats.totalScore || 0,
      completedLevels: stats.completedLevels || [],
      achievements: stats.achievements || [],
      streakCount: stats.streakCount || 0
    };
    this.gameStats.set(stats.userId!, gameStats);
    return gameStats;
  }

  async updateStats(userId: number, updates: Partial<InsertGameStats>): Promise<GameStats> {
    const existing = this.gameStats.get(userId);
    
    if (!existing) {
      // Create new stats entry
      return this.saveStats({
        userId,
        totalScore: 0,
        completedLevels: [],
        achievements: [],
        streakCount: 0,
        ...updates
      });
    }

    const updated: GameStats = { ...existing, ...updates };
    this.gameStats.set(userId, updated);
    return updated;
  }

  // Level methods (read-only)
  async getAllLevels(): Promise<Level[]> {
    return Array.from(this.levels.values());
  }

  async getLevel(id: number): Promise<Level | undefined> {
    return this.levels.get(id);
  }

  // Method to initialize levels data
  setLevels(levels: Level[]): void {
    this.levels.clear();
    levels.forEach(level => this.levels.set(level.id, level));
  }
}

export const storage = new MemStorage();

// Initialize with levels data - this would normally come from a database
// but for the migration we'll load the static data
// Note: We'll initialize this via a separate initialization function
// to avoid import issues during the migration
