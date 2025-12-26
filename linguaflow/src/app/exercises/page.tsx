'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ExerciseSearchDialog } from '@/components/search/exercise-search-dialog'
import { 
  BookOpen, 
  Brain, 
  Search, 
  Filter,
  Clock,
  Star,
  Target,
  CheckCircle,
  Circle,
  ArrowLeft,
  Zap
} from 'lucide-react'

interface Exercise {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  language: string
  level: string
  topic: string
  lessonId: string
  lessonTitle: string
  url: string
  xpReward: number
  timeEstimate: number
  tags: string[]
  metadata: {
    estimatedTime: string
    difficultyLabel: string
    typeLabel: string
    languageFlag: string
  }
}

export default function ExercisesPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quickSearch, setQuickSearch] = useState('')

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

  // Load popular exercises and stats on page load
  useEffect(() => {
    const loadData = async () => {
      try {
        // Загружаем популярные задания и статистику параллельно
        const [exercisesResponse, statsResponse] = await Promise.all([
          fetch('/api/exercises/search?q='),
          fetch('/api/exercises/stats')
        ])
        
        const exercisesData = await exercisesResponse.json()
        const statsData = await statsResponse.json()
        
        setExercises(exercisesData.slice(0, 12)) // Показываем первые 12
        setStats(statsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'quiz_single':
      case 'quiz_multiple':
        return <CheckCircle className="w-5 h-5" />
      case 'fill_gap':
        return <Circle className="w-5 h-5" />
      case 'match':
        return <Target className="w-5 h-5" />
      case 'theory':
        return <BookOpen className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const exerciseTypes = stats ? [
    { id: 'quiz_single', name: 'Выбор одного', icon: CheckCircle, count: stats.byType.quiz_single },
    { id: 'quiz_multiple', name: 'Множественный выбор', icon: CheckCircle, count: stats.byType.quiz_multiple },
    { id: 'fill_gap', name: 'Заполнить пропуски', icon: Circle, count: stats.byType.fill_gap },
    { id: 'match', name: 'Сопоставление', icon: Target, count: stats.byType.match },
    { id: 'theory', name: 'Теория', icon: BookOpen, count: stats.byType.theory }
  ] : [
    { id: 'quiz_single', name: 'Выбор одного', icon: CheckCircle, count: 0 },
    { id: 'quiz_multiple', name: 'Множественный выбор', icon: CheckCircle, count: 0 },
    { id: 'fill_gap', name: 'Заполнить пропуски', icon: Circle, count: 0 },
    { id: 'match', name: 'Сопоставление', icon: Target, count: 0 },
    { id: 'theory', name: 'Теория', icon: BookOpen, count: 0 }
  ]

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
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Поиск заданий
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Найдите подходящие упражнения для изучения языков
              </p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Поиск заданий
            </CardTitle>
            <CardDescription>
              Используйте расширенный поиск для точного подбора упражнений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Быстрый поиск по названию или теме..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                onClick={() => setSearchOpen(true)}
                className="shrink-0"
              >
                <Filter className="w-4 h-4 mr-2" />
                Расширенный поиск
                <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Types */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Типы заданий</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {exerciseTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <type.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium text-sm mb-1">{type.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {type.count} заданий
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Exercises */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Популярные задания</h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-gray-200 rounded"></div>
                      <div className="h-5 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises
                .filter(exercise => 
                  !quickSearch || 
                  exercise.title.toLowerCase().includes(quickSearch.toLowerCase()) ||
                  exercise.description.toLowerCase().includes(quickSearch.toLowerCase()) ||
                  exercise.tags.some(tag => tag.toLowerCase().includes(quickSearch.toLowerCase()))
                )
                .map((exercise) => (
                <Link key={exercise.id} href={exercise.url}>
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                            {getIcon(exercise.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base line-clamp-2">
                              {exercise.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg">{exercise.metadata.languageFlag}</span>
                              <Badge variant="outline" className="text-xs uppercase">
                                {exercise.level}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 line-clamp-2">
                        {exercise.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {exercise.metadata.typeLabel}
                          </Badge>
                          <Badge 
                            className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}
                          >
                            {exercise.metadata.difficultyLabel}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {exercise.metadata.estimatedTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {exercise.xpReward}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 text-xs text-muted-foreground">
                        Урок: {exercise.lessonTitle}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats?.total || 0}</div>
              <div className="text-sm text-muted-foreground">Всего заданий</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{stats?.newThisWeek || 0}</div>
              <div className="text-sm text-muted-foreground">Новых на этой неделе</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{stats ? Object.keys(stats.byTopic).length : 0}</div>
              <div className="text-sm text-muted-foreground">Тем покрыто</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{stats?.totalXP || 0}</div>
              <div className="text-sm text-muted-foreground">XP доступно</div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Exercise Search Dialog */}
      <ExerciseSearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}