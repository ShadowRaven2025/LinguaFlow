'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookOpen, Globe, Newspaper, Users, Lightbulb } from 'lucide-react'

const advancedTopics = [
  {
    id: 'politics-society',
    title: 'Politik und Gesellschaft',
    description: 'Diskutieren Sie komplexe politische und gesellschaftliche Themen auf Deutsch',
    difficulty: 'Upper-Intermediate',
    duration: '35 min',
    completed: false,
    icon: Globe
  },
  {
    id: 'media-technology',
    title: 'Medien und Technologie',
    description: 'Sprechen Sie über moderne Medien, Technologie und deren Einfluss auf die Gesellschaft',
    difficulty: 'Upper-Intermediate', 
    duration: '32 min',
    completed: false,
    icon: Newspaper
  },
  {
    id: 'culture-arts',
    title: 'Kultur und Kunst',
    description: 'Analysieren Sie kulturelle Phänomene, Kunst und Literatur im deutschsprachigen Raum',
    difficulty: 'Upper-Intermediate',
    duration: '30 min',
    completed: false,
    icon: Users
  },
  {
    id: 'science-environment',
    title: 'Wissenschaft und Umwelt',
    description: 'Diskutieren Sie wissenschaftliche Entwicklungen und Umweltthemen',
    difficulty: 'Upper-Intermediate',
    duration: '38 min',
    completed: false,
    icon: Lightbulb
  }
]

export default function GermanB2AdvancedTopicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/b2" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Deutsch B2</Badge>
              <span className="text-sm text-muted-foreground">Fortgeschrittene Themen</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              Fortgeschrittene Themen B2
            </h1>
            <p className="text-lg text-muted-foreground">
              Meistern Sie komplexe Themen und führen Sie anspruchsvolle Diskussionen auf Deutsch
            </p>
          </div>

          <div className="grid gap-6">
            {advancedTopics.map((topic) => {
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
                    <Link href={`/lessons/german/b2/advanced-topics/${topic.id}`}>
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