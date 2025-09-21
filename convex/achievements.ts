// convex/achievements.ts
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

// Get all achievements for a user
export const getAchievementsByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    if (user._id !== args.userId) {
      throw new Error("You are not authorized to view these achievements.");
    }
    
    return await ctx.db
      .query("achievements")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Track an achievement for a user
export const trackAchievement = mutation({
  args: {
    type: v.string(),
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);
    
    const existingAchievement = await ctx.db
      .query("achievements")
      .withIndex("by_user_and_type", (q) => 
        q.eq("userId", user._id).eq("type", args.type)
      )
      .unique();

    const timestamp = Date.now();

    if (existingAchievement) {
      await ctx.db.patch(existingAchievement._id, {
        count: existingAchievement.count + args.count,
        lastUpdated: timestamp,
      });
      return existingAchievement._id;
    } else {
      return await ctx.db.insert("achievements", {
        userId: user._id,
        type: args.type,
        count: args.count,
        lastUpdated: timestamp,
      });
    }
  },
});
