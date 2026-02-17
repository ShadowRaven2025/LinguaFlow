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
    title: 'Numbers 1-10 - Числа от 1 до 10',
    content: `
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">1</div>
          <div class="text-xl font-semibold">One</div>
          <div class="text-sm text-white/60">один</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">2</div>
          <div class="text-xl font-semibold">Two</div>
          <div class="text-sm text-white/60">два</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">3</div>
          <div class="text-xl font-semibold">Three</div>
          <div class="text-sm text-white/60">три</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">4</div>
          <div class="text-xl font-semibold">Four</div>
          <div class="text-sm text-white/60">четыре</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">5</div>
          <div class="text-xl font-semibold">Five</div>
          <div class="text-sm text-white/60">пять</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">6</div>
          <div class="text-xl font-semibold">Six</div>
          <div class="text-sm text-white/60">шесть</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">7</div>
          <div class="text-xl font-semibold">Seven</div>
          <div class="text-sm text-white/60">семь</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">8</div>
          <div class="text-xl font-semibold">Eight</div>
          <div class="text-sm text-white/60">восемь</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">9</div>
          <div class="text-xl font-semibold">Nine</div>
          <div class="text-sm text-white/60">девять</div>
        </div>
        <div class="glass p-6 rounded-xl text-center">
          <div class="text-5xl font-bold mb-2">10</div>
          <div class="text-xl font-semibold">Ten</div>
          <div class="text-sm text-white/60">десять</div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz',
    question: 'Как сказать "три" по-английски?',
    options: ['Two', 'Three', 'Four', 'Five'],
    correct: 'Three'
  },
  {
    id: 3,
    type: 'quiz',
    question: 'Сколько будет 5 + 3?',
    options: ['Seven', 'Eight', 'Nine', 'Ten'],
    correct: 'Eight'
  },
  {
    id: 4,
    type: 'completion',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🔢</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Отлично!</h2>
        <p class="text-lg">Вы выучили числа от 1 до 10!</p>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+30</div>
            <div class="text-sm text-gray-500">XP</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function Numbers110Lesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('lessonProgressUpdate', {
      detail: { lessonId: '3', progress: Math.round(progress), completed: currentSlide === lessonSlides.length - 1 }
    }))
  }, [currentSlide, progress])

  const slide = lessonSlides[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
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
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">Урок 3</div>
              <h1 className="text-3xl font-bold text-white mb-2">Numbers 1-10</h1>
              <p className="text-white/80">Learn to count from one to ten</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Прогресс</span>
              <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />10 мин</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" />30 XP</span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-indigo-400">#{slide.id}</span>
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
                          : selectedAnswer === option ? "bg-indigo-600" : "border-slate-600"
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
                <Button onClick={() => { setCurrentSlide(currentSlide + 1); setSelectedAnswer(null); setShowFeedback(false); }} disabled={slide.type === 'quiz' && !showFeedback} className="bg-indigo-600">
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