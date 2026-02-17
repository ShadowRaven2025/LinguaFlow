'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'

const lessonSlides = [
  {
    id: 1,
    type: 'theory',
    title: 'Simple Animals - Простые животные',
    content: `
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐱</div>
          <div class="text-2xl font-bold">Cat</div>
          <div class="text-sm text-white/60">кошка</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐶</div>
          <div class="text-2xl font-bold">Dog</div>
          <div class="text-sm text-white/60">собака</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐦</div>
          <div class="text-2xl font-bold">Bird</div>
          <div class="text-sm text-white/60">птица</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐟</div>
          <div class="text-2xl font-bold">Fish</div>
          <div class="text-sm text-white/60">рыба</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐭</div>
          <div class="text-2xl font-bold">Mouse</div>
          <div class="text-sm text-white/60">мышь</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐰</div>
          <div class="text-2xl font-bold">Rabbit</div>
          <div class="text-sm text-white/60">кролик</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐴</div>
          <div class="text-2xl font-bold">Horse</div>
          <div class="text-sm text-white/60">лошадь</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐄</div>
          <div class="text-2xl font-bold">Cow</div>
          <div class="text-sm text-white/60">корова</div>
        </div>
        <div class="glass p-4 rounded-xl text-center">
          <div class="text-5xl mb-2">🐷</div>
          <div class="text-2xl font-bold">Pig</div>
          <div class="text-sm text-white/60">свинья</div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz',
    question: 'Как сказать "собака" по-английски?',
    options: ['Cat', 'Dog', 'Bird', 'Fish'],
    correct: 'Dog'
  },
  {
    id: 3,
    type: 'quiz',
    question: 'Какое животное говорит "Meow"?',
    options: ['Dog', 'Cat', 'Cow', 'Pig'],
    correct: 'Cat'
  },
  {
    id: 4,
    type: 'completion',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🐾</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Отлично!</h2>
        <p class="text-lg">Вы выучили названия животных!</p>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">+35</div>
            <div class="text-sm text-gray-500">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">9</div>
            <div class="text-sm text-gray-500">Животных</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function SimpleAnimalsLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('lessonProgressUpdate', {
      detail: { lessonId: '5', progress: Math.round(progress), completed: currentSlide === lessonSlides.length - 1 }
    }))
  }, [currentSlide, progress])

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
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english/a1">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />Back to A1
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
              <span className="text-3xl">🐾</span>
            </div>
            <div>
              <div className="text-orange-300 font-medium">Урок 5</div>
              <h1 className="text-3xl font-bold text-white mb-2">Simple Words - Animals</h1>
              <p className="text-white/80">Cat, dog, bird and other simple animals</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Прогресс</span>
              <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />12 мин</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" />35 XP</span>
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
              <div className="text-slate-200 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: slide.content || '' }} />
            )}

            {slide.type === 'quiz' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option: string, index: number) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className={`p-4 h-auto ${
                        showFeedback
                          ? option === slide.correct ? "bg-green-600" : selectedAnswer === option ? "bg-red-600" : "border-slate-600"
                          : selectedAnswer === option ? "bg-orange-600" : "border-slate-600"
                      }`}
                      onClick={() => { setSelectedAnswer(option); setShowFeedback(true); }}
                      disabled={showFeedback}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {slide.type === 'completion' && (
              <div className="text-slate-200" dangerouslySetInnerHTML={{ __html: slide.content || '' }} />
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <Button variant="outline" onClick={() => { if (currentSlide > 0) { setCurrentSlide(currentSlide - 1); setSelectedAnswer(null); setShowFeedback(false); }}} disabled={currentSlide === 0} className="border-slate-600">
                <ArrowLeft className="w-4 h-4 mr-2" />Back
              </Button>
              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/english/a1">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                    <CheckCircle className="w-4 h-4 mr-2" />Complete
                  </Button>
                </Link>
              ) : (
                <Button onClick={() => { setCurrentSlide(currentSlide + 1); setSelectedAnswer(null); setShowFeedback(false); }} disabled={slide.type === 'quiz' && !showFeedback} className="bg-orange-600">
                  Continue<ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}