'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SearchDialog } from '@/components/search/search-dialog'
import { BookOpen, Play, Clock, Star, ArrowLeft, Search, CheckCircle, Lock, Trophy } from 'lucide-react'

// Mock lessons data for A1 English
const mockLessons = [
  {
    id: '1',
    title: 'Greetings and Introductions',
    description: 'Learn basic greetings and how to introduce yourself',
    duration: 15,
    xpReward: 50,
    completed: true,
    locked: false,
    progress: 100
  },
  {
    id: '2',
    title: 'Numbers 1-20',
    description: 'Master numbers from one to twenty',
    duration: 12,
    xpReward: 40,
    completed: true,
    locked: false,
    progress: 100
  },
  {
    id: '3',
    title: 'Family Members',
    description: 'Vocabulary for family relationships',
    duration: 18,
    xpReward: 60,
    completed: false,
    locked: false,
    progress: 65
  },
  {
    id: '4',
    title: 'Colors and Shapes',
    description: 'Basic colors and geometric shapes',
    duration: 14,
    xpReward: 45,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: '5',
    title: 'Days of the Week',
    description: 'Learn the seven days of the week',
    duration: 10,
    xpReward: 35,
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: '6',
    title: 'Present Simple - To Be',
    description: 'Introduction to the verb "to be"',
    duration: 25,
    xpReward: 80,
    completed: false,
    locked: true,
    progress: 0
  }
]

export default function EnglishA1Page() {
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

  const completedLessons = mockLessons.filter(lesson => lesson.completed).length
  const totalLessons = mockLessons.length
  const overallProgress = (completedLessons / totalLessons) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Английский A1</div>
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
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Все языки
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        {/* Course Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-6">🇬🇧</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-red-800 to-blue-800 dark:from-white dark:via-red-200 dark:to-blue-200 bg-clip-text text-transparent">
              Английский язык
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Уровень A1
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Начальный уровень английского языка. Изучите основы: алфавит, числа, 
            простые фразы и базовую грамматику
          </p>

          {/* Progress Overview */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Общий прогресс</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {completedLessons} из {totalLessons} уроков завершено
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mockLessons.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className={`group transition-all duration-300 border-0 shadow-lg ${
                lesson.locked 
                  ? 'opacity-60 cursor-not-allowed bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
                  : lesson.completed
                    ? 'hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                    : 'hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                      lesson.locked 
                        ? 'bg-gray-400'
                        : lesson.completed
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 group-hover:scale-110 transition-transform'
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 group-hover:scale-110 transition-transform'
                    }`}>
                      {lesson.locked ? (
                        <Lock className="w-6 h-6 text-white" />
                      ) : lesson.completed ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Урок {index + 1}
                    </Badge>
                  </div>
                  {lesson.completed && (
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
                
                <CardTitle className={`text-lg mb-2 ${
                  lesson.locked ? 'text-gray-500' : lesson.completed ? 'text-green-700 dark:text-green-300' : 'group-hover:text-blue-600 transition-colors'
                }`}>
                  {lesson.title}
                </CardTitle>
                
                <CardDescription className="text-base leading-relaxed">
                  {lesson.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {!lesson.completed && !lesson.locked && lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Прогресс</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <Progress value={lesson.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.duration} мин
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {lesson.xpReward} XP
                    </div>
                  </div>
                </div>
                
                <Link href={lesson.locked ? '#' : `/lessons/english/a1/${lesson.id}`}>
                  <Button 
                    className={`w-full ${
                      lesson.locked 
                        ? 'cursor-not-allowed opacity-50'
                        : lesson.completed
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                          : lesson.progress > 0
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    }`}
                    disabled={lesson.locked}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {lesson.completed ? 'Повторить' : lesson.progress > 0 ? 'Продолжить' : 'Начать'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{completedLessons}</div>
              <div className="text-sm text-muted-foreground">Уроков завершено</div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {mockLessons.filter(l => l.completed).reduce((sum, l) => sum + l.xpReward, 0)}
              </div>
              <div className="text-sm text-muted-foreground">XP получено</div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {mockLessons.filter(l => l.completed).reduce((sum, l) => sum + l.duration, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Минут изучено</div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}