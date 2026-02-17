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
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match' | 'completion'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
  fillText?: string
  fillAnswers?: string[]
  pairs?: { left: string; right: string }[]
}

const lessonSlides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Past Simple - Irregular Verbs',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6 text-white/90">Неправильные глаголы в прошедшем времени</p>
        
        <div class="glass p-6 rounded-xl mb-6 border border-white/10">
          <h3 class="text-xl font-bold mb-4 text-primary">Важно!</h3>
          <p class="text-white/80">Неправильные глаголы НЕ следуют правилу -ed. Их нужно запомнить!</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="glass p-4 rounded-xl border-l-4 border-primary">
            <div class="text-3xl mb-2">🚶</div>
            <div class="text-xl font-bold mb-2 text-white">go → went</div>
            <div class="text-sm text-white/60">идти → пошел</div>
          </div>
          <div class="glass p-4 rounded-xl border-l-4 border-white/20">
            <div class="text-3xl mb-2">👀</div>
            <div class="text-xl font-bold mb-2 text-white">see → saw</div>
            <div class="text-sm text-white/60">видеть → видел</div>
          </div>
          <div class="glass p-4 rounded-xl border-l-4 border-white/20">
            <div class="text-3xl mb-2">🍽️</div>
            <div class="text-xl font-bold mb-2 text-white">eat → ate</div>
            <div class="text-sm text-white/60">есть → ел</div>
          </div>
          <div class="glass p-4 rounded-xl border-l-4 border-white/20">
            <div class="text-3xl mb-2">🚪</div>
            <div class="text-xl font-bold mb-2 text-white">come → came</div>
            <div class="text-sm text-white/60">приходить → пришел</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'theory',
    title: 'More Irregular Verbs',
    content: `
      <div class="space-y-6">
        <div class="glass p-6 rounded-xl border border-white/10">
          <h3 class="text-xl font-bold mb-4 text-primary">Еще неправильные глаголы</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="glass p-4 rounded-xl border-l-4 border-primary">
              <div class="text-lg font-bold mb-2 text-white">✋ take → took</div>
              <div class="text-white/80">брать → взял</div>
            </div>
            
            <div class="glass p-4 rounded-xl border-l-4 border-white/20">
              <div class="text-lg font-bold mb-2 text-white">🔨 make → made</div>
              <div class="text-white/80">делать → сделал</div>
            </div>
            
            <div class="glass p-4 rounded-xl border-l-4 border-white/20">
              <div class="text-lg font-bold mb-2 text-white">💰 buy → bought</div>
              <div class="text-white/80">покупать → купил</div>
            </div>
            
            <div class="glass p-4 rounded-xl border-l-4 border-white/20">
              <div class="text-lg font-bold mb-2 text-white">🎁 give → gave</div>
              <div class="text-white/80">давать → дал</div>
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
    question: 'What is the past form of "go"?',
    options: ['goed', 'went', 'gone', 'goes'],
    correctAnswer: 'went',
    explanation: 'Правильно! go → went (неправильный глагол)'
  },
  {
    id: 4,
    type: 'match',
    title: 'Match the Verbs',
    question: 'Соедините глаголы с их формами прошедшего времени:',
    pairs: [
      { left: 'see', right: 'saw' },
      { left: 'eat', right: 'ate' },
      { left: 'come', right: 'came' },
      { left: 'take', right: 'took' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Complete the Story',
    question: 'Fill in the irregular past forms:',
    fillText: 'Yesterday I ___ (go) to the park. I ___ (see) my friend and we ___ (eat) lunch together.',
    fillAnswers: ['went', 'saw', 'ate'],
    explanation: 'Отлично! Все глаголы неправильные: go→went, see→saw, eat→ate'
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Irregular Verbs',
    question: 'Which are irregular verbs (don\'t add -ed)?',
    options: ['go', 'work', 'see', 'play', 'eat', 'watch'],
    correctAnswer: ['go', 'see', 'eat'],
    explanation: 'Правильно! go, see, eat - неправильные глаголы. work, play, watch - правильные.'
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
          Вы изучили неправильные глаголы в Past Simple!
        </p>
        <div class="bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Неправильные глаголы не следуют правилу -ed</li>
            <li>✅ go→went, see→saw, eat→ate</li>
            <li>✅ take→took, make→made, buy→bought</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-400">+55</div>
            <div class="text-sm text-gray-400">XP</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-400">22</div>
            <div class="text-sm text-gray-400">минут</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function PastSimpleIrregularLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [fillInputs, setFillInputs] = useState<string[]>([])
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: 'a2-2',
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
      setFillInputs([])
      setMatchedPairs({})
      setSelectedLeft(null)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setFillInputs([])
      setMatchedPairs({})
      setSelectedLeft(null)
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
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english/a2/grammar">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Grammar
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
              <div className="text-primary font-medium">A2 - Урок 2</div>
              <h1 className="text-3xl font-bold text-white mb-2">Past Simple - Irregular Verbs</h1>
              <p className="text-white/80">Learn common irregular past forms</p>
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
                22 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                55 XP
              </span>
            </div>
          </div>
        </div>

        <Card className="glass-dark backdrop-blur-sm shadow-2xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-indigo-400">#{slide.id}</span>
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
                          ? "bg-indigo-600 border-indigo-500"
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
                            ? "bg-indigo-600 border-indigo-500"
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
                    className="bg-indigo-600 hover:bg-indigo-700"
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

            {slide.type === 'match' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white/80 mb-3">Present</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`left-${index}`}
                        variant="outline"
                        className={`w-full text-left justify-start ${
                          selectedLeft === pair.left
                            ? "bg-indigo-600 border-indigo-500"
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
                    <h4 className="font-semibold text-white/80 mb-3">Past</h4>
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
                    <p className="text-green-200">Отлично! Все глаголы соединены правильно! 🎉</p>
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
                  Hint: Use irregular past forms (went, saw, ate)
                </div>
                {!showFeedback && (
                  <Button 
                    onClick={() => handleAnswer(fillInputs)}
                    disabled={fillInputs.length !== slide.fillAnswers?.length}
                    className="bg-indigo-600 hover:bg-indigo-700"
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
                        ? 'bg-indigo-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/english/a2/grammar">
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
                    (slide.type === 'quiz_multiple' && !showFeedback) ||
                    (slide.type === 'fill_gap' && !showFeedback) ||
                    (slide.type === 'match' && Object.keys(matchedPairs).length !== slide.pairs?.length)
                  }
                  className="bg-indigo-600 hover:bg-indigo-700"
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
