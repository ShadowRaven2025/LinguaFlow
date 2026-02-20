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
    title: 'Essen und Trinken - Еда и напитки',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6">Продукты питания и напитки</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h3 class="text-xl font-bold text-green-400">🍎 Фрукты и овощи</h3>
            <div class="glass p-4 rounded-xl">
              <div class="space-y-2">
                <div class="flex justify-between"><span class="text-white">der Apfel</span><span class="text-white/60">яблоко</span></div>
                <div class="flex justify-between"><span class="text-white">die Orange</span><span class="text-white/60">апельсин</span></div>
                <div class="flex justify-between"><span class="text-white">die Banane</span><span class="text-white/60">банан</span></div>
                <div class="flex justify-between"><span class="text-white">das Gemüse</span><span class="text-white/60">овощи</span></div>
                <div class="flex justify-between"><span class="text-white">der Salat</span><span class="text-white/60">салат</span></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-xl font-bold text-orange-400">🍞 Еда</h3>
            <div class="glass p-4 rounded-xl">
              <div class="space-y-2">
                <div class="flex justify-between"><span class="text-white">das Brot</span><span class="text-white/60">хлеб</span></div>
                <div class="flex justify-between"><span class="text-white">die Butter</span><span class="text-white/60">масло</span></div>
                <div class="flex justify-between"><span class="text-white">der Käse</span><span class="text-white/60">сыр</span></div>
                <div class="flex justify-between"><span class="text-white">das Fleisch</span><span class="text-white/60">мясо</span></div>
                <div class="flex justify-between"><span class="text-white">der Fisch</span><span class="text-white/60">рыба</span></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-xl font-bold text-blue-400">🥤 Напитки</h3>
            <div class="glass p-4 rounded-xl">
              <div class="space-y-2">
                <div class="flex justify-between"><span class="text-white">das Wasser</span><span class="text-white/60">вода</span></div>
                <div class="flex justify-between"><span class="text-white">der Kaffee</span><span class="text-white/60">кофе</span></div>
                <div class="flex justify-between"><span class="text-white">der Tee</span><span class="text-white/60">чай</span></div>
                <div class="flex justify-between"><span class="text-white">die Milch</span><span class="text-white/60">молоко</span></div>
                <div class="flex justify-between"><span class="text-white">der Saft</span><span class="text-white/60">сок</span></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-xl font-bold text-yellow-400">🍰 Десерты</h3>
            <div class="glass p-4 rounded-xl">
              <div class="space-y-2">
                <div class="flex justify-between"><span class="text-white">der Kuchen</span><span class="text-white/60">торт/пирог</span></div>
                <div class="flex justify-between"><span class="text-white">der Zucker</span><span class="text-white/60">сахар</span></div>
                <div class="flex justify-between"><span class="text-white">die Schokolade</span><span class="text-white/60">шоколад</span></div>
                <div class="flex justify-between"><span class="text-white">das Eis</span><span class="text-white/60">мороженое</span></div>
                <div class="flex justify-between"><span class="text-white">der Honig</span><span class="text-white/60">мёд</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Essen Quiz',
    question: 'Как будет "хлеб" по-немецки?',
    options: ['das Brot', 'der Kaffee', 'die Milch', 'der Apfel'],
    correctAnswer: 'das Brot',
    explanation: 'Правильно! "das Brot" означает "хлеб".'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Essen Quiz',
    question: 'Какой артикль у слова "die Orange"?',
    options: ['der', 'die', 'das', 'den'],
    correctAnswer: 'die',
    explanation: 'Верно! "die Orange" - женский род (die).'
  },
  {
    id: 4,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🍽️</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Поздравляем!</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Вы выучили названия продуктов питания на немецком!
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Фрукты и овощи</li>
            <li>✅ Основные продукты</li>
            <li>✅ Напитки</li>
            <li>✅ Десерты</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+45</div>
            <div class="text-sm text-gray-500">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">20</div>
            <div class="text-sm text-gray-500">Слов</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function FoodLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: 'food',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
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
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">Урок</div>
              <h1 className="text-3xl font-bold text-white mb-2">Essen und Trinken</h1>
              <p className="text-white/80">Еда и напитки на немецком языке</p>
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
                15 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                45 XP
              </span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-orange-400">#{slide.id}</span>
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
                          ? "bg-orange-600 border-orange-500"
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
                  <div className="glass border border-orange-700/50 rounded-xl p-4">
                    <p className="text-orange-200">{slide.explanation}</p>
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
                        ? 'bg-orange-500'
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
                  className="bg-orange-600 hover:bg-orange-700"
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
