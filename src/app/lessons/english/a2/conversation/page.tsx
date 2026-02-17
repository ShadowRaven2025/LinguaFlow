'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageCircle, Coffee, ShoppingCart, Phone, Users } from 'lucide-react'

const conversationTopics = [
  {
    id: 'restaurant-ordering',
    title: 'Restaurant and Ordering',
    description: 'Learn how to order food and drinks in restaurants and cafes',
    difficulty: 'Elementary',
    duration: '20 min',
    completed: false,
    icon: Coffee
  },
  {
    id: 'shopping-dialogue',
    title: 'Shopping Conversations',
    description: 'Practice conversations in shops, asking for prices and sizes',
    difficulty: 'Elementary', 
    duration: '18 min',
    completed: false,
    icon: ShoppingCart
  },
  {
    id: 'phone-calls',
    title: 'Phone Conversations',
    description: 'Learn how to make and receive phone calls in English',
    difficulty: 'Elementary',
    duration: '22 min',
    completed: false,
    icon: Phone
  },
  {
    id: 'social-situations',
    title: 'Social Situations',
    description: 'Practice small talk and conversations in social settings',
    difficulty: 'Elementary',
    duration: '25 min',
    completed: false,
    icon: Users
  }
]

export default function A2ConversationPage() {
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
              <span className="text-sm text-muted-foreground">Conversation</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <MessageCircle className="w-8 h-8 text-primary" />
              Conversation Skills
            </h1>
            <p className="text-lg text-muted-foreground">
              Practice real-life conversations for everyday situations
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
                    <Link href={`/lessons/english/a2/conversation/${topic.id}`}>
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