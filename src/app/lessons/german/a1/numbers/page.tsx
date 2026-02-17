'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Hash, BookOpen } from 'lucide-react'

const numberTopics = [
  {
    id: 'numbers-1-10',
    title: 'Numbers 1-10',
    description: 'Learn the first ten numbers in German',
    difficulty: 'Beginner',
    duration: '10 min',
    completed: false
  },
  {
    id: 'numbers-11-20',
    title: 'Numbers 11-20',
    description: 'Continue with numbers eleven to twenty',
    difficulty: 'Beginner', 
    duration: '12 min',
    completed: false
  },
  {
    id: 'numbers-21-100',
    title: 'Numbers 21-100',
    description: 'Learn larger numbers and counting patterns',
    difficulty: 'Beginner',
    duration: '15 min',
    completed: false
  }
]

export default function GermanNumbersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/a1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Deutsch A1</Badge>
              <span className="text-sm text-muted-foreground">Zahlen</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Hash className="w-8 h-8 text-primary" />
              Zahlen (Numbers)
            </h1>
            <p className="text-lg text-muted-foreground">
              Lernen Sie die deutschen Zahlen von 1 bis 100
            </p>
          </div>

          <div className="grid gap-6">
            {numberTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
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
                  <Link href={`/lessons/german/a1/numbers/${topic.id}`}>
                    <Button className="w-full">
                      Lektion beginnen
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}