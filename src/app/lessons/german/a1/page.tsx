'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SearchDialog } from '@/components/search/search-dialog'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, Brain, Trophy, Clock, Star, ArrowLeft, Search, CheckCircle, Lock, Play, GraduationCap, Sparkles, Target, Heart, Utensils, Home } from 'lucide-react'

const mockLessons = [
  {
    id: 'alphabet',
    title: 'Das Alphabet',
    description: 'Немецкий алфавит и произношение',
    duration: 15,
    xpReward: 45,
    category: 'basics'
  },
  {
    id: 'greetings',
    title: 'Begrüßung',
    description: 'Приветствия и прощания',
    duration: 12,
    xpReward: 35,
    category: 'greetings'
  },
  {
    id: 'numbers-1-10',
    title: 'Zahlen 1-10',
    description: 'Числа от 1 до 10',
    duration: 10,
    xpReward: 30,
    category: 'numbers'
  },
  {
    id: 'numbers-11-20',
    title: 'Zahlen 11-20',
    description: 'Числа от 11 до 20',
    duration: 10,
    xpReward: 30,
    category: 'numbers'
  },
  {
    id: 'family',
    title: 'Die Familie',
    description: 'Члены семьи',
    duration: 15,
    xpReward: 45,
    category: 'family'
  },
  {
    id: 'colors',
    title: 'Farben',
    description: 'Основные цвета',
    duration: 12,
    xpReward: 35,
    category: 'vocabulary'
  },
  {
    id: 'food',
    title: 'Essen und Trinken',
    description: 'Еда и напитки',
    duration: 15,
    xpReward: 45,
    category: 'vocabulary'
  },
  {
    id: 'animals',
    title: 'Tiere',
    description: 'Животные',
    duration: 12,
    xpReward: 35,
    category: 'vocabulary'
  },
  {
    id: 'time',
    title: 'Uhrzeit',
    description: 'Который час',
    duration: 15,
    xpReward: 45,
    category: 'time'
  },
  {
    id: 'days',
    title: 'Wochentage',
    description: 'Дни недели',
    duration: 10,
    xpReward: 30,
    category: 'time'
  },
  {
    id: 'months',
    title: 'Monate',
    description: 'Месяцы',
    duration: 12,
    xpReward: 35,
    category: 'time'
  },
  {
    id: 'house',
    title: 'Wohnung',
    description: 'Квартира и комнаты',
    duration: 15,
    xpReward: 45,
    category: 'vocabulary'
  },
  {
    id: 'phrases',
    title: 'Nützliche Sätze',
    description: 'Полезные фразы',
    duration: 12,
    xpReward: 35,
    category: 'phrases'
  },
  {
    id: 'introduction',
    title: 'Vorstellung',
    description: 'Представление себя',
    duration: 15,
    xpReward: 45,
    category: 'phrases'
  }
]

const categories = [
  { id: 'basics', title: 'Основы', icon: BookOpen, color: 'blue', lessons: mockLessons.filter(l => l.category === 'basics') },
  { id: 'greetings', title: 'Приветствия', icon: Heart, color: 'pink', lessons: mockLessons.filter(l => l.category === 'greetings') },
  { id: 'numbers', title: 'Числа', icon: Brain, color: 'purple', lessons: mockLessons.filter(l => l.category === 'numbers') },
  { id: 'family', title: 'Семья', icon: Heart, color: 'red', lessons: mockLessons.filter(l => l.category === 'family') },
  { id: 'vocabulary', title: 'Лексика', icon: BookOpen, color: 'orange', lessons: mockLessons.filter(l => l.category === 'vocabulary') },
  { id: 'time', title: 'Время', icon: Clock, color: 'cyan', lessons: mockLessons.filter(l => l.category === 'time') },
  { id: 'phrases', title: 'Фразы', icon: Sparkles, color: 'green', lessons: mockLessons.filter(l => l.category === 'phrases') }
]

export default function GermanA1Page() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('linguaflow-german-a1-progress')
    if (saved) {
      try {
        setCompletedLessons(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading progress:', e)
      }
    }
  }, [])

  if (!mounted) return null

  const completedCount = completedLessons.length
  const totalXP = mockLessons.reduce((sum, l) => sum + l.xpReward, 0)
  const earnedXP = mockLessons
    .filter(l => completedLessons.includes(l.id))
    .reduce((sum, l) => sum + l.xpReward, 0)

  const getCorrectLessonPath = (id: string, category: string) => {
    const paths: Record<string, string> = {
      'alphabet': '/lessons/german/a1/alphabet',
      'greetings': '/lessons/german/a1/greetings/basic-greetings',
      'numbers-1-10': '/lessons/german/a1/numbers/numbers-1-10',
      'numbers-11-20': '/lessons/german/a1/numbers/numbers-11-20',
      'family': '/lessons/german/a1/family',
      'colors': '/lessons/german/a1/colors',
      'food': '/lessons/german/a1/food',
      'animals': '/lessons/german/a1/animals',
      'time': '/lessons/german/a1/time',
      'days': '/lessons/german/a1/days',
      'months': '/lessons/german/a1/months',
      'house': '/lessons/german/a1/house',
      'phrases': '/lessons/german/a1/phrases',
      'introduction': '/lessons/german/a1/introduction',
    }
    return paths[id] || `/lessons/german/a1/${id}`
  }

  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    pink: 'from-pink-500 to-pink-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    cyan: 'from-cyan-500 to-cyan-600',
    green: 'from-green-500 to-green-600'
  }

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg"></div>

      {/* Header */}
      <header className="relative z-40 bg-slate-900 border-b border-slate-700 sticky top-0">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-300">
                  <GraduationCap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">LinguaFlow</span>
                <div className="text-xs text-muted-foreground">Немецкий A1</div>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 hover:bg-secondary/80 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-muted-foreground">Поиск</span>
              </Button>
              <ThemeToggle />
              <Link href="/lessons">
                <Button variant="ghost" size="sm" className="hover:bg-secondary/80 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  К урокам
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="animate-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-normal bg-secondary/50 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary animate-pulse" />
              Уровень A1 - Grundstufe
            </Badge>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="text-6xl mb-4">🇩🇪</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Немецкий язык</span>
              <br />
              <span className="text-gradient">Уровень A1</span>
            </h1>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Начальный уровень. Изучите алфавит, базовую лексику, простые фразы и научитесь представляться
            </p>
          </div>

          {/* Stats */}
          <div className="animate-in-up opacity-0 flex justify-center gap-8 md:gap-16" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{mockLessons.length}</div>
              <div className="text-sm text-muted-foreground">Уроков</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{totalXP}</div>
              <div className="text-sm text-muted-foreground">Всего XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">{Math.round((completedCount / mockLessons.length) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Прогресс</div>
            </div>
          </div>
        </div>

        {/* Categories */}
        {categories.map((category, catIndex) => (
          <div key={category.id} className="mb-12">
            <div className="animate-in-up opacity-0" style={{ animationDelay: `${(catIndex + 1) * 100}ms`, animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[category.color]} rounded-xl flex items-center justify-center shadow-lg`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{category.title}</h2>
                  <p className="text-sm text-muted-foreground">{category.lessons.length} уроков</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id)
                return (
                  <Card 
                    key={lesson.id} 
                    className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up"
                    style={{ animationDelay: `${(catIndex + 1) * 100 + (index + 1) * 50}ms`, animationFillMode: 'forwards' }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-green-500 to-green-600' 
                              : `bg-gradient-to-br ${colorMap[category.color]}`
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <BookOpen className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-base">{lesson.title}</CardTitle>
                            <CardDescription className="text-sm">{lesson.description}</CardDescription>
                          </div>
                        </div>
                        {isCompleted && <Trophy className="w-5 h-5 text-yellow-500" />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                      <Link href={getCorrectLessonPath(lesson.id, category.id)}>
                        <Button 
                          className={`w-full ${
                            isCompleted 
                              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                              : ''
                          }`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isCompleted ? 'Повторить' : 'Начать'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}

        {/* Progress Card */}
        <div className="animate-in-up opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Ваш прогресс</h3>
                  <p className="text-sm text-muted-foreground">Продолжайте изучать немецкий!</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
              <Progress value={(completedCount / mockLessons.length) * 100} className="h-2 mb-4" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{completedCount} из {mockLessons.length} уроков</span>
                <span className="text-primary font-medium">{earnedXP} / {totalXP} XP</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
