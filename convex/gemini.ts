// convex/gemini.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Define the scene type for analysis
interface Scene {
  id: string;
  title: string;
  description: string;
  order: number;
  tags: string[];
}

// Mock function to simulate Gemini API analysis
// In a real implementation, this would connect to the actual Gemini API
export const analyzeStory = mutation({
  args: {
    scenes: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
        order: v.number(),
        tags: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    // In a real implementation, we would:
    // 1. Format the scenes into a prompt for Gemini
    // 2. Call the Gemini API with the prompt
    // 3. Parse the response and extract suggestions
    // 4. Return the formatted analysis
    
    // For now, we'll simulate the analysis with a delay and mock response
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis result that returns issues as questions
    const mockAnalysis = [
      {
        type: "pacing",
        message: "How might you add more conflict in Act II to increase tension?",
        severity: "medium"
      },
      {
        type: "pacing",
        message: "Could the pacing between scenes 3 and 4 be improved?",
        severity: "low"
      },
      {
        type: "character",
        message: "Are there opportunities to deepen character development in scene 2?",
        severity: "high"
      },
      {
        type: "resolution",
        message: "How might you strengthen the resolution in the final scene?",
        severity: "medium"
      }
    ];
    
    // Add some scene-specific questions
    if (args.scenes.length > 0) {
      mockAnalysis.push({
        type: "structure",
        message: `How might you group your ${args.scenes.length} scenes into acts for better structure?`,
        severity: "low"
      });
    }
    
    // Check for character tags
    const characterScenes = args.scenes.filter(scene => 
      scene.tags.includes("character") || scene.tags.includes("development")
    );
    
    if (characterScenes.length > 0) {
      mockAnalysis.push({
        type: "character",
        message: `How might you build on the character development in your ${characterScenes.length} character-focused scenes?`,
        severity: "low"
      });
    }
    
    return {
      suggestions: mockAnalysis,
      timestamp: Date.now()
    };
  },
});

// Function to get analysis history for a user
export const getAnalysisHistory = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // In a real implementation, we would fetch analysis history from the database
    // For now, we'll return an empty array
    return [];
  },
});

// Function to save analysis results
export const saveAnalysis = mutation({
  args: {
    userId: v.string(),
    scenes: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        description: v.string(),
        order: v.number(),
        tags: v.array(v.string()),
      })
    ),
    suggestions: v.array(
      v.object({
        type: v.string(),
        message: v.string(),
        severity: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // In a real implementation, we would save the analysis to the database
    // For now, we'll just return a success message
    return {
      success: true,
      id: "mock-analysis-id",
      timestamp: Date.now()
    };
  },
});