import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

export function CharacterDevelopment() {
  const [character, setCharacter] = useState({
    name: '',
    role: '',
    background: '',
    personality: '',
    goals: '',
    conflicts: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCharacter({
      ...character,
      [e.target.name]: e.target.value
    })
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
        <Button variant="outline" onClick={() => setCharacter({ name: '', role: '', background: '', personality: '', goals: '', conflicts: '' })}>
          Clear
        </Button>
        <Button>Generate Character Profile</Button>
      </div>
    </div>
  )
}
