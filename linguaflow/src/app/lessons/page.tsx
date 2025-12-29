'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SearchDialog } from '@/components/search/search-dialog'
import { BookOpen, Brain, Trophy, Globe, CheckCircle, Search, Star, ArrowRight, Play, Users, Target } from 'lucide-react'

export default function LessonsPage() {
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Уроки</div>
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
                <Button variant="ghost" className="hover:bg-white/50">Дашборд</Button>
              </Link>
              <Link href="/flashcards">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                  <Brain className="w-4 h-4 mr-2" />
                  Карточки
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Интерактивное обучение</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Выберите язык
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              для изучения
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Начните свое путешествие в мир языков с интерактивными уроками, 
            адаптированными под ваш уровень знаний
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Уроков</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Уровней</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Языка</div>
            </div>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* English */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/20 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🇬🇧</div>
              <CardTitle className="text-2xl flex items-center justify-center gap-2 group-hover:text-red-600 transition-colors">
                <Globe className="w-6 h-6" />
                Английский язык
              </CardTitle>
              <CardDescription className="text-base">
                Изучайте английский от базового до продвинутого уровня
              </CardDescription>
              <div className="flex justify-center items-center gap-4 mt-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">A1-B2</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <Link href="/lessons/english/a1">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>A1 - Начальный</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/english/a2">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>A2 - Элементарный</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/english/b1">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>B1 - Средний</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/english/b2">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>B2 - Выше среднего</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                40+ уроков • 800+ упражнений
              </div>
            </CardContent>
          </Card>

          {/* German */}
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20 border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🇩🇪</div>
              <CardTitle className="text-2xl flex items-center justify-center gap-2 group-hover:text-yellow-600 transition-colors">
                <Globe className="w-6 h-6" />
                Немецкий язык
              </CardTitle>
              <CardDescription className="text-base">
                Освойте немецкий язык с нуля до свободного владения
              </CardDescription>
              <div className="flex justify-center items-center gap-4 mt-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">A1-B2</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <Link href="/lessons/german/a1">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>A1 - Anfänger</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/german/a2">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>A2 - Grundstufe</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/german/b1">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>B1 - Mittelstufe</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
                <Link href="/lessons/german/b2">
                  <Button className="w-full justify-between group/btn bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30" variant="outline">
                    <span>B2 - Oberstufe</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Доступно
                      </Badge>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                25+ уроков • 500+ упражнений
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Как это работает?
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Эффективная методика изучения языков с современными технологиями
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  Интерактивные уроки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Изучайте через разнообразные упражнения и тесты с мгновенной обратной связью
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                  Умные карточки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Запоминайте слова с помощью системы интервальных повторений
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                  Отслеживание прогресса
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Следите за своими достижениями и получайте мотивирующие награды
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <Target className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold mb-4">Готовы начать обучение?</h3>
          <p className="text-xl mb-8 opacity-90">
            Выберите язык и начните изучение уже сегодня
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons/english/a1">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Начать с английского
              </Button>
            </Link>
            <Link href="/lessons/german/a1">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/30 text-white hover:text-white">
                <Users className="w-5 h-5 mr-2" />
                Изучать немецкий
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}