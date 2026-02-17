'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, Play, Clock, Star, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match'
  title: string
  content?: any
  question?: string
  options?: string[]
  correctAnswer?: number | number[]
  pairs?: { left: string; right: string }[]
  fillText?: string
  fillAnswers?: string[]
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Simple Phrases',
    content: {
      title: 'Polite and useful phrases',
      sections: [
        {
          subtitle: 'Polite Expressions',
          examples: [
            { word: 'Thank you', translation: 'Спасибо', emoji: '🙏' },
            { word: 'Please', translation: 'Пожалуйста (просьба)', emoji: '🙂' },
            { word: "You're welcome", translation: 'Пожалуйста (ответ)', emoji: '😊' },
            { word: 'Excuse me', translation: 'Извините', emoji: '🙋' },
            { word: 'Sorry', translation: 'Прости(те)', emoji: '😔' }
          ]
        },
        {
          subtitle: 'Common Responses',
          examples: [
            { word: 'Yes', translation: 'Да', emoji: '✅' },
            { word: 'No', translation: 'Нет', emoji: '❌' },
            { word: 'OK / Okay', translation: 'Хорошо', emoji: '👍' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Polite Phrases',
    question: 'How do you say "Спасибо" in English?',
    options: ['Please', 'Thank you', 'Sorry', 'Excuse me'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Responses',
    question: 'What is the polite response to "Thank you"?',
    options: ['Sorry', "You're welcome", 'Excuse me', 'Please'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'match',
    title: 'Match the Phrases',
    question: 'Match English phrases with Russian translations:',
    pairs: [
      { left: 'Thank you', right: 'Спасибо' },
      { left: 'Please', right: 'Пожалуйста' },
      { left: 'Excuse me', right: 'Извините' },
      { left: 'Sorry', right: 'Прости(те)' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Complete the Dialogue',
    question: 'Fill in the polite phrases:',
    fillText: '___, can you help me? ___ you! ___ welcome!',
    fillAnswers: ['Excuse me', 'Thank', "You're"]
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Polite Words',
    question: 'Which phrases are used to be polite?',
    options: ['Thank you', 'No', 'Please', 'Yes', 'Sorry', "You're welcome"],
    correctAnswer: [0, 2, 4, 5]
  },
  {
    id: 7,
    type: 'theory',
    title: 'Lesson Complete! 🎉',
    content: {
      title: 'Great job!',
      completion: true,
      stats: {
        xp: 35,
        time: 12,
        progress: 100
      }
    }
  }
]

export default function SimplePhrasesLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})
  const [selectedPairs, setSelectedPairs] = useState<{ [key: string]: string }>({})
  const [fillInputs, setFillInputs] = useState<string[]>([])

  const slide = slides[currentSlide]
  const progress = Math.round(((currentSlide + 1) / slides.length) * 100)

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: '9',
        progress: progress,
        completed: currentSlide === slides.length - 1
      }
    })
    window.dispatchEvent(progressEvent)
  }, [currentSlide, progress])

  const handleAnswer = (answer: any) => {
    setUserAnswers(prev => ({ ...prev, [slide.id]: answer }))
    setShowFeedback(prev => ({ ...prev, [slide.id]: true }))
  }

  const isCorrectAnswer = (slideId: number, answer: any) => {
    const slideData = slides.find(s => s.id === slideId)
    if (!slideData) return false

    if (slideData.type === 'quiz_single') {
      return answer === slideData.correctAnswer
    } else if (slideData.type === 'quiz_multiple') {
      const correct = slideData.correctAnswer as number[]
      return JSON.stringify(answer.sort()) === JSON.stringify(correct.sort())
    } else if (slideData.type === 'match') {
      const correctPairs = slideData.pairs?.reduce((acc, pair) => {
        acc[pair.left] = pair.right
        return acc
      }, {} as { [key: string]: string })
      return JSON.stringify(answer) === JSON.stringify(correctPairs)
    } else if (slideData.type === 'fill_gap') {
      return JSON.stringify(answer.map((a: string) => a.toLowerCase())) === 
             JSON.stringify(slideData.fillAnswers?.map(a => a.toLowerCase()))
    }
    return false
  }

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        if (slide.content.completion) {
          return (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2>
              <p className="text-xl text-white/80 dark:text-white/80">You've learned polite phrases!</p>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-slate-800/50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div>
                  <div className="text-sm text-white/60">XP</div>
                </div>
                <div className="bg-slate-800/50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">{slide.content.stats.time}</div>
                  <div className="text-sm text-white/60">min</div>
                </div>
                <div className="bg-slate-800/50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{slide.content.stats.progress}%</div>
                  <div className="text-sm text-white/60">done</div>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{slide.content.title}</h2>
              <p className="text-slate-600 dark:text-white/80">Essential phrases for everyday communication</p>
            </div>
            
            {slide.content.sections?.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">{section.subtitle}</h3>
                <div className="grid gap-3">
                  {section.examples.map((example: any, exampleIndex: number) => (
                    <div key={exampleIndex} className="flex items-center gap-4 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50">
                      <span className="text-3xl">{example.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-white text-lg">{example.word}</div>
                        <div className="text-slate-600 dark:text-white/60">{example.translation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'quiz_single':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{slide.question}</h3>
            <div className="grid gap-3">
              {slide.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswers[slide.id] === index ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4 bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback[slide.id]}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'bg-green-50 dark:glass border-green-500 text-green-700 dark:text-green-300' 
                  : 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Correct! Well done!" 
                      : `Incorrect. The correct answer is: ${slide.options?.[slide.correctAnswer as number]}`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 'quiz_multiple':
        const selectedMultiple = userAnswers[slide.id] || []
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{slide.question}</h3>
            <div className="grid gap-3">
              {slide.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedMultiple.includes(index) ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4 bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                  onClick={() => {
                    const newSelected = selectedMultiple.includes(index)
                      ? selectedMultiple.filter((i: number) => i !== index)
                      : [...selectedMultiple, index]
                    setUserAnswers(prev => ({ ...prev, [slide.id]: newSelected }))
                  }}
                  disabled={showFeedback[slide.id]}
                >
                  {option}
                </Button>
              ))}
            </div>
            <Button 
              onClick={() => handleAnswer(selectedMultiple)}
              disabled={selectedMultiple.length === 0 || showFeedback[slide.id]}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Check Answer
            </Button>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'bg-green-50 dark:glass border-green-500 text-green-700 dark:text-green-300' 
                  : 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Perfect! You selected all polite phrases!" 
                      : "Try again. Polite phrases are: Thank you, Please, Sorry, You're welcome"
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 'match':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{slide.question}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-teal-600 dark:text-teal-400">English</h4>
                {slide.pairs?.map((pair, index) => (
                  <Button
                    key={`left-${index}`}
                    variant="outline"
                    className="w-full justify-start bg-slate-100 dark:bg-slate-800/30 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
                    onClick={() => {
                      const newPairs = { ...selectedPairs }
                      newPairs[pair.left] = pair.right
                      setSelectedPairs(newPairs)
                    }}
                    disabled={showFeedback[slide.id]}
                  >
                    {pair.left} → {selectedPairs[pair.left] || '?'}
                  </Button>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-green-600 dark:text-green-400">Russian</h4>
                {slide.pairs?.map((pair, index) => (
                  <div key={`right-${index}`} className="p-3 bg-slate-100 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-600 rounded text-center text-slate-900 dark:text-white">
                    {pair.right}
                  </div>
                ))}
              </div>
            </div>
            <Button 
              onClick={() => handleAnswer(selectedPairs)}
              disabled={Object.keys(selectedPairs).length !== slide.pairs?.length || showFeedback[slide.id]}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Check Matches
            </Button>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'bg-green-50 dark:glass border-green-500 text-green-700 dark:text-green-300' 
                  : 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Excellent! All matches are correct!" 
                      : "Check your matches again."
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 'fill_gap':
        const parts = slide.fillText?.split('___') || []
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{slide.question}</h3>
            <div className="text-lg leading-relaxed bg-slate-100 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
              {parts.map((part, index) => (
                <span key={index} className="text-slate-900 dark:text-white">
                  {part}
                  {index < parts.length - 1 && (
                    <input
                      type="text"
                      className="mx-2 px-3 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded w-32 text-center text-slate-900 dark:text-white"
                      value={fillInputs[index] || ''}
                      onChange={(e) => {
                        const newInputs = [...fillInputs]
                        newInputs[index] = e.target.value
                        setFillInputs(newInputs)
                      }}
                      disabled={showFeedback[slide.id]}
                      placeholder="?"
                    />
                  )}
                </span>
              ))}
            </div>
            <div className="text-sm text-slate-600 dark:text-white/60">
              Hint: Use polite phrases from the lesson
            </div>
            <Button 
              onClick={() => handleAnswer(fillInputs)}
              disabled={fillInputs.length !== slide.fillAnswers?.length || showFeedback[slide.id]}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Check Dialogue
            </Button>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'bg-green-50 dark:glass border-green-500 text-green-700 dark:text-green-300' 
                  : 'bg-red-50 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Perfect! Your dialogue is polite and correct!" 
                      : `Correct answers: ${slide.fillAnswers?.join(', ')}`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return <div className="text-slate-900 dark:text-white">Unknown slide type</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-slate-50 dark:from-slate-900 dark:via-teal-900 dark:to-slate-900 text-slate-900 dark:text-white">
      {/* Header */}
      <header className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/lessons/english/a1">
                <Button variant="outline" className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A1
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm text-slate-600 dark:text-white/60 mb-1">Урок 9</div>
              <h1 className="text-3xl font-bold">Simple Phrases</h1>
              <p className="text-slate-600 dark:text-white/80">Learn polite and useful phrases</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600 dark:text-white/60">Прогресс</span>
              <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-teal-500 to-teal-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>12 мин</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>35 XP</span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="max-w-4xl mx-auto bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
          <CardContent className="p-8">
            {renderSlideContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/50">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentSlide === slides.length - 1 ? (
                <Link href="/lessons/english/a1">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8">
                    <Play className="w-4 h-4 mr-2" />
                    Продолжить
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type !== 'theory' && !showFeedback[slide.id]}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Continue
                  <Play className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
