'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Play, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'completion'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string
  explanation?: string
}

const lessonSlides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Farben - Цвета',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6">Основные цвета в немецком языке</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #ff0000, #cc0000)">
            <div class="text-2xl font-bold mb-2 text-white">rot</div>
            <div class="text-sm text-white/80">красный</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #ffa500, #ff8c00)">
            <div class="text-2xl font-bold mb-2 text-white">orange</div>
            <div class="text-sm text-white/80">оранжевый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #ffff00, #ffd700)">
            <div class="text-2xl font-bold mb-2 text-black">gelb</div>
            <div class="text-sm text-black/80">жёлтый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #008000, #006400)">
            <div class="text-2xl font-bold mb-2 text-white">grün</div>
            <div class="text-sm text-white/80">зелёный</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #0000ff, #0000cd)">
            <div class="text-2xl font-bold mb-2 text-white">blau</div>
            <div class="text-sm text-white/80">синий</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #800080, #4b0082)">
            <div class="text-2xl font-bold mb-2 text-white">lila</div>
            <div class="text-sm text-white/80">фиолетовый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #ffc0cb, #ff69b4)">
            <div class="text-2xl font-bold mb-2 text-black">rosa</div>
            <div class="text-sm text-black/80">розовый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #808080, #505050)">
            <div class="text-2xl font-bold mb-2 text-white">grau</div>
            <div class="text-sm text-white/80">серый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #000000, #333333)">
            <div class="text-2xl font-bold mb-2 text-white">schwarz</div>
            <div class="text-sm text-white/80">чёрный</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #ffffff, #e0e0e0)">
            <div class="text-2xl font-bold mb-2 text-black">weiß</div>
            <div class="text-sm text-black/80">белый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #8B4513, #654321)">
            <div class="text-2xl font-bold mb-2 text-white">braun</div>
            <div class="text-sm text-white/80">коричневый</div>
          </div>
          <div class="glass p-4 rounded-xl text-center" style="background: linear-gradient(135deg, #40E0D0, #20B2AA)">
            <div class="text-2xl font-bold mb-2 text-black">türkis</div>
            <div class="text-sm text-black/80">бирюзовый</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Farben Quiz',
    question: 'Как будет "красный" по-немецки?',
    options: ['rot', 'blau', 'grün', 'gelb'],
    correctAnswer: 'rot',
    explanation: 'Правильно! "rot" означает "красный".'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Farben Quiz',
    question: 'Какой цвет "blau"?',
    options: ['зелёный', 'синий', 'жёлтый', 'красный'],
    correctAnswer: 'синий',
    explanation: 'Верно! "blau" - это синий цвет.'
  },
  {
    id: 4,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🎨</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Поздравляем!</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Вы выучили основные цвета на немецком языке!
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ 12 цветов на немецком</li>
            <li>✅ Произношение каждого цвета</li>
            <li>✅ Названия основных цветов</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+35</div>
            <div class="text-sm text-gray-500">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">12</div>
            <div class="text-sm text-gray-500">Цветов</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function ColorsLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: 'colors',
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

  const nextSlide = () => {
    if (currentSlide < lessonSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const slide = lessonSlides[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/german/a1">
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
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">Урок</div>
              <h1 className="text-3xl font-bold text-white mb-2">Farben - Цвета</h1>
              <p className="text-white/80">Изучаем названия цветов на немецком</p>
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
                12 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                35 XP
              </span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-purple-400">#{slide.id}</span>
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
                          ? "bg-purple-600 border-purple-500"
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
                  <div className="glass border border-purple-700/50 rounded-xl p-4">
                    <p className="text-purple-200">{slide.explanation}</p>
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
                        ? 'bg-purple-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/german/a1">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Lesson
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type === 'quiz_single' && !showFeedback}
                  className="bg-purple-600 hover:bg-purple-700"
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
