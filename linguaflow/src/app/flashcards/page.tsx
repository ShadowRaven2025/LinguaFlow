'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Brain, BookOpen, TrendingUp, RotateCcw, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react'

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">L</span>
                </div>
                <span className="text-2xl font-bold">LinguaFlow</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/lessons">
                  <Button variant="outline">Уроки</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">Дашборд</Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Карточки для изучения слов
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Изучайте и повторяйте слова с помощью интеллектуальных карточек
            </p>
          </div>

          {/* Study Options */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="w-8 h-8 text-blue-600" />
                  Режим изучения
                </CardTitle>
                <CardDescription>
                  Изучайте новые слова и повторяйте уже знакомые с помощью системы интервального повторения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => setStudyMode('study')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Начать изучение
                  <Badge variant="outline" className="ml-auto">
                    {mockFlashcards.length} карточек
                  </Badge>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  Режим тестирования
                </CardTitle>
                <CardDescription>
                  Проверьте свои знания в различных форматах: написание слов, выбор переводов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" disabled>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Скоро доступно
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card className="mt-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Статистика изучения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockFlashcards.length}</div>
                  <div className="text-sm text-muted-foreground">Всего слов</div>
                  <Badge variant="outline" className="mt-1">Активно</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-muted-foreground">Изучено</div>
                  <Badge variant="secondary" className="mt-1">0%</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-muted-foreground">На повторении</div>
                  <Badge variant="outline" className="mt-1">Ожидает</Badge>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-muted-foreground">Новых сегодня</div>
                  <Badge variant="secondary" className="mt-1">Сегодня</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setStudyMode('browse')}>
                ← Назад к выбору
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Карточка {currentCard + 1} из {mockFlashcards.length}</span>
            <Badge variant="outline">
              {Math.round(((currentCard + 1) / mockFlashcards.length) * 100)}%
            </Badge>
          </div>
          <Progress value={((currentCard + 1) / mockFlashcards.length) * 100} className="h-2" />
        </div>
      </div>

      {/* Flashcard */}
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          <Card 
            className={`h-64 cursor-pointer transition-all duration-300 ${isFlipped ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center text-center p-8">
              {!isFlipped ? (
                <div className="space-y-4">
                  <div className="text-3xl font-bold">{card.word}</div>
                  <div className="text-lg text-muted-foreground flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    {card.transcription}
                  </div>
                  <Badge variant="outline">Нажмите, чтобы увидеть перевод</Badge>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">{card.translation}</div>
                  <div className="text-lg">{card.word}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    {card.transcription}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Предыдущая
            </Button>
            <Button variant="outline" onClick={handleNext}>
              Следующая
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Rating Buttons (shown when flipped) */}
          {isFlipped && (
            <div className="mt-6 space-y-2">
              <div className="text-center text-sm text-muted-foreground mb-3">
                Насколько хорошо вы знаете это слово?
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="destructive" onClick={() => handleRating('again')}>
                  Снова
                </Button>
                <Button variant="outline" onClick={() => handleRating('hard')}>
                  Трудно
                </Button>
                <Button variant="outline" onClick={() => handleRating('good')}>
                  Хорошо
                </Button>
                <Button onClick={() => handleRating('easy')}>
                  Легко
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}