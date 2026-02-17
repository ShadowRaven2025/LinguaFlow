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
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'completion'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  fillText?: string
  fillAnswers?: string[]
}

const lessonSlides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Past Simple - Regular Verbs',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6 text-white/90">Правильные глаголы в прошедшем времени</p>
        
        <div class="glass p-6 rounded-xl mb-6 border border-white/10">
          <h3 class="text-xl font-bold mb-4 text-primary">Правило: добавляем -ed</h3>
          <p class="text-white/80">Для образования Past Simple с правильными глаголами добавляем окончание -ed</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="glass p-4 rounded-xl border-l-4 border-primary">
            <div class="text-3xl mb-2">💼</div>
            <div class="text-xl font-bold mb-2 text-white">work → worked</div>
            <div class="text-sm text-white/60">работать → работал</div>
          </div>
          <div class="glass p-4 rounded-xl border-l-4 border-white/20">
            <div class="text-3xl mb-2">⚽</div>
            <div class="text-xl font-bold mb-2 text-white">play → played</div>
            <div class="text-sm text-white/60">играть → играл</div>
          </div>
          <div class="glass p-4 rounded-xl border-l-4 border-white/20">
            <div class="text-3xl mb-2">📺</div>
            <div class="text-xl font-bold mb-2 text-white">watch → watched</div>
            <div class="text-sm text-white/60">смотреть → смотрел</div>
          </div>
          <div class="glass p-4 rounded-xl border-l-4 border-white/20">
            <div class="text-3xl mb-2">🎧</div>
            <div class="text-xl font-bold mb-2 text-white">listen → listened</div>
            <div class="text-sm text-white/60">слушать → слушал</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'theory',
    title: 'Special Cases - Особые случаи',
    content: `
      <div class="space-y-6">
        <div class="glass p-6 rounded-xl border border-white/10">
          <h3 class="text-xl font-bold mb-4 text-primary">Особые правила написания</h3>
          
          <div class="space-y-4">
            <div class="glass p-4 rounded-xl border-l-4 border-primary">
              <div class="text-lg font-bold mb-2 text-white">📚 study → studied</div>
              <div class="text-white/80">Если глагол заканчивается на согласную + y, меняем y на i и добавляем -ed</div>
            </div>
            
            <div class="glass p-4 rounded-xl border-l-4 border-white/20">
              <div class="text-lg font-bold mb-2 text-white">🛑 stop → stopped</div>
              <div class="text-white/80">Если глагол заканчивается на одну согласную после краткой гласной, удваиваем согласную</div>
            </div>
            
            <div class="glass p-4 rounded-xl border-l-4 border-white/20">
              <div class="text-lg font-bold mb-2 text-white">❤️ like → liked</div>
              <div class="text-white/80">Если глагол заканчивается на -e, просто добавляем -d</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Quiz Time!',
    question: 'What is the past form of "work"?',
    options: ['works', 'worked', 'working', 'work'],
    correctAnswer: 'worked',
    explanation: 'Правильно! Добавляем -ed: work → worked'
  },
  {
    id: 4,
    type: 'quiz_single',
    title: 'Spelling Rules',
    question: 'What is the past form of "study"?',
    options: ['studyed', 'studied', 'studyied', 'studies'],
    correctAnswer: 'studied',
    explanation: 'Верно! Y меняется на I: study → studied'
  },
  {
    id: 5,
    type: 'quiz_multiple',
    title: 'Regular Verbs',
    question: 'Which verbs are regular (add -ed)?',
    options: ['work', 'go', 'play', 'see', 'watch', 'eat'],
    correctAnswer: ['work', 'play', 'watch'],
    explanation: 'Правильно! work, play, watch - правильные глаголы. go, see, eat - неправильные.'
  },
  {
    id: 6,
    type: 'fill_gap',
    title: 'Complete the Story',
    question: 'Fill in the past forms:',
    fillText: 'Yesterday I ___ (work) all day. Then I ___ (watch) TV and ___ (listen) to music.',
    fillAnswers: ['worked', 'watched', 'listened'],
    explanation: 'Отлично! Все глаголы правильные, добавляем -ed'
  },
  {
    id: 7,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Отличная работа!</h2>
        <p class="text-lg text-gray-300">
          Вы изучили Past Simple с правильными глаголами!
        </p>
        <div class="bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Правило добавления -ed</li>
            <li>✅ Особые случаи написания</li>
            <li>✅ Практика с примерами</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-400">+50</div>
            <div class="text-sm text-gray-400">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-400">20</div>
            <div class="text-sm text-gray-400">минут</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function PastSimpleRegularLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [fillInputs, setFillInputs] = useState<string[]>([])

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: 'a2-1',
        progress: Math.round(progress),
        completed: currentSlide === lessonSlides.length - 1
      }
    })
    window.dispatchEvent(progressEvent)
  }, [currentSlide, progress])

  const handleAnswer = (answer: string | string[]) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
  }

  const handleMultipleChoice = (option: string) => {
    const current = (selectedAnswer as string[]) || []
    if (current.includes(option)) {
      setSelectedAnswer(current.filter(a => a !== option))
    } else {
      setSelectedAnswer([...current, option])
    }
  }

  const nextSlide = () => {
    if (currentSlide < lessonSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setFillInputs([])
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setFillInputs([])
    }
  }

  const slide = lessonSlides[currentSlide]
  
  const isCorrect = () => {
    if (slide.type === 'quiz_single') {
      return selectedAnswer === slide.correctAnswer
    } else if (slide.type === 'quiz_multiple') {
      const selected = (selectedAnswer as string[] || []).sort()
      const correct = (slide.correctAnswer as string[] || []).sort()
      return JSON.stringify(selected) === JSON.stringify(correct)
    } else if (slide.type === 'fill_gap') {
      return JSON.stringify(fillInputs.map(a => a.toLowerCase())) === 
             JSON.stringify(slide.fillAnswers?.map(a => a.toLowerCase()))
    }
    return false
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#101922' }}>
      <div className="gradient-bg"></div>
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
              <Link href="/lessons/english/a2">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A2
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">A2 - Урок 1</div>
              <h1 className="text-3xl font-bold text-white mb-2">Past Simple - Regular Verbs</h1>
              <p className="text-white/80">Learn past tense with regular verbs</p>
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
                20 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                50 XP
              </span>
            </div>
          </div>
        </div>

        <Card className="glass-dark backdrop-blur-sm shadow-2xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-blue-400">#{slide.id}</span>
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
                  <div className={`border rounded-xl p-4 ${
                    isCorrect() 
                      ? 'glass border-green-700/50' 
                      : 'bg-red-900/30 border-red-700/50'
                  }`}>
                    <p className={isCorrect() ? 'text-green-200' : 'text-red-200'}>
                      {slide.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {slide.type === 'quiz_multiple' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => {
                    const selected = (selectedAnswer as string[] || [])
                    const isSelected = selected.includes(option)
                    return (
                      <Button
                        key={index}
                        variant={isSelected ? "default" : "outline"}
                        className={`p-4 h-auto text-left justify-start ${
                          showFeedback
                            ? (slide.correctAnswer as string[]).includes(option)
                              ? "bg-green-600 hover:bg-green-600 border-green-500"
                              : isSelected
                              ? "bg-red-600 hover:bg-red-600 border-red-500"
                              : "border-slate-600"
                            : isSelected
                            ? "bg-blue-600 border-blue-500"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                        onClick={() => !showFeedback && handleMultipleChoice(option)}
                        disabled={showFeedback}
                      >
                        {option}
                      </Button>
                    )
                  })}
                </div>
                {!showFeedback && (
                  <Button 
                    onClick={() => handleAnswer(selectedAnswer || [])}
                    disabled={(selectedAnswer as string[] || []).length === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Check Answer
                  </Button>
                )}
                {showFeedback && slide.explanation && (
                  <div className={`border rounded-xl p-4 ${
                    isCorrect() 
                      ? 'glass border-green-700/50' 
                      : 'bg-red-900/30 border-red-700/50'
                  }`}>
                    <p className={isCorrect() ? 'text-green-200' : 'text-red-200'}>
                      {slide.explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {slide.type === 'fill_gap' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="glass p-6 rounded-xl text-lg leading-relaxed text-white/90 border-l-4 border-primary">
                  {slide.fillText?.split('___').map((part, index) => (
                    <span key={index}>
                      {part}
                      {index < (slide.fillAnswers?.length || 0) && (
                        <input
                          type="text"
                          className="mx-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded w-32 text-center text-white"
                          value={fillInputs[index] || ''}
                          onChange={(e) => {
                            const newInputs = [...fillInputs]
                            newInputs[index] = e.target.value
                            setFillInputs(newInputs)
                          }}
                          disabled={showFeedback}
                          placeholder="?"
                        />
                      )}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-white/60">
                  Hint: Use past forms (add -ed)
                </div>
                {!showFeedback && (
                  <Button 
                    onClick={() => handleAnswer(fillInputs)}
                    disabled={fillInputs.length !== slide.fillAnswers?.length}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Check Story
                  </Button>
                )}
                {showFeedback && slide.explanation && (
                  <div className={`border rounded-xl p-4 ${
                    isCorrect() 
                      ? 'glass border-green-700/50' 
                      : 'bg-red-900/30 border-red-700/50'
                  }`}>
                    <p className={isCorrect() ? 'text-green-200' : 'text-red-200'}>
                      {isCorrect() ? slide.explanation : `Correct answers: ${slide.fillAnswers?.join(', ')}`}
                    </p>
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
                        ? 'bg-blue-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/english/a2">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Lesson
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type !== 'theory' && !showFeedback}
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
