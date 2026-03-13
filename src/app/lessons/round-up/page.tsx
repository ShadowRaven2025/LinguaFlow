'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'

const courses = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Round Up - начальный уровень',
    level: 'A1',
    color: 'from-green-500 to-teal-500',
    lessons: 15,
    xp: 450,
    href: '/lessons/round-up/beginner'
  },
  {
    id: 'elementary',
    title: 'Elementary',
    description: 'Round Up - базовый уровень',
    level: 'A2',
    color: 'from-blue-500 to-cyan-500',
    lessons: 15,
    xp: 450,
    href: '/lessons/round-up/elementary'
  }
]

export default function RoundUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </div>
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
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Layers className="w-4 h-4" />
            Round Up
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Грамматика для начинающих
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Учебник с большим количеством упражнений. Идеален для уровней Beginner и Elementary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                      {course.lessons} тем
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
          <h2 className="text-xl font-bold text-white mb-4">О курсе Round Up</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold text-white">Много практики</h3>
              <p className="text-sm text-white/60">Большое количество упражнений для закрепления</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white">Пошаговое изучение</h3>
              <p className="text-sm text-white/60">Простая и понятная структура материала</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="font-semibold text-white">Для начинающих</h3>
              <p className="text-sm text-white/60">Идеально для тех, кто только начинает изучать английский</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
