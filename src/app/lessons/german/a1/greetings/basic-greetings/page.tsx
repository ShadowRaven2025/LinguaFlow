'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, XCircle, RotateCcw, Languages } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string | string[]
  pairs?: { german: string; russian: string }[]
  explanation?: string
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Добро пожаловать в урок немецких приветствий!',
    content: `
      <h2>Grundlegende Begrüßungen - Основные приветствия</h2>
      
      <p>В этом уроке мы изучим основные способы приветствия на немецком языке. Немецкий язык имеет формальные и неформальные формы обращения, что очень важно для правильного общения.</p>
      
      <h3>Основные приветствия:</h3>
      <ul>
        <li><strong>Hallo</strong> [ˈhalo] - Привет (универсальное)</li>
        <li><strong>Guten Morgen</strong> [ˈɡuːtn̩ ˈmɔʁɡn̩] - Доброе утро</li>
        <li><strong>Guten Tag</strong> [ˈɡuːtn̩ ˈtaːk] - Добрый день</li>
        <li><strong>Guten Abend</strong> [ˈɡuːtn̩ ˈaːbn̩t] - Добрый вечер</li>
      </ul>
      
      <div class="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl mt-4">
        <h4>💡 Важно знать:</h4>
        <p>В немецком языке существует различие между формальным обращением на "Sie" и неформальным на "du". Это влияет на выбор приветствия и манеру общения.</p>
      </div>
    `
  },
  {
    id: 2,
    type: 'theory',
    title: 'Время суток и приветствия',
    content: `
      <h2>Приветствия в зависимости от времени суток</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div class="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-xl">
          <h3>🌅 Утром (6:00 - 10:00)</h3>
          <p><strong>Guten Morgen!</strong></p>
          <p class="text-sm text-gray-600">Используется до 10 утра</p>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl">
          <h3>☀️ Днем (10:00 - 18:00)</h3>
          <p><strong>Guten Tag!</strong></p>
          <p class="text-sm text-gray-600">Универсальное дневное приветствие</p>
        </div>
        
        <div class="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl">
          <h3>🌆 Вечером (18:00 - 22:00)</h3>
          <p><strong>Guten Abend!</strong></p>
          <p class="text-sm text-gray-600">Вечернее приветствие</p>
        </div>
        
        <div class="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl">
          <h3>🕐 В любое время</h3>
          <p><strong>Hallo!</strong></p>
          <p class="text-sm text-gray-600">Неформальное, универсальное</p>
        </div>
      </div>
      
      <div class="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl mt-4">
        <h4>🎯 Совет:</h4>
        <p>Если сомневаетесь, какое приветствие использовать, "Guten Tag" подойдет в большинстве ситуаций в течение дня.</p>
      </div>
    `
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Выберите правильное приветствие',
    question: 'Какое приветствие вы используете утром в 8:00?',
    options: ['Hallo', 'Guten Morgen', 'Guten Tag', 'Guten Abend'],
    correctAnswer: 'Guten Morgen',
    explanation: 'Guten Morgen используется утром до 10:00. Это формальное и вежливое утреннее приветствие.'
  },
  {
    id: 4,
    type: 'theory',
    title: 'Формальные и неформальные приветствия',
    content: `
      <h2>Формальность в немецких приветствиях</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="border-l-4 border-blue-500 pl-4">
          <h3>👔 Формальные приветствия</h3>
          <ul class="space-y-2 mt-2">
            <li><strong>Guten Morgen</strong> - Доброе утро</li>
            <li><strong>Guten Tag</strong> - Добрый день</li>
            <li><strong>Guten Abend</strong> - Добрый вечер</li>
            <li><strong>Auf Wiedersehen</strong> - До свидания</li>
          </ul>
          <p class="text-sm text-gray-600 mt-2">Используйте с незнакомыми людьми, в деловой обстановке, с пожилыми людьми</p>
        </div>
        
        <div class="border-l-4 border-green-500 pl-4">
          <h3>👋 Неформальные приветствия</h3>
          <ul class="space-y-2 mt-2">
            <li><strong>Hallo</strong> - Привет</li>
            <li><strong>Hi</strong> - Привет (очень неформально)</li>
            <li><strong>Tschüss</strong> - Пока</li>
            <li><strong>Bis bald</strong> - До скорого</li>
          </ul>
          <p class="text-sm text-gray-600 mt-2">Используйте с друзьями, семьей, людьми вашего возраста</p>
        </div>
      </div>
      
      <div class="bg-red-50 dark:bg-red-950/30 p-4 rounded-xl mt-6">
        <h4>⚠️ Важное правило:</h4>
        <p>В Германии лучше начать с формального обращения. Если собеседник предложит перейти на "du" (неформальное обращение), тогда можно использовать неформальные приветствия.</p>
      </div>
    `
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Заполните пропуски',
    question: 'Заполните пропуски в диалоге правильными приветствиями:',
    content: `
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
        <p><strong>Ситуация:</strong> Встреча в офисе в 14:00</p>
        <br>
        <p><strong>Herr Schmidt:</strong> _____ Frau Müller!</p>
        <p><strong>Frau Müller:</strong> _____ Herr Schmidt! Wie geht es Ihnen?</p>
      </div>
    `,
    options: ['Guten Tag', 'Hallo', 'Guten Morgen', 'Guten Abend'],
    correctAnswer: 'Guten Tag',
    explanation: 'В 14:00 в офисной обстановке используется формальное "Guten Tag".'
  },
  {
    id: 6,
    type: 'match',
    title: 'Сопоставьте приветствия',
    question: 'Соедините немецкие приветствия с их русскими переводами:',
    pairs: [
      { german: 'Guten Morgen', russian: 'Доброе утро' },
      { german: 'Hallo', russian: 'Привет' },
      { german: 'Guten Abend', russian: 'Добрый вечер' },
      { german: 'Auf Wiedersehen', russian: 'До свидания' }
    ]
  },
  {
    id: 7,
    type: 'theory',
    title: 'Произношение и интонация',
    content: `
      <h2>Правильное произношение приветствий</h2>
      
      <div class="space-y-4 mt-4">
        <div class="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl">
          <h3>🔊 Фонетические особенности</h3>
          <ul class="space-y-2 mt-2">
            <li><strong>Guten</strong> [ˈɡuːtn̩] - "у" долгое, "н" в конце почти не слышно</li>
            <li><strong>Morgen</strong> [ˈmɔʁɡn̩] - "р" грассированное, "е" в конце не произносится</li>
            <li><strong>Tag</strong> [taːk] - "а" долгое, "г" произносится как "к"</li>
            <li><strong>Abend</strong> [ˈaːbn̩t] - "а" долгое, "е" краткое</li>
          </ul>
        </div>
        
        <div class="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl">
          <h3>🎵 Интонация</h3>
          <p>Немецкие приветствия произносятся с нисходящей интонацией, особенно формальные. Голос понижается к концу фразы, что придает уверенность и вежливость.</p>
        </div>
        
        <div class="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-xl">
          <h3>💡 Совет для изучения</h3>
          <p>Слушайте носителей языка и повторяйте за ними. Обращайте внимание на ритм и мелодию речи, а не только на отдельные звуки.</p>
        </div>
      </div>
    `
  },
  {
    id: 8,
    type: 'quiz_multiple',
    title: 'Множественный выбор',
    question: 'Какие из этих приветствий подходят для формальной ситуации? (Выберите все правильные)',
    options: ['Guten Tag', 'Hi', 'Guten Morgen', 'Hallo', 'Guten Abend'],
    correctAnswer: ['Guten Tag', 'Guten Morgen', 'Guten Abend'],
    explanation: 'Формальные приветствия включают "Guten" + время суток. "Hi" и "Hallo" - неформальные.'
  },
  {
    id: 9,
    type: 'theory',
    title: 'Культурные особенности',
    content: `
      <h2>Культурный контекст немецких приветствий</h2>
      
      <div class="space-y-4 mt-4">
        <div class="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-xl">
          <h3>🤝 Рукопожатие</h3>
          <p>В Германии принято пожимать руку при встрече, даже в неформальной обстановке. Рукопожатие должно быть крепким и кратким, с прямым взглядом в глаза.</p>
        </div>
        
        <div class="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl">
          <h3>👥 Обращение по имени</h3>
          <p>В формальных ситуациях используйте "Herr" (господин) или "Frau" (госпожа) + фамилия. Переход на имя происходит только после предложения собеседника.</p>
        </div>
        
        <div class="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl">
          <h3>🕐 Пунктуальность</h3>
          <p>Немцы очень ценят пунктуальность. Опоздание даже на несколько минут может быть воспринято негативно, особенно в деловой среде.</p>
        </div>
        
        <div class="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-xl">
          <h3>🗣️ Громкость речи</h3>
          <p>Говорите спокойно и не слишком громко. Немцы предпочитают сдержанную манеру общения, особенно в общественных местах.</p>
        </div>
      </div>
    `
  },
  {
    id: 10,
    type: 'quiz_single',
    title: 'Итоговый вопрос',
    question: 'Вы входите в немецкий офис в 15:30 для деловой встречи с незнакомым человеком. Что вы скажете?',
    options: ['Hi!', 'Hallo!', 'Guten Tag!', 'Guten Morgen!'],
    correctAnswer: 'Guten Tag!',
    explanation: 'В деловой обстановке днем с незнакомым человеком используется формальное "Guten Tag!"'
  }
]

export default function GermanBasicGreetingsLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | string[] }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string[] }>({})
  const [matchedPairs, setMatchedPairs] = useState<{ [key: number]: { [key: string]: string } }>({})
  const [showTranslation, setShowTranslation] = useState<{ [key: number]: boolean }>({})

  const slide = slides[currentSlide]
  const progress = ((currentSlide + 1) / slides.length) * 100

  const handleAnswer = (answer: string | string[]) => {
    setUserAnswers({ ...userAnswers, [slide.id]: answer })
    setShowFeedback({ ...showFeedback, [slide.id]: true })
  }

  const handleMultipleChoice = (option: string) => {
    const current = selectedAnswers[slide.id] || []
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option]
    
    setSelectedAnswers({ ...selectedAnswers, [slide.id]: updated })
  }

  const submitMultipleChoice = () => {
    const current = selectedAnswers[slide.id] || []
    handleAnswer(current)
  }

  const handleMatch = (german: string, russian: string) => {
    const currentMatches = matchedPairs[slide.id] || {}
    setMatchedPairs({
      ...matchedPairs,
      [slide.id]: { ...currentMatches, [german]: russian }
    })
  }

  const submitMatching = () => {
    const matches = matchedPairs[slide.id] || {}
    const correctPairs = slide.pairs || []
    const isCorrect = correctPairs.every(pair => matches[pair.german] === pair.russian)
    handleAnswer(isCorrect ? 'correct' : 'incorrect')
  }

  const isCorrectAnswer = (slideId: number, answer: string | string[]) => {
    const correctAnswer = slides.find(s => s.id === slideId)?.correctAnswer
    if (Array.isArray(correctAnswer) && Array.isArray(answer)) {
      return correctAnswer.length === answer.length && 
             correctAnswer.every(item => answer.includes(item))
    }
    return correctAnswer === answer
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

  const toggleTranslation = () => {
    setShowTranslation({
      ...showTranslation,
      [slide.id]: !showTranslation[slide.id]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/a1" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Назад к урокам</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="text-2xl">🇩🇪</span>
                Deutsch A1
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Grundlegende Begrüßungen</span>
            <Badge variant="outline">
              {currentSlide + 1} / {slides.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{slide.title}</span>
              {slide.type === 'theory' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTranslation}
                  className="flex items-center gap-2"
                >
                  <Languages className="w-4 h-4" />
                  {showTranslation[slide.id] ? 'Скрыть перевод' : 'Показать перевод'}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {slide.type === 'theory' && (
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            {slide.type === 'quiz_single' && (
              <div className="space-y-4">
                <p className="text-lg font-medium">{slide.question}</p>
                <div className="grid gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showFeedback[slide.id]
                          ? option === slide.correctAnswer
                            ? "default"
                            : userAnswers[slide.id] === option
                            ? "destructive"
                            : "outline"
                          : "outline"
                      }
                      className="justify-start text-left h-auto p-4"
                      onClick={() => !showFeedback[slide.id] && handleAnswer(option)}
                      disabled={showFeedback[slide.id]}
                    >
                      <div className="flex items-center gap-3">
                        {showFeedback[slide.id] && (
                          option === slide.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : userAnswers[slide.id] === option ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {showFeedback[slide.id] && (
                  <Alert variant={isCorrectAnswer(slide.id, userAnswers[slide.id]) ? "success" : "destructive"}>
                    <AlertDescription>
                      {slide.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {slide.type === 'quiz_multiple' && (
              <div className="space-y-4">
                <p className="text-lg font-medium">{slide.question}</p>
                <div className="grid gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showFeedback[slide.id]
                          ? (slide.correctAnswer as string[])?.includes(option)
                            ? "default"
                            : selectedAnswers[slide.id]?.includes(option)
                            ? "destructive"
                            : "outline"
                          : selectedAnswers[slide.id]?.includes(option)
                          ? "secondary"
                          : "outline"
                      }
                      className="justify-start text-left h-auto p-4"
                      onClick={() => !showFeedback[slide.id] && handleMultipleChoice(option)}
                      disabled={showFeedback[slide.id]}
                    >
                      <div className="flex items-center gap-3">
                        {showFeedback[slide.id] && (
                          (slide.correctAnswer as string[])?.includes(option) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : selectedAnswers[slide.id]?.includes(option) ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {!showFeedback[slide.id] && (
                  <Button 
                    onClick={submitMultipleChoice}
                    disabled={!selectedAnswers[slide.id]?.length}
                  >
                    Проверить ответ
                  </Button>
                )}
                
                {showFeedback[slide.id] && (
                  <Alert variant={isCorrectAnswer(slide.id, selectedAnswers[slide.id]) ? "success" : "destructive"}>
                    <AlertDescription>
                      {slide.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {slide.type === 'fill_gap' && (
              <div className="space-y-4">
                <p className="text-lg font-medium">{slide.question}</p>
                {slide.content && (
                  <div 
                    className="prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: slide.content }}
                  />
                )}
                <div className="grid gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showFeedback[slide.id]
                          ? option === slide.correctAnswer
                            ? "default"
                            : userAnswers[slide.id] === option
                            ? "destructive"
                            : "outline"
                          : "outline"
                      }
                      className="justify-start text-left h-auto p-4"
                      onClick={() => !showFeedback[slide.id] && handleAnswer(option)}
                      disabled={showFeedback[slide.id]}
                    >
                      <div className="flex items-center gap-3">
                        {showFeedback[slide.id] && (
                          option === slide.correctAnswer ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : userAnswers[slide.id] === option ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null
                        )}
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {showFeedback[slide.id] && (
                  <Alert variant={isCorrectAnswer(slide.id, userAnswers[slide.id]) ? "success" : "destructive"}>
                    <AlertDescription>
                      {slide.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {slide.type === 'match' && (
              <div className="space-y-4">
                <p className="text-lg font-medium">{slide.question}</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Немецкий</h3>
                    <div className="space-y-2">
                      {slide.pairs?.map((pair, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => !showFeedback[slide.id] && handleMatch(pair.german, pair.russian)}
                        >
                          {pair.german}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Русский</h3>
                    <div className="space-y-2">
                      {slide.pairs?.map((pair, index) => (
                        <Button
                          key={index}
                          variant={
                            matchedPairs[slide.id]?.[pair.german] === pair.russian
                              ? "secondary"
                              : "outline"
                          }
                          className="w-full justify-start"
                          onClick={() => !showFeedback[slide.id] && handleMatch(pair.german, pair.russian)}
                        >
                          {pair.russian}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {Object.keys(matchedPairs[slide.id] || {}).length === slide.pairs?.length && !showFeedback[slide.id] && (
                  <Button onClick={submitMatching}>
                    Проверить соответствия
                  </Button>
                )}
                
                {showFeedback[slide.id] && (
                  <Alert variant={userAnswers[slide.id] === 'correct' ? "success" : "destructive"}>
                    <AlertDescription>
                      {userAnswers[slide.id] === 'correct' 
                        ? 'Отлично! Все соответствия правильные.' 
                        : 'Некоторые соответствия неверны. Попробуйте еще раз.'}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          
          <div className="flex items-center gap-2">
            {currentSlide === slides.length - 1 ? (
              <Link href="/lessons/german/a1">
                <Button>
                  Завершить урок
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button
                onClick={nextSlide}
                disabled={
                  (slide.type !== 'theory' && !showFeedback[slide.id]) ||
                  currentSlide >= slides.length - 1
                }
              >
                Далее
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}