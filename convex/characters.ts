// convex/characters.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// Helper to get user from Clerk auth
const getUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Helper to check project ownership
const checkProjectAccess = async (ctx: QueryCtx | MutationCtx, projectId: Id<"projects">) => {
  const user = await getUser(ctx);
  const project = await ctx.db.get(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.userId !== user._id) {
    throw new Error("You do not have permission to access this project.");
  }
  return { user, project };
};

// Create a new character
export const createCharacter = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    role: v.string(),
    goals: v.optional(v.string()),
    quirks: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    const timestamp = Date.now();
    
    return await ctx.db.insert("characters", {
      ...args,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Get all characters for a project
export const getCharactersByProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    return await ctx.db
      .query("characters")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

// Get a specific character by ID
export const getCharacterById = query({
  args: {
    characterId: v.id("characters"),
  },
  handler: async (ctx, args) => {
    const character = await ctx.db.get(args.characterId);
    if (!character) {
      throw new Error("Character not found");
    }
    
    await checkProjectAccess(ctx, character.projectId);
    return character;
  },
});

// Update a character
export const updateCharacter = mutation({
  args: {
    characterId: v.id("characters"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    goals: v.optional(v.string()),
    quirks: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const character = await ctx.db.get(args.characterId);
    if (!character) {
      throw new Error("Character not found");
    }
    
    await checkProjectAccess(ctx, character.projectId);
    
    const { characterId, ...rest } = args;
    
    await ctx.db.patch(characterId, {
      ...rest,
      updatedAt: Date.now(),
    });
    
    return characterId;
  },
});

// Delete a character
export const deleteCharacter = mutation({
  args: {
    characterId: v.id("characters"),
  },
  handler: async (ctx, args) => {
    const character = await ctx.db.get(args.characterId);
    if (!character) {
      throw new Error("Character not found");
    }
    
    await checkProjectAccess(ctx, character.projectId);
    
    await ctx.db.delete(args.characterId);
    return args.characterId;
  },
});

// Create a character relationship
export const createRelationship = mutation({
  args: {
    projectId: v.id("projects"),
    characterId1: v.id("characters"),
    characterId2: v.id("characters"),
    type: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    const character1 = await ctx.db.get(args.characterId1);
    const character2 = await ctx.db.get(args.characterId2);
    
    if (!character1 || !character2) {
      throw new Error("One or both characters not found");
    }
    
    if (character1.projectId !== args.projectId || character2.projectId !== args.projectId) {
      throw new Error("Characters do not belong to the specified project");
    }
    
    return await ctx.db.insert("relationships", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get all relationships for a project
export const getRelationshipsByProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    return await ctx.db
      .query("relationships")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

// Delete a relationship
export const deleteRelationship = mutation({
  args: {
    relationshipId: v.id("relationships"),
  },
  handler: async (ctx, args) => {
    const relationship = await ctx.db.get(args.relationshipId);
    if (!relationship) {
      throw new Error("Relationship not found");
    }
    
    await checkProjectAccess(ctx, relationship.projectId);
    
    await ctx.db.delete(args.relationshipId);
    return args.relationshipId;
  },
});