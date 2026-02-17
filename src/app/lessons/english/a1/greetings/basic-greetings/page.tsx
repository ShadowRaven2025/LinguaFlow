'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'match' | 'completion'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string
  pairs?: { left: string; right: string }[]
  explanation?: string
}

const lessonSlides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Basic Greetings - Базовые приветствия',
    content: `
      <div class="space-y-6">
        <h3 class="text-xl font-semibold mb-4">Приветствия 👋</h3>
        <div class="grid gap-4">
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Hello</div>
            <div class="text-white/60">Привет / Здравствуйте (универсальное)</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Hi</div>
            <div class="text-white/60">Привет (неформальное)</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Good morning</div>
            <div class="text-white/60">Доброе утро (до 12:00)</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Good afternoon</div>
            <div class="text-white/60">Добрый день (12:00-18:00)</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Good evening</div>
            <div class="text-white/60">Добрый вечер (после 18:00)</div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold mb-4 mt-8">Прощания 👋</h3>
        <div class="grid gap-4">
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Goodbye</div>
            <div class="text-white/60">До свидания (формальное)</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Bye</div>
            <div class="text-white/60">Пока (неформальное)</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">See you</div>
            <div class="text-white/60">Увидимся</div>
          </div>
          <div class="glass p-4 rounded-xl">
            <div class="text-2xl font-bold mb-2">Good night</div>
            <div class="text-white/60">Спокойной ночи (перед сном)</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Greetings Quiz',
    question: 'Как сказать "Привет" по-английски?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    explanation: 'Правильно! "Hello" означает "Привет" или "Здравствуйте".'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Time of Day',
    question: 'Какое приветствие использовать утром?',
    options: ['Good evening', 'Good morning', 'Good night', 'Good afternoon'],
    correctAnswer: 'Good morning',
    explanation: 'Верно! "Good morning" говорят утром до 12:00.'
  },
  {
    id: 4,
    type: 'match',
    title: 'Match Greetings',
    question: 'Соедините английские фразы с русскими:',
    pairs: [
      { left: 'Hi', right: 'Привет' },
      { left: 'Goodbye', right: 'До свидания' },
      { left: 'Good evening', right: 'Добрый вечер' },
      { left: 'See you', right: 'Увидимся' }
    ]
  },
  {
    id: 5,
    type: 'quiz_single',
    title: 'Saying Goodbye',
    question: 'Что сказать перед сном?',
    options: ['Good morning', 'Good night', 'Good afternoon', 'Goodbye'],
    correctAnswer: 'Good night',
    explanation: 'Правильно! "Good night" говорят перед сном.'
  },
  {
    id: 6,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">👋</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Отлично!</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Вы выучили базовые приветствия!
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Hello, Hi - приветствия</li>
            <li>✅ Good morning/afternoon/evening</li>
            <li>✅ Goodbye, Bye - прощания</li>
            <li>✅ Good night, See you</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+25</div>
            <div class="text-sm text-gray-500">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">9</div>
            <div class="text-sm text-gray-500">Фраз</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function BasicGreetingsLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: '2',
        progress: Math.round(progress),
        completed: currentSlide === lessonSlides.length - 1
      }
    })
    window.dispatchEvent(progressEvent)
  }, [currentSlide, progress])

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
  }

  const handleMatch = (item: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setSelectedLeft(item)
    } else if (selectedLeft) {
      setMatchedPairs({ ...matchedPairs, [selectedLeft]: item })
      setSelectedLeft(null)
    }
  }

  const nextSlide = () => {
    if (currentSlide < lessonSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setMatchedPairs({})
      setSelectedLeft(null)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setMatchedPairs({})
      setSelectedLeft(null)
    }
  }

  const slide = lessonSlides[currentSlide]
  const isCorrect = selectedAnswer === slide.correctAnswer

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english/a1">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A1
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-green-300 font-medium">Урок 2</div>
              <h1 className="text-3xl font-bold text-white mb-2">Basic Greetings</h1>
              <p className="text-white/80">Hello, Hi, Good morning, Good bye</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Прогресс</span>
              <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                8 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                25 XP
              </span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-green-400">#{slide.id}</span>
              {slide.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {slide.type === 'theory' && (
              <div 
                className="text-slate-200 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            {slide.type === 'quiz_single' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start ${
                        showFeedback
                          ? option === slide.correctAnswer
                            ? "bg-green-600 hover:bg-green-600 border-green-500"
                            : selectedAnswer === option
                            ? "bg-red-600 hover:bg-red-600 border-red-500"
                            : "border-slate-600"
                          : selectedAnswer === option
                          ? "bg-green-600 border-green-500"
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                      onClick={() => !showFeedback && handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showFeedback && slide.explanation && (
                  <div className="glass border border-blue-700/50 rounded-xl p-4">
                    <p className="text-blue-200">{slide.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {slide.type === 'match' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white/80 mb-3">English</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`left-${index}`}
                        variant="outline"
                        className={`w-full text-left justify-start ${
                          selectedLeft === pair.left
                            ? "bg-green-600 border-green-500"
                            : matchedPairs[pair.left]
                            ? "bg-green-600 border-green-500"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                        onClick={() => handleMatch(pair.left, 'left')}
                        disabled={!!matchedPairs[pair.left]}
                      >
                        {pair.left}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white/80 mb-3">Русский</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`right-${index}`}
                        variant="outline"
                        className={`w-full text-left justify-start ${
                          Object.values(matchedPairs).includes(pair.right)
                            ? "bg-green-600 border-green-500"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                        onClick={() => handleMatch(pair.right, 'right')}
                        disabled={Object.values(matchedPairs).includes(pair.right)}
                      >
                        {pair.right}
                      </Button>
                    ))}
                  </div>
                </div>
                {Object.keys(matchedPairs).length === slide.pairs?.length && (
                  <div className="glass border border-green-700/50 rounded-xl p-4">
                    <p className="text-green-200">Отлично! Все фразы соединены правильно! 🎉</p>
                  </div>
                )}
              </div>
            )}

            {slide.type === 'completion' && (
              <div 
                className="text-slate-200"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="border-slate-600 hover:border-slate-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex items-center gap-2">
                {lessonSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide
                        ? 'bg-green-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/english/a1">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Lesson
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={
                    (slide.type === 'quiz_single' && !showFeedback) ||
                    (slide.type === 'match' && Object.keys(matchedPairs).length !== slide.pairs?.length)
                  }
                  className="bg-green-600 hover:bg-green-700"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}