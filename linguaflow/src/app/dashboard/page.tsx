'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { SearchDialog } from '@/components/search/search-dialog'
import { ProgressChart } from '@/components/charts/progress-chart'
import { calculateLevel } from '@/lib/utils'
import { BookOpen, Brain, Trophy, TrendingUp, Clock, Star, Search } from 'lucide-react'

export default function DashboardPage() {
  const [searchOpen, setSearchOpen] = useState(false)

  // Keyboard shortcut for search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Mock user data for demo purposes
  const mockUser = {
    name: 'Пользователь',
    email: 'user@example.com',
    xp: 250,
    level: 1
  }

  // Mock progress data for the chart
  const mockProgressData = [
    { date: '2024-12-20', xp: 50, lessonsCompleted: 1, wordsLearned: 8 },
    { date: '2024-12-21', xp: 30, lessonsCompleted: 0, wordsLearned: 5 },
    { date: '2024-12-22', xp: 70, lessonsCompleted: 2, wordsLearned: 12 },
    { date: '2024-12-23', xp: 40, lessonsCompleted: 1, wordsLearned: 6 },
    { date: '2024-12-24', xp: 60, lessonsCompleted: 1, wordsLearned: 10 },
    { date: '2024-12-25', xp: 0, lessonsCompleted: 0, wordsLearned: 0 },
    { date: '2024-12-26', xp: 0, lessonsCompleted: 0, wordsLearned: 0 },
  ]

  const currentLevel = calculateLevel(mockUser.xp)
  const nextLevelXP = (currentLevel + 1) * (currentLevel + 1) * 100
  const progressToNextLevel = ((mockUser.xp - (currentLevel * currentLevel * 100)) / ((nextLevelXP - (currentLevel * currentLevel * 100)))) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Поиск
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="sm:hidden"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Link href="/lessons">
                <Button variant="outline">Уроки</Button>
              </Link>
              <Link href="/flashcards">
                <Button variant="outline">Карточки</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Добро пожаловать в LinguaFlow!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Продолжайте изучение языков и достигайте новых высот
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Ваш уровень
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl font-bold text-primary">
                  {currentLevel}
                </div>
                <Badge variant="secondary">Уровень</Badge>
              </div>
              <div className="text-sm text-muted-foreground mb-3">
                {mockUser.xp} XP / {nextLevelXP} XP
              </div>
              <Progress value={Math.max(0, Math.min(100, progressToNextLevel))} className="h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Уроки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl font-bold text-green-600">
                  0
                </div>
                <Badge variant="outline">Пройдено</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Завершенных уроков
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Карточки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl font-bold text-purple-600">
                  0
                </div>
                <Badge variant="outline">Изучено</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Выученных слов
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* Detailed Progress */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <ProgressChart 
              data={mockProgressData}
              currentXP={mockUser.xp}
              currentLevel={currentLevel}
              nextLevelXP={nextLevelXP}
            />
          </div>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Начать изучение
                </CardTitle>
                <CardDescription>
                  Выберите язык и начните проходить интерактивные уроки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/lessons/english">
                    <Button className="w-full justify-start" variant="outline">
                      <span className="mr-2">🇬🇧</span>
                      Английский язык
                      <Badge variant="secondary" className="ml-auto">A1-B2</Badge>
                    </Button>
                  </Link>
                  <Link href="/lessons/german">
                    <Button className="w-full justify-start" variant="outline">
                      <span className="mr-2">🇩🇪</span>
                      Немецкий язык
                      <Badge variant="secondary" className="ml-auto">A1-B2</Badge>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Повторение слов
                </CardTitle>
                <CardDescription>
                  Используйте карточки для закрепления изученной лексики
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/flashcards">
                  <Button className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Начать повторение
                    <Badge variant="outline" className="ml-auto">5 слов</Badge>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Достижения
                </CardTitle>
                <CardDescription>
                  Отслеживайте свой прогресс и получайте награды
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/achievements">
                  <Button className="w-full" variant="outline">
                    <Trophy className="w-4 h-4 mr-2" />
                    Посмотреть достижения
                    <Badge variant="secondary" className="ml-auto">0 / 6</Badge>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Поиск заданий
                </CardTitle>
                <CardDescription>
                  Найдите подходящие упражнения для изучения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/exercises">
                  <Button className="w-full" variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Найти задания
                    <Badge variant="secondary" className="ml-auto">85 заданий</Badge>
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Последняя активность
                </CardTitle>
                <CardDescription>
                  Ваши недавние достижения и прогресс
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="font-medium">Пока нет активности</p>
                  <p className="text-sm">Начните проходить уроки, чтобы увидеть свой прогресс здесь</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}