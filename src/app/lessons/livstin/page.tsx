'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'

const modules = [
  {
    id: 1,
    title: 'Basics',
    description: 'Основы немецкого языка',
    lessons: ['Alphabet', 'Grüß Gott!', 'Zahlen 1-10'],
    color: 'from-green-500 to-emerald-500',
    progress: 0
  },
  {
    id: 2,
    title: 'Im Alltag',
    description: 'Повседневная жизнь',
    lessons: ['Einkaufen', 'Im Restaurant', 'Uhrzeit'],
    color: 'from-blue-500 to-cyan-500',
    progress: 0
  },
  {
    id: 3,
    title: 'Menschen',
    description: 'Люди и семья',
    lessons: ['Familie', 'Berufe', 'Aussehen'],
    color: 'from-purple-500 to-pink-500',
    progress: 0
  },
  {
    id: 4,
    title: 'Wohnen',
    description: 'Жильё и дом',
    lessons: ['Wohnung', 'Möbel', 'Nachbarschaft'],
    color: 'from-orange-500 to-red-500',
    progress: 0
  },
  {
    id: 5,
    title: 'Freizeit',
    description: 'Свободное время',
    lessons: ['Hobbys', 'Sport', 'Musik'],
    color: 'from-teal-500 to-cyan-500',
    progress: 0
  },
  {
    id: 6,
    title: 'Reisen',
    description: 'Путешествия',
    lessons: ['Im Hotel', 'Orientierung', 'Transport'],
    color: 'from-yellow-500 to-orange-500',
    progress: 0
  }
]

export default function LivstinPage() {
  const totalProgress = 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german-courses" className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/german-courses">
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
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-blue-400 font-medium">Полный курс немецкого языка</div>
              <h1 className="text-3xl font-bold text-white mb-2">Денис Листвин</h1>
              <p className="text-white/80">От A1 до B2</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Общий прогресс</span>
              <span className="text-2xl font-bold text-white">{totalProgress}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                ~15 часов
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                900 XP
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 max-w-3xl mx-auto">
          {modules.map((module) => (
            <Card key={module.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300">
              <CardContent className="p-0">
                <Link href={`/lessons/livstin/module-${module.id}`} className="block">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                          <span className="text-white font-bold text-lg">{module.id}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{module.title}</h3>
                          <p className="text-white/60">{module.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/40" />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {module.lessons.map((lesson, i) => (
                        <span key={i} className="text-xs bg-slate-700/50 text-white/60 px-3 py-1 rounded-full">
                          {lesson}
                        </span>
                      ))}
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
