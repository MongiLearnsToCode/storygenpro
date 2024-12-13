'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

interface StoryStructureSelectorProps {
  onSelect: (structure: string) => void
}

export default function StoryStructureSelector({ onSelect }: StoryStructureSelectorProps) {
  const structures = [
    { id: 'hauge', name: "Michael Hauge's Six-Stage Plot Structure", description: "A journey from setup to resolution in six distinct stages." },
    { id: 'harmon', name: "Dan Harmon's Story Circle", description: "An eight-step cycle of character growth and change." },
    { id: 'campbell', name: "Joseph Campbell's The Hero's Journey", description: "A classic 12-stage adventure from ordinary world to return." },
  ]

  return (
    <div className="space-y-8 mb-12">
      <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Choose Your Story Structure</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {structures.map((structure, index) => (
          <motion.div
            key={structure.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card 
              className="h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg bg-card border-primary"
              onClick={() => onSelect(structure.id)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{structure.name}</h3>
                <p className="text-muted-foreground flex-grow">{structure.description}</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-accent transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Select
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

