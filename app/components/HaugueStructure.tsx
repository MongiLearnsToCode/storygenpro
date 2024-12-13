'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import StoryElementsForm, { StoryElements } from './StoryElementsForm'
import { generateOutline } from '../services/groqService'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import InteractiveStoryStructure from './InteractiveStoryStructure'
import CharacterDevelopment from './CharacterDevelopment'

const haugueStages = [
  { name: "Setup", description: "Introduce the main character in their everyday life, establishing their identity, lifestyle, and core beliefs." },
  { name: "New Situation", description: "Present an opportunity or event that disrupts the character's normal life and sets the story in motion." },
  { name: "Progress", description: "The character adapts to the new situation, making initial progress towards their goal or in dealing with the new challenge." },
  { name: "Complications", description: "Introduce obstacles and conflicts that make the character's journey more difficult, raising the stakes." },
  { name: "Final Push", description: "The character makes a last, focused effort to achieve their goal, often facing their greatest fear or challenge." },
  { name: "Aftermath", description: "Show the results of the character's journey, how they've changed, and the new equilibrium of their world." }
]

export default function HaugueStructure() {
  const [outline, setOutline] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (elements: StoryElements) => {
    setIsLoading(true)
    setError(null)
    try {
      const prompt = `Generate a detailed story outline using Michael Hauge's Six-Stage Plot Structure for a story with the following elements:
      Protagonist: ${elements.protagonist}
      Setting: ${elements.setting}
      Genre: ${elements.genre}
      Theme: ${elements.theme}

      Additional context from the author:
      ${elements.freeWriting}

      The outline should strictly follow these stages:
      1. Setup
      2. New Situation
      3. Progress
      4. Complications and Higher Stakes
      5. Final Push
      6. Aftermath

      For each stage, provide specific plot points, character development suggestions, and clear transitions. Ensure the outline maintains internal consistency and adheres to the chosen genre and theme. Incorporate elements from the author's free writing where appropriate.`

      const generatedOutline = await generateOutline(prompt)
      setOutline(generatedOutline)
    } catch (err) {
      setError('Failed to generate outline. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = () => {
    if (outline) {
      const blob = new Blob([outline], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'story_outline.txt'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="bg-card border-primary">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Michael Hauge's Six-Stage Plot Structure</h2>
          <p className="text-card-foreground">This structure divides a story into six key stages: Setup, New Situation, Progress, Complications and Higher Stakes, Final Push, and Aftermath. It focuses on the protagonist's journey from their everyday life to achieving their goal.</p>
        </CardContent>
      </Card>

      <InteractiveStoryStructure stages={haugueStages} />

      <CharacterDevelopment />

      <StoryElementsForm onSubmit={handleSubmit} />
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg text-card-foreground">Generating outline...</span>
        </div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-destructive text-destructive-foreground p-4 rounded-md"
        >
          {error}
        </motion.div>
      )}
      {outline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Card className="bg-card border-primary">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Generated Outline</h3>
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-card-foreground border border-primary">{outline}</div>
            </CardContent>
          </Card>
          <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground hover:bg-accent">Save Outline</Button>
        </motion.div>
      )}
    </motion.div>
  )
}

