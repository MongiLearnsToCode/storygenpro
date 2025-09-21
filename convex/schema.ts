import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema for StoryGenPro
export default defineSchema({
  // Users table - linked to Clerk user IDs
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Projects (stories) table
  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    userId: v.id("users"), // Reference to the user who owns this project
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  // Scenes table
  scenes: defineTable({
    projectId: v.id("projects"), // Reference to the project this scene belongs to
    title: v.string(),
    description: v.optional(v.string()),
    order: v.number(), // Order in the timeline
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_project_and_order", ["projectId", "order"]),

  // Characters table
  characters: defineTable({
    projectId: v.id("projects"), // Reference to the project this character belongs to
    name: v.string(),
    role: v.string(),
    goals: v.optional(v.string()),
    quirks: v.optional(v.string()),
    description: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_project", ["projectId"]),

  // Character relationships table
  relationships: defineTable({
    projectId: v.id("projects"), // Reference to the project
    characterId1: v.id("characters"), // First character in the relationship
    characterId2: v.id("characters"), // Second character in the relationship
    type: v.string(), // Type of relationship (e.g., "friend", "enemy", "family")
    description: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_character1", ["characterId1"])
    .index("by_character2", ["characterId2"]),

  // Achievements and streaks table
  achievements: defineTable({
    userId: v.id("users"), // Reference to the user
    type: v.string(), // Type of achievement (e.g., "daily_streak", "scenes_created")
    count: v.number(), // Count for streaks or achievements
    lastUpdated: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_type", ["userId", "type"]),
});