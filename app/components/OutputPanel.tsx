'use client'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface OutputPanelProps {
  title?: string
  subtitle?: string
  content: string
  isLoading?: boolean
  error?: string
  onClear?: () => void
  featureType?: string
  version?: string
}

export default function OutputPanel({ 
  title = "Generated Content",
  subtitle = "Preview your generated content",
  content, 
  isLoading, 
  error,
  onClear,
  featureType = "Default",
  version = `version_1_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}_${new Date().toTimeString().split(' ')[0].replace(/:/g, '_')}`
}: OutputPanelProps) {
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${featureType.toLowerCase()}-output-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div 
      className="fixed right-0 top-0 h-screen w-[500px] bg-card border-l border-border shadow-lg z-50"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <Card className="h-full border-none rounded-none">
        <CardHeader className="pb-4">
          <CardTitle>{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[calc(100vh-200px)] overflow-y-auto space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-destructive p-4 bg-destructive/10 rounded-md">
                {error}
              </div>
            ) : content ? (
              <div className="space-y-4">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{featureType}</h3>
                      <span className="text-xs text-muted-foreground">{version}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {content.split('\n').map((line, i) => (
                        <p key={i} className="mb-4">{line}</p>
                      ))}
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(content)}
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-muted-foreground text-center mt-8">
                Fill in the required fields and generate to see the output
              </div>
            )}
          </div>
          {content && (
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background/80 backdrop-blur-sm">
              <Button 
                variant="destructive"
                className="w-full"
                onClick={onClear}
              >
                Clear Output
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
