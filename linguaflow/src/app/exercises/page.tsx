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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Упражнения</div>
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-6">
            <Brain className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Интерактивные задания</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-green-800 to-blue-800 dark:from-white dark:via-green-200 dark:to-blue-200 bg-clip-text text-transparent">
              Найдите идеальные
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              упражнения
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Используйте мощный поиск для подбора упражнений по уровню, типу и теме. 
            Найдите именно то, что нужно для вашего обучения
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-12 shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              Поиск заданий
            </CardTitle>
            <CardDescription className="text-base">
              Используйте расширенный поиск для точного подбора упражнений по вашим потребностям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Быстрый поиск по названию или теме..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="w-full h-12 text-base bg-white/50 backdrop-blur-sm border-white/30"
                />
              </div>
              <Button 
                onClick={() => setSearchOpen(true)}
                className="shrink-0 h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              >
                <Filter className="w-4 h-4 mr-2" />
                Расширенный поиск
                <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white/20 px-1.5 font-mono text-[10px] font-medium text-white/80 opacity-100">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Типы заданий
            </span>
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {exerciseTypes.map((type) => (
              <Card key={type.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <type.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors">{type.name}</h3>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                    {type.count} заданий
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Exercises */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Популярные задания
            </span>
          </h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse shadow-lg">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exercises
                .filter(exercise => 
                  !quickSearch || 
                  exercise.title.toLowerCase().includes(quickSearch.toLowerCase()) ||
                  exercise.description.toLowerCase().includes(quickSearch.toLowerCase()) ||
                  exercise.tags.some(tag => tag.toLowerCase().includes(quickSearch.toLowerCase()))
                )
                .map((exercise) => (
                <Link key={exercise.id} href={exercise.url}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 shadow-lg">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform shadow-lg">
                            {getIcon(exercise.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {exercise.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-2xl">{exercise.metadata.languageFlag}</span>
                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs uppercase">
                                {exercise.level}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-6 line-clamp-2 text-base leading-relaxed">
                        {exercise.description}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between mb-4">
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
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {exercise.metadata.estimatedTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {exercise.xpReward}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
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
        <div className="grid md:grid-cols-4 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats?.total || 0}</div>
              <div className="text-sm text-muted-foreground">Всего заданий</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">{stats?.newThisWeek || 0}</div>
              <div className="text-sm text-muted-foreground">Новых на этой неделе</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{stats ? Object.keys(stats.byTopic).length : 0}</div>
              <div className="text-sm text-muted-foreground">Тем покрыто</div>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{stats?.totalXP || 0}</div>
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