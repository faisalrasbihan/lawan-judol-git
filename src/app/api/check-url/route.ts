import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url } = await request.json()
    
    const response = await fetch('https://ai4impact-app-667120416082.us-central1.run.app/checking/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
    
    const result = await response.json()
    return NextResponse.json(result)
  } catch {
    return new Response('Error processing request', { status: 500 })
  }
} 