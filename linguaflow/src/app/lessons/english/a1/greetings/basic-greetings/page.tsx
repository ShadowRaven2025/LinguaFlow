'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, Languages, BookOpen, HelpCircle, CheckSquare, Edit3, Link2 } from 'lucide-react'

interface Slide {
  id: string
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match'
  content: any
  feedback?: string
}

const lessonSlides: Slide[] = [
  {
    id: 'slide1',
    type: 'theory',
    content: {
      title: 'Словообразование в английском языке: Приветствия',
      text: 'Изучение словообразования поможет вам лучше понимать структуру английских слов и запоминать новую лексику. Рассмотрим, как образуются слова-приветствия.',
      sections: [
        {
          subtitle: 'Простые приветствия',
          text: 'Базовые приветствия состоят из одного слова или простых сочетаний:',
          examples: [
            { word: 'Hello', translation: 'Привет', note: 'Универсальное приветствие' },
            { word: 'Hi', translation: 'Привет', note: 'Неформальное приветствие' }
          ]
        },
        {
          subtitle: 'Составные приветствия',
          text: 'Многие приветствия образуются по схеме "Good + время суток":',
          examples: [
            { word: 'Good morning', translation: 'Доброе утро', note: 'Good (хороший) + morning (утро)' },
            { word: 'Good afternoon', translation: 'Добрый день', note: 'Good (хороший) + afternoon (день)' },
            { word: 'Good evening', translation: 'Добрый вечер', note: 'Good (хороший) + evening (вечер)' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide2',
    type: 'theory',
    content: {
      title: 'Формальность в приветствиях',
      text: 'В английском языке важно различать формальные и неформальные приветствия в зависимости от ситуации.',
      sections: [
        {
          subtitle: 'Неформальные приветствия',
          text: 'Используются с друзьями, семьей, ровесниками:',
          examples: [
            { word: 'Hi', translation: 'Привет', note: 'Самое распространенное' },
            { word: 'Hey', translation: 'Эй, привет', note: 'Очень неформальное' },
            { word: 'What\'s up?', translation: 'Как дела?', note: 'Сленговое приветствие' }
          ]
        },
        {
          subtitle: 'Формальные приветствия',
          text: 'Используются в деловой обстановке, с незнакомыми людьми:',
          examples: [
            { word: 'Hello', translation: 'Здравствуйте', note: 'Нейтрально-вежливое' },
            { word: 'Good morning', translation: 'Доброе утро', note: 'Официальное утреннее' },
            { word: 'How do you do?', translation: 'Как поживаете?', note: 'Очень формальное' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide3',
    type: 'quiz_single',
    content: {
      question: 'Which greeting is most appropriate in the morning?',
      options: ['Good evening', 'Good morning', 'Good night', 'Goodbye'],
      correctAnswers: [1]
    },
    feedback: 'Good morning is the correct greeting to use in the morning hours.'
  },
  {
    id: 'slide4',
    type: 'quiz_multiple',
    content: {
      question: 'Which of these are informal greetings? (Select all that apply)',
      options: ['Hi', 'Hello', 'Hey', 'Good morning'],
      correctAnswers: [0, 2]
    },
    feedback: 'Hi and Hey are informal greetings, while Hello and Good morning are more formal.'
  },
  {
    id: 'slide5',
    type: 'fill_gap',
    content: {
      question: 'Complete the greeting: Good _____, how are you?',
      sentence: 'Good _____, how are you?',
      correctAnswers: ['morning', 'afternoon', 'evening']
    },
    feedback: 'You can use morning, afternoon, or evening depending on the time of day.'
  },
  {
    id: 'slide6',
    type: 'match',
    content: {
      question: 'Match the English greetings with their Russian translations:',
      pairs: [
        { left: 'Hello', right: 'Привет/Здравствуйте' },
        { left: 'Good morning', right: 'Доброе утро' },
        { left: 'Good evening', right: 'Добрый вечер' },
        { left: 'How are you?', right: 'Как дела?' }
      ]
    },
    feedback: 'Great! You correctly matched all the greetings with their translations.'
  },
  {
    id: 'slide7',
    type: 'theory',
    content: {
      title: 'Время использования приветствий',
      text: 'Важно знать, когда использовать каждое приветствие в зависимости от времени суток.',
      sections: [
        {
          subtitle: 'Временные рамки',
          text: 'Каждое приветствие имеет свое время:',
          examples: [
            { word: 'Good morning', translation: 'Доброе утро', note: 'С 6:00 до 12:00' },
            { word: 'Good afternoon', translation: 'Добрый день', note: 'С 12:00 до 18:00' },
            { word: 'Good evening', translation: 'Добрый вечер', note: 'С 18:00 до 22:00' }
          ]
        },
        {
          subtitle: 'Универсальные приветствия',
          text: 'Эти приветствия можно использовать в любое время:',
          examples: [
            { word: 'Hello', translation: 'Привет/Здравствуйте', note: 'В любое время дня' },
            { word: 'Hi', translation: 'Привет', note: 'В любое время (неформально)' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide8',
    type: 'quiz_single',
    content: {
      question: 'What time is appropriate to say "Good afternoon"?',
      options: ['6:00 AM', '2:00 PM', '8:00 PM', '11:00 PM'],
      correctAnswers: [1]
    },
    feedback: '2:00 PM (14:00) is in the afternoon period, so "Good afternoon" is correct.'
  },
  {
    id: 'slide9',
    type: 'fill_gap',
    content: {
      question: 'Complete the conversation: A: "Hi, how are you?" B: "I\'m _____, thank you!"',
      sentence: 'A: "Hi, how are you?" B: "I\'m _____, thank you!"',
      correctAnswers: ['fine', 'good', 'well', 'great', 'okay']
    },
    feedback: 'Common responses include: fine, good, well, great, or okay.'
  },
  {
    id: 'slide10',
    type: 'theory',
    content: {
      title: 'Ответы на приветствия',
      text: 'Изучим, как правильно отвечать на различные приветствия и вопросы о самочувствии.',
      sections: [
        {
          subtitle: 'Ответы на "How are you?"',
          text: 'Стандартные ответы на вопрос о самочувствии:',
          examples: [
            { word: 'I\'m fine, thank you', translation: 'Хорошо, спасибо', note: 'Нейтральный ответ' },
            { word: 'I\'m good, thanks', translation: 'Хорошо, спасибо', note: 'Неформальный ответ' },
            { word: 'Very well, thank you', translation: 'Очень хорошо, спасибо', note: 'Формальный ответ' },
            { word: 'Not bad', translation: 'Неплохо', note: 'Сдержанный ответ' }
          ]
        },
        {
          subtitle: 'Вежливые добавления',
          text: 'После ответа принято спросить в ответ:',
          examples: [
            { word: 'And you?', translation: 'А вы?', note: 'Формальный вариант' },
            { word: 'How about you?', translation: 'Как у тебя дела?', note: 'Неформальный вариант' }
          ]
        }
      ]
    }
  }
]

export default function BasicGreetingsLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [fillGapAnswer, setFillGapAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showTranslation, setShowTranslation] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<Record<number, number>>({})
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)

  const slide = lessonSlides[currentSlide]
  const isLastSlide = currentSlide === lessonSlides.length - 1
  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  const checkAnswer = (userAnswer: any) => {
    let correct = false

    switch (slide.type) {
      case 'quiz_single':
        correct = slide.content.correctAnswers.includes(userAnswer)
        break
      case 'quiz_multiple':
        const correctSet = new Set(slide.content.correctAnswers)
        const userSet = new Set(userAnswer)
        correct = correctSet.size === userSet.size && 
                 [...correctSet].every(x => userSet.has(x))
        break
      case 'fill_gap':
        correct = slide.content.correctAnswers.some((answer: string) => 
          answer.toLowerCase() === userAnswer.toLowerCase().trim()
        )
        break
      case 'match':
        // Check if all pairs are correctly matched
        const totalPairs = slide.content.pairs.length
        const correctMatches = Object.keys(userAnswer).filter(leftIndex => {
          const rightIndex = userAnswer[leftIndex]
          const leftItem = slide.content.pairs[parseInt(leftIndex)].left
          const rightItem = slide.content.pairs.find((p: any, i: number) => i === rightIndex)?.right
          return slide.content.pairs.some((pair: any) => pair.left === leftItem && pair.right === rightItem)
        }).length
        correct = correctMatches === totalPairs && Object.keys(userAnswer).length === totalPairs
        break
      default:
        correct = true
    }

    return correct
  }

  const handleAnswer = (answer: any) => {
    const correct = checkAnswer(answer)
    setAnswers({ ...answers, [slide.id]: { answer, correct } })
    setIsCorrect(correct)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (isLastSlide) {
      // Lesson completed
      return
    }
    setCurrentSlide(currentSlide + 1)
    setShowFeedback(false)
    setSelectedAnswers([])
    setFillGapAnswer('')
    setIsCorrect(null)
    setShowTranslation(false)
    setMatchedPairs({})
    setSelectedLeft(null)
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setShowFeedback(false)
      setSelectedAnswers([])
      setFillGapAnswer('')
      setIsCorrect(null)
      setShowTranslation(false)
      setMatchedPairs({})
      setSelectedLeft(null)
    }
  }

  const getOptionStyle = (index: number, isSelected: boolean) => {
    if (!showFeedback) {
      return isSelected ? "default" : "outline"
    }

    // Show correct/incorrect after feedback
    if (slide.type === 'quiz_single') {
      if (slide.content.correctAnswers.includes(index)) {
        return "default" // Correct answer - green
      } else if (isSelected) {
        return "destructive" // Wrong selected answer - red
      } else {
        return "outline" // Not selected
      }
    }

    if (slide.type === 'quiz_multiple') {
      const isCorrectAnswer = slide.content.correctAnswers.includes(index)
      if (isCorrectAnswer && isSelected) {
        return "default" // Correctly selected
      } else if (isCorrectAnswer && !isSelected) {
        return "secondary" // Should have been selected
      } else if (!isCorrectAnswer && isSelected) {
        return "destructive" // Incorrectly selected
      } else {
        return "outline" // Correctly not selected
      }
    }

    return isSelected ? "default" : "outline"
  }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{slide.content.title}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? 'English' : 'Перевод'}
              </Button>
            </div>
            
            <p className="text-lg">{slide.content.text}</p>
            
            {slide.content.sections && slide.content.sections.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex}>
                {sectionIndex > 0 && <Separator className="my-4" />}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">{section.subtitle}</h3>
                  <p className="text-base">{section.text}</p>
                  
                  {section.examples && (
                    <div className="grid gap-3">
                      {section.examples.map((example: any, exampleIndex: number) => (
                        <Card key={exampleIndex} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="font-semibold text-lg">{example.word}</div>
                                {showTranslation && (
                                  <div className="text-green-700 dark:text-green-300 font-medium">
                                    {example.translation}
                                  </div>
                                )}
                                <div className="text-sm text-muted-foreground italic">
                                  {example.note}
                                </div>
                              </div>
                              {!showTranslation && (
                                <Badge variant="outline" className="text-xs">
                                  Нажмите "Перевод"
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {slide.content.examples && !slide.content.sections && (
              <div>
                <h3 className="font-semibold mb-2">Examples:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {slide.content.examples.map((example: string, index: number) => (
                    <div key={index} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                      <span className="font-medium">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 'quiz_single':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{slide.content.question}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? 'English' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Какое приветствие наиболее подходящее утром?
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              {slide.content.options.map((option: string, index: number) => {
                const isSelected = selectedAnswers.includes(index)
                const variant = getOptionStyle(index, isSelected)
                
                return (
                  <Button
                    key={index}
                    variant={variant}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      showFeedback && slide.content.correctAnswers.includes(index) 
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                        : showFeedback && isSelected && !slide.content.correctAnswers.includes(index)
                        ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                        : ''
                    }`}
                    onClick={() => {
                      if (!showFeedback) {
                        setSelectedAnswers([index])
                        handleAnswer(index)
                      }
                    }}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center gap-2">
                      {showFeedback && slide.content.correctAnswers.includes(index) && (
                        <span className="text-green-600">✓</span>
                      )}
                      {showFeedback && isSelected && !slide.content.correctAnswers.includes(index) && (
                        <span className="text-red-600">✗</span>
                      )}
                      <div>
                        <div>{option}</div>
                        {showTranslation && (
                          <div className="text-sm text-muted-foreground">
                            {index === 0 && 'Добрый вечер'}
                            {index === 1 && 'Доброе утро'}
                            {index === 2 && 'Спокойной ночи'}
                            {index === 3 && 'До свидания'}
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>
        )

      case 'quiz_multiple':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{slide.content.question}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? 'English' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Какие из этих приветствий являются неформальными? (Выберите все подходящие)
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              {slide.content.options.map((option: string, index: number) => {
                const isSelected = selectedAnswers.includes(index)
                const isCorrectAnswer = slide.content.correctAnswers.includes(index)
                
                return (
                  <Button
                    key={index}
                    variant={getOptionStyle(index, isSelected)}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      showFeedback && isCorrectAnswer
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500'
                        : showFeedback && isSelected && !isCorrectAnswer
                        ? 'bg-red-100 dark:bg-red-900/30 border-red-500'
                        : ''
                    }`}
                    onClick={() => {
                      if (!showFeedback) {
                        const newSelected = selectedAnswers.includes(index)
                          ? selectedAnswers.filter(i => i !== index)
                          : [...selectedAnswers, index]
                        setSelectedAnswers(newSelected)
                      }
                    }}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center gap-2">
                      {showFeedback && isCorrectAnswer && (
                        <span className="text-green-600">✓</span>
                      )}
                      {showFeedback && isSelected && !isCorrectAnswer && (
                        <span className="text-red-600">✗</span>
                      )}
                      <div>
                        <div>{option}</div>
                        {showTranslation && (
                          <div className="text-sm text-muted-foreground">
                            {index === 0 && 'Привет'}
                            {index === 1 && 'Здравствуйте'}
                            {index === 2 && 'Эй, привет'}
                            {index === 3 && 'Доброе утро'}
                          </div>
                        )}
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
            {selectedAnswers.length > 0 && !showFeedback && (
              <Button onClick={() => handleAnswer(selectedAnswers)} className="w-full">
                Проверить ответ
              </Button>
            )}
          </div>
        )

      case 'fill_gap':
        const userAnswerCorrect = showFeedback && isCorrect
        const userAnswerWrong = showFeedback && !isCorrect
        
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{slide.content.question}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? 'English' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Дополните приветствие: Добро_____, как дела?
                </AlertDescription>
              </Alert>
            )}
            
            <div className="text-lg flex items-center gap-2">
              Good{' '}
              <div className="relative">
                <input
                  type="text"
                  value={fillGapAnswer}
                  onChange={(e) => setFillGapAnswer(e.target.value)}
                  className={`border-b-2 bg-transparent px-2 py-1 min-w-[120px] text-center ${
                    userAnswerCorrect 
                      ? 'border-green-500 text-green-600' 
                      : userAnswerWrong 
                      ? 'border-red-500 text-red-600'
                      : 'border-primary'
                  }`}
                  placeholder="___"
                  disabled={showFeedback}
                />
                {showFeedback && (
                  <span className={`absolute -right-8 top-1/2 transform -translate-y-1/2 ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
              , how are you?
            </div>
            {showFeedback && !isCorrect && (
              <div className="text-sm text-muted-foreground">
                Правильные ответы: {slide.content.correctAnswers.join(', ')}
              </div>
            )}
            {fillGapAnswer && !showFeedback && (
              <Button onClick={() => handleAnswer(fillGapAnswer)} className="w-full">
                Проверить ответ
              </Button>
            )}
          </div>
        )

      case 'match':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{slide.content.question}</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {showTranslation ? 'English' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Соедините английские приветствия с их русскими переводами:
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-center">English</h3>
                {slide.content.pairs.map((pair: any, index: number) => (
                  <Button
                    key={index}
                    variant={selectedLeft === index ? "default" : "outline"}
                    className={`w-full p-3 ${
                      Object.keys(matchedPairs).includes(index.toString()) 
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                        : ''
                    }`}
                    onClick={() => {
                      if (!showFeedback && !Object.keys(matchedPairs).includes(index.toString())) {
                        setSelectedLeft(index)
                      }
                    }}
                    disabled={showFeedback || Object.keys(matchedPairs).includes(index.toString())}
                  >
                    {pair.left}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-center">Русский</h3>
                {slide.content.pairs.map((pair: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-3 ${
                      Object.values(matchedPairs).includes(index) 
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-500' 
                        : ''
                    }`}
                    onClick={() => {
                      if (!showFeedback && selectedLeft !== null && !Object.values(matchedPairs).includes(index)) {
                        const newMatches = { ...matchedPairs, [selectedLeft]: index }
                        setMatchedPairs(newMatches)
                        setSelectedLeft(null)
                        
                        if (Object.keys(newMatches).length === slide.content.pairs.length) {
                          handleAnswer(newMatches)
                        }
                      }
                    }}
                    disabled={showFeedback || Object.values(matchedPairs).includes(index)}
                  >
                    {pair.right}
                  </Button>
                ))}
              </div>
            </div>
            
            {Object.keys(matchedPairs).length > 0 && Object.keys(matchedPairs).length < slide.content.pairs.length && (
              <div className="text-center">
                <Badge variant="secondary" className="text-sm">
                  Соединено: {Object.keys(matchedPairs).length} из {slide.content.pairs.length}
                </Badge>
              </div>
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
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Basic Greetings
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Слайд {currentSlide + 1} из {lessonSlides.length}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {Math.round(progress)}% завершено
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Basic Greetings
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>Слайд {currentSlide + 1}</span>
                <Badge variant="outline" className="flex items-center gap-1">
                  {slide.type === 'theory' && <BookOpen className="w-3 h-3" />}
                  {slide.type === 'quiz_single' && <HelpCircle className="w-3 h-3" />}
                  {slide.type === 'quiz_multiple' && <CheckSquare className="w-3 h-3" />}
                  {slide.type === 'fill_gap' && <Edit3 className="w-3 h-3" />}
                  {slide.type === 'match' && <Link2 className="w-3 h-3" />}
                  <span className="text-xs">
                    {slide.type === 'theory' ? 'Теория' : 
                     slide.type === 'quiz_single' ? 'Тест' :
                     slide.type === 'quiz_multiple' ? 'Множественный выбор' :
                     slide.type === 'fill_gap' ? 'Заполните пропуск' : 
                     slide.type === 'match' ? 'Сопоставление' : 'Упражнение'}
                  </span>
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {renderSlideContent()}

            {/* Feedback */}
            {showFeedback && slide.feedback && (
              <Alert variant={isCorrect ? "success" : "destructive"} className="mt-6">
                {isCorrect ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {isCorrect ? 'Правильно!' : 'Неправильно'}
                </AlertTitle>
                <AlertDescription>
                  {slide.feedback}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            ← Назад
          </Button>

          <div className="flex gap-1">
            {lessonSlides.map((_, index) => (
              <Badge
                key={index}
                variant={
                  index < currentSlide 
                    ? "default" 
                    : index === currentSlide 
                    ? "secondary" 
                    : "outline"
                }
                className={`w-8 h-6 rounded-full flex items-center justify-center text-xs ${
                  index < currentSlide 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : index === currentSlide 
                    ? 'bg-primary' 
                    : ''
                }`}
              >
                {index < currentSlide ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  index + 1
                )}
              </Badge>
            ))}
          </div>

          {isLastSlide ? (
            <Link href="/lessons/english/a1">
              <Button>Завершить урок</Button>
            </Link>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={slide.type !== 'theory' && !showFeedback}
            >
              Далее →
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}