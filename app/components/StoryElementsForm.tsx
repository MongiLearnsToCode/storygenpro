'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import OutputPanel from './OutputPanel'
import { generateStoryOutline } from '../services/storyService'

export interface StoryElements {
  protagonist: string
  setting: string
  genre: string
  theme: string
  freeWriting: string
}

export interface StoryElementsFormProps {
  onSubmit?: (elements: StoryElements) => Promise<void>;
}

export default function StoryElementsForm({ onSubmit }: StoryElementsFormProps) {
  const [elements, setElements] = useState<StoryElements>({
    protagonist: '',
    setting: '',
    genre: '',
    theme: '',
    freeWriting: '',
  })
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      if (onSubmit) {
        await onSubmit(elements)
      } else {
        const generatedOutline = await generateStoryOutline(elements)
        setOutput(generatedOutline)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate outline')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setElements(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div className="feature-panel w-2/3">
        <div className="panel-header">
          <h2 className="panel-title">Story Elements</h2>
          <p className="panel-subtitle">Fill in the details to generate your story</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="panel-content">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="protagonist" className="text-card-foreground">Protagonist</Label>
                <Input
                  id="protagonist"
                  name="protagonist"
                  value={elements.protagonist}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Describe your main character"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="setting" className="text-card-foreground">Setting</Label>
                <Input
                  id="setting"
                  name="setting"
                  value={elements.setting}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Where does your story take place?"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="genre" className="text-card-foreground">Genre</Label>
                <Input
                  id="genre"
                  name="genre"
                  value={elements.genre}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="e.g., Fantasy, Mystery, Romance"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="theme" className="text-card-foreground">Theme</Label>
                <Input
                  id="theme"
                  name="theme"
                  value={elements.theme}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="What's the central theme or message?"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="freeWriting" className="text-card-foreground">Additional Context</Label>
                <Textarea
                  id="freeWriting"
                  name="freeWriting"
                  value={elements.freeWriting}
                  onChange={handleChange}
                  className="mt-1 h-32"
                  placeholder="Any additional details or context for your story..."
                />
              </motion.div>
            </div>
          </div>
          <div className="panel-footer">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Outline'}
            </Button>
          </div>
        </form>
      </div>
      <OutputPanel 
        content={output}
        isLoading={isLoading}
        error={error}
        featureType="Story Outline"
        title="Generated Content"
        subtitle="Preview your generated story elements"
        version={`version_1_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}_${new Date().toTimeString().split(' ')[0].replace(/:/g, '_')}`}
      />
    </>
  )
}
