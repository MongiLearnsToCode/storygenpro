import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { generateCharacterContent } from '../services/groqService'

interface CharacterProfile {
  name: string;
  role: string;
  background: string;
  personality: string;
  goals: string;
  conflicts: string;
}

export function CharacterDevelopment() {
  const [character, setCharacter] = useState<CharacterProfile>({
    name: '',
    role: '',
    background: '',
    personality: '',
    goals: '',
    conflicts: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGeneratePersonality = async () => {
    if (!character.name || !character.role) {
      alert('Please enter character name and role first')
      return
    }

    try {
      setIsGenerating(true)
      const prompt = `Generate a detailed personality description for a character named ${character.name} who plays the role of ${character.role}.
      Include their key traits, behaviors, and how they typically react in different situations.
      Format the response in clear sections with descriptive paragraphs.`
      
      const personalityText = await generateCharacterContent(prompt)
      setCharacter(prev => ({ ...prev, personality: personalityText }))
    } catch (error) {
      console.error('Failed to generate personality:', error)
      alert('Failed to generate personality. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="feature-panel">
      <div className="panel-header">
        <h2 className="panel-title">Character Development</h2>
        <p className="panel-subtitle">Create detailed character profiles</p>
      </div>
      <div className="panel-content">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Character Name</Label>
            <Input
              id="name"
              name="name"
              value={character.name}
              onChange={handleInputChange}
              placeholder="Enter character name"
            />
          </div>
          <div>
            <Label htmlFor="role">Role in Story</Label>
            <Input
              id="role"
              name="role"
              value={character.role}
              onChange={handleInputChange}
              placeholder="e.g., Protagonist, Antagonist, Supporting"
            />
          </div>
          <div>
            <Label htmlFor="background">Background</Label>
            <Textarea
              id="background"
              name="background"
              value={character.background}
              onChange={handleInputChange}
              placeholder="Character's history and origins"
            />
          </div>
          <div>
            <Label htmlFor="personality">Personality</Label>
            <Textarea
              id="personality"
              name="personality"
              value={character.personality}
              onChange={handleInputChange}
              placeholder="Character traits and behaviors"
            />
            <Button onClick={handleGeneratePersonality} disabled={isGenerating}>
              {isGenerating ? 'Generating...' : 'Generate Personality'}
            </Button>
          </div>
          <div>
            <Label htmlFor="goals">Goals & Motivations</Label>
            <Textarea
              id="goals"
              name="goals"
              value={character.goals}
              onChange={handleInputChange}
              placeholder="What drives this character?"
            />
          </div>
          <div>
            <Label htmlFor="conflicts">Conflicts & Challenges</Label>
            <Textarea
              id="conflicts"
              name="conflicts"
              value={character.conflicts}
              onChange={handleInputChange}
              placeholder="Internal and external struggles"
            />
          </div>
        </div>
      </div>
      <div className="panel-footer">
        <Button 
          variant="outline" 
          onClick={() => setCharacter({ 
            name: '', 
            role: '', 
            background: '', 
            personality: '', 
            goals: '', 
            conflicts: '' 
          })}
          disabled={isGenerating}
        >
          Clear
        </Button>
      </div>
    </div>
  )
}
