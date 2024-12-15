"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnalysisDialog } from "@/components/analysis-dialog"
import { cn } from "@/lib/utils"
import "@/styles/loading-spinner.css"

export function CheckWebsiteForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [analysisData, setAnalysisData] = useState<{
    url: string;
    gcs_image_path: string;
    website_category: string;
    confidence_level: string;
    analysis: string;
  } | undefined>(undefined)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/check-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      const data = await response.json()
      console.log('URL Checking Response:', data)
      
      setAnalysisData(data)
      setShowDialog(true)

    } catch (error) {
      console.error('Error checking URL:', error)
      alert('Error checking URL. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter website URL to check..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 text-black placeholder:text-gray-500"
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className={cn(
            "bg-red-700 text-white hover:bg-red-800",
            isLoading && "loading-spinner"
          )}
        >
          {isLoading ? '' : 'Check Now'}
        </Button>
      </form>

      {showDialog && (
        <AnalysisDialog 
          url={url}
          analysisData={analysisData}
          onClose={() => {
            setShowDialog(false)
            setUrl("")
          }}
        />
      )}
    </>
  )
}

