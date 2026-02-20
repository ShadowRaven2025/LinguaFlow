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
    title: 'Wochentage - Дни недели',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6">Дни недели в немецком языке</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Montag</div>
            <div class="text-sm text-white/60">Понедельник</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Dienstag</div>
            <div class="text-sm text-white/60">Вторник</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Mittwoch</div>
            <div class="text-sm text-white/60">Среда</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Donnerstag</div>
            <div class="text-sm text-white/60">Четверг</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Freitag</div>
            <div class="text-sm text-white/60">Пятница</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Samstag</div>
            <div class="text-sm text-white/60">Суббота</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-2xl font-bold mb-2 text-white">Sonntag</div>
            <div class="text-sm text-white/60">Воскресенье</div>
          </div>
        </div>

        <div class="glass p-4 rounded-xl mt-6">
          <h3 class="text-lg font-bold mb-3 text-purple-400">Важные выражения</h3>
          <div class="space-y-2">
            <div class="flex justify-between"><span class="text-white">am Montag</span><span class="text-white/60">в понедельник</span></div>
            <div class="flex justify-between"><span class="text-white">am Wochenende</span><span class="text-white/60">на выходных</span></div>
            <div class="flex justify-between"><span class="text-white">heute</span><span class="text-white/60">сегодня</span></div>
            <div class="flex justify-between"><span class="text-white">morgen</span><span class="text-white/60">завтра</span></div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Wochentage Quiz',
    question: 'Как будет "пятница" по-немецки?',
    options: ['Freitag', 'Samstag', 'Donnerstag', 'Montag'],
    correctAnswer: 'Freitag',
    explanation: 'Правильно! "Freitag" означает "пятница".'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Wochentage Quiz',
    question: 'Какой день недели "Sonntag"?',
    options: ['Воскресенье', 'Суббота', 'Понедельник', 'Пятница'],
    correctAnswer: 'Воскресенье',
    explanation: 'Верно! "Sonntag" - это воскресенье.'
  },
  {
    id: 4,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">📅</div>
        <h2 class="text-2xl font-bold text-green-600">Поздравляем!</h2>
        <p class="text-lg">Вы выучили дни недели на немецком!</p>
        <div class="bg-green-50 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ 7 дней недели</li>
            <li>✅ Предлоги времени</li>
            <li>✅ Важные выражения</li>
          </ul>
        </div>
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

export default function DaysLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: { lessonId: 'days', progress: Math.round(progress), completed: currentSlide === lessonSlides.length - 1 }
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
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/german/a1">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
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
              <h1 className="text-3xl font-bold text-white mb-2">Wochentage</h1>
              <p className="text-white/80">Дни недели на немецком</p>
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
              <span className="text-purple-400">#{slide.id}</span>
              {slide.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {slide.type === 'theory' && (
              <div className="text-slate-200 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: slide.content || '' }} />
            )}
            {slide.type === 'quiz_single' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => (
                    <Button key={index} variant={selectedAnswer === option ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start ${showFeedback ? option === slide.correctAnswer ? "bg-green-600 hover:bg-green-600 border-green-500" : selectedAnswer === option ? "bg-red-600 hover:bg-red-600 border-red-500" : "border-slate-600" : selectedAnswer === option ? "bg-purple-600 border-purple-500" : "border-slate-600 hover:border-slate-500"}`}
                      onClick={() => !showFeedback && handleAnswer(option)} disabled={showFeedback}>
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
              <div className="text-slate-200" dangerouslySetInnerHTML={{ __html: slide.content || '' }} />
            )}
            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0} className="border-slate-600 hover:border-slate-500">
                <ArrowLeft className="w-4 h-4 mr-2" />Назад
              </Button>
              <div className="flex items-center gap-2">
                {lessonSlides.map((_, index) => (
                  <div key={index} className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-purple-500' : index < currentSlide ? 'bg-green-500' : 'bg-slate-600'}`} />
                ))}
              </div>
              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/german/a1">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                    <CheckCircle className="w-4 h-4 mr-2" />Завершить
                  </Button>
                </Link>
              ) : (
                <Button onClick={nextSlide} disabled={slide.type === 'quiz_single' && !showFeedback} className="bg-purple-600 hover:bg-purple-700">
                  Далее<ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
