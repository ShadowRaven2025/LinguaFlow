'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, Coffee, Briefcase, Plane, Home } from 'lucide-react'

const conversationTopics = [
  {
    id: 'daily-conversations',
    title: 'Alltägliche Gespräche',
    description: 'Führen Sie natürliche Gespräche über alltägliche Themen und Situationen',
    difficulty: 'Intermediate',
    duration: '25 min',
    completed: false,
    icon: Coffee
  },
  {
    id: 'work-discussions',
    title: 'Berufsgespräche',
    description: 'Diskutieren Sie über Arbeit, Karriere und berufliche Themen',
    difficulty: 'Intermediate', 
    duration: '30 min',
    completed: false,
    icon: Briefcase
  },
  {
    id: 'travel-situations',
    title: 'Reisesituationen',
    description: 'Meistern Sie Gespräche in Hotels, Restaurants und auf Reisen',
    difficulty: 'Intermediate',
    duration: '28 min',
    completed: false,
    icon: Plane
  },
  {
    id: 'social-topics',
    title: 'Gesellschaftliche Themen',
    description: 'Diskutieren Sie über aktuelle Ereignisse und gesellschaftliche Fragen',
    difficulty: 'Intermediate',
    duration: '32 min',
    completed: false,
    icon: Home
  }
]

export default function GermanB1ConversationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/b1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Deutsch B1</Badge>
              <span className="text-sm text-muted-foreground">Konversation</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-primary" />
              Konversation B1
            </h1>
            <p className="text-lg text-muted-foreground">
              Verbessern Sie Ihre Gesprächsfähigkeiten für verschiedene Lebenssituationen
            </p>
          </div>

          <div className="grid gap-6">
            {conversationTopics.map((topic) => {
              const IconComponent = topic.icon
              return (
                <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        {topic.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{topic.difficulty}</Badge>
                        <Badge variant="secondary">{topic.duration}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{topic.description}</p>
                    <Link href={`/lessons/german/b1/conversation/${topic.id}`}>
                      <Button className="w-full">
                        Lektion beginnen
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}