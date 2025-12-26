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
    title: 'Introducing Yourself - Как представиться',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Учимся представляться на английском</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-blue-600">Основные фразы</h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">My name is...</div>
                <div class="text-sm text-gray-600">Меня зовут...</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">I'm...</div>
                <div class="text-sm text-gray-600">Я... (сокращенная форма)</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">Nice to meet you!</div>
                <div class="text-sm text-gray-600">Приятно познакомиться!</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">I'm from...</div>
                <div class="text-sm text-gray-600">Я из...</div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">Дополнительная информация</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">I'm ... years old</div>
                <div class="text-sm text-gray-600">Мне ... лет</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">I work as...</div>
                <div class="text-sm text-gray-600">Я работаю...</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">I'm a student</div>
                <div class="text-sm text-gray-600">Я студент/студентка</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">I live in...</div>
                <div class="text-sm text-gray-600">Я живу в...</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-4 text-purple-700">Пример диалога знакомства</h3>
          <div class="space-y-3 text-sm">
            <div class="flex gap-3">
              <span class="font-semibold text-blue-600">A:</span>
              <span>Hi! My name is Sarah. What's your name?</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-green-600">B:</span>
              <span>Hello! I'm Mike. Nice to meet you, Sarah!</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-blue-600">A:</span>
              <span>Nice to meet you too! Where are you from?</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-green-600">B:</span>
              <span>I'm from Canada. How about you?</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-blue-600">A:</span>
              <span>I'm from Russia. I'm a student here.</span>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">💡 Полезные советы:</h3>
          <ul class="space-y-1 text-sm">
            <li>• Всегда улыбайтесь при знакомстве</li>
            <li>• Говорите четко и не торопитесь</li>
            <li>• Задавайте вопросы в ответ - это вежливо</li>
            <li>• Используйте "Nice to meet you" при первом знакомстве</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Как представиться',
    question: 'Как правильно сказать "Меня зовут Анна"?',
    options: ['I am Anna', 'My name is Anna', 'I call Anna', 'My Anna'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Вежливые фразы',
    question: 'Что говорят при знакомстве?',
    options: ['Good luck!', 'Nice to meet you!', 'See you later!', 'Take care!'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'fill_gap',
    title: 'Заполните диалог',
    question: 'Заполните диалог знакомства:',
    fillText: 'A: Hi! ___ name is Tom. What\'s your name? B: Hello! ___ Lisa. ___ to meet you! A: Nice to meet you ___! Where are you ___? B: I\'m ___ Italy.',
    fillAnswers: ['My', 'I\'m', 'Nice', 'too', 'from', 'from']
  },
  {
    id: 5,
    type: 'match',
    title: 'Сопоставьте фразы',
    question: 'Соедините английские фразы с русскими переводами:',
    pairs: [
      { left: 'My name is...', right: 'Меня зовут...' },
      { left: 'I\'m from...', right: 'Я из...' },
      { left: 'Nice to meet you', right: 'Приятно познакомиться' },
      { left: 'I\'m a student', right: 'Я студент' },
      { left: 'I live in...', right: 'Я живу в...' }
    ]
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Выберите правильные фразы',
    question: 'Какие фразы можно использовать для представления?',
    options: [
      'My name is John',
      'I am calling John',
      'I\'m Sarah',
      'Me is Mike',
      'I\'m from London',
      'I from Paris'
    ],
    correctAnswer: [0, 2, 4] // My name is John, I'm Sarah, I'm from London
  },
  {
    id: 7,
    type: 'fill_gap',
    title: 'Расскажите о себе',
    question: 'Заполните рассказ о себе:',
    fillText: 'Hello! ___ name is Maria. I\'m ___ Spain. I\'m 25 ___ old. I\'m a ___. I ___ in Madrid. Nice to ___ you!',
    fillAnswers: ['My', 'from', 'years', 'teacher', 'live', 'meet']
  },
  {
    id: 8,
    type: 'quiz_single',
    title: 'Ответ на вопрос',
    question: 'Как ответить на вопрос "Where are you from?"',
    options: ['I\'m fine, thanks', 'I\'m from Russia', 'I\'m 20 years old', 'I\'m a student'],
    correctAnswer: 1
  },
  {
    id: 9,
    type: 'theory',
    title: 'Отлично! 🤝',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl">🤝</div>
        <h2 class="text-2xl font-bold text-green-600">Урок завершен!</h2>
        <p class="text-lg">Теперь вы умеете представляться на английском языке!</p>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="font-semibold mb-4">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Основные фразы для представления</li>
            <li>✅ Как сказать свое имя и откуда вы</li>
            <li>✅ Вежливые фразы при знакомстве</li>
            <li>✅ Как рассказать о себе</li>
            <li>✅ Диалоги знакомства</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Попробуйте дома:</h3>
          <p class="text-sm">Потренируйтесь представляться перед зеркалом или с друзьями!</p>
        </div>
        
        <div class="flex items-center justify-center gap-4">
          <Badge variant="secondary">+35 XP</Badge>
          <Badge variant="outline">Урок завершен</Badge>
        </div>
      </div>
    `
  }
]

export default function IntroducingYourselfLesson() {
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
      return JSON.stringify(answer.map((a: string) => a.toLowerCase().trim())) === 
             JSON.stringify(slideData.fillAnswers?.map(a => a.toLowerCase().trim()))
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
                    ? "Правильно! Вы выбрали все правильные фразы!" 
                    : "Правильные фразы: My name is John, I'm Sarah, I'm from London"
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
                <h4 className="font-medium">Английские фразы:</h4>
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
            <div className="text-lg leading-relaxed bg-gray-50 p-4 rounded-lg">
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
            <div className="text-sm text-gray-600">
              Подсказка: используйте фразы из урока (My, I'm, Nice, from, etc.)
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
                    ? "Превосходно! Диалог получился отличный!" 
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
              <Link href="/lessons/english/a1/greetings">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к приветствиям
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
            <span className="text-sm font-medium">Introducing Yourself</span>
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
                <Link href="/lessons/english/a1/greetings">
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