'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Shirt, BookOpen } from 'lucide-react'

const clothesTopics = [
  {
    id: 'basic-clothes',
    title: 'Kleidung - Одежда',
    description: 'Основные предметы одежды',
    difficulty: 'Beginner',
    duration: '15 min',
    completed: false
  }
]

export default function ClothesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/a1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold text-white">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">German A1</Badge>
              <span className="text-sm text-white/60">Kleidung</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-white">
              <Shirt className="w-8 h-8 text-purple-400" />
              Kleidung - Одежда
            </h1>
            <p className="text-lg text-white/80">
              Изучаем названия одежды на немецком языке
            </p>
          </div>

          <div className="grid gap-6">
            {clothesTopics.map((topic) => (
              <Card key={topic.id} className="bg-slate-800/30 border-slate-700/50 hover:border-purple-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      {topic.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-white/20 text-white">{topic.difficulty}</Badge>
                      <Badge variant="secondary">{topic.duration}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">{topic.description}</p>
                  <Link href={`/lessons/german/a1/clothes/${topic.id}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Урок
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
