import { useState } from 'react'
import StoryElementsForm, { StoryElements } from './StoryElementsForm'
import { generateOutline } from '../services/groqService'
import { Button } from "@/components/ui/button"

export default function HarmonStructure() {
  const [outline, setOutline] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (elements: StoryElements) => {
    setIsLoading(true)
    setError(null)
    try {
      const prompt = `Generate a detailed story outline using Dan Harmon's Story Circle for a story with the following elements:
      Protagonist: ${elements.protagonist}
      Setting: ${elements.setting}
      Genre: ${elements.genre}
      Theme: ${elements.theme}

      The outline should strictly follow these stages:
      1. You (A character is in a zone of comfort)
      2. Need (But they want something)
      3. Go (They enter an unfamiliar situation)
      4. Search (Adapt to it)
      5. Find (Find what they wanted)
      6. Take (Pay its price)
      7. Return (And go back to where they started)
      8. Change (Now capable of change)

      For each stage, provide specific plot points, character development suggestions, and clear transitions. Ensure the outline maintains internal consistency and adheres to the chosen genre and theme.`

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
    <div className="space-y-8">
      <div className="bg-muted p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Dan Harmon's Story Circle</h2>
        <p>This structure is a simplified version of Joseph Campbell's monomyth, consisting of eight stages that form a circle. It emphasizes the character's journey and transformation.</p>
      </div>
      <StoryElementsForm onSubmit={handleSubmit} />
      {isLoading && <p>Generating outline...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {outline && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Generated Outline:</h3>
          <pre className="bg-muted p-4 rounded-lg whitespace-pre-wrap">{outline}</pre>
          <Button onClick={handleSave}>Save Outline</Button>
        </div>
      )}
    </div>
  )
}

