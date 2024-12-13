'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generateCharacterContent } from "../app/services/characterService"

interface Character {
  name: string;
  personality: string;
  backstory: string;
  arc: string;
  relationships: { name: string; relationship: string }[];
}

export function CharacterDevelopment() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [currentCharacter, setCurrentCharacter] = useState<Character>({
    name: '',
    personality: '',
    backstory: '',
    arc: '',
    relationships: []
  })
  const [genre, setGenre] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePersonality = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Generate a detailed personality profile for a character named ${currentCharacter.name} 
      in a ${genre} story. Include:
      1. Core personality traits
      2. Strengths and weaknesses
      3. Habits and mannerisms
      4. Emotional tendencies
      5. Unique quirks
      
      Format the response in clear sections with descriptive paragraphs.`
      
      const personality = await generateCharacterContent(prompt)
      setCurrentCharacter(prev => ({ ...prev, personality }))
    } catch (error) {
      console.error('Failed to generate personality:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateBackstory = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Create a compelling backstory for ${currentCharacter.name}, a character in a ${genre} story. 
      Consider their personality: ${currentCharacter.personality}
      
      Include:
      1. Early life and upbringing
      2. Key life events that shaped them
      3. Family dynamics and relationships
      4. Pivotal moments that led to their current situation
      5. Unresolved conflicts or personal demons
      
      Format the response as a narrative that flows naturally between these elements.`
      
      const backstory = await generateCharacterContent(prompt)
      setCurrentCharacter(prev => ({ ...prev, backstory }))
    } catch (error) {
      console.error('Failed to generate backstory:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateArc = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Design a character arc for ${currentCharacter.name} in a ${genre} story.
      Personality: ${currentCharacter.personality}
      Backstory: ${currentCharacter.backstory}
      
      Include:
      1. Starting point - their initial state and beliefs
      2. Challenges and conflicts they'll face
      3. Key moments of growth or change
      4. Internal and external obstacles
      5. Final transformation or resolution
      
      Format the response as a clear progression from beginning to end, highlighting the character's journey and development.`
      
      const arc = await generateCharacterContent(prompt)
      setCurrentCharacter(prev => ({ ...prev, arc }))
    } catch (error) {
      console.error('Failed to generate arc:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const addRelationship = () => {
    setCurrentCharacter(prev => ({
      ...prev,
      relationships: [...prev.relationships, { name: '', relationship: '' }]
    }))
  }

  const updateRelationship = (index: number, field: 'name' | 'relationship', value: string) => {
    setCurrentCharacter(prev => {
      const newRelationships = [...prev.relationships]
      newRelationships[index] = { ...newRelationships[index], [field]: value }
      return { ...prev, relationships: newRelationships }
    })
  }

  const saveCharacter = () => {
    setCharacters(prev => [...prev, currentCharacter])
    setCurrentCharacter({
      name: '',
      personality: '',
      backstory: '',
      arc: '',
      relationships: []
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Character Development</CardTitle>
        <CardDescription>Create and develop your story characters</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create">
          <TabsList>
            <TabsTrigger value="create">Create Character</TabsTrigger>
            <TabsTrigger value="view">View Characters</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <div className="space-y-4">
              <div className="grid w-full gap-2">
                <Label>Genre</Label>
                <Input
                  placeholder="Enter story genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>

              <div className="grid w-full gap-2">
                <Label>Character Name</Label>
                <Input
                  placeholder="Enter character name"
                  value={currentCharacter.name}
                  onChange={(e) => setCurrentCharacter(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="grid w-full gap-2">
                <Label>Personality</Label>
                <Textarea
                  placeholder="Character personality will be generated here"
                  value={currentCharacter.personality}
                  onChange={(e) => setCurrentCharacter(prev => ({ ...prev, personality: e.target.value }))}
                />
                <Button onClick={generatePersonality} disabled={isGenerating}>
                  Generate Personality
                </Button>
              </div>

              <div className="grid w-full gap-2">
                <Label>Backstory</Label>
                <Textarea
                  placeholder="Character backstory will be generated here"
                  value={currentCharacter.backstory}
                  onChange={(e) => setCurrentCharacter(prev => ({ ...prev, backstory: e.target.value }))}
                />
                <Button onClick={generateBackstory} disabled={isGenerating}>
                  Generate Backstory
                </Button>
              </div>

              <div className="grid w-full gap-2">
                <Label>Character Arc</Label>
                <Textarea
                  placeholder="Character arc will be generated here"
                  value={currentCharacter.arc}
                  onChange={(e) => setCurrentCharacter(prev => ({ ...prev, arc: e.target.value }))}
                />
                <Button onClick={generateArc} disabled={isGenerating}>
                  Generate Character Arc
                </Button>
              </div>

              <div className="grid w-full gap-2">
                <Label>Relationships</Label>
                {currentCharacter.relationships.map((rel, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Character name"
                      value={rel.name}
                      onChange={(e) => updateRelationship(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Relationship"
                      value={rel.relationship}
                      onChange={(e) => updateRelationship(index, 'relationship', e.target.value)}
                    />
                  </div>
                ))}
                <Button variant="outline" onClick={addRelationship}>
                  Add Relationship
                </Button>
              </div>

              <Button onClick={saveCharacter}>Save Character</Button>
            </div>
          </TabsContent>

          <TabsContent value="view">
            <div className="space-y-4">
              {characters.map((char, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{char.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label>Personality</Label>
                        <p className="mt-1">{char.personality}</p>
                      </div>
                      <div>
                        <Label>Backstory</Label>
                        <p className="mt-1">{char.backstory}</p>
                      </div>
                      <div>
                        <Label>Character Arc</Label>
                        <p className="mt-1">{char.arc}</p>
                      </div>
                      <div>
                        <Label>Relationships</Label>
                        {char.relationships.map((rel, idx) => (
                          <p key={idx} className="mt-1">
                            {rel.name}: {rel.relationship}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
