'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, BookOpen } from 'lucide-react'

const familyTopics = [
  {
    id: 'family-members',
    title: 'Familienmitglieder',
    description: 'Lernen Sie die Namen der Familienmitglieder auf Deutsch',
    difficulty: 'Beginner',
    duration: '15 min',
    completed: false
  },
  {
    id: 'family-relationships',
    title: 'Familienbeziehungen',
    description: 'Verstehen Sie verschiedene Familienbeziehungen und Verwandtschaftsgrade',
    difficulty: 'Beginner', 
    duration: '18 min',
    completed: false
  },
  {
    id: 'describing-family',
    title: 'Familie beschreiben',
    description: 'Lernen Sie, Ihre Familie zu beschreiben und über sie zu sprechen',
    difficulty: 'Beginner',
    duration: '20 min',
    completed: false
  }
]

export default function GermanFamilyPage() {
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
              <span className="text-sm text-muted-foreground">Familie</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-8 h-8 text-primary" />
              Familie (Family)
            </h1>
            <p className="text-lg text-muted-foreground">
              Lernen Sie, über Ihre Familie auf Deutsch zu sprechen
            </p>
          </div>

          <div className="grid gap-6">
            {familyTopics.map((topic) => (
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
                  <Link href={`/lessons/german/a1/family/${topic.id}`}>
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