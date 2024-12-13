import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Story Forge - AI-Powered Story Outline Generator',
  description: 'Craft your narrative masterpiece with our AI-powered story outline generator. Choose from popular story structures and create compelling outlines in minutes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

