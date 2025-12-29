'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchDialog } from "@/components/search/search-dialog";
import { BookOpen, Brain, Trophy, Search, Sparkles, Target, Users, Zap, Globe, Star, ArrowRight, Play } from "lucide-react";

export default function HomePage() {
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
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
                <div className="text-xs text-gray-500 dark:text-gray-400">Изучай с удовольствием</div>
              </div>
            </div>
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
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="sm:hidden bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Link href="/lessons">
                <Button variant="ghost" className="hover:bg-white/50">Уроки</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
                  Дашборд
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Новая эра изучения языков</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Изучайте языки
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-4">
              интерактивно
              <Zap className="w-16 h-16 text-yellow-500 animate-pulse" />
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Революционная платформа для изучения английского и немецкого языков 
            с ИИ-помощником, геймификацией и персонализированным подходом
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/lessons">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl text-lg px-8 py-4 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Начать изучение
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30 text-lg px-8 py-4">
                <Target className="w-5 h-5 mr-2" />
                Мой прогресс
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Уроков</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Упражнений</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Уровня</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                Интерактивные уроки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Изучайте язык через разнообразные упражнения: тесты, заполнение пропусков, сопоставление с мгновенной обратной связью
              </CardDescription>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">Тесты</Badge>
                <Badge variant="secondary">Диалоги</Badge>
                <Badge variant="secondary">Теория</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                ИИ-помощник
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Персонализированное обучение с адаптивными алгоритмами и умной системой повторения материала
              </CardDescription>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">Адаптация</Badge>
                <Badge variant="secondary">Анализ</Badge>
                <Badge variant="secondary">Рекомендации</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border-0 shadow-lg">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                Геймификация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                Получайте очки опыта, достижения, участвуйте в челленджах и соревнуйтесь с друзьями
              </CardDescription>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">XP</Badge>
                <Badge variant="secondary">Достижения</Badge>
                <Badge variant="secondary">Рейтинг</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Languages */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Доступные языки
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
            Выберите язык и начните свое путешествие в мир знаний
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Link href="/lessons/english/a1">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/20 border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🇬🇧</div>
                  <CardTitle className="text-2xl group-hover:text-red-600 transition-colors">
                    Английский язык
                  </CardTitle>
                  <CardDescription className="text-base">
                    От начального до продвинутого уровня
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">A1-B2</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    40+ уроков • 800+ упражнений
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/lessons/german/a1">
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20 border-0 shadow-lg">
                <CardHeader className="pb-6">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🇩🇪</div>
                  <CardTitle className="text-2xl group-hover:text-yellow-600 transition-colors">
                    Немецкий язык
                  </CardTitle>
                  <CardDescription className="text-base">
                    Систематическое изучение грамматики и лексики
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">A1-B2</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    25+ уроков • 500+ упражнений
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
          <Globe className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-bold mb-4">Готовы начать свое языковое путешествие?</h3>
          <p className="text-xl mb-8 opacity-90">
            Присоединяйтесь к тысячам студентов, которые уже изучают языки с LinguaFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                <Users className="w-5 h-5 mr-2" />
                Начать бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 mt-20 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LinguaFlow
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Изучайте языки с удовольствием и достигайте новых высот
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            &copy; 2024 LinguaFlow. Все права защищены.
          </p>
        </div>
      </footer>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
