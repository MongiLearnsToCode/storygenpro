'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Input } from "../components/ui/input"
import { CharacterDevelopment } from "../components/CharacterDevelopment"
import { generateOutline } from './services/groqService'
import OutputPanel from './components/OutputPanel'

export default function Home() {
  const [storyElements, setStoryElements] = useState({
    title: '',
    genre: '',
    premise: '',
    characters: '',
    setting: '',
    outline: ''
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoryElements({
      ...storyElements,
      [e.target.name]: e.target.value
    })
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError('')
    try {
      const outline = await generateOutline(storyElements)
      setStoryElements(prev => ({ ...prev, outline }))
    } catch (error) {
      console.error('Error generating outline:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate outline')
    }
    setIsGenerating(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-semibold text-xl">Story Gen</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="sidebar-link active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Dashboard
          </a>
          <a href="#" className="sidebar-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Stories
          </a>
          <a href="#" className="sidebar-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Characters
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content pr-[500px]">
        <div className="header">
          <div>
            <h1 className="header-title">Create Story</h1>
            <p className="text-gray-500">Generate your story outline and characters</p>
          </div>
        </div>

        <div className="feature-grid">
          {/* Story Elements Panel */}
          <div className="feature-panel">
            <div className="panel-header">
              <h2 className="panel-title">Story Elements</h2>
              <p className="panel-subtitle">Fill in the details to generate your story</p>
            </div>
            <div className="panel-content">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={storyElements.title}
                    onChange={handleInputChange}
                    placeholder="Enter your story title"
                  />
                </div>
                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    name="genre"
                    value={storyElements.genre}
                    onChange={handleInputChange}
                    placeholder="e.g., Fantasy, Mystery, Romance"
                  />
                </div>
                <div>
                  <Label htmlFor="premise">Premise</Label>
                  <Textarea
                    id="premise"
                    name="premise"
                    value={storyElements.premise}
                    onChange={handleInputChange}
                    placeholder="What is your story about?"
                  />
                </div>
                <div>
                  <Label htmlFor="characters">Main Characters</Label>
                  <Textarea
                    id="characters"
                    name="characters"
                    value={storyElements.characters}
                    onChange={handleInputChange}
                    placeholder="Describe your main characters"
                  />
                </div>
                <div>
                  <Label htmlFor="setting">Setting</Label>
                  <Textarea
                    id="setting"
                    name="setting"
                    value={storyElements.setting}
                    onChange={handleInputChange}
                    placeholder="Describe the world of your story"
                  />
                </div>
              </div>
            </div>
            <div className="panel-footer">
              <Button variant="outline" onClick={() => setStoryElements({ title: '', genre: '', premise: '', characters: '', setting: '', outline: '' })}>
                Clear
              </Button>
              <Button onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? 'Generating...' : 'Generate Outline'}
              </Button>
            </div>
          </div>

          {/* Character Development Panel */}
          <CharacterDevelopment />
        </div>
      </main>

      {/* Universal Output Panel */}
      <OutputPanel 
        content={storyElements.outline}
        isLoading={isGenerating}
        error={error}
        featureType="Story Content"
        title="Generated Content"
        subtitle="Preview your generated story content"
        version={`version_1_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}_${new Date().toTimeString().split(' ')[0].replace(/:/g, '_')}`}
        onClear={() => setStoryElements(prev => ({ ...prev, outline: '' }))}
      />
    </div>
  )
}
