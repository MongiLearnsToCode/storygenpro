'use client'

import { StoryElements } from '../components/StoryElementsForm'

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions'

export async function generateStoryOutline(elements: StoryElements): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured')
  }

  const prompt = `Create a detailed story outline based on the following elements:
  
Protagonist: ${elements.protagonist}
Setting: ${elements.setting}
Genre: ${elements.genre}
Theme: ${elements.theme}

Additional Context: ${elements.freeWriting}

Please provide a structured outline including:
1. Story Setup
2. Key Plot Points
3. Character Development Arc
4. Major Story Beats
5. Potential Climax
6. Resolution Ideas

Make it engaging and coherent with the genre and theme.`

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }))
      throw new Error(error.error?.message || 'Failed to generate story outline')
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error generating story outline:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to generate story outline')
  }
}
