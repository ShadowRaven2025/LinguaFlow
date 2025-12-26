'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle, XCircle } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match'
  title: string
  content?: string
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
    title: 'Numbers 11-20 - Числа от 11 до 20',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Изучаем числа от 11 до 20</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-blue-600">Подростковые числа (11-19)</h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span class="text-2xl font-bold">11</span>
                <span class="text-lg">eleven</span>
                <span class="text-sm text-gray-600">[ɪˈlevən]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span class="text-2xl font-bold">12</span>
                <span class="text-lg">twelve</span>
                <span class="text-sm text-gray-600">[twelv]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span class="text-2xl font-bold">13</span>
                <span class="text-lg">thirteen</span>
                <span class="text-sm text-gray-600">[ˌθɜːrˈtiːn]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span class="text-2xl font-bold">14</span>
                <span class="text-lg">fourteen</span>
                <span class="text-sm text-gray-600">[ˌfɔːrˈtiːn]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span class="text-2xl font-bold">15</span>
                <span class="text-lg">fifteen</span>
                <span class="text-sm text-gray-600">[ˌfɪfˈtiːn]</span>
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-green-600">Продолжение (16-20)</h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-2 bg-green-50 rounded">
                <span class="text-2xl font-bold">16</span>
                <span class="text-lg">sixteen</span>
                <span class="text-sm text-gray-600">[ˌsɪksˈtiːn]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-green-50 rounded">
                <span class="text-2xl font-bold">17</span>
                <span class="text-lg">seventeen</span>
                <span class="text-sm text-gray-600">[ˌsevənˈtiːn]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-green-50 rounded">
                <span class="text-2xl font-bold">18</span>
                <span class="text-lg">eighteen</span>
                <span class="text-sm text-gray-600">[ˌeɪˈtiːn]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-green-50 rounded">
                <span class="text-2xl font-bold">19</span>
                <span class="text-lg">nineteen</span>
                <span class="text-sm text-gray-600">[ˌnaɪnˈtiːn]</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-purple-50 rounded">
                <span class="text-2xl font-bold">20</span>
                <span class="text-lg">twenty</span>
                <span class="text-sm text-gray-600">[ˈtwenti]</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">💡 Закономерности:</h3>
          <ul class="space-y-1 text-sm">
            <li>• Числа 13-19 оканчиваются на <strong>-teen</strong></li>
            <li>• Ударение в подростковых числах падает на последний слог</li>
            <li>• 11 и 12 - исключения, их нужно запомнить</li>
            <li>• 20 - начало новой группы (двадцатки)</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Выберите правильное число',
    question: 'Как пишется число "15" по-английски?',
    options: ['fiveteen', 'fifteen', 'fiften', 'fivteen'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Исключения',
    question: 'Какое из этих чисел НЕ оканчивается на -teen?',
    options: ['thirteen', 'twelve', 'fourteen', 'fifteen'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'match',
    title: 'Сопоставьте числа',
    question: 'Соедините цифры с их английскими названиями:',
    pairs: [
      { left: '11', right: 'eleven' },
      { left: '16', right: 'sixteen' },
      { left: '19', right: 'nineteen' },
      { left: '12', right: 'twelve' },
      { left: '20', right: 'twenty' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Заполните пропуски',
    question: 'Заполните числа в предложениях:',
    fillText: 'There are ___ students in my class. My sister is ___ years old. I have ___ books on my shelf.',
    fillAnswers: ['eighteen', 'sixteen', 'fourteen']
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Выберите числа с -teen',
    question: 'Какие из этих чисел оканчиваются на -teen?',
    options: ['eleven', 'thirteen', 'twenty', 'seventeen', 'twelve', 'nineteen', 'fifteen', 'sixteen'],
    correctAnswer: [1, 3, 5, 6, 7] // thirteen, seventeen, nineteen, fifteen, sixteen
  },
  {
    id: 7,
    type: 'quiz_single',
    title: 'Математика',
    question: 'Сколько будет 10 + 7?',
    options: ['sixteen', 'seventeen', 'eighteen', 'nineteen'],
    correctAnswer: 1
  },
  {
    id: 8,
    type: 'theory',
    title: 'Отлично! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl">🔢</div>
        <h2 class="text-2xl font-bold text-green-600">Урок завершен!</h2>
        <p class="text-lg">Теперь вы знаете числа от 11 до 20!</p>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="font-semibold mb-4">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Подростковые числа (11-19)</li>
            <li>✅ Окончание -teen</li>
            <li>✅ Исключения: eleven, twelve</li>
            <li>✅ Число twenty (20)</li>
          </ul>
        </div>
        
        <div class="flex items-center justify-center gap-4">
          <Badge variant="secondary">+30 XP</Badge>
          <Badge variant="outline">Урок завершен</Badge>
        </div>
      </div>
    `
  }
]

export default function Numbers11to20Lesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})
  const [selectedPairs, setSelectedPairs] = useState<{ [key: string]: string }>({})
  const [fillInputs, setFillInputs] = useState<string[]>([])

  const slide = slides[currentSlide]
  const progress = ((currentSlide + 1) / slides.length) * 100

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

  const resetSlide = () => {
    setUserAnswers(prev => ({ ...prev, [slide.id]: undefined }))
    setShowFeedback(prev => ({ ...prev, [slide.id]: false }))
    setSelectedPairs({})
    setFillInputs([])
  }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        return (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: slide.content || '' }}
          />
        )

      case 'quiz_single':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{slide.question}</h3>
            <div className="grid gap-3">
              {slide.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswers[slide.id] === index ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback[slide.id]}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showFeedback[slide.id] && (
              <Alert variant={isCorrectAnswer(slide.id, userAnswers[slide.id]) ? "default" : "destructive"}>
                {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                    ? "Правильно! Отличная работа!" 
                    : `Неправильно. Правильный ответ: ${slide.options?.[slide.correctAnswer as number]}`
                  }
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      case 'quiz_multiple':
        const selectedMultiple = userAnswers[slide.id] || []
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{slide.question}</h3>
            <div className="grid gap-3">
              {slide.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedMultiple.includes(index) ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4"
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
            >
              Проверить ответ
            </Button>
            {showFeedback[slide.id] && (
              <Alert variant={isCorrectAnswer(slide.id, userAnswers[slide.id]) ? "default" : "destructive"}>
                {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                    ? "Правильно! Вы выбрали все числа с -teen!" 
                    : "Числа с -teen: thirteen, seventeen, nineteen, fifteen, sixteen"
                  }
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      case 'match':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{slide.question}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Цифры:</h4>
                {slide.pairs?.map((pair, index) => (
                  <Button
                    key={`left-${index}`}
                    variant="outline"
                    className="w-full justify-start"
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
              <div className="space-y-2">
                <h4 className="font-medium">Слова:</h4>
                {slide.pairs?.map((pair, index) => (
                  <div key={`right-${index}`} className="p-3 border rounded text-center">
                    {pair.right}
                  </div>
                ))}
              </div>
            </div>
            <Button 
              onClick={() => handleAnswer(selectedPairs)}
              disabled={Object.keys(selectedPairs).length !== slide.pairs?.length || showFeedback[slide.id]}
            >
              Проверить соответствия
            </Button>
            {showFeedback[slide.id] && (
              <Alert variant={isCorrectAnswer(slide.id, userAnswers[slide.id]) ? "default" : "destructive"}>
                {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                    ? "Отлично! Все соответствия правильные!" 
                    : "Проверьте соответствия еще раз."
                  }
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      case 'fill_gap':
        const parts = slide.fillText?.split('___') || []
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{slide.question}</h3>
            <div className="text-lg leading-relaxed">
              {parts.map((part, index) => (
                <span key={index}>
                  {part}
                  {index < parts.length - 1 && (
                    <input
                      type="text"
                      className="mx-2 px-2 py-1 border rounded w-24 text-center"
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
            <Button 
              onClick={() => handleAnswer(fillInputs)}
              disabled={fillInputs.length !== slide.fillAnswers?.length || showFeedback[slide.id]}
            >
              Проверить ответы
            </Button>
            {showFeedback[slide.id] && (
              <Alert variant={isCorrectAnswer(slide.id, userAnswers[slide.id]) ? "default" : "destructive"}>
                {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                    ? "Превосходно! Все пропуски заполнены правильно!" 
                    : `Правильные ответы: ${slide.fillAnswers?.join(', ')}`
                  }
                </AlertDescription>
              </Alert>
            )}
          </div>
        )

      default:
        return <div>Неизвестный тип слайда</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lessons/english/a1/numbers">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к числам
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Numbers 11-20</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentSlide + 1} / {slides.length}
              </Badge>
              <Badge variant="secondary">A1</Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{slide.title}</h1>
            </div>

            {renderSlideContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>

              <div className="flex items-center gap-2">
                {slide.type !== 'theory' && (
                  <Button
                    variant="ghost"
                    onClick={resetSlide}
                    disabled={!showFeedback[slide.id]}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Сбросить
                  </Button>
                )}
              </div>

              {currentSlide === slides.length - 1 ? (
                <Link href="/lessons/english/a1/numbers">
                  <Button>
                    Завершить урок
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type !== 'theory' && !showFeedback[slide.id]}
                >
                  Далее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}