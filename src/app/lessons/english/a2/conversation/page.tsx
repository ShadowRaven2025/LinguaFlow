'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, ArrowLeft, Clock, Star, CheckCircle, Coffee, ShoppingCart, Compass } from 'lucide-react'

const conversationTopics = [
  {
    id: 'at-restaurant',
    title: 'At the Restaurant',
    description: 'Фразы для ресторана: ordering food, asking for the bill',
    difficulty: 'Elementary',
    duration: '20 min',
    xp: 50,
    completed: false,
    icon: Coffee,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'shopping-phrases',
    title: 'Shopping Phrases',
    description: 'Фразы для магазина: asking prices, trying on clothes',
    difficulty: 'Elementary',
    duration: '20 min',
    xp: 50,
    completed: false,
    icon: ShoppingCart,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'asking-directions',
    title: 'Asking for Directions',
    description: 'Как спросить дорогу: turn left, go straight',
    difficulty: 'Elementary',
    duration: '20 min',
    xp: 50,
    completed: false,
    icon: Compass,
    color: 'from-teal-500 to-teal-600'
  }
]

export default function A2ConversationPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('linguaflow-a2-progress')
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading progress:', e)
      }
    }
  }, [])

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg"></div>
      <header className="relative z-40 bg-slate-900 border-b border-slate-700 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a2" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/lessons/english/a2">
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A2
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Conversation Skills - Разговорная практика
                </h1>
                <p className="text-muted-foreground">
                  Практикуйте реальные диалоги для повседневных ситуаций
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">A2 - Elementary</Badge>
              <Badge variant="outline">3 урока</Badge>
              <Badge variant="outline">150 XP</Badge>
            </div>
          </div>

          <div className="grid gap-6">
            {conversationTopics.map((topic) => {
              const IconComponent = topic.icon
              const isCompleted = completedLessons.includes(`conv-${topic.id}`)
              return (
                <Card key={topic.id} className="hover:shadow-lg transition-shadow border-border/50 hover:border-primary/30">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${topic.color} rounded-xl flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{topic.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {topic.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {topic.xp} XP
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {topic.difficulty}
                        </Badge>
                      </div>
                      <Link href={`/lessons/english/a2/conversation/${topic.id}`}>
                        <Button className={isCompleted ? 'bg-green-600 hover:bg-green-700' : ''}>
                          <BookOpen className="w-4 h-4 mr-2" />
                          {isCompleted ? 'Повторить' : 'Начать'}
                        </Button>
                      </Link>
                    </div>
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
