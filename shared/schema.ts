import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table for future authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Game progress tracking
export const gameProgress = pgTable("game_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  levelId: integer("level_id").notNull(),
  score: integer("score").notNull(),
  attempts: integer("attempts").notNull().default(0),
  completed: boolean("completed").notNull().default(false),
  bestTime: integer("best_time"), // in seconds
});

// Game statistics
export const gameStats = pgTable("game_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  totalScore: integer("total_score").notNull().default(0),
  completedLevels: text("completed_levels").array().notNull().default([]),
  achievements: text("achievements").array().notNull().default([]),
  streakCount: integer("streak_count").notNull().default(0),
});

// Schemas for the data types used in the app
export const exerciseSchema = z.object({
  id: z.number(),
  type: z.enum(['identify', 'listen', 'construct', 'analyze']),
  question: z.string(),
  content: z.string().optional(),
  example: z.string().optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string(),
  explanation: z.string(),
  hint: z.string().optional(),
});

export const levelSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  concepts: z.array(z.string()),
  exercises: z.array(exerciseSchema),
  requiredScore: z.number(),
});

export const gameStateSchema = z.object({
  currentLevel: z.number(),
  currentExercise: z.number(),
  isPlaying: z.boolean(),
  gameMode: z.enum(['theory', 'speed', 'memory', 'target', 'puzzle', 'arcade']),
  gameStats: z.object({
    totalScore: z.number(),
    completedLevels: z.array(z.number()),
    achievements: z.array(z.string()),
    streakCount: z.number(),
  }),
  userProgress: z.record(z.object({
    completed: z.boolean(),
    score: z.number(),
    attempts: z.number(),
    bestTime: z.number(),
  })),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameProgressSchema = createInsertSchema(gameProgress).omit({
  id: true,
});

export const insertGameStatsSchema = createInsertSchema(gameStats).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type GameProgress = typeof gameProgress.$inferSelect;
export type InsertGameProgress = z.infer<typeof insertGameProgressSchema>;
export type GameStats = typeof gameStats.$inferSelect;
export type InsertGameStats = z.infer<typeof insertGameStatsSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type Level = z.infer<typeof levelSchema>;
export type GameState = z.infer<typeof gameStateSchema>;
