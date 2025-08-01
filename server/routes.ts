import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertGameProgressSchema, 
  insertGameStatsSchema,
  type Level 
} from "@shared/schema";
import { QuestionGenerator } from "./questionGenerator";

// Import levels data from the client
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  const questionGenerator = QuestionGenerator.getInstance();
  
  // Initialize levels data on startup
  try {
    const levelsPath = path.resolve(import.meta.dirname, '../client/src/data/levels.ts');
    if (fs.existsSync(levelsPath)) {
      // Dynamic import of the levels data
      const { levels } = await import('../client/src/data/levels.js');
      storage.setLevels(levels);
      console.log(`Initialized ${levels.length} levels in storage`);
    }
  } catch (error) {
    console.warn('Could not load levels data:', error);
  }

  // Get all levels
  app.get("/api/levels", async (req, res) => {
    try {
      const levels = await storage.getAllLevels();
      res.json(levels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch levels" });
    }
  });

  // Get specific level
  app.get("/api/levels/:id", async (req, res) => {
    try {
      const levelId = parseInt(req.params.id);
      const level = await storage.getLevel(levelId);
      
      if (!level) {
        return res.status(404).json({ error: "Level not found" });
      }
      
      res.json(level);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch level" });
    }
  });

  // Get user progress (for now using a default user id = 1)
  app.get("/api/progress", async (req, res) => {
    try {
      const userId = 1; // Default user for now
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  // Save/update user progress for a level
  app.post("/api/progress", async (req, res) => {
    try {
      const userId = 1; // Default user for now
      const progressData = insertGameProgressSchema.parse({
        ...req.body,
        userId
      });
      
      const progress = await storage.saveProgress(progressData);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Invalid progress data" });
    }
  });

  // Update progress for a specific level
  app.patch("/api/progress/:levelId", async (req, res) => {
    try {
      const userId = 1; // Default user for now
      const levelId = parseInt(req.params.levelId);
      
      const progress = await storage.updateProgress(userId, levelId, req.body);
      res.json(progress);
    } catch (error) {
      res.status(400).json({ error: "Failed to update progress" });
    }
  });

  // Get user statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const userId = 1; // Default user for now
      const stats = await storage.getUserStats(userId);
      
      if (!stats) {
        // Create default stats if none exist
        const defaultStats = await storage.saveStats({
          userId,
          totalScore: 0,
          completedLevels: [],
          achievements: [],
          streakCount: 0
        });
        return res.json(defaultStats);
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Update user statistics
  app.patch("/api/stats", async (req, res) => {
    try {
      const userId = 1; // Default user for now
      const stats = await storage.updateStats(userId, req.body);
      res.json(stats);
    } catch (error) {
      res.status(400).json({ error: "Failed to update stats" });
    }
  });

  // Generate new questions for a game mode
  app.post("/api/questions/:gameMode", async (req, res) => {
    try {
      const gameMode = req.params.gameMode;
      const count = parseInt(req.query.count as string) || 10;
      
      console.log(`Generating ${count} questions for ${gameMode}...`);
      const questions = await questionGenerator.generateQuestions(gameMode, count);
      
      console.log(`Generated ${questions.length} questions successfully`);
      res.json({ questions, count: questions.length });
    } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: "Failed to generate questions" });
    }
  });

  // Get statistics about generated questions
  app.get("/api/questions/stats/:gameMode", async (req, res) => {
    try {
      const gameMode = req.params.gameMode;
      const count = questionGenerator.getGeneratedCount(gameMode);
      res.json({ gameMode, generatedCount: count });
    } catch (error) {
      res.status(500).json({ error: "Failed to get question stats" });
    }
  });

  // Clear generated questions for a game mode (optional reset)
  app.delete("/api/questions/:gameMode", async (req, res) => {
    try {
      const gameMode = req.params.gameMode;
      questionGenerator.clearGeneratedQuestions(gameMode);
      res.json({ message: `Cleared questions for ${gameMode}` });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear questions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
