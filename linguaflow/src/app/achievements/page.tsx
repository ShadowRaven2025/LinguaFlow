'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AchievementCard } from '@/components/achievements/achievement-card'
import { Trophy, Star, ArrowLeft, Filter } from 'lucide-react'

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
              <Link href="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к дашборду
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Достижения
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Отслеживайте свой прогресс и получайте награды за успехи
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Получено достижений
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {unlockedCount}
              </div>
              <div className="text-sm text-muted-foreground">
                из {totalCount} доступных
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-600" />
                Доступно XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {totalXPAvailable}
              </div>
              <div className="text-sm text-muted-foreground">
                очков опыта за все достижения
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-600" />
                Прогресс
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                завершено
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="all">Все ({totalCount})</TabsTrigger>
            <TabsTrigger value="unlocked">Получены ({unlockedCount})</TabsTrigger>
            <TabsTrigger value="locked">В процессе ({totalCount - unlockedCount})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Achievements by Category */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 max-w-4xl">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="lesson">Уроки</TabsTrigger>
            <TabsTrigger value="vocabulary">Словарь</TabsTrigger>
            <TabsTrigger value="streak">Серии</TabsTrigger>
            <TabsTrigger value="xp">Опыт</TabsTrigger>
            <TabsTrigger value="speed">Скорость</TabsTrigger>
            <TabsTrigger value="perfect">Совершенство</TabsTrigger>
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
                <Card>
                  <CardContent className="text-center py-8">
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground">
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
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Начните свое путешествие!</CardTitle>
              <CardDescription>
                Пройдите первый урок, чтобы получить свое первое достижение
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/lessons">
                <Button>
                  Начать изучение
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}