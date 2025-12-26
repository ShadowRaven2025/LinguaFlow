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
    title: 'My Family Tree - Мое семейное древо',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Изучаем семейные отношения</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-4 text-center">Семейное древо</h3>
          <div class="space-y-4">
            <!-- Grandparents -->
            <div class="text-center">
              <div class="inline-flex gap-8">
                <div class="text-center">
                  <div class="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-2xl mb-2">👴</div>
                  <div class="text-sm font-semibold">Grandfather</div>
                  <div class="text-xs text-gray-600">дедушка</div>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center text-2xl mb-2">👵</div>
                  <div class="text-sm font-semibold">Grandmother</div>
                  <div class="text-xs text-gray-600">бабушка</div>
                </div>
              </div>
            </div>
            
            <!-- Parents -->
            <div class="text-center">
              <div class="inline-flex gap-8">
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-2xl mb-2">👨</div>
                  <div class="text-sm font-semibold">Father</div>
                  <div class="text-xs text-gray-600">папа</div>
                </div>
                <div class="text-center">
                  <div class="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-2xl mb-2">👩</div>
                  <div class="text-sm font-semibold">Mother</div>
                  <div class="text-xs text-gray-600">мама</div>
                </div>
              </div>
            </div>
            
            <!-- Children -->
            <div class="text-center">
              <div class="inline-flex gap-4">
                <div class="text-center">
                  <div class="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-lg mb-2">👦</div>
                  <div class="text-xs font-semibold">Brother</div>
                  <div class="text-xs text-gray-600">брат</div>
                </div>
                <div class="text-center">
                  <div class="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-lg mb-2">👧</div>
                  <div class="text-xs font-semibold">ME</div>
                  <div class="text-xs text-gray-600">я</div>
                </div>
                <div class="text-center">
                  <div class="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center text-lg mb-2">👧</div>
                  <div class="text-xs font-semibold">Sister</div>
                  <div class="text-xs text-gray-600">сестра</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">Полезные фразы</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">This is my family.</div>
                <div class="text-sm text-gray-600">Это моя семья.</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">My father's name is John.</div>
                <div class="text-sm text-gray-600">Моего папу зовут Джон.</div>
              </div>
              <div class="p-3 bg-green-50 rounded-lg">
                <div class="font-semibold">I have two sisters.</div>
                <div class="text-sm text-gray-600">У меня есть две сестры.</div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-orange-600">Притяжательные местоимения</h3>
            <div class="space-y-3">
              <div class="p-3 bg-orange-50 rounded-lg">
                <div class="font-semibold">my father</div>
                <div class="text-sm text-gray-600">мой папа</div>
              </div>
              <div class="p-3 bg-orange-50 rounded-lg">
                <div class="font-semibold">your mother</div>
                <div class="text-sm text-gray-600">твоя мама</div>
              </div>
              <div class="p-3 bg-orange-50 rounded-lg">
                <div class="font-semibold">his/her brother</div>
                <div class="text-sm text-gray-600">его/её брат</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">💡 Вопросы о семье:</h3>
          <ul class="space-y-1 text-sm">
            <li>• <strong>How many brothers do you have?</strong> - Сколько у тебя братьев?</li>
            <li>• <strong>What's your mother's name?</strong> - Как зовут твою маму?</li>
            <li>• <strong>Do you have any sisters?</strong> - У тебя есть сестры?</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Семейные отношения',
    question: 'Кем приходится вам сын вашего брата?',
    options: ['cousin', 'nephew', 'uncle', 'son'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'fill_gap',
    title: 'Расскажите о семье',
    question: 'Заполните рассказ о семье:',
    fillText: 'This is ___ family. ___ father works in a bank. ___ mother is a teacher. I have one ___ and two ___. We live with ___ grandparents.',
    fillAnswers: ['my', 'My', 'My', 'brother', 'sisters', 'our']
  },
  {
    id: 4,
    type: 'match',
    title: 'Притяжательные местоимения',
    question: 'Соедините местоимения с правильными переводами:',
    pairs: [
      { left: 'my family', right: 'моя семья' },
      { left: 'your sister', right: 'твоя сестра' },
      { left: 'his brother', right: 'его брат' },
      { left: 'her mother', right: 'её мама' },
      { left: 'our father', right: 'наш папа' }
    ]
  },
  {
    id: 5,
    type: 'quiz_multiple',
    title: 'Выберите правильные предложения',
    question: 'Какие предложения написаны правильно?',
    options: [
      'This is me family',
      'My father name is Tom',
      'I have two sisters',
      'Her mother is doctor',
      'Our grandparents are old',
      'His brother work in school'
    ],
    correctAnswer: [2, 4] // I have two sisters, Our grandparents are old
  },
  {
    id: 6,
    type: 'quiz_single',
    title: 'Вопросы о семье',
    question: 'Как правильно спросить о количестве детей?',
    options: [
      'How much children do you have?',
      'How many children do you have?',
      'How children do you have?',
      'What children do you have?'
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    type: 'fill_gap',
    title: 'Диалог о семье',
    question: 'Заполните диалог:',
    fillText: 'A: ___ many people are in your family? B: There are five people. A: Do you have any ___? B: Yes, I have one brother and one ___. A: What about your ___? B: My grandparents live with us too.',
    fillAnswers: ['How', 'siblings', 'sister', 'grandparents']
  },
  {
    id: 8,
    type: 'theory',
    title: 'Отлично! 👨‍👩‍👧‍👦',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl">👨‍👩‍👧‍👦</div>
        <h2 class="text-2xl font-bold text-green-600">Урок завершен!</h2>
        <p class="text-lg">Теперь вы можете рассказать о своей семье по-английски!</p>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="font-semibold mb-4">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Семейное древо и отношения</li>
            <li>✅ Притяжательные местоимения</li>
            <li>✅ Вопросы о семье</li>
            <li>✅ Как рассказать о своей семье</li>
          </ul>
        </div>
        
        <div class="flex items-center justify-center gap-4">
          <Badge variant="secondary">+35 XP</Badge>
          <Badge variant="outline">Урок завершен</Badge>
        </div>
      </div>
    `
  }
]

export default function FamilyTreeLesson() {
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
                    ? "Правильно! Вы выбрали все правильные предложения!" 
                    : "Правильные предложения: I have two sisters, Our grandparents are old"
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
            <div className="text-sm text-gray-600">
              Подсказка: используйте притяжательные местоимения (my, your, his, her, our)
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
                    ? "Превосходно! Рассказ о семье получился отличный!" 
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
              <Link href="/lessons/english/a1/family">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к семье
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
            <span className="text-sm font-medium">My Family Tree</span>
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
                <Link href="/lessons/english/a1/family">
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