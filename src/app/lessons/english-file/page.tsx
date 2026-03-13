'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

const courses = [
  {
    id: 'elementary',
    title: 'Elementary',
    description: 'English File Elementary - начальный уровень',
    level: 'A1-A2',
    color: 'from-blue-500 to-cyan-500',
    lessons: 12,
    xp: 360,
    href: '/lessons/english-file/elementary'
  },
  {
    id: 'intermediate',
    title: 'Intermediate', 
    description: 'English File Intermediate - средний уровень',
    level: 'B1',
    color: 'from-green-500 to-emerald-500',
    lessons: 14,
    xp: 420,
    href: '/lessons/english-file/intermediate'
  },
  {
    id: 'upper-intermediate',
    title: 'Upper Intermediate',
    description: 'English File Upper Intermediate - продвинутый уровень',
    level: 'B2',
    color: 'from-purple-500 to-pink-500',
    lessons: 14,
    xp: 420,
    href: '/lessons/english-file/upper-intermediate'
  }
]

export default function EnglishFilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white hover:text-blue-300 transition-colors">LinguaFlow</h1>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  К урокам
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            English File (4th Edition)
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Коммуникативный английский
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Современный курс для развития разговорной речи. Основан на коммуникативной методике.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {courses.map((course) => (
            <Link key={course.id} href={course.href}>
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-white">{course.title}</span>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Layers className="w-4 h-4" />
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.lessons} уроков
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {course.xp} XP
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">О курсе English File</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Коммуникативный подход</h3>
              <p className="text-sm text-white/60">Фокус на развитии разговорных навыков через реальные ситуации</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">Сбалансированная программа</h3>
              <p className="text-sm text-white/60">Грамматика, лексика, произношение и аудирование</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold text-white">Аутентичные материалы</h3>
              <p className="text-sm text-white/60">Реальные тексты и аудио для изучения современного английского</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
