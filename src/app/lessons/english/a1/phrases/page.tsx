'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, BookOpen, ArrowLeft } from 'lucide-react'

const phrasesTopics = [
  {
    id: 'simple-phrases',
    title: 'Simple Phrases',
    description: 'Learn polite and useful everyday phrases',
    difficulty: 'Beginner',
    duration: '12 min',
    xp: 35,
    completed: false
  }
]

export default function PhrasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center">
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
              <MessageCircle className="w-8 h-8 text-teal-600" />
              Common Phrases
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn essential phrases for everyday communication in English
            </p>
          </div>

          <div className="grid gap-6">
            {phrasesTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-teal-600" />
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
                  <Link href={`/lessons/english/a1/phrases/${topic.id}`}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
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
