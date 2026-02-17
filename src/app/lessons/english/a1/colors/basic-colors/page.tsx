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
    title: 'Basic Colors - Основные цвета',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Изучаем основные цвета</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-700">Основные цвета</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-red-500 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">red</div>
                  <div class="text-sm text-gray-600">красный</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-blue-500 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">blue</div>
                  <div class="text-sm text-gray-600">синий</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-yellow-400 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">yellow</div>
                  <div class="text-sm text-gray-600">желтый</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-green-500 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">green</div>
                  <div class="text-sm text-gray-600">зеленый</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-gray-700">Дополнительные цвета</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-orange-500 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">orange</div>
                  <div class="text-sm text-gray-600">оранжевый</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-purple-500 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">purple</div>
                  <div class="text-sm text-gray-600">фиолетовый</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-pink-400 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">pink</div>
                  <div class="text-sm text-gray-600">розовый</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-gray-800 rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">black</div>
                  <div class="text-sm text-gray-600">черный</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-3 rounded-xl border">
                <div class="w-12 h-12 bg-white rounded-full border-2 border-gray-300"></div>
                <div>
                  <div class="font-semibold text-lg">white</div>
                  <div class="text-sm text-gray-600">белый</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-xl">
          <h3 class="font-semibold mb-2">💡 Полезные фразы:</h3>
          <ul class="space-y-1 text-sm">
            <li>• <strong>What color is it?</strong> - Какого это цвета?</li>
            <li>• <strong>It's red.</strong> - Это красное.</li>
            <li>• <strong>My favorite color is blue.</strong> - Мой любимый цвет - синий.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Определите цвет',
    question: 'Какого цвета солнце? ☀️',
    options: ['red', 'yellow', 'blue', 'green'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Цвета природы',
    question: 'Какого цвета трава? 🌱',
    options: ['blue', 'red', 'green', 'purple'],
    correctAnswer: 2
  },
  {
    id: 4,
    type: 'match',
    title: 'Сопоставьте цвета',
    question: 'Соедините английские названия цветов с русскими:',
    pairs: [
      { left: 'red', right: 'красный' },
      { left: 'blue', right: 'синий' },
      { left: 'green', right: 'зеленый' },
      { left: 'yellow', right: 'желтый' },
      { left: 'orange', right: 'оранжевый' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Опишите предметы',
    question: 'Заполните предложения правильными цветами:',
    fillText: 'The apple is ___. The sky is ___. The snow is ___.',
    fillAnswers: ['red', 'blue', 'white']
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Выберите теплые цвета',
    question: 'Какие из этих цветов считаются теплыми?',
    options: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink', 'black'],
    correctAnswer: [0, 2, 4, 6] // red, yellow, orange, pink
  },
  {
    id: 7,
    type: 'quiz_single',
    title: 'Цветовые ассоциации',
    question: 'Какой цвет ассоциируется с любовью? 💕',
    options: ['green', 'blue', 'pink', 'black'],
    correctAnswer: 2
  },
  {
    id: 8,
    type: 'theory',
    title: 'Отлично! 🎨',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl">🎨</div>
        <h2 class="text-2xl font-bold text-green-600">Урок завершен!</h2>
        <p class="text-lg">Теперь вы знаете основные цвета на английском языке!</p>
        
        <div class="bg-green-50 p-6 rounded-xl">
          <h3 class="font-semibold mb-4">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ 9 основных цветов</li>
            <li>✅ Как описывать цвет предметов</li>
            <li>✅ Теплые и холодные цвета</li>
            <li>✅ Полезные фразы о цветах</li>
          </ul>
        </div>
        
        <div class="flex items-center justify-center gap-4">
          <Badge variant="secondary">+25 XP</Badge>
          <Badge variant="outline">Урок завершен</Badge>
        </div>
      </div>
    `
  }
]

export default function BasicColorsLesson() {
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
                    ? "Правильно! Вы выбрали все теплые цвета!" 
                    : "Теплые цвета: red, yellow, orange, pink"
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
                <h4 className="font-medium">Английские названия:</h4>
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
                <h4 className="font-medium">Русские переводы:</h4>
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
                    ? "Отлично! Все переводы правильные!" 
                    : "Проверьте переводы еще раз."
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
                      className="mx-2 px-2 py-1 border rounded w-20 text-center"
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
                    ? "Превосходно! Все цвета правильные!" 
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
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lessons/english/a1">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к A1
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
            <span className="text-sm font-medium">Basic Colors</span>
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
                <Link href="/lessons/english/a1">
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