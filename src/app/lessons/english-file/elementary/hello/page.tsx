'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, ArrowRight, Volume2, Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface Slide {
  id: string
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match' | 'completion'
  content: any
  feedback?: string
}

const lessonSlides: Slide[] = [
  {
    id: 'slide1',
    type: 'theory',
    content: {
      title: 'Hello! Greetings',
      subtitle: 'Приветствия',
      sections: [
        {
          subtitle: 'Basic Greetings',
          examples: [
            { word: 'Hello', translation: 'Привет', note: 'Универсальное приветствие' },
            { word: 'Hi', translation: 'Привет', note: 'Неформальное' },
            { word: 'Good morning', translation: 'Доброе утро', note: 'До 12:00' },
            { word: 'Good afternoon', translation: 'Добрый день', note: '12:00 - 18:00' },
            { word: 'Good evening', translation: 'Добрый вечер', note: 'После 18:00' },
            { word: 'Goodbye', translation: 'До свидания', note: 'Формальное прощание' },
            { word: 'Bye', translation: 'Пока', note: 'Неформальное' },
            { word: 'See you later', translation: 'Увидимся', note: 'Неформальное' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide2',
    type: 'theory',
    content: {
      title: 'How are you?',
      subtitle: 'Как дела?',
      sections: [
        {
          subtitle: 'Asking and answering',
          examples: [
            { word: 'How are you?', translation: 'Как дела?', note: 'Standard question' },
            { word: "I'm fine, thanks", translation: 'Хорошо, спасибо', note: 'Positive answer' },
            { word: "I'm good", translation: 'Хорошо', note: 'Short answer' },
            { word: 'Not bad', translation: 'Нормально', note: 'Neutral answer' },
            { word: 'How about you?', translation: 'А у тебя?', note: 'Returning question' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide3',
    type: 'quiz_single',
    content: {
      question: 'Как переводится "Good morning"?',
      options: ['Добрый вечер', 'Доброе утро', 'Добрый день', 'Спокойной ночи'],
      correctAnswers: [1],
      feedback: '"Good morning" означает "Доброе утро" - используется до 12:00'
    }
  },
  {
    id: 'slide4',
    type: 'quiz_single',
    content: {
      question: 'Что ответить на "How are you?"',
      options: ["I'm hungry", "I'm fine, thanks", 'I am 25 years old', 'I like coffee'],
      correctAnswers: [1],
      feedback: 'На "How are you?" отвечают "I\'m fine, thanks"'
    }
  },
  {
    id: 'slide5',
    type: 'quiz_single',
    content: {
      question: 'Какое неформальное приветствие?',
      options: ['Good morning', 'Hello', 'Hi', 'Good afternoon'],
      correctAnswers: [2],
      feedback: '"Hi" - неформальное приветствие, используется в дружеской обстановке'
    }
  },
  {
    id: 'slide6',
    type: 'quiz_multiple',
    content: {
      question: 'Какие из этих вариантов подходят для прощания?',
      options: ['Hello', 'Goodbye', 'Bye', 'Good night', 'See you later'],
      correctAnswers: [1, 2, 3, 4],
      feedback: 'Все варианты, кроме "Hello", подходят для прощания'
    }
  },
  {
    id: 'slide7',
    type: 'fill_gap',
    content: {
      question: 'Заполните: _____ are you? (Как дела?)',
      sentence: '_____ are you?',
      correctAnswers: ['how', 'How']
    },
    feedback: 'Вопрос "How are you?" - самый распространённый способ спросить "Как дела?"'
  },
  {
    id: 'slide8',
    type: 'completion',
    content: {
      title: 'Отлично!',
      xp: 30,
      stats: {
        lessons: 1,
        newWords: 12
      }
    }
  }
]

export default function EnglishFileHelloLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showTranslation, setShowTranslation] = useState(false)
  const [fillGapAnswer, setFillGapAnswer] = useState('')

  const slide = lessonSlides[currentSlide]
  const isLastSlide = currentSlide === lessonSlides.length - 1
  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('lessonProgressUpdate', {
      detail: { lessonId: 'english-file-hello', progress: Math.round(progress), completed: isLastSlide }
    }))
  }, [currentSlide, progress, isLastSlide])

  const checkAnswer = (userAnswer: any) => {
    let correct = false
    switch (slide.type) {
      case 'quiz_single':
        correct = slide.content.correctAnswers.includes(userAnswer)
        break
      case 'quiz_multiple':
        const correctSet = new Set(slide.content.correctAnswers)
        const userSet = new Set(userAnswer)
        correct = correctSet.size === userSet.size && [...correctSet].every(x => userSet.has(x))
        break
      case 'fill_gap':
        correct = slide.content.correctAnswers.some((answer: string) => 
          answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
        )
        break
    }
    return correct
  }

  const handleAnswer = (answer: any) => {
    const correct = checkAnswer(answer)
    setIsCorrect(correct)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (isLastSlide) return
    setCurrentSlide(c => c + 1)
    setShowFeedback(false)
    setSelectedAnswers([])
    setIsCorrect(null)
    setShowTranslation(false)
    setFillGapAnswer('')
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(c => c - 1)
      setShowFeedback(false)
      setSelectedAnswers([])
      setIsCorrect(null)
      setShowTranslation(false)
      setFillGapAnswer('')
    }
  }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">{slide.content.title}</h2>
              <p className="text-white/60">{slide.content.subtitle}</p>
            </div>
            {slide.content.sections?.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-3">
                <h3 className="text-lg font-semibold text-blue-400">{section.subtitle}</h3>
                <div className="grid gap-3">
                  {section.examples.map((example: any, exampleIndex: number) => (
                    <Card key={exampleIndex} className="bg-slate-800/50 border-slate-700/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-semibold text-lg text-white">{example.word}</div>
                            {showTranslation && (
                              <div className="text-green-400 font-medium">{example.translation}</div>
                            )}
                            <div className="text-sm text-white/50 italic">{example.note}</div>
                          </div>
                          {!showTranslation && (
                            <Badge variant="outline" className="text-xs">Перевод</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => setShowTranslation(!showTranslation)}
              className="w-full border-slate-600"
            >
              <Languages className="w-4 h-4 mr-2" />
              {showTranslation ? 'Скрыть перевод' : 'Показать перевод'}
            </Button>
          </div>
        )

      case 'quiz_single':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{slide.content.question}</h2>
              <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
                <Languages className="w-4 h-4" />
              </Button>
            </div>
            {showTranslation && (
              <Alert>
                <AlertDescription>
                  Перевод вопроса появится здесь
                </AlertDescription>
              </Alert>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {slide.content.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant={selectedAnswers[0] === index ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start ${
                    showFeedback
                      ? index === slide.content.correctAnswers[0]
                        ? 'bg-green-600 border-green-500'
                        : selectedAnswers[0] === index
                        ? 'bg-red-600 border-red-500'
                        : 'border-slate-600'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onClick={() => {
                    if (!showFeedback) {
                      setSelectedAnswers([index])
                    }
                  }}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showFeedback && slide.content.feedback && (
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertDescription>{slide.content.feedback}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-3">
              {!showFeedback ? (
                <Button
                  onClick={() => handleAnswer(selectedAnswers[0])}
                  disabled={selectedAnswers.length === 0}
                  className="flex-1"
                >
                  Проверить
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1">
                  Далее <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )

      case 'quiz_multiple':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">{slide.content.question}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {slide.content.options.map((option: string, index: number) => {
                const isSelected = selectedAnswers.includes(index)
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`p-4 h-auto text-left justify-start ${
                      showFeedback
                        ? slide.content.correctAnswers.includes(index)
                          ? 'bg-green-600 border-green-500'
                          : isSelected
                          ? 'bg-red-600 border-red-500'
                          : 'border-slate-600'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => {
                      if (!showFeedback) {
                        setSelectedAnswers(prev =>
                          prev.includes(index)
                            ? prev.filter(i => i !== index)
                            : [...prev, index]
                        )
                      }
                    }}
                    disabled={showFeedback}
                  >
                    {option}
                  </Button>
                )
              })}
            </div>
            {showFeedback && slide.content.feedback && (
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertDescription>{slide.content.feedback}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-3">
              {!showFeedback ? (
                <Button
                  onClick={() => handleAnswer(selectedAnswers)}
                  disabled={selectedAnswers.length === 0}
                  className="flex-1"
                >
                  Проверить
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1">
                  Далее <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )

      case 'fill_gap':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">{slide.content.question}</h2>
              <Button variant="outline" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
                <Languages className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-lg flex items-center gap-2 flex-wrap bg-slate-800/50 p-6 rounded-xl">
              {slide.content.sentence.split('_____').map((part: string, i: number) => (
                <span key={i} className="text-white">
                  {part}
                  {i < slide.content.sentence.split('_____').length - 1 && (
                    <input
                      type="text"
                      value={fillGapAnswer}
                      onChange={(e) => setFillGapAnswer(e.target.value)}
                      className="mx-2 px-3 py-1 bg-slate-700 border-b-2 border-slate-500 text-white text-center w-32"
                      placeholder="?"
                      disabled={showFeedback}
                    />
                  )}
                </span>
              ))}
            </div>
            {showFeedback && slide.content.feedback && (
              <Alert variant={isCorrect ? "default" : "destructive"}>
                <AlertDescription>{slide.content.feedback}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-3">
              {!showFeedback ? (
                <Button
                  onClick={() => handleAnswer(fillGapAnswer)}
                  disabled={!fillGapAnswer.trim()}
                  className="flex-1"
                >
                  Проверить
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1">
                  Далее <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        )

      case 'completion':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-green-400">{slide.content.title}</h2>
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <div className="text-2xl font-bold text-blue-400">+{slide.content.xp}</div>
                  <div className="text-sm text-white/60">Опыта</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{slide.content.stats.lessons}</div>
                  <div className="text-sm text-white/60">Уроков пройдено</div>
                </div>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/lessons/english-file/elementary">
                <Button variant="outline" className="border-slate-600">
                  К модулям
                </Button>
              </Link>
              <Link href="/lessons/english-file/elementary">
                <Button className="bg-green-600 hover:bg-green-700">
                  Далее <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english-file/elementary" className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Hello!</h1>
                <p className="text-xs text-white/60">English File • Module 1</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english-file/elementary">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80">Прогресс</span>
            <span className="text-xl font-bold text-white">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-green-400">
                {currentSlide + 1} / {lessonSlides.length}
              </Badge>
              <div className="flex gap-1">
                {lessonSlides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentSlide
                        ? 'bg-green-500'
                        : i < currentSlide
                        ? 'bg-blue-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderSlideContent()}
          </CardContent>
        </Card>

        <div className="flex justify-between max-w-3xl mx-auto mt-6">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="border-slate-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
        </div>
      </div>
    </div>
  )
}
