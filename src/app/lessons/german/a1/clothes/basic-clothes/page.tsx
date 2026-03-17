'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowLeft, BookOpen, Play, Clock, Zap, CheckCircle, ArrowRight, Shirt } from 'lucide-react'

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
    title: 'Kleidung - Одежда',
    content: {
      sections: [
        {
          subtitle: 'Oberbekleidung (Верхняя одежда)',
          examples: [
            { word: 'das Hemd', translation: 'рубашка', emoji: '👔' },
            { word: 'die Jacke', translation: 'куртка', emoji: '🧥' },
            { word: 'der Pullover', translation: 'свитер', emoji: '🧶' },
            { word: 'das Kleid', translation: 'платье', emoji: '👗' }
          ]
        },
        {
          subtitle: 'Hose (Штаны)',
          examples: [
            { word: 'die Hose', translation: 'брюки', emoji: '👖' },
            { word: 'die Jeans', translation: 'джинсы', emoji: '👖' },
            { word: 'die Shorts', translation: 'шорты', emoji: '🩳' }
          ]
        },
        {
          subtitle: 'Schuhe (Обувь)',
          examples: [
            { word: 'die Schuhe', translation: 'туфли', emoji: '👞' },
            { word: 'die Stiefel', translation: 'ботинки', emoji: '👢' },
            { word: 'die Sneaker', translation: 'кроссовки', emoji: '👟' }
          ]
        },
        {
          subtitle: 'Accessoires',
          examples: [
            { word: 'der Hut', translation: 'шляпа', emoji: '🎩' },
            { word: 'die Mütze', translation: 'шапка', emoji: '🧢' },
            { word: 'die Handschuhe', translation: 'перчатки', emoji: '🧤' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Quiz',
    question: 'Как будет "брюки" по-немецки?',
    options: ['das Hemd', 'die Hose', 'die Jacke', 'die Schuhe'],
    correctAnswer: 1,
    explanation: 'Правильно! "die Hose" означает "брюки".'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Quiz',
    question: 'Какой артикль у слова "der Hut"?',
    options: ['der', 'die', 'das', 'den'],
    correctAnswer: 0,
    explanation: 'Верно! "der Hut" - мужской род (der).'
  },
  {
    id: 4,
    type: 'match',
    title: 'Соответствия',
    question: 'Сопоставьте слова с переводом:',
    pairs: [
      { left: 'das Hemd', right: 'рубашка' },
      { left: 'die Jacke', right: 'куртка' },
      { left: 'die Schuhe', right: 'туфли' },
      { left: 'der Pullover', right: 'свитер' }
    ]
  },
  {
    id: 5,
    type: 'quiz_multiple',
    title: 'Обувь',
    question: 'Какие слова относятся к обуви?',
    options: ['die Schuhe', 'die Hose', 'die Stiefel', 'das Hemd', 'die Sneaker', 'der Pullover'],
    correctAnswer: [0, 2, 4]
  },
  {
    id: 6,
    type: 'completion',
    title: 'Урок завершён! 🎉',
    content: {
      title: 'Поздравляем!',
      completion: true,
      stats: {
        xp: 50,
        words: 15,
        progress: 100
      }
    }
  }
]

export default function ClothesLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<{ [key: string]: string }>({})

  const progress = ((currentSlide + 1) / slides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: 'german-clothes',
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

  const isCorrectMatch = (slideId: number) => {
    const slideData = slides.find(s => s.id === slideId)
    if (!slideData || !slideData.pairs) return false
    
    const correctPairs = slideData.pairs.reduce((acc, pair) => {
      acc[pair.left] = pair.right
      return acc
    }, {} as { [key: string]: string })
    
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
      return isCorrectMatch(slide.id)
    }
    return false
  }

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
              <Link href="/lessons/german/a1/clothes">
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
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Shirt className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-purple-400 font-medium">German A1</div>
              <h1 className="text-3xl font-bold text-white mb-2">Kleidung</h1>
              <p className="text-white/80">Одежда на немецком языке</p>
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
                50 XP
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
            {slide.type === 'theory' && !slide.content?.completion && (
              <div className="space-y-8">
                {slide.content?.sections?.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-4">
                    <h3 className="text-xl font-semibold text-purple-400">{section.subtitle}</h3>
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
                <div className="text-6xl mb-6">👕</div>
                <h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2>
                <p className="text-xl text-white/80">You've learned clothing vocabulary!</p>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-slate-800/50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div>
                    <div className="text-sm text-white/60">XP</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl">
                    <div className="text-2xl font-bold text-blue-400">{slide.content.stats.words}</div>
                    <div className="text-sm text-white/60">Words</div>
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
                          ? "bg-purple-600 border-purple-500"
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
                  <div className="glass border border-purple-700/50 rounded-xl p-4">
                    <p className="text-purple-200">{slide.explanation}</p>
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
                            ? "bg-purple-600 border-purple-500"
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
                  className="bg-purple-600 hover:bg-purple-700"
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
                        {isCorrectAnswer() 
                          ? "Perfect!" 
                          : "Try again."
                        }
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
                    <h4 className="font-medium text-purple-400">German</h4>
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
                    <h4 className="font-medium text-green-400">Russian</h4>
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
                  className="bg-purple-600 hover:bg-purple-700"
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
                        {isCorrectAnswer() 
                          ? "Excellent!" 
                          : "Check your matches again."
                        }
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
                      index === currentSlide
                        ? 'bg-purple-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === slides.length - 1 ? (
                <Link href="/lessons/german/a1/clothes">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type !== 'theory' && slide.type !== 'completion' && !showFeedback}
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
