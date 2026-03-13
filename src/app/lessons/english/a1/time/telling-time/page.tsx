'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Languages, Clock } from 'lucide-react'

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
      title: 'Telling Time in English',
      text: 'Learning to tell time is essential for daily communication. Let\'s explore different ways to express time in English.',
      sections: [
        {
          subtitle: 'Basic Time Structure',
          text: 'In English, we use "o\'clock" for exact hours:',
          examples: [
            { word: '1:00 - One o\'clock', translation: '1:00 - Час', note: 'Exact hour' },
            { word: '3:00 - Three o\'clock', translation: '3:00 - Три часа', note: 'Exact hour' },
            { word: '12:00 - Twelve o\'clock', translation: '12:00 - Двенадцать часов', note: 'Noon or midnight' }
          ]
        },
        {
          subtitle: 'Minutes Past the Hour',
          text: 'For minutes after the hour, we use "past":',
          examples: [
            { word: '1:15 - Quarter past one', translation: '1:15 - Четверть второго', note: '15 minutes past' },
            { word: '2:30 - Half past two', translation: '2:30 - Половина третьего', note: '30 minutes past' },
            { word: '3:10 - Ten past three', translation: '3:10 - Десять минут четвертого', note: '10 minutes past' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide2',
    type: 'theory',
    content: {
      title: 'Minutes Before the Hour',
      text: 'For minutes before the next hour, we use "to":',
      sections: [
        {
          subtitle: 'Using "To"',
          text: 'When it\'s closer to the next hour:',
          examples: [
            { word: '1:45 - Quarter to two', translation: '1:45 - Без четверти два', note: '15 minutes before 2' },
            { word: '2:50 - Ten to three', translation: '2:50 - Без десяти три', note: '10 minutes before 3' },
            { word: '3:55 - Five to four', translation: '3:55 - Без пяти четыре', note: '5 minutes before 4' }
          ]
        },
        {
          subtitle: 'Digital vs. Traditional',
          text: 'You can also say the numbers directly:',
          examples: [
            { word: '1:45 - One forty-five', translation: '1:45 - Час сорок пять', note: 'Digital format' },
            { word: '2:50 - Two fifty', translation: '2:50 - Два пятьдесят', note: 'Digital format' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide3',
    type: 'quiz_single',
    content: {
      question: 'How do you say 3:00 in English?',
      options: ['Three past', 'Three o\'clock', 'Three to', 'Three thirty'],
      correctAnswers: [1]
    },
    feedback: 'Three o\'clock is correct for exact hours.'
  },
  {
    id: 'slide4',
    type: 'quiz_single',
    content: {
      question: 'What time is "Quarter past four"?',
      options: ['4:15', '4:45', '4:30', '3:45'],
      correctAnswers: [0]
    },
    feedback: 'Quarter past four means 15 minutes after 4:00, which is 4:15.'
  },
  {
    id: 'slide5',
    type: 'fill_gap',
    content: {
      question: 'Complete: It\'s half _____ six.',
      sentence: 'It\'s half _____ six.',
      correctAnswers: ['past']
    },
    feedback: 'We use "past" for minutes after the hour. Half past six = 6:30.'
  },
  {
    id: 'slide6',
    type: 'match',
    content: {
      question: 'Match the times with their English expressions:',
      pairs: [
        { left: '2:15', right: 'Quarter past two' },
        { left: '5:30', right: 'Half past five' },
        { left: '7:45', right: 'Quarter to eight' },
        { left: '9:00', right: 'Nine o\'clock' }
      ]
    },
    feedback: 'Great! You correctly matched all the times.'
  },
  {
    id: 'slide7',
    type: 'theory',
    content: {
      title: 'AM and PM',
      text: 'To specify morning or evening, we use AM and PM:',
      sections: [
        {
          subtitle: 'AM (Ante Meridiem)',
          text: 'From midnight to noon (12:00):',
          examples: [
            { word: '7:00 AM', translation: '7:00 утра', note: 'Morning' },
            { word: '9:30 AM', translation: '9:30 утра', note: 'Morning' },
            { word: '11:45 AM', translation: '11:45 утра', note: 'Late morning' }
          ]
        },
        {
          subtitle: 'PM (Post Meridiem)',
          text: 'From noon to midnight:',
          examples: [
            { word: '1:00 PM', translation: '1:00 дня', note: 'Afternoon' },
            { word: '6:30 PM', translation: '6:30 вечера', note: 'Evening' },
            { word: '11:00 PM', translation: '11:00 вечера', note: 'Night' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide8',
    type: 'quiz_multiple',
    content: {
      question: 'Which times are in the morning? (Select all that apply)',
      options: ['8:00 AM', '2:00 PM', '10:30 AM', '7:45 PM'],
      correctAnswers: [0, 2]
    },
    feedback: '8:00 AM and 10:30 AM are morning times (AM = morning).'
  },
  {
    id: 'slide9',
    type: 'fill_gap',
    content: {
      question: 'Complete: The meeting is at quarter _____ three.',
      sentence: 'The meeting is at quarter _____ three.',
      correctAnswers: ['to', 'past']
    },
    feedback: 'Both "to" (2:45) and "past" (3:15) are correct depending on the intended time.'
  },
  {
    id: 'slide10',
    type: 'theory',
    content: {
      title: 'Asking About Time',
      text: 'Common questions and responses about time:',
      sections: [
        {
          subtitle: 'Questions',
          text: 'How to ask for the time:',
          examples: [
            { word: 'What time is it?', translation: 'Который час?', note: 'Most common' },
            { word: 'What\'s the time?', translation: 'Сколько времени?', note: 'Informal' },
            { word: 'Do you have the time?', translation: 'Не подскажете время?', note: 'Polite' }
          ]
        },
        {
          subtitle: 'Responses',
          text: 'How to answer:',
          examples: [
            { word: 'It\'s three o\'clock', translation: 'Три часа', note: 'Direct answer' },
            { word: 'It\'s about half past two', translation: 'Примерно половина третьего', note: 'Approximate' },
            { word: 'It\'s almost four', translation: 'Почти четыре', note: 'Close to the hour' }
          ]
        }
      ]
    }
  }
]

export default function TellingTimeLesson() {
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
          answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
        )
        break
      case 'match':
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
            
            <div className="space-y-2">
              {slide.content.options.map((option: string, index: number) => {
                const isSelected = selectedAnswers.includes(index)
                const isCorrect = slide.content.correctAnswers.includes(index)
                
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      showFeedback && isCorrect
                        ? 'bg-green-100 dark:glass border-green-500'
                        : showFeedback && isSelected && !isCorrect
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
                      {showFeedback && isCorrect && (
                        <span className="text-green-600">✓</span>
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <span className="text-red-600">✗</span>
                      )}
                      <div>{option}</div>
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
            
            <div className="space-y-2">
              {slide.content.options.map((option: string, index: number) => {
                const isSelected = selectedAnswers.includes(index)
                const isCorrectAnswer = slide.content.correctAnswers.includes(index)
                
                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      showFeedback && isCorrectAnswer
                        ? 'bg-green-100 dark:glass border-green-500'
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
                      <div>{option}</div>
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
            
            <div className="text-lg flex items-center gap-2">
              It's half{' '}
              <div className="relative">
                <input
                  type="text"
                  value={fillGapAnswer}
                  onChange={(e) => setFillGapAnswer(e.target.value)}
                  className={`border-b-2 bg-transparent px-2 py-1 min-w-[120px] text-center ${
                    showFeedback && isCorrect
                      ? 'border-green-500 text-green-600'
                      : showFeedback && !isCorrect
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
              {' '}six.
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
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-center">Time</h3>
                {slide.content.pairs.map((pair: any, index: number) => (
                  <Button
                    key={index}
                    variant={selectedLeft === index ? "default" : "outline"}
                    className={`w-full p-3 ${
                      Object.keys(matchedPairs).includes(index.toString())
                        ? 'bg-green-100 dark:glass border-green-500'
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
                <h3 className="font-semibold text-center">Expression</h3>
                {slide.content.pairs.map((pair: any, index: number) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full p-3 ${
                      Object.values(matchedPairs).includes(index)
                        ? 'bg-green-100 dark:glass border-green-500'
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
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1/time" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Telling Time
              </span>
            </div>
          </div>
        </div>
      </header>

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
              Telling Time
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Слайд {currentSlide + 1}</span>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {slide.type}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderSlideContent()}
            
            {showFeedback && slide.feedback && (
              <Alert>
                <AlertDescription>{slide.feedback}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentSlide === 0}
              >
                Назад
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!showFeedback && slide.type !== 'theory'}
              >
                {isLastSlide ? 'Завершить урок' : 'Далее'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}