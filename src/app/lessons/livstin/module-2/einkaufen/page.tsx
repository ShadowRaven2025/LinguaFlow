'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft, BookOpen, Play, Clock, Zap, CheckCircle, ArrowRight, ShoppingCart } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'match' | 'completion'
  title: string
  content?: any
  question?: string
  options?: string[]
  correctAnswer?: number | number[] | string
  explanation?: string
  pairs?: { left: string; right: string }[]
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Покупки в магазине',
    content: {
      sections: [
        {
          subtitle: 'Полезные фразы',
          examples: [
            { word: 'Ich möchte...', translation: 'Я хотел бы...', emoji: '🛒' },
            { word: 'Was kostet das?', translation: 'Сколько это стоит?', emoji: '💰' },
            { word: 'Ich nehme das', translation: 'Я возьму это', emoji: '✅' },
            { word: 'Das ist zu teuer', translation: 'Это слишком дорого', emoji: '💸' },
            { word: 'Kann ich mit Karte zahlen?', translation: 'Можно оплатить картой?', emoji: '💳' }
          ]
        },
        {
          subtitle: 'В магазине',
          examples: [
            { word: 'der Supermarkt', translation: 'супермаркет', emoji: '🏪' },
            { word: 'die Kassiererin', translation: 'кассир', emoji: '👩‍💼' },
            { word: 'die Einkaufstasche', translation: 'сумка для покупок', emoji: '🛍️' },
            { word: 'das Geld', translation: 'деньги', emoji: '💵' },
            { word: 'der Preis', translation: 'цена', emoji: '🏷️' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Тест',
    question: 'Как спросить "Сколько это стоит?"',
    options: ['Was kostet das?', 'Ich möchte das', 'Das ist teuer', 'Kann ich zahlen?'],
    correctAnswer: 0,
    explanation: 'Was kostet das? - прямой перевод "Что это стоит?"'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Тест',
    question: 'Что означает "Ich nehme das"?',
    options: ['Я хочу это', 'Я возьму это', 'Мне нужно это', 'Это моё'],
    correctAnswer: 1,
    explanation: 'nehmen - брать/взять'
  },
  {
    id: 4,
    type: 'match',
    title: 'Соответствия',
    question: 'Сопоставьте слова:',
    pairs: [
      { left: 'Supermarkt', right: 'супермаркет' },
      { left: 'Preis', right: 'цена' },
      { left: 'Geld', right: 'деньги' },
      { left: 'Karte', right: 'карта' }
    ]
  },
  {
    id: 5,
    type: 'quiz_multiple',
    title: 'Выберите фразы для покупок',
    question: 'Какие фразы можно использовать в магазине?',
    options: ['Guten Tag', 'Was kostet das?', 'Ich möchte Brot', 'Auf Wiedersehen', 'Das ist zu teuer', 'Wie spät ist es?'],
    correctAnswer: [1, 2, 4]
  },
  {
    id: 6,
    type: 'completion',
    title: 'Урок завершён! 🎉',
    content: {
      title: 'Поздравляем!',
      completion: true,
      stats: {
        xp: 40,
        phrases: 10,
        progress: 100
      }
    }
  }
]

export default function EinkaufenLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({})

  const progress = ((currentSlide + 1) / slides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: 'livstin-einkaufen',
        progress: Math.round(progress),
        completed: currentSlide === slides.length - 1
      }
    })
    window.dispatchEvent(progressEvent)
  }, [currentSlide, progress])

  const handleAnswer = (answer: any) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
  }

  const handleMatch = (left: string, right: string) => {
    const newPairs = { ...matchedPairs }
    newPairs[left] = right
    setMatchedPairs(newPairs)
  }

  const isCorrectMatch = () => {
    const slideData = slides.find(s => s.id === currentSlide + 1)
    if (!slideData || !slideData.pairs) return false
    const correctPairs = slideData.pairs.reduce((acc: { [key: string]: string }, pair) => {
      acc[pair.left] = pair.right
      return acc
    }, {})
    return JSON.stringify(matchedPairs) === JSON.stringify(correctPairs)
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setMatchedPairs({})
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setMatchedPairs({})
    }
  }

  const slide = slides[currentSlide]

  const isCorrectAnswer = () => {
    if (slide.type === 'quiz_single') {
      return selectedAnswer === slide.correctAnswer
    } else if (slide.type === 'quiz_multiple') {
      const correct = slide.correctAnswer as number[]
      return JSON.stringify((selectedAnswer || []).sort()) === JSON.stringify(correct.sort())
    } else if (slide.type === 'match') {
      return isCorrectMatch()
    }
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/livstin/module-2">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
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
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-blue-400 font-medium">Модуль 2 - Урок 1</div>
              <h1 className="text-3xl font-bold text-white mb-2">Einkaufen</h1>
              <p className="text-white/80">Покупки</p>
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
                25 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                40 XP
              </span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-blue-400">#{slide.id}</span>
              {slide.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {slide.type === 'theory' && !slide.content?.completion && (
              <div className="space-y-8">
                {slide.content?.sections?.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-400">{section.subtitle}</h3>
                    <div className="grid gap-3">
                      {section.examples.map((example: any, exampleIndex: number) => (
                        <div key={exampleIndex} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                          <span className="text-3xl">{example.emoji}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-white text-lg">{example.word}</div>
                            <div className="text-white/60">{example.translation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {slide.type === 'completion' && (
              <div className="text-center space-y-6">
                <div className="text-6xl mb-6">🛒</div>
                <h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2>
                <p className="text-xl text-white/80">You've learned shopping phrases!</p>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-slate-800/50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div>
                    <div className="text-sm text-white/60">XP</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400">{slide.content.stats.phrases}</div>
                    <div className="text-sm text-white/60">Phrases</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">{slide.content.stats.progress}%</div>
                    <div className="text-sm text-white/60">Done</div>
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'quiz_single' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === index ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start ${
                        showFeedback
                          ? option === slide.correctAnswer
                            ? "bg-green-600 hover:bg-green-600 border-green-500"
                            : selectedAnswer === index
                            ? "bg-red-600 hover:bg-red-600 border-red-500"
                            : "border-slate-600"
                          : selectedAnswer === index
                          ? "bg-blue-600 border-blue-500"
                          : "border-slate-600 hover:border-slate-500 text-white"
                      }`}
                      onClick={() => !showFeedback && handleAnswer(index)}
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

            {slide.type === 'quiz_multiple' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => {
                    const selected = (selectedAnswer || []).includes(index)
                    return (
                      <Button
                        key={index}
                        variant={selected ? "default" : "outline"}
                        className={`p-4 h-auto text-left justify-start ${
                          showFeedback
                            ? (slide.correctAnswer as number[]).includes(index)
                              ? "bg-green-600 hover:bg-green-600 border-green-500"
                              : selected
                              ? "bg-red-600 hover:bg-red-600 border-red-500"
                              : "border-slate-600"
                            : selected
                            ? "bg-blue-600 border-blue-500"
                            : "border-slate-600 hover:border-slate-500 text-white"
                        }`}
                        onClick={() => {
                          if (showFeedback) return
                          const newSelected = selected
                            ? (selectedAnswer || []).filter((i: number) => i !== index)
                            : [...(selectedAnswer || []), index]
                          setSelectedAnswer(newSelected)
                        }}
                        disabled={showFeedback}
                      >
                        {option}
                      </Button>
                    )
                  })}
                </div>
                <Button 
                  onClick={() => handleAnswer(selectedAnswer)}
                  disabled={!selectedAnswer || (selectedAnswer || []).length === 0 || showFeedback}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Check
                </Button>
                {showFeedback && (
                  <div className={`p-4 rounded-xl border ${
                    isCorrectAnswer() 
                      ? 'glass border-green-500 text-green-300' 
                      : 'bg-red-900/30 border-red-500 text-red-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isCorrectAnswer() ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span>✗</span>
                      )}
                      <span>
                        {isCorrectAnswer() ? "Perfect!" : "Try again."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {slide.type === 'match' && (
              <div className="space-y-6">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-blue-400">German</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`left-${index}`}
                        variant="outline"
                        className="w-full justify-start bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white"
                        onClick={() => handleMatch(pair.left, pair.right)}
                        disabled={showFeedback}
                      >
                        {pair.left} → {matchedPairs[pair.left] || '?'}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-blue-400">Russian</h4>
                    {slide.pairs?.map((pair, index) => (
                      <div key={`right-${index}`} className="p-3 bg-slate-800/30 border border-slate-600 rounded text-center text-white">
                        {pair.right}
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  onClick={() => handleAnswer(matchedPairs)}
                  disabled={Object.keys(matchedPairs).length !== slide.pairs?.length || showFeedback}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Check
                </Button>
                {showFeedback && (
                  <div className={`p-4 rounded-xl border ${
                    isCorrectAnswer() 
                      ? 'glass border-green-500 text-green-300' 
                      : 'bg-red-900/30 border-red-500 text-red-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isCorrectAnswer() ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span>✗</span>
                      )}
                      <span>
                        {isCorrectAnswer() ? "Excellent!" : "Check again."}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="border-slate-600 hover:border-slate-500 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide ? 'bg-blue-500' : index < currentSlide ? 'bg-blue-500/50' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === slides.length - 1 ? (
                <Link href="/lessons/livstin/module-2">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type !== 'theory' && slide.type !== 'completion' && !showFeedback}
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
