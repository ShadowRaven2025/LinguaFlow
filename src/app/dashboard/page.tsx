'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { SearchDialog } from '@/components/search/search-dialog'
import { ProgressChart } from '@/components/charts/progress-chart'
import { calculateLevel } from '@/lib/utils'
import { BookOpen, Brain, Trophy, TrendingUp, Clock, Star, Search, Target, Calendar, ArrowRight, Play, Flame, GraduationCap, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showBreakEffect, setShowBreakEffect] = useState(false)
  const router = useRouter()

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

  if (!mounted) return null

  const mockUser = {
    name: 'Александр',
    xp: 1250,
    level: 3,
    streak: 7,
    totalLessons: 15,
    completedLessons: 8,
    wordsLearned: 156,
    studyTime: 420
  }

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

  const handleFakeLogout = () => {
    setShowBreakEffect(true)
    setTimeout(() => {
      router.push('/')
    }, 10000)
  }

  const [cracksVisible, setCracksVisible] = useState(false)
  const [holeVisible, setHoleVisible] = useState(false)

  useEffect(() => {
    if (showBreakEffect) {
      setCracksVisible(true)
      setTimeout(() => {
        setHoleVisible(true)
      }, 3000)
    }
  }, [showBreakEffect])

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg"></div>
      
      {/* Header */}
      <header className="relative z-10 glass border-b border-border/50 sticky top-0">
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
                <div className="text-xs text-muted-foreground">Дашборд</div>
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
              <Link href="/lessons">
                <Button variant="ghost" size="sm" className="hover:bg-secondary/80 transition-colors">Уроки</Button>
              </Link>
              <Link href="/achievements">
                <Button variant="outline" size="sm" className="hover:bg-secondary/80 transition-colors">
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
          <div className="flex items-center justify-between mb-4">
            <div className="animate-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              <h1 className="text-2xl md:text-3xl font-bold mb-1 text-foreground">
                Добро пожаловать, {mockUser.name}!
              </h1>
              <p className="text-muted-foreground">
                Продолжайте свое языковое путешествие
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4 animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold text-primary">{mockUser.streak}</span>
                </div>
                <div className="text-sm text-muted-foreground">дней подряд</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover border-border/50 opacity-0 animate-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Уровень</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">{currentLevel}</span>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">{mockUser.xp} XP</Badge>
                  </div>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">До уровня {currentLevel + 1}</span>
                  <span className="text-primary">{Math.round(progressToNextLevel)}%</span>
                </div>
                <Progress value={progressToNextLevel} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover border-border/50 opacity-0 animate-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Уроки</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-foreground">{mockUser.completedLessons}</span>
                    <span className="text-muted-foreground">/ {mockUser.totalLessons}</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Прогресс</span>
                  <span className="text-primary">{Math.round((mockUser.completedLessons / mockUser.totalLessons) * 100)}%</span>
                </div>
                <Progress value={(mockUser.completedLessons / mockUser.totalLessons) * 100} className="h-1.5" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover border-border/50 opacity-0 animate-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Слова изучено</p>
                  <span className="text-3xl font-bold text-foreground">{mockUser.wordsLearned}</span>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-muted-foreground">
                  +12 за последнюю неделю
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover border-border/50 opacity-0 animate-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Время изучения</p>
                  <span className="text-3xl font-bold text-foreground">{Math.floor(mockUser.studyTime / 60)}ч</span>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-muted-foreground">
                  {mockUser.studyTime % 60} минут сегодня
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart and Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 opacity-0 animate-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Прогресс за неделю
                </CardTitle>
                <CardDescription>
                  Ваша активность за последние 7 дней
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgressChart data={mockProgressData} />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {/* Streak Card */}
            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Серия дней</h3>
                    <p className="text-xs text-muted-foreground">Продолжайте изучать!</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{mockUser.streak}</div>
                  <div className="text-xs text-muted-foreground">дней подряд</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/lessons" className="block">
                  <Button className="w-full justify-start text-sm h-10 hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20 hover:shadow-primary/40">
                    <Play className="w-4 h-4 mr-2" />
                    Продолжить урок
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
                <Link href="/flashcards" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm h-10 hover:bg-secondary/80 transition-colors">
                    <Brain className="w-4 h-4 mr-2" />
                    Повторить слова
                  </Button>
                </Link>
                <Link href="/exercises" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm h-10 hover:bg-secondary/80 transition-colors">
                    <Target className="w-4 h-4 mr-2" />
                    Найти упражнения
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 opacity-0 animate-in-up" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-primary" />
              Последняя активность
            </CardTitle>
            <CardDescription>
              Ваши недавние достижения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
              <p className="font-medium">Пока нет активности</p>
              <p className="text-sm">Начните проходить уроки</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Logout Button */}
      <div className="fixed bottom-4 right-4 z-20">
        <Button 
          variant="ghost" 
          onClick={handleFakeLogout}
          className="logout-btn text-muted-foreground hover:text-foreground"
          title="Don't do it"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Выйти
        </Button>
      </div>

      {/* Screen Break Effect */}
      {showBreakEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* Red overlay */}
          <div className={`absolute inset-0 bg-red-900/90 ${cracksVisible ? 'animate-pulse' : ''}`} />
          
          {/* Cracks SVG - More realistic */}
          {cracksVisible && (
            <svg className="absolute inset-0 w-full h-full cracks-svg" viewBox="0 0 1000 800" preserveAspectRatio="none">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#glow)" className="cracks-group">
                {/* Main cracks from center */}
                <path d="M500 400 L480 350 L420 280 L380 200 L350 100" stroke="white" strokeWidth="4" fill="none" className="crack-line" />
                <path d="M500 400 L520 350 L580 280 L620 200 L650 100" stroke="white" strokeWidth="4" fill="none" className="crack-line" />
                <path d="M500 400 L480 450 L420 520 L380 600 L350 700" stroke="white" strokeWidth="4" fill="none" className="crack-line" />
                <path d="M500 400 L520 450 L580 520 L620 600 L650 700" stroke="white" strokeWidth="4" fill="none" className="crack-line" />
                <path d="M500 400 L500 300 L500 150" stroke="white" strokeWidth="3" fill="none" className="crack-line" />
                <path d="M500 400 L500 500 L500 650" stroke="white" strokeWidth="3" fill="none" className="crack-line" />
                
                {/* Secondary cracks */}
                <path d="M420 280 L350 280 L280 270 L200 280" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M580 280 L650 280 L720 270 L800 280" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M420 520 L350 520 L280 530 L200 520" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M580 520 L650 520 L720 530 L800 520" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                
                {/* Smaller branches */}
                <path d="M380 200 L320 180 L250 190" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M380 200 L400 150 L420 80" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M620 200 L680 180 L750 190" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M620 200 L600 150 L580 80" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M380 600 L320 620 L250 610" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M380 600 L400 650 L420 720" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M620 600 L680 620 L750 610" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M620 600 L600 650 L580 720" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                
                {/* Center cracks */}
                <path d="M500 400 L450 380 L400 390" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M500 400 L550 380 L600 390" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M500 400 L450 420 L400 410" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                <path d="M500 400 L550 420 L600 410" stroke="white" strokeWidth="2" fill="none" className="crack-line" />
                
                {/* Random small cracks */}
                <path d="M200 280 L180 220 L150 180" stroke="white" strokeWidth="1.5" fill="none" className="crack-line" />
                <path d="M800 280 L820 220 L850 180" stroke="white" strokeWidth="1.5" fill="none" className="crack-line" />
                <path d="M200 520 L180 580 L150 620" stroke="white" strokeWidth="1.5" fill="none" className="crack-line" />
                <path d="M800 520 L820 580 L850 620" stroke="white" strokeWidth="1.5" fill="none" className="crack-line" />
              </g>
            </svg>
          )}
          
          {/* Hole with Eye - appears after 3 seconds */}
          {holeVisible && (
            <div className="absolute hole-effect">
              {/* Dark hole background */}
              <div className="absolute inset-0 bg-black rounded-full hole-bg" />
              
              {/* Crack around hole */}
              <svg className="absolute inset-0 w-full h-full hole-cracks" viewBox="0 0 300 300" preserveAspectRatio="none">
                <path d="M150 150 L130 100 L100 50" stroke="white" strokeWidth="3" fill="none" className="crack-line" />
                <path d="M150 150 L170 100 L200 50" stroke="white" strokeWidth="3" fill="none" className="crack-line" />
                <path d="M150 150 L130 200 L100 250" stroke="white" strokeWidth="3" fill="none" className="crack-line" />
                <path d="M150 150 L170 200 L200 250" stroke="white" strokeWidth="3" fill="none" className="crack-line" />
              </svg>
              
              {/* Eye in the hole */}
              <div className="relative z-10">
                <img 
                  src="/images/eye.jpg" 
                  alt="eye" 
                  className="w-48 h-48 object-contain animate-pulse eye-in-hole"
                />
              </div>
            </div>
          )}
          
          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-red-600 text-6xl md:text-8xl font-bold animate-pulse drop-shadow-lg text-shake">
              You can't escape
            </h1>
          </div>
        </div>
      )}

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
