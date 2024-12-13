'use client'

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions'

interface StoryElements {
  title: string
  genre: string
  premise: string
  characters: string
  setting: string
  outline: string
}

export async function generateOutline(storyElements: StoryElements): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured')
  }

  const prompt = `Generate a detailed story outline based on the following elements:
Title: ${storyElements.title}
Genre: ${storyElements.genre}
Premise: ${storyElements.premise}
Characters: ${storyElements.characters}
Setting: ${storyElements.setting}

Please provide a structured outline that includes:
1. Opening Scene
2. Key Plot Points
3. Character Arcs
4. Major Conflicts
5. Resolution

Make the outline detailed but concise.`

  try {
    console.log('Sending request to Groq API...')
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{
          role: 'user',
          content: prompt
        }],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }))
      console.error('Groq API error:', error)
      throw new Error(error.error?.message || 'Failed to generate outline')
    }

    const data = await response.json()
    console.log('Groq API response:', data)
    return data.choices[0].message.content
  } catch (error) {
    console.error('Error generating outline:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to generate outline')
  }
}
