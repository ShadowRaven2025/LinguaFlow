'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { SearchDialog } from '@/components/search/search-dialog'
import { Brain, BookOpen, TrendingUp, RotateCcw, ArrowLeft, ArrowRight, Volume2, Search, Sparkles, Target } from 'lucide-react'

const mockFlashcards = [
  { id: 1, word: 'hello', translation: 'привет', transcription: '/həˈloʊ/' },
  { id: 2, word: 'good morning', translation: 'доброе утро', transcription: '/ɡʊd ˈmɔrnɪŋ/' },
  { id: 3, word: 'thank you', translation: 'спасибо', transcription: '/θæŋk ju/' },
  { id: 4, word: 'goodbye', translation: 'до свидания', transcription: '/ɡʊdˈbaɪ/' },
  { id: 5, word: 'please', translation: 'пожалуйста', transcription: '/pliːz/' }
]

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studyMode, setStudyMode] = useState<'browse' | 'study'>('browse')
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

  const card = mockFlashcards[currentCard]

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % mockFlashcards.length)
    setIsFlipped(false)
  }

  const handlePrevious = () => {
    setCurrentCard((prev) => (prev - 1 + mockFlashcards.length) % mockFlashcards.length)
    setIsFlipped(false)
  }

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    // В реальном приложении здесь будет логика SRS
    console.log(`Rated card ${card.id} as ${rating}`)
    handleNext()
  }

  if (studyMode === 'browse') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    LinguaFlow
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Карточки</div>
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
                  <Button variant="ghost" className="hover:bg-white/50">Уроки</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Интеллектуальные карточки</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent">
                Изучайте слова
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                эффективно
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Используйте систему интервальных повторений для запоминания новых слов 
              и закрепления уже изученного материала
            </p>
          </div>

          {/* Study Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                  Режим изучения
                </CardTitle>
                <CardDescription className="text-base">
                  Изучайте новые слова и повторяйте уже знакомые с помощью системы интервального повторения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg text-lg py-6" 
                  onClick={() => setStudyMode('study')}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Начать изучение
                  <Badge variant="secondary" className="ml-auto bg-white/20 text-white hover:bg-white/20">
                    {mockFlashcards.length} карточек
                  </Badge>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-green-600 transition-colors">
                  Режим тестирования
                </CardTitle>
                <CardDescription className="text-base">
                  Проверьте свои знания в различных форматах: написание слов, выбор переводов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full text-lg py-6" variant="outline" disabled>
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Скоро доступно
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                Статистика изучения
              </CardTitle>
              <CardDescription>
                Ваш прогресс в изучении новых слов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{mockFlashcards.length}</div>
                  <div className="text-sm text-muted-foreground mb-2">Всего слов</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Активно</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
                  <div className="text-sm text-muted-foreground mb-2">Изучено</div>
                  <Badge variant="secondary">0%</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                  <div className="text-sm text-muted-foreground mb-2">На повторении</div>
                  <Badge variant="outline">Ожидает</Badge>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
                  <div className="text-sm text-muted-foreground mb-2">Новых сегодня</div>
                  <Badge variant="secondary">Сегодня</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl p-12 text-white shadow-2xl">
            <Target className="w-16 h-16 mx-auto mb-6 animate-pulse" />
            <h3 className="text-3xl font-bold mb-4">Начните изучение слов прямо сейчас!</h3>
            <p className="text-xl mb-8 opacity-90">
              Эффективная система запоминания поможет вам быстро расширить словарный запас
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-4"
              onClick={() => setStudyMode('study')}
            >
              <Brain className="w-5 h-5 mr-2" />
              Начать изучение
            </Button>
          </div>
        </main>

        {/* Search Dialog */}
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">Изучение карточек</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setStudyMode('browse')}
                className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к выбору
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Progress */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Карточка {currentCard + 1} из {mockFlashcards.length}</span>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              {Math.round(((currentCard + 1) / mockFlashcards.length) * 100)}%
            </Badge>
          </div>
          <Progress value={((currentCard + 1) / mockFlashcards.length) * 100} className="h-3" />
        </div>
      </div>

      {/* Flashcard */}
      <main className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-lg">
          <Card 
            className={`h-80 cursor-pointer transition-all duration-500 shadow-2xl border-0 ${
              isFlipped 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20' 
                : 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20'
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center text-center p-8">
              {!isFlipped ? (
                <div className="space-y-6">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">{card.word}</div>
                  <div className="text-xl text-muted-foreground flex items-center justify-center gap-3">
                    <Volume2 className="w-5 h-5 text-blue-500" />
                    <span className="font-mono">{card.transcription}</span>
                  </div>
                  <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                    Нажмите, чтобы увидеть перевод
                  </Badge>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-3xl font-bold text-green-700 dark:text-green-300">{card.translation}</div>
                  <div className="text-2xl text-gray-700 dark:text-gray-300">{card.word}</div>
                  <div className="text-lg text-muted-foreground flex items-center justify-center gap-3">
                    <Volume2 className="w-5 h-5 text-green-500" />
                    <span className="font-mono">{card.transcription}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Предыдущая
            </Button>
            <Button 
              variant="outline" 
              onClick={handleNext}
              className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
            >
              Следующая
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Rating Buttons (shown when flipped) */}
          {isFlipped && (
            <div className="mt-8 space-y-4">
              <div className="text-center text-sm text-muted-foreground mb-4">
                Насколько хорошо вы знаете это слово?
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="destructive" 
                  onClick={() => handleRating('again')}
                  className="py-3"
                >
                  Снова
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRating('hard')}
                  className="py-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
                >
                  Трудно
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleRating('good')}
                  className="py-3 bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
                >
                  Хорошо
                </Button>
                <Button 
                  onClick={() => handleRating('easy')}
                  className="py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Легко
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}