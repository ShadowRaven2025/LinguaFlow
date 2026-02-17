'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Play, Clock, Zap, CheckCircle, ArrowRight, Volume2 } from 'lucide-react'
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
    title: 'English Alphabet - Английский алфавит',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6">В английском алфавите 26 букв</p>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Aa</div>
            <div class="text-sm text-white/60">[ei] - эй</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Bb</div>
            <div class="text-sm text-white/60">[bi:] - би</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Cc</div>
            <div class="text-sm text-white/60">[si:] - си</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Dd</div>
            <div class="text-sm text-white/60">[di:] - ди</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Ee</div>
            <div class="text-sm text-white/60">[i:] - и</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Ff</div>
            <div class="text-sm text-white/60">[ef] - эф</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Gg</div>
            <div class="text-sm text-white/60">[dʒi:] - джи</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Hh</div>
            <div class="text-sm text-white/60">[eitʃ] - эйч</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Ii</div>
            <div class="text-sm text-white/60">[ai] - ай</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Jj</div>
            <div class="text-sm text-white/60">[dʒei] - джей</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Kk</div>
            <div class="text-sm text-white/60">[kei] - кей</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Ll</div>
            <div class="text-sm text-white/60">[el] - эл</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Mm</div>
            <div class="text-sm text-white/60">[em] - эм</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Nn</div>
            <div class="text-sm text-white/60">[en] - эн</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Oo</div>
            <div class="text-sm text-white/60">[ou] - оу</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Pp</div>
            <div class="text-sm text-white/60">[pi:] - пи</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Qq</div>
            <div class="text-sm text-white/60">[kju:] - кью</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Rr</div>
            <div class="text-sm text-white/60">[a:] - а (ар)</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Ss</div>
            <div class="text-sm text-white/60">[es] - эс</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Tt</div>
            <div class="text-sm text-white/60">[ti:] - ти</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Uu</div>
            <div class="text-sm text-white/60">[ju:] - ю</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Vv</div>
            <div class="text-sm text-white/60">[vi:] - ви</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Ww</div>
            <div class="text-sm text-white/60">[dʌblju:] - дабл-ю</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Xx</div>
            <div class="text-sm text-white/60">[eks] - экс</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Yy</div>
            <div class="text-sm text-white/60">[wai] - уай</div>
          </div>
          <div class="glass p-4 rounded-xl text-center">
            <div class="text-4xl font-bold mb-2">Zz</div>
            <div class="text-sm text-white/60">[zed/zi:] - зед/зи</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Alphabet Quiz',
    question: 'Какая буква идет после "A"?',
    options: ['B', 'C', 'D', 'E'],
    correctAnswer: 'B',
    explanation: 'Правильно! После A идет B.'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Alphabet Quiz',
    question: 'Сколько букв в английском алфавите?',
    options: ['24', '26', '28', '30'],
    correctAnswer: '26',
    explanation: 'Верно! В английском алфавите 26 букв.'
  },
  {
    id: 4,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🔤</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Поздравляем!</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Вы выучили английский алфавит!
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ 26 букв английского алфавита</li>
            <li>✅ Произношение каждой буквы</li>
            <li>✅ Заглавные и строчные буквы</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+30</div>
            <div class="text-sm text-gray-500">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">26</div>
            <div class="text-sm text-gray-500">Букв</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function AlphabetLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  // Update progress when slide changes
  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: '1',
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
  const isCorrect = selectedAnswer === slide.correctAnswer

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
              </div>
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
        {/* Lesson Info */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">Урок 1</div>
              <h1 className="text-3xl font-bold text-white mb-2">English Alphabet</h1>
              <p className="text-white/80">Learn the 26 letters of the English alphabet</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Прогресс</span>
              <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                10 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                30 XP
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-blue-400">#{slide.id}</span>
              {slide.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theory Slide */}
            {slide.type === 'theory' && (
              <div 
                className="text-slate-200 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            {/* Quiz Single */}
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
                          ? "bg-blue-600 border-blue-500"
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

            {/* Completion */}
            {slide.type === 'completion' && (
              <div 
                className="text-slate-200"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            {/* Navigation */}
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
                        ? 'bg-blue-500'
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
                  disabled={slide.type === 'quiz_single' && !showFeedback}
                  className="bg-blue-600 hover:bg-blue-700"
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