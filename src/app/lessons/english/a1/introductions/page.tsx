'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, ArrowLeft } from 'lucide-react'

const introductionsTopics = [
  {
    id: 'my-name-is',
    title: 'My Name Is...',
    description: 'Learn how to introduce yourself in English',
    difficulty: 'Beginner',
    duration: '15 min',
    xp: 40,
    completed: false
  }
]

export default function IntroductionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">English A1</Badge>
              <Link href="/lessons/english/a1">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A1
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-8 h-8 text-pink-600" />
              Introductions
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn how to introduce yourself and meet new people in English
            </p>
          </div>

          <div className="grid gap-6">
            {introductionsTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-pink-600" />
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
                  <Link href={`/lessons/english/a1/introductions/${topic.id}`}>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
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
