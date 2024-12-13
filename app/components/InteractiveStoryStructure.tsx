'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

interface Stage {
  name: string
  description: string
}

interface InteractiveStoryStructureProps {
  stages: Stage[]
}

export default function InteractiveStoryStructure({ stages }: InteractiveStoryStructureProps) {
  const [activeStage, setActiveStage] = useState<number | null>(null)

  return (
    <div className="my-8">
      <h3 className="text-2xl font-semibold mb-4 text-center text-foreground">Interactive Story Structure</h3>
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-2 bg-primary transform -translate-y-1/2"></div>
        <div className="flex justify-between relative z-10">
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onMouseEnter={() => setActiveStage(index)}
              onMouseLeave={() => setActiveStage(null)}
              whileHover={{ scale: 1.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-primary mb-2 flex items-center justify-center text-primary-foreground font-bold"
                animate={{
                  scale: activeStage === index ? 1.2 : 1,
                  backgroundColor: activeStage === index ? "hsl(var(--accent))" : "hsl(var(--primary))"
                }}
              >
                {index + 1}
              </motion.div>
              <p className="text-sm font-medium text-center text-foreground">{stage.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {activeStage !== null && (
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-8 bg-card border-primary">
              <CardContent className="p-4">
                <h4 className="text-xl font-semibold mb-2 text-primary">{stages[activeStage].name}</h4>
                <p className="text-card-foreground">{stages[activeStage].description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

