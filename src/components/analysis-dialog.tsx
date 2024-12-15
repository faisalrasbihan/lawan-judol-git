"use client"

import { useState } from 'react'
import { AlertTriangle, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface AnalysisDialogProps {
  url: string
}

export function AnalysisDialog({ url }: AnalysisDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isReported, setIsReported] = useState(false)
  const [probability] = useState<'High' | 'Medium' | 'Low'>('High');

  const handleReport = () => {
    setIsReported(true)
    // Here you would typically send the report to your backend
    setTimeout(() => {
      setIsOpen(false)
      setIsReported(false)
    }, 3000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-600 whitespace-nowrap">
          Check Website
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isReported ? 'Website Reported' : 'Analysis Results'}
          </DialogTitle>
        </DialogHeader>
        
        {!isReported ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Gambling Related:</div>
                <Badge variant="destructive" className="rounded-md">Yes</Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Probability:</div>
                <Badge 
                  variant={probability === 'High' ? 'destructive' : probability === 'Medium' ? 'warning' : 'success'} 
                  className="rounded-md"
                >
                  {probability}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Country of Origin:</div>
                <Badge variant="secondary" className="rounded-md">AU</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Content Warnings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-700">High-risk gambling content</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Multiple casino game advertisements found on the homepage.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Location: Top banner and sidebar
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-700">Misleading bonus offers</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Welcome bonus with unrealistic wagering requirements detected.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Location: Pop-up modal
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2 items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-yellow-700">Lack of responsible gambling information</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          No visible links to gambling addiction help resources.
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Location: Footer
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Button 
              className="w-full bg-red-500 hover:bg-red-600" 
              size="lg"
              onClick={handleReport}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report this website
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-lg text-center">
              Thank you for your report. We've successfully logged the following information:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Website URL: {url}
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Reported gambling-related content
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Identified high-risk elements
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Logged for further investigation
              </li>
            </ul>
            <p className="text-center text-muted-foreground">
              This dialog will close automatically in a few seconds.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

