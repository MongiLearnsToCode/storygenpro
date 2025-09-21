// convex/timeline.ts
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

// Update the order of scenes in a project
export const updateSceneOrder = mutation({
  args: {
    projectId: v.id("projects"),
    sceneOrders: v.array(v.object({
      sceneId: v.id("scenes"),
      order: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    const timestamp = Date.now();
    
    // Update the order of each scene
    for (const { sceneId, order } of args.sceneOrders) {
      await ctx.db.patch(sceneId, {
        order,
        updatedAt: timestamp,
      });
    }
    
    return { success: true };
  },
});

// Get scenes ordered by their position in the timeline
export const getOrderedScenes = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    await checkProjectAccess(ctx, args.projectId);
    
    return await ctx.db
      .query("scenes")
      .withIndex("by_project_and_order", (q) => 
        q.eq("projectId", args.projectId)
      )
      .collect();
  },
});
