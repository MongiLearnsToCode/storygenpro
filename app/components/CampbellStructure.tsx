import { useState } from 'react'
import StoryElementsForm, { StoryElements } from './StoryElementsForm'
import { generateOutline } from '../services/groqService'
import { Button } from "../../components/ui/button"

export default function CampbellStructure() {
  const [outline, setOutline] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (elements: StoryElements) => {
    setIsLoading(true)
    setError(null)
    try {
      const storyElementsFormatted = {
        title: `${elements.protagonist}'s Journey`,
        genre: elements.genre,
        premise: elements.theme,
        characters: elements.protagonist,
        setting: elements.setting,
        outline: elements.freeWriting || ''
      }

      const generatedOutline = await generateOutline(storyElementsFormatted)
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
        <h2 className="text-xl font-semibold mb-2">Joseph Campbell's The Hero's Journey</h2>
        <p>This structure, also known as the monomyth, is a template for stories that involve a hero who goes on an adventure, faces a decisive crisis, wins a victory, and then returns home transformed.</p>
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
