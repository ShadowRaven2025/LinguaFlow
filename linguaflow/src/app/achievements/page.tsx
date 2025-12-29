'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SearchDialog } from '@/components/search/search-dialog'
import { AchievementCard } from '@/components/achievements/achievement-card'
import { Trophy, Star, ArrowLeft, Search, Target, Award, Sparkles } from 'lucide-react'

// Mock achievements data
const mockAchievements = [
  {
    id: '1',
    title: 'Первые шаги',
    description: 'Завершите свой первый урок',
    type: 'lesson' as const,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 50
  },
  {
    id: '2',
    title: 'Ученик',
    description: 'Завершите 5 уроков',
    type: 'lesson' as const,
    progress: 0,
    maxProgress: 5,
    unlocked: false,
    xpReward: 100
  },
  {
    id: '3',
    title: 'Знаток слов',
    description: 'Изучите 50 новых слов',
    type: 'vocabulary' as const,
    progress: 0,
    maxProgress: 50,
    unlocked: false,
    xpReward: 150
  },
  {
    id: '4',
    title: 'Серия успехов',
    description: 'Занимайтесь 7 дней подряд',
    type: 'streak' as const,
    progress: 0,
    maxProgress: 7,
    unlocked: false,
    xpReward: 200
  },
  {
    id: '5',
    title: 'Коллекционер опыта',
    description: 'Наберите 1000 очков опыта',
    type: 'xp' as const,
    progress: 250,
    maxProgress: 1000,
    unlocked: false,
    xpReward: 100
  },
  {
    id: '6',
    title: 'Скоростной ученик',
    description: 'Завершите урок менее чем за 5 минут',
    type: 'speed' as const,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 75
  },
  {
    id: '7',
    title: 'Перфекционист',
    description: 'Завершите урок без ошибок',
    type: 'perfect' as const,
    progress: 0,
    maxProgress: 1,
    unlocked: false,
    xpReward: 100
  }
]

export default function AchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
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

  const unlockedCount = mockAchievements.filter(a => a.unlocked).length
  const totalCount = mockAchievements.length
  const totalXPAvailable = mockAchievements.reduce((sum, a) => sum + a.xpReward, 0)

  const filteredAchievements = mockAchievements.filter(achievement => {
    if (filter === 'unlocked') return achievement.unlocked
    if (filter === 'locked') return !achievement.unlocked
    return true
  })

  const achievementsByType = {
    lesson: filteredAchievements.filter(a => a.type === 'lesson'),
    vocabulary: filteredAchievements.filter(a => a.type === 'vocabulary'),
    streak: filteredAchievements.filter(a => a.type === 'streak'),
    xp: filteredAchievements.filter(a => a.type === 'xp'),
    speed: filteredAchievements.filter(a => a.type === 'speed'),
    perfect: filteredAchievements.filter(a => a.type === 'perfect'),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Достижения</div>
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
              <Link href="/dashboard">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Дашборд
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Система наград</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-yellow-800 to-orange-800 dark:from-white dark:via-yellow-200 dark:to-orange-200 bg-clip-text text-transparent">
              Ваши достижения
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Отслеживайте свой прогресс, получайте награды за успехи 
            и мотивируйтесь на новые свершения
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                Получено достижений
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold text-yellow-600">
                  {unlockedCount}
                </div>
                <div className="text-gray-500">
                  из {totalCount}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {Math.round((unlockedCount / totalCount) * 100)}% завершено
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                Доступно XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">
                {totalXPAvailable}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                очков опыта за все достижения
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                Прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                общий прогресс
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Все ({totalCount})
              </TabsTrigger>
              <TabsTrigger value="unlocked" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Получены ({unlockedCount})
              </TabsTrigger>
              <TabsTrigger value="locked" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                В процессе ({totalCount - unlockedCount})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Achievements by Category */}
        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 max-w-4xl mx-auto bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Все</TabsTrigger>
            <TabsTrigger value="lesson" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Уроки</TabsTrigger>
            <TabsTrigger value="vocabulary" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Словарь</TabsTrigger>
            <TabsTrigger value="streak" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Серии</TabsTrigger>
            <TabsTrigger value="xp" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Опыт</TabsTrigger>
            <TabsTrigger value="speed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Скорость</TabsTrigger>
            <TabsTrigger value="perfect" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Совершенство</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          {Object.entries(achievementsByType).map(([type, achievements]) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {achievements.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              ) : (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                  <CardContent className="text-center py-12">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      Нет достижений в этой категории
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        {unlockedCount === 0 && (
          <div className="mt-16 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <Award className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4">Начните свое путешествие!</h3>
            <p className="text-xl mb-8 opacity-90">
              Пройдите первый урок, чтобы получить свое первое достижение
            </p>
            <Link href="/lessons">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Trophy className="w-5 h-5 mr-2" />
                Начать изучение
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}