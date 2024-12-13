'use client'

const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY
const GROQ_API_URL = process.env.NEXT_PUBLIC_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions'

interface CharacterProfile {
  name: string
  role: string
  background: string
  personality: string
  goals: string
  conflicts: string
}

export async function generateCharacterContent(character: Partial<CharacterProfile>): Promise<CharacterProfile> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured')
  }

  const prompt = `Generate a detailed character profile for:
Name: ${character.name}
Role: ${character.role}

Please provide a detailed character profile that includes:
1. Background: The character's history and origins
2. Personality: Key traits and behaviors
3. Goals: Primary motivations and desires
4. Conflicts: Internal and external challenges

Format the response as a detailed description for each section.`

  try {
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
        max_tokens: 1000,
        temperature: 0.8,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }))
      throw new Error(error.error?.message || 'Failed to generate character content')
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the content into sections
    const sections = content.split('\n\n')
    const profile: CharacterProfile = {
      name: character.name || '',
      role: character.role || '',
      background: sections[0] || '',
      personality: sections[1] || '',
      goals: sections[2] || '',
      conflicts: sections[3] || ''
    }

    return profile
  } catch (error) {
    console.error('Error generating character content:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to generate character content')
  }
}
