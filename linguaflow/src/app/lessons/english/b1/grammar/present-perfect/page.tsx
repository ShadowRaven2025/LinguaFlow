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
    title: 'Present Perfect - Настоящее совершенное время',
    content: `
      <div class="space-y-6">
        <h2 class="text-2xl font-bold mb-4">Present Perfect Tense</h2>
        
        <div class="bg-blue-50 p-6 rounded-lg">
          <h3 class="text-lg font-semibold mb-3">Формула Present Perfect:</h3>
          <p class="text-xl font-bold text-center">HAVE/HAS + Past Participle (V3)</p>
          <div class="mt-4 grid md:grid-cols-2 gap-4">
            <div class="text-center">
              <div class="font-semibold">I, You, We, They</div>
              <div class="text-blue-600">HAVE + V3</div>
            </div>
            <div class="text-center">
              <div class="font-semibold">He, She, It</div>
              <div class="text-blue-600">HAS + V3</div>
            </div>
          </div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-green-600">Примеры утверждений</h3>
            <div class="space-y-3">
              <div class="p-3 bg-green-50 rounded">
                <div class="font-semibold">I have visited Paris.</div>
                <div class="text-sm text-gray-600">Я посещал Париж.</div>
              </div>
              <div class="p-3 bg-green-50 rounded">
                <div class="font-semibold">She has finished her work.</div>
                <div class="text-sm text-gray-600">Она закончила свою работу.</div>
              </div>
              <div class="p-3 bg-green-50 rounded">
                <div class="font-semibold">We have lived here for 5 years.</div>
                <div class="text-sm text-gray-600">Мы живем здесь 5 лет.</div>
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-orange-600">Вопросы и отрицания</h3>
            <div class="space-y-3">
              <div class="p-3 bg-orange-50 rounded">
                <div class="font-semibold">Have you seen this movie?</div>
                <div class="text-sm text-gray-600">Ты видел этот фильм?</div>
              </div>
              <div class="p-3 bg-orange-50 rounded">
                <div class="font-semibold">I haven't been to Japan.</div>
                <div class="text-sm text-gray-600">Я не был в Японии.</div>
              </div>
              <div class="p-3 bg-orange-50 rounded">
                <div class="font-semibold">Has he called you yet?</div>
                <div class="text-sm text-gray-600">Он уже звонил тебе?</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-purple-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2 text-purple-700">🎯 Когда используем Present Perfect:</h3>
          <ul class="space-y-1 text-sm">
            <li>• <strong>Опыт:</strong> I have traveled to many countries.</li>
            <li>• <strong>Результат:</strong> She has lost her keys (и до сих пор не нашла).</li>
            <li>• <strong>Период времени:</strong> I have worked here since 2020.</li>
            <li>• <strong>Недавние события:</strong> He has just arrived.</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">💡 Слова-маркеры:</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div>• already</div>
            <div>• just</div>
            <div>• yet</div>
            <div>• ever</div>
            <div>• never</div>
            <div>• since</div>
            <div>• for</div>
            <div>• recently</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Образование Present Perfect',
    question: 'Выберите правильную форму: "She ___ her homework."',
    options: ['have finished', 'has finished', 'have finish', 'has finish'],
    correctAnswer: 1
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Вопросительная форма',
    question: 'Как правильно задать вопрос в Present Perfect?',
    options: ['Do you have seen?', 'Have you seen?', 'Did you have seen?', 'Are you seen?'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'match',
    title: 'Сопоставьте части предложений',
    question: 'Соедините начало и конец предложений:',
    pairs: [
      { left: 'I have never', right: 'been to Australia' },
      { left: 'She has just', right: 'finished her project' },
      { left: 'We have lived here', right: 'for ten years' },
      { left: 'Have you ever', right: 'met a celebrity?' },
      { left: 'He hasn\'t called', right: 'me yet' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Заполните пропуски',
    question: 'Поставьте глаголы в Present Perfect:',
    fillText: 'I ___ (visit) London three times. My sister ___ (never/be) abroad. ___ you ___ (see) the new movie? We ___ (live) here since 2019.',
    fillAnswers: ['have visited', 'has never been', 'Have', 'seen', 'have lived']
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Выберите правильные предложения',
    question: 'Какие предложения написаны правильно?',
    options: [
      'I have went to the store',
      'She has finished her work',
      'Have you ever been to Paris?',
      'He have seen this movie',
      'We haven\'t done our homework yet',
      'Did you have visited London?'
    ],
    correctAnswer: [1, 2, 4] // She has finished, Have you ever been, We haven't done
  },
  {
    id: 7,
    type: 'quiz_single',
    title: 'Since vs For',
    question: 'Выберите правильный вариант: "I have worked here ___ 2020."',
    options: ['for', 'since', 'from', 'at'],
    correctAnswer: 1
  },
  {
    id: 8,
    type: 'fill_gap',
    title: 'Опыт и достижения',
    question: 'Расскажите о своем опыте, используя Present Perfect:',
    fillText: 'I ___ (travel) to five different countries. I ___ (never/climb) a mountain, but I ___ (always/want) to try it. Recently, I ___ (start) learning Spanish.',
    fillAnswers: ['have traveled', 'have never climbed', 'have always wanted', 'have started']
  },
  {
    id: 9,
    type: 'theory',
    title: 'Превосходно! 🏆',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl">🏆</div>
        <h2 class="text-2xl font-bold text-green-600">Урок завершен!</h2>
        <p class="text-lg">Теперь вы понимаете Present Perfect Tense!</p>
        
        <div class="bg-green-50 p-6 rounded-lg">
          <h3 class="font-semibold mb-4">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Формула: have/has + V3</li>
            <li>✅ Использование для опыта и результата</li>
            <li>✅ Слова-маркеры (already, just, yet, etc.)</li>
            <li>✅ Различие since и for</li>
            <li>✅ Вопросы и отрицания</li>
          </ul>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-semibold mb-2">Следующий шаг:</h3>
          <p class="text-sm">Изучите различия между Present Perfect и Past Simple!</p>
        </div>
        
        <div class="flex items-center justify-center gap-4">
          <Badge variant="secondary">+60 XP</Badge>
          <Badge variant="outline">B1 Grammar</Badge>
        </div>
      </div>
    `
  }
]

export default function PresentPerfectLesson() {
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
                    : "Правильные предложения: She has finished, Have you ever been, We haven't done"
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
                <h4 className="font-medium">Начало предложения:</h4>
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
                <h4 className="font-medium">Окончание:</h4>
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
                    ? "Отлично! Все предложения составлены правильно!" 
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
                      className="mx-2 px-2 py-1 border rounded w-32 text-center text-sm"
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
              Подсказка: используйте have/has + V3 (Past Participle)
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
                    ? "Превосходно! Все формы Present Perfect правильные!" 
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
              <Link href="/lessons/english/b1">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к B1
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
            <span className="text-sm font-medium">Present Perfect</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {currentSlide + 1} / {slides.length}
              </Badge>
              <Badge variant="secondary">B1</Badge>
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
                <Link href="/lessons/english/b1">
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