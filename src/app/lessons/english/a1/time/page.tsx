'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, BookOpen } from 'lucide-react'

const timeTopics = [
  {
    id: 'days-of-week',
    title: 'Days of the Week',
    description: 'Learn all seven days of the week',
    difficulty: 'Beginner',
    duration: '10 min',
    xp: 30,
    completed: false
  },
  {
    id: 'telling-time',
    title: 'Telling Time',
    description: 'Learn how to tell time in English',
    difficulty: 'Beginner',
    duration: '15 min',
    xp: 45,
    completed: false
  },
  {
    id: 'days-months',
    title: 'Days and Months',
    description: 'Days of the week and months of the year',
    difficulty: 'Beginner', 
    duration: '12 min',
    xp: 40,
    completed: false
  }
]

export default function TimePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">English A1</Badge>
              <span className="text-sm text-muted-foreground">Time</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-8 h-8 text-primary" />
              Time
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how to talk about time, days, and dates in English
            </p>
          </div>

          <div className="grid gap-6">
            {timeTopics.map((topic) => (
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
                      <Badge className="bg-yellow-500">{topic.xp} XP</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{topic.description}</p>
                  <Link href={`/lessons/english/a1/time/${topic.id}`}>
                    <Button className="w-full">
                      Start Lesson
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