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
    title: 'Asking for Names - Как спросить имя',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Учимся спрашивать имена и представлять других</h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-blue-600">Вопросы об имени</h3>
            <div class="space-y-3">
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">What's your name?</div>
                <div class="text-sm text-gray-600">Как тебя зовут? (неформально)</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">What is your name?</div>
                <div class="text-sm text-gray-600">Как Вас зовут? (формально)</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">May I ask your name?</div>
                <div class="text-sm text-gray-600">Могу я узнать Ваше имя?</div>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg">
                <div class="font-semibold">Could you tell me your name?</div>
                <div class="text-sm text-gray-600">Не могли бы Вы сказать свое имя?</div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">Представление других</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">This is...</div>
                <div class="text-sm text-gray-600">Это... (представляем кого-то)</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">Meet my friend...</div>
                <div class="text-sm text-gray-600">Познакомьтесь с моим другом...</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">I'd like you to meet...</div>
                <div class="text-sm text-gray-600">Я хочу познакомить вас с...</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">Let me introduce...</div>
                <div class="text-sm text-gray-600">Позвольте представить...</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-4 text-purple-700">Диалог: Представление друга</h3>
          <div class="space-y-3 text-sm">
            <div class="flex gap-3">
              <span class="font-semibold text-blue-600">Anna:</span>
              <span>Hi Tom! I'd like you to meet my friend Lisa.</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-green-600">Tom:</span>
              <span>Hi Lisa! Nice to meet you. What's your last name?</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-red-600">Lisa:</span>
              <span>Nice to meet you too! My last name is Johnson.</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-green-600">Tom:</span>
              <span>Great! Where are you from, Lisa?</span>
            </div>
            <div class="flex gap-3">
              <span class="font-semibold text-red-600">Lisa:</span>
              <span>I'm from Australia. How about you?</span>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-orange-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2 text-orange-700">Формальные ситуации</h3>
            <ul class="space-y-1 text-sm">
              <li>• May I ask your name?</li>
              <li>• Could you please introduce yourself?</li>
              <li>• I'd like you to meet Mr. Smith</li>
              <li>• Allow me to introduce...</li>
            </ul>
          </div>
          
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2 text-yellow-700">Неформальные ситуации</h3>
            <ul class="space-y-1 text-sm">
              <li>• What's your name?</li>
              <li>• This is my friend John</li>
              <li>• Meet Sarah!</li>
              <li>• Hey, I'm Mike</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Вопрос об имени',
    question: 'Как спросить имя в неформальной ситуации?',
    options: ['May I ask your name?', 'What\'s your name?', 'Could you tell me your name?', 'What is your full name?'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Представление друга',
    question: 'Как представить своего друга?',
    options: ['He is my friend', 'This is my friend John', 'My friend name is John', 'I have friend John'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'fill_gap',
    title: 'Заполните диалог',
    question: 'Заполните диалог представления:',
    fillText: 'A: Hi! I\'d ___ you to meet my colleague Sarah. B: Nice to ___ you, Sarah! What\'s your ___ name? C: My last name is Brown. ___ to meet you too!',
    fillAnswers: ['like', 'meet', 'last', 'Nice']
  },
  {
    id: 5,
    type: 'match',
    title: 'Формальное и неформальное',
    question: 'Соедините фразы с их уровнем формальности:',
    pairs: [
      { left: 'What\'s your name?', right: 'Неформально' },
      { left: 'May I ask your name?', right: 'Формально' },
      { left: 'This is John', right: 'Неформально' },
      { left: 'I\'d like you to meet...', right: 'Формально' },
      { left: 'Meet my friend!', right: 'Неформально' }
    ]
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Выберите вежливые фразы',
    question: 'Какие фразы звучат вежливо при знакомстве?',
    options: [
      'What\'s your name?',
      'Tell me your name!',
      'May I ask your name?',
      'Your name?',
      'Nice to meet you',
      'Could you tell me your name?'
    ],
    correctAnswer: [0, 2, 4, 5] // What's your name?, May I ask your name?, Nice to meet you, Could you tell me your name?
  },
  {
    id: 7,
    type: 'fill_gap',
    title: 'Формальное представление',
    question: 'Заполните формальный диалог:',
    fillText: '___ me introduce my manager, Mr. Johnson. B: ___ to meet you, Mr. Johnson. ___ I ask what department you work in? C: Nice to meet you too. I work in the ___ department.',
    fillAnswers: ['Let', 'Nice', 'May', 'sales']
  },
  {
    id: 8,
    type: 'quiz_single',
    title: 'Ответ на представление',
    question: 'Что отвечают, когда вас кому-то представляют?',
    options: ['Thank you', 'Nice to meet you', 'You\'re welcome', 'See you later'],
    correctAnswer: 1
  },
  {
    id: 9,
    type: 'theory',
    title: 'Отлично! 👥',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl">👥</div>
        <h2 class="text-2xl font-bold text-green-600">Урок завершен!</h2>
        <p class="text-lg">Теперь вы умеете спрашивать имена и представлять людей!</p>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="font-semibold mb-4">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Как спросить имя в разных ситуациях</li>
            <li>✅ Формальные и неформальные фразы</li>
            <li>✅ Как представить друга или коллегу</li>
            <li>✅ Вежливые ответы при знакомстве</li>
            <li>✅ Диалоги представления</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Помните:</h3>
          <p class="text-sm">Выбирайте уровень формальности в зависимости от ситуации!</p>
        </div>
        
        <div class="flex items-center justify-center gap-4">
          <Badge variant="secondary">+30 XP</Badge>
          <Badge variant="outline">Урок завершен</Badge>
        </div>
      </div>
    `
  }
]

export default function AskingNamesLesson() {
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
                    ? "Правильно! Вы выбрали все вежливые фразы!" 
                    : "Вежливые фразы: What's your name?, May I ask your name?, Nice to meet you, Could you tell me your name?"
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
                <h4 className="font-medium">Фразы:</h4>
                {slide.pairs?.map((pair, index) => (
                  <Button
                    key={`left-${index}`}
                    variant="outline"
                    className="w-full justify-start text-sm"
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
                <h4 className="font-medium">Уровень формальности:</h4>
                {slide.pairs?.map((pair, index) => (
                  <div key={`right-${index}`} className="p-3 border rounded text-center text-sm">
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
              Подсказка: используйте фразы из урока (like, meet, Nice, etc.)
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
            <span className="text-sm font-medium">Asking for Names</span>
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