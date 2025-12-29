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
import { BookOpen, Brain, Trophy, TrendingUp, Clock, Star, Search, Target, Calendar, ArrowRight, Play, Flame } from 'lucide-react'

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
    name: 'Александр',
    email: 'user@example.com',
    xp: 1250,
    level: 3,
    streak: 7,
    totalLessons: 15,
    completedLessons: 8,
    wordsLearned: 156,
    studyTime: 420 // minutes
  }

  // Mock progress data for the chart
  const mockProgressData = [
    { date: '2024-12-20', xp: 150, lessonsCompleted: 2, wordsLearned: 18 },
    { date: '2024-12-21', xp: 80, lessonsCompleted: 1, wordsLearned: 12 },
    { date: '2024-12-22', xp: 200, lessonsCompleted: 3, wordsLearned: 25 },
    { date: '2024-12-23', xp: 120, lessonsCompleted: 2, wordsLearned: 16 },
    { date: '2024-12-24', xp: 180, lessonsCompleted: 2, wordsLearned: 22 },
    { date: '2024-12-25', xp: 90, lessonsCompleted: 1, wordsLearned: 8 },
    { date: '2024-12-26', xp: 160, lessonsCompleted: 2, wordsLearned: 20 },
  ]

  const currentLevel = calculateLevel(mockUser.xp)
  const nextLevelXP = (currentLevel + 1) * (currentLevel + 1) * 100
  const progressToNextLevel = ((mockUser.xp % nextLevelXP) / nextLevelXP) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Дашборд</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
              >
                <Search className="w-4 h-4" />
                Поиск
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <Link href="/lessons">
                <Button variant="ghost" className="hover:bg-white/50">Уроки</Button>
              </Link>
              <Link href="/achievements">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                  <Trophy className="w-4 h-4 mr-2" />
                  Достижения
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Добро пожаловать, {mockUser.name}! 👋
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Продолжайте свое языковое путешествие
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold text-orange-600">{mockUser.streak}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">дней подряд</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Уровень</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-blue-600">{currentLevel}</span>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {mockUser.xp} XP
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>До уровня {currentLevel + 1}</span>
                  <span>{Math.round(progressToNextLevel)}%</span>
                </div>
                <Progress value={progressToNextLevel} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Уроки</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-green-600">{mockUser.completedLessons}</span>
                    <span className="text-gray-500">/ {mockUser.totalLessons}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Прогресс</span>
                  <span>{Math.round((mockUser.completedLessons / mockUser.totalLessons) * 100)}%</span>
                </div>
                <Progress value={(mockUser.completedLessons / mockUser.totalLessons) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Слова изучено</p>
                  <span className="text-3xl font-bold text-purple-600">{mockUser.wordsLearned}</span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  +12 за последнюю неделю
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Время изучения</p>
                  <span className="text-3xl font-bold text-orange-600">{Math.floor(mockUser.studyTime / 60)}ч</span>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {mockUser.studyTime % 60} минут сегодня
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart and Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  Прогресс за неделю
                </CardTitle>
                <CardDescription>
                  Ваша активность и достижения за последние 7 дней
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart data={mockProgressData} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Streak Card */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Серия дней</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Продолжайте изучать!</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{mockUser.streak}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">дней подряд</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader>
                <CardTitle className="text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/lessons">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 group">
                    <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Продолжить урок
                    <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/flashcards">
                  <Button variant="outline" className="w-full justify-start bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                    <Brain className="w-4 h-4 mr-2" />
                    Повторить слова
                  </Button>
                </Link>
                <Link href="/exercises">
                  <Button variant="outline" className="w-full justify-start bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                    <Target className="w-4 h-4 mr-2" />
                    Найти упражнения
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
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
      </main>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}