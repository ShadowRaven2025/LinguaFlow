'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Languages, Hash } from 'lucide-react'

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
      title: 'Deutsche Zahlen 1-10',
      text: 'Lernen wir die ersten zehn Zahlen auf Deutsch. Diese sind die Grundlage für alle anderen Zahlen.',
      sections: [
        {
          subtitle: 'Zahlen 1-5',
          text: 'Die ersten fünf Zahlen:',
          examples: [
            { word: 'eins', translation: 'один', note: 'Zahl 1' },
            { word: 'zwei', translation: 'два', note: 'Zahl 2' },
            { word: 'drei', translation: 'три', note: 'Zahl 3' },
            { word: 'vier', translation: 'четыре', note: 'Zahl 4' },
            { word: 'fünf', translation: 'пять', note: 'Zahl 5' }
          ]
        },
        {
          subtitle: 'Zahlen 6-10',
          text: 'Die nächsten fünf Zahlen:',
          examples: [
            { word: 'sechs', translation: 'шесть', note: 'Zahl 6' },
            { word: 'sieben', translation: 'семь', note: 'Zahl 7' },
            { word: 'acht', translation: 'восемь', note: 'Zahl 8' },
            { word: 'neun', translation: 'девять', note: 'Zahl 9' },
            { word: 'zehn', translation: 'десять', note: 'Zahl 10' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide2',
    type: 'theory',
    content: {
      title: 'Aussprache-Tipps',
      text: 'Die deutsche Aussprache ist wichtig für das Verständnis.',
      sections: [
        {
          subtitle: 'Besondere Laute',
          text: 'Achten Sie auf diese Aussprachen:',
          examples: [
            { word: 'zwei [tsvai]', translation: 'два', note: 'Das "z" wird wie "ts" ausgesprochen' },
            { word: 'drei [drai]', translation: 'три', note: 'Das "ei" wird wie "ai" ausgesprochen' },
            { word: 'sechs [zeks]', translation: 'шесть', note: 'Das "ch" ist ein weicher Laut' },
            { word: 'acht [axt]', translation: 'восемь', note: 'Das "ch" ist hier härter' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide3',
    type: 'quiz_single',
    content: {
      question: 'Wie sagt man "5" auf Deutsch?',
      options: ['vier', 'fünf', 'sechs', 'sieben'],
      correctAnswers: [1]
    },
    feedback: '"Fünf" ist die deutsche Zahl für 5.'
  },
  {
    id: 'slide4',
    type: 'match',
    content: {
      question: 'Verbinden Sie die deutschen Zahlen mit den russischen:',
      pairs: [
        { left: 'eins', right: 'один' },
        { left: 'drei', right: 'три' },
        { left: 'acht', right: 'восемь' },
        { left: 'zehn', right: 'десять' }
      ]
    },
    feedback: 'Ausgezeichnet! Sie haben alle Zahlen richtig zugeordnet.'
  },
  {
    id: 'slide5',
    type: 'quiz_multiple',
    content: {
      question: 'Welche Zahlen sind größer als 5? (Wählen Sie alle aus)',
      options: ['drei', 'sechs', 'vier', 'neun'],
      correctAnswers: [1, 3]
    },
    feedback: 'Sechs und neun sind größer als fünf.'
  },
  {
    id: 'slide6',
    type: 'fill_gap',
    content: {
      question: 'Ergänzen Sie: Ich habe _____ Äpfel. (7)',
      sentence: 'Ich habe _____ Äpfel.',
      correctAnswers: ['sieben']
    },
    feedback: '"Sieben" ist die deutsche Zahl für 7.'
  },
  {
    id: 'slide7',
    type: 'theory',
    content: {
      title: 'Zahlen im Alltag',
      text: 'Wie verwendet man Zahlen in alltäglichen Situationen?',
      sections: [
        {
          subtitle: 'Beim Einkaufen',
          text: 'Zahlen beim Einkaufen verwenden:',
          examples: [
            { word: 'Ich möchte zwei Brote', translation: 'Я хочу два хлеба', note: 'Beim Bäcker' },
            { word: 'Das kostet fünf Euro', translation: 'Это стоит пять евро', note: 'Preis angeben' },
            { word: 'Ich nehme drei Äpfel', translation: 'Я возьму три яблока', note: 'Menge angeben' }
          ]
        },
        {
          subtitle: 'Zeit und Alter',
          text: 'Zahlen für Zeit und Alter:',
          examples: [
            { word: 'Ich bin acht Jahre alt', translation: 'Мне восемь лет', note: 'Alter angeben' },
            { word: 'Es ist vier Uhr', translation: 'Сейчас четыре часа', note: 'Zeit angeben' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide8',
    type: 'quiz_single',
    content: {
      question: 'Was bedeutet "neun"?',
      options: ['7', '8', '9', '10'],
      correctAnswers: [2]
    },
    feedback: '"Neun" bedeutet 9 auf Deutsch.'
  },
  {
    id: 'slide9',
    type: 'fill_gap',
    content: {
      question: 'Ergänzen Sie: Meine Telefonnummer hat _____ Ziffern. (10)',
      sentence: 'Meine Telefonnummer hat _____ Ziffern.',
      correctAnswers: ['zehn']
    },
    feedback: '"Zehn" ist die deutsche Zahl für 10.'
  },
  {
    id: 'slide10',
    type: 'theory',
    content: {
      title: 'Zusammenfassung',
      text: 'Wiederholen wir alle Zahlen von 1 bis 10.',
      sections: [
        {
          subtitle: 'Alle Zahlen 1-10',
          text: 'Die komplette Liste:',
          examples: [
            { word: '1 - eins', translation: 'один', note: 'Erste Zahl' },
            { word: '2 - zwei', translation: 'два', note: 'Zweite Zahl' },
            { word: '3 - drei', translation: 'три', note: 'Dritte Zahl' },
            { word: '4 - vier', translation: 'четыре', note: 'Vierte Zahl' },
            { word: '5 - fünf', translation: 'пять', note: 'Fünfte Zahl' },
            { word: '6 - sechs', translation: 'шесть', note: 'Sechste Zahl' },
            { word: '7 - sieben', translation: 'семь', note: 'Siebte Zahl' },
            { word: '8 - acht', translation: 'восемь', note: 'Achte Zahl' },
            { word: '9 - neun', translation: 'девять', note: 'Neunte Zahl' },
            { word: '10 - zehn', translation: 'десять', note: 'Zehnte Zahl' }
          ]
        }
      ]
    }
  }
]

export default function GermanNumbers1to10Lesson() {
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
      case 'fill_gap': {
        const normalizeAnswer = (ans: string) => ans.toLowerCase().trim()
        const numberWords: Record<string, string[]> = {
          'eins': ['1'], 'zwei': ['2'], 'drei': ['3'], 'vier': ['4'], 'fünf': ['5'],
          'sechs': ['6'], 'sieben': ['7'], 'acht': ['8'], 'neun': ['9'], 'zehn': ['10']
        }
        const userNormalized = normalizeAnswer(userAnswer)
        const userNumber = numberWords[userNormalized]?.[0] || userNormalized
        correct = slide.content.correctAnswers.some((answer: string) => {
          const answerNormalized = normalizeAnswer(answer)
          const answerNumber = numberWords[answerNormalized]?.[0] || answerNormalized
          return userNumber === answerNumber || userNormalized === answerNormalized
        })
        break
      }
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
                {showTranslation ? 'Deutsch' : 'Перевод'}
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
                        <Card key={exampleIndex} className="border-l-4 border-l-red-500">
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
                {showTranslation ? 'Deutsch' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Как сказать "5" по-немецки?
                </AlertDescription>
              </Alert>
            )}
            
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
                {showTranslation ? 'Deutsch' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Какие числа больше 5? (Выберите все подходящие)
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
                Antwort prüfen
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
                {showTranslation ? 'Deutsch' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  {(() => {
                    const match = slide.content.question.match(/\((\d+)\)/)
                    const num = match ? match[1] : ''
                    const russianPhrases: Record<string, string> = {
                      '7': 'Дополните: У меня _____ яблок.',
                      '10': 'Дополните: У моего телефона _____ цифр.'
                    }
                    return russianPhrases[num] || 'Дополните пропуск.'
                  })()}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="text-lg flex items-center gap-2 flex-wrap">
              Ich habe{' '}
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
              {' '}Äpfel.
            </div>
            {showFeedback && !isCorrect && (
              <div className="text-sm text-muted-foreground">
                Richtige Antworten: {slide.content.correctAnswers.join(', ')}
              </div>
            )}
            {fillGapAnswer && !showFeedback && (
              <Button onClick={() => handleAnswer(fillGapAnswer)} className="w-full">
                Antwort prüfen
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
                {showTranslation ? 'Deutsch' : 'Перевод'}
              </Button>
            </div>
            
            {showTranslation && (
              <Alert variant="info">
                <Languages className="h-4 w-4" />
                <AlertDescription>
                  Соедините немецкие числа с русскими:
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-center">Deutsch</h3>
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
                <h3 className="font-semibold text-center">Русский</h3>
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
                  Verbunden: {Object.keys(matchedPairs).length} von {slide.content.pairs.length}
                </Badge>
              </div>
            )}
          </div>
        )

      default:
        return <div>Unbekannter Slide-Typ</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/a1/numbers" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Zahlen 1-10
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
                Slide {currentSlide + 1} von {lessonSlides.length}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {Math.round(progress)}% abgeschlossen
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Zahlen 1-10
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
                <Hash className="w-5 h-5" />
                <span>Slide {currentSlide + 1}</span>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
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
                Zurück
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!showFeedback && slide.type !== 'theory'}
              >
                {isLastSlide ? 'Lektion beenden' : 'Weiter'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}