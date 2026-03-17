'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'

const lessons = [
  {
    id: 'alphabet',
    title: 'Alphabet',
    description: 'Немецкий алфавит',
    duration: '20 мин',
    xp: 30,
    progress: 0
  },
  {
    id: 'gruss-gott',
    title: 'Grüß Gott!',
    description: 'Приветствия',
    duration: '25 мин',
    xp: 40,
    progress: 0
  },
  {
    id: 'zahlen-1-10',
    title: 'Zahlen 1-10',
    description: 'Числа от 1 до 10',
    duration: '20 мин',
    xp: 30,
    progress: 0
  }
]

export default function Module1Page() {
  const moduleTitle = 'Basics'
  const moduleDescription = 'Основы немецкого языка'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/livstin" className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white hover:text-blue-300 transition-colors">LinguaFlow</h1>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/livstin">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">1</span>
            </div>
            <div>
              <div className="text-green-400 font-medium">Модуль 1</div>
              <h1 className="text-3xl font-bold text-white mb-2">{moduleTitle}</h1>
              <p className="text-white/80">{moduleDescription}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Прогресс модуля</span>
              <span className="text-2xl font-bold text-white">0%</span>
            </div>
            <Progress value={0} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ~1 час
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                100 XP
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 max-w-3xl mx-auto">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300">
              <CardContent className="p-0">
                <Link href={`/lessons/livstin/module-1/${lesson.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <span className="text-green-400 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                          <p className="text-white/60">{lesson.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/40" />
                    </div>
                    <div className="mt-4 flex gap-4 text-sm text-white/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {lesson.xp} XP
                      </span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
