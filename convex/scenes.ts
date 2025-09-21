// convex/scenes.ts
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

// Create a new scene
export const createScene = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    order: v.number(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    const timestamp = Date.now();
    
    return await ctx.db.insert("scenes", {
      ...args,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },
});

// Get all scenes for a project
export const getScenesByProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    return await ctx.db
      .query("scenes")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .order("asc")
      .collect();
  },
});

// Get a specific scene by ID
export const getSceneById = query({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args) => {
    const scene = await ctx.db.get(args.sceneId);
    if (!scene) {
      throw new Error("Scene not found");
    }
    
    await checkProjectAccess(ctx, scene.projectId);
    return scene;
  },
});

// Update a scene
export const updateScene = mutation({
  args: {
    sceneId: v.id("scenes"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.optional(v.number()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const scene = await ctx.db.get(args.sceneId);
    if (!scene) {
      throw new Error("Scene not found");
    }
    
    await checkProjectAccess(ctx, scene.projectId);
    
    const { sceneId, ...rest } = args;
    
    await ctx.db.patch(sceneId, {
      ...rest,
      updatedAt: Date.now(),
    });
    
    return sceneId;
  },
});

// Delete a scene
export const deleteScene = mutation({
  args: {
    sceneId: v.id("scenes"),
  },
  handler: async (ctx, args) => {
    const scene = await ctx.db.get(args.sceneId);
    if (!scene) {
      throw new Error("Scene not found");
    }
    
    await checkProjectAccess(ctx, scene.projectId);
    
    await ctx.db.delete(args.sceneId);
    return args.sceneId;
  },
});
