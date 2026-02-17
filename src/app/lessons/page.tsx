'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchDialog } from '@/components/search/search-dialog'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, Brain, Trophy, Globe, CheckCircle, Search, Star, ArrowRight, Play, Users, Target, GraduationCap, Sparkles, Volume2 } from 'lucide-react'

export default function LessonsPage() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setMounted(true)
    audioRef.current = new Audio('/music/Die Bots - Was wollen wir trinken.mp3')
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const playGermanMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }

  if (!mounted) return null

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
                <div className="text-xs text-muted-foreground">Уроки</div>
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
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-secondary/80 transition-colors">Дашборд</Button>
              </Link>
              <Link href="/flashcards">
                <Button variant="outline" size="sm" className="hover:bg-secondary/80 transition-colors">
                  <Brain className="w-4 h-4 mr-2" />
                  Карточки
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
              Интерактивное обучение
            </Badge>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Выберите язык</span>
              <br />
              <span className="text-gradient">для изучения</span>
            </h1>
          </div>
          
          <div className="animate-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Начните свое путешествие в мир языков с интерактивными уроками
            </p>
          </div>

          {/* Stats */}
          <div className="animate-in-up opacity-0 flex justify-center gap-8 md:gap-16" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Уроков</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Уровней</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">2</div>
              <div className="text-sm text-muted-foreground">Языка</div>
            </div>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* English */}
          <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover border-border/50 hover:border-primary/30 opacity-0 animate-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <CardHeader className="text-center pb-4">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">🇬🇧</div>
              <CardTitle className="text-xl flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
                Английский язык
              </CardTitle>
              <CardDescription>
                От базового до продвинутого уровня
              </CardDescription>
              <div className="flex justify-center items-center gap-3 mt-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">A1-B2</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Link href="/lessons/english/a1">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>A1 - Начальный</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/english/a2">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>A2 - Элементарный</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/english/b1">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>B1 - Средний</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/english/b2">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>B2 - Выше среднего</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                40+ уроков • 800+ упражнений
              </div>
            </CardContent>
          </Card>

          {/* German */}
          <Card 
            className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 card-hover border-border/50 hover:border-primary/30 opacity-0 animate-in-up cursor-pointer" 
            style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            onClick={playGermanMusic}
          >
            <CardHeader className="text-center pb-4">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                🇩🇪
                <Volume2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardTitle className="text-xl flex items-center justify-center gap-2 group-hover:text-primary transition-colors">
                <Globe className="w-5 h-5" />
                Немецкий язык
              </CardTitle>
              <CardDescription>
                Освойте с нуля до свободного владения
              </CardDescription>
              <div className="flex justify-center items-center gap-3 mt-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">A1-B2</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Link href="/lessons/german/a1">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>A1 - Начальный</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/german/a2">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>A2 - Элементарный</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/german/b1">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>B1 - Средний</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступ</Badge>
                      но
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/german/b2">
                  <Button variant="outline" className="w-full justify-between group/btn hover:bg-secondary/80 transition-colors">
                    <span>B2 - Выше среднего</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                25+ уроков • 500+ упражнений
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How it works */}
        <div className="text-center mb-12">
          <div className="animate-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
              Как это работает?
            </h2>
            <p className="text-muted-foreground mb-8">
              Эффективная методика изучения языков
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Уроки</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Интерактивные упражнения с мгновенной обратной связью
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Карточки</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Запоминайте слова с интервальными повторениями
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 card-hover opacity-0 animate-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Trophy className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Прогресс</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Отслеживайте достижения и получайте награды
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="opacity-0 animate-in-up" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <Card className="text-center border-primary/20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse"></div>
            <CardContent className="p-8 relative">
              <Target className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold mb-2 text-foreground">Готовы начать?</h3>
              <p className="text-muted-foreground mb-6">Выберите язык и начните изучение уже сегодня</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/lessons/english/a1">
                  <Button className="hover:scale-105 transition-transform duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40">
                    <Play className="w-4 h-4 mr-2" />
                    Английский
                  </Button>
                </Link>
                <Link href="/lessons/german/a1">
                  <Button variant="outline" className="hover:scale-105 transition-transform duration-300 hover:bg-secondary/80" onClick={playGermanMusic}>
                    <Users className="w-4 h-4 mr-2" />
                    Немецкий
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
