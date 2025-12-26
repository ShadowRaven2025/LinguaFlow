'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchDialog } from "@/components/search/search-dialog";
import { BookOpen, Brain, Trophy, Search } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">LinguaFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2"
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
              className="sm:hidden"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Link href="/lessons">
              <Button variant="ghost">Уроки</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Дашборд</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Изучайте языки
            <span className="text-primary block">интерактивно</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Современная платформа для изучения английского и немецкого языков 
            с интерактивными уроками, карточками и системой достижений
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons">
              <Button size="lg" className="w-full sm:w-auto">
                Начать изучение
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Мой прогресс
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                Интерактивные уроки
              </CardTitle>
              <CardDescription>
                Изучайте язык через разнообразные упражнения: тесты, заполнение пропусков, сопоставление
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                Умные карточки
              </CardTitle>
              <CardDescription>
                Система интервального повторения помогает эффективно запоминать новые слова
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                Геймификация
              </CardTitle>
              <CardDescription>
                Получайте очки опыта, достижения и отслеживайте свой прогресс в изучении
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Languages */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Доступные языки
          </h2>
          <div className="flex justify-center gap-8">
            <Card className="w-48">
              <CardHeader>
                <div className="text-4xl mb-2">🇬🇧</div>
                <CardTitle>Английский</CardTitle>
                <CardDescription>
                  От начального до продвинутого уровня
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="w-48">
              <CardHeader>
                <div className="text-4xl mb-2">🇩🇪</div>
                <CardTitle>Немецкий</CardTitle>
                <CardDescription>
                  Систематическое изучение грамматики и лексики
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 LinguaFlow. Все права защищены.</p>
        </div>
      </footer>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
