'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ProgressDisplay } from '@/components/progress-display'
import { progressTracker } from '@/lib/progress-tracker'
import { SearchDialog } from '@/components/search/search-dialog'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, Brain, Trophy, Clock, Star, ArrowLeft, Search, CheckCircle, Lock, Play, GraduationCap, Sparkles, Target, Home, Utensils, Heart } from 'lucide-react'

const mockLessons = [
  {
    id: '1',
    title: 'English Alphabet',
    description: 'Английский алфавит и произношение',
    duration: 10,
    xpReward: 30,
    category: 'basics'
  },
  {
    id: '2',
    title: 'Basic Greetings',
    description: 'Приветствия: Hello, Hi, Good morning',
    duration: 8,
    xpReward: 25,
    category: 'greetings'
  },
  {
    id: '3',
    title: 'Numbers 1-10',
    description: 'Числа от 1 до 10',
    duration: 10,
    xpReward: 30,
    category: 'numbers'
  },
  {
    id: '4',
    title: 'Numbers 11-20',
    description: 'Числа от 11 до 20',
    duration: 10,
    xpReward: 30,
    category: 'numbers'
  },
  {
    id: '5',
    title: 'Colors and Shapes',
    description: 'Основные цвета и геометрические формы',
    duration: 20,
    xpReward: 75,
    category: 'vocabulary'
  },
  {
    id: '6',
    title: 'Simple Animals',
    description: 'Домашние и дикие животные',
    duration: 12,
    xpReward: 35,
    category: 'vocabulary'
  },
  {
    id: '7',
    title: 'Pets',
    description: 'Домашние питомцы',
    duration: 10,
    xpReward: 30,
    category: 'vocabulary'
  },
  {
    id: '8',
    title: 'Simple Food',
    description: 'Основные продукты питания',
    duration: 12,
    xpReward: 35,
    category: 'vocabulary'
  },
  {
    id: '9',
    title: 'Common Foods',
    description: 'Распространённые блюда',
    duration: 15,
    xpReward: 40,
    category: 'vocabulary'
  },
  {
    id: '10',
    title: 'Family Members',
    description: 'Члены семьи',
    duration: 15,
    xpReward: 45,
    category: 'family'
  },
  {
    id: '11',
    title: 'Family Tree',
    description: 'Родословное древо',
    duration: 12,
    xpReward: 35,
    category: 'family'
  },
  {
    id: '12',
    title: 'Days of the Week',
    description: 'Дни недели',
    duration: 10,
    xpReward: 30,
    category: 'time'
  },
  {
    id: '13',
    title: 'Days and Months',
    description: 'Дни недели и месяцы',
    duration: 15,
    xpReward: 40,
    category: 'time'
  },
  {
    id: '14',
    title: 'Telling Time',
    description: 'Как сказать который час',
    duration: 18,
    xpReward: 50,
    category: 'time'
  },
  {
    id: '15',
    title: 'Simple Phrases',
    description: 'Вежливые фразы: Thank you, Please',
    duration: 12,
    xpReward: 35,
    category: 'phrases'
  },
  {
    id: '16',
    title: 'My Name Is',
    description: 'Представление себя',
    duration: 15,
    xpReward: 40,
    category: 'introductions'
  },
  {
    id: '17',
    title: 'Asking Names',
    description: 'Как спросить имя',
    duration: 10,
    xpReward: 30,
    category: 'greetings'
  },
  {
    id: '18',
    title: 'Introducing Yourself',
    description: 'Как представиться',
    duration: 15,
    xpReward: 45,
    category: 'introductions'
  },
  {
    id: '19',
    title: 'Weather',
    description: 'Погода и климат',
    duration: 12,
    xpReward: 35,
    category: 'vocabulary'
  },
  {
    id: '20',
    title: 'At Home',
    description: 'Комнаты и мебель',
    duration: 15,
    xpReward: 45,
    category: 'vocabulary'
  }
]

const categories = [
  { id: 'basics', title: 'Основы', icon: BookOpen, color: 'blue', lessons: mockLessons.filter(l => l.category === 'basics') },
  { id: 'greetings', title: 'Приветствия', icon: Heart, color: 'pink', lessons: mockLessons.filter(l => l.category === 'greetings') },
  { id: 'numbers', title: 'Числа', icon: Brain, color: 'purple', lessons: mockLessons.filter(l => l.category === 'numbers') },
  { id: 'vocabulary', title: 'Лексика', icon: BookOpen, color: 'orange', lessons: mockLessons.filter(l => l.category === 'vocabulary') },
  { id: 'family', title: 'Семья', icon: Heart, color: 'red', lessons: mockLessons.filter(l => l.category === 'family') },
  { id: 'time', title: 'Время', icon: Clock, color: 'cyan', lessons: mockLessons.filter(l => l.category === 'time') },
  { id: 'phrases', title: 'Фразы', icon: Sparkles, color: 'yellow', lessons: mockLessons.filter(l => l.category === 'phrases') },
  { id: 'introductions', title: 'Представления', icon: Sparkles, color: 'green', lessons: mockLessons.filter(l => l.category === 'introductions') }
]

export default function EnglishA1Page() {
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
    const saved = localStorage.getItem('linguaflow-a1-progress')
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
      '1': '/lessons/english/a1/alphabet',
      '2': '/lessons/english/a1/greetings/basic-greetings',
      '3': '/lessons/english/a1/numbers/numbers-1-10',
      '4': '/lessons/english/a1/numbers/numbers-11-20',
      '5': '/lessons/english/a1/colors/colors-and-shapes',
      '6': '/lessons/english/a1/animals/simple-animals',
      '7': '/lessons/english/a1/animals/pets',
      '8': '/lessons/english/a1/food/simple-food',
      '9': '/lessons/english/a1/food/common-foods',
      '10': '/lessons/english/a1/family/family-members',
      '11': '/lessons/english/a1/family/family-tree',
      '12': '/lessons/english/a1/time/days-of-week',
      '13': '/lessons/english/a1/time/days-months',
      '14': '/lessons/english/a1/time/telling-time',
      '15': '/lessons/english/a1/phrases/simple-phrases',
      '16': '/lessons/english/a1/introductions/my-name-is',
      '17': '/lessons/english/a1/greetings/asking-names',
      '18': '/lessons/english/a1/greetings/introducing-yourself',
      '19': '/lessons/english/a1/weather',
      '20': '/lessons/english/a1/house',
    }
    return paths[id] || `/lessons/english/a1/${id}`
  }

  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    pink: 'from-pink-500 to-pink-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    cyan: 'from-cyan-500 to-cyan-600',
    yellow: 'from-yellow-500 to-yellow-600',
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
                <div className="text-xs text-muted-foreground">Английский A1</div>
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
              Уровень A1 - Beginner
            </Badge>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="text-6xl mb-4">🇬🇧</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Английский язык</span>
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

        {/* Course Books */}
        <div className="mb-12">
          <div className="animate-in-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">По учебникам</h2>
                <p className="text-sm text-muted-foreground">Популярные методики</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/lessons/english-file">
              <Card className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">English File</CardTitle>
                      <CardDescription className="text-sm">Коммуникативный курс</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/10 text-blue-500">A1-A2</Badge>
                    <span className="text-xs text-muted-foreground">12 уроков</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lessons/round-up">
              <Card className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Round Up</CardTitle>
                      <CardDescription className="text-sm">Грамматика</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/10 text-green-500">A1-A2</Badge>
                    <span className="text-xs text-muted-foreground">15 тем</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lessons/english-file/elementary/hello">
              <Card className="group border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Hello! (Demo)</CardTitle>
                      <CardDescription className="text-sm">Первый урок</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500/10 text-purple-500">A1</Badge>
                    <span className="text-xs text-muted-foreground">8 слайдов</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
                  <p className="text-sm text-muted-foreground">Продолжайте изучать английский!</p>
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
