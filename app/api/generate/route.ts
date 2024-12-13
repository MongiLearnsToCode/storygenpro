import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    // TODO: Replace with your preferred AI service integration
    // This is a placeholder that returns mock data
    const content = `Generated content for prompt: ${prompt}`

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
