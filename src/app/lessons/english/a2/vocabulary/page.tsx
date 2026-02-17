'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Home, Briefcase, Plane } from 'lucide-react'

const vocabularyTopics = [
  {
    id: 'house-home',
    title: 'House and Home',
    description: 'Vocabulary related to rooms, furniture, and household items',
    difficulty: 'Elementary',
    duration: '20 min',
    completed: false,
    icon: Home
  },
  {
    id: 'work-jobs',
    title: 'Work and Jobs',
    description: 'Learn about different professions and workplace vocabulary',
    difficulty: 'Elementary', 
    duration: '18 min',
    completed: false,
    icon: Briefcase
  },
  {
    id: 'travel-transport',
    title: 'Travel and Transport',
    description: 'Transportation methods and travel-related vocabulary',
    difficulty: 'Elementary',
    duration: '22 min',
    completed: false,
    icon: Plane
  }
]

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a2" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">English A2</Badge>
              <span className="text-sm text-muted-foreground">Vocabulary</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              Vocabulary
            </h1>
            <p className="text-lg text-muted-foreground">
              Expand your English vocabulary with essential words for everyday situations
            </p>
          </div>

          <div className="grid gap-6">
            {vocabularyTopics.map((topic) => {
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
                    <Link href={`/lessons/english/a2/vocabulary/${topic.id}`}>
                      <Button className="w-full">
                        Start Lesson
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