'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Languages, Heart } from 'lucide-react'

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
      title: 'Common Pets',
      text: 'Pets are animals that live with people in their homes. Let\'s learn about the most popular pets.',
      sections: [
        {
          subtitle: 'Popular Pets',
          text: 'These are the most common pets people have:',
          examples: [
            { word: 'Dog', translation: 'Собака', note: 'Man\'s best friend' },
            { word: 'Cat', translation: 'Кошка', note: 'Independent and clean' },
            { word: 'Fish', translation: 'Рыбка', note: 'Lives in aquarium' },
            { word: 'Bird', translation: 'Птица', note: 'Can sing and talk' }
          ]
        },
        {
          subtitle: 'Small Pets',
          text: 'These pets are smaller and easier to care for:',
          examples: [
            { word: 'Hamster', translation: 'Хомяк', note: 'Small and cute' },
            { word: 'Rabbit', translation: 'Кролик', note: 'Soft and fluffy' },
            { word: 'Guinea pig', translation: 'Морская свинка', note: 'Makes cute sounds' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide2',
    type: 'theory',
    content: {
      title: 'Pet Care',
      text: 'Taking care of pets requires responsibility and love.',
      sections: [
        {
          subtitle: 'Basic Needs',
          text: 'All pets need these things:',
          examples: [
            { word: 'Food', translation: 'Еда', note: 'Different pets eat different food' },
            { word: 'Water', translation: 'Вода', note: 'Fresh water every day' },
            { word: 'Shelter', translation: 'Дом/укрытие', note: 'Safe place to sleep' },
            { word: 'Love', translation: 'Любовь', note: 'Attention and care' }
          ]
        },
        {
          subtitle: 'Pet Activities',
          text: 'Things we do with pets:',
          examples: [
            { word: 'Walk the dog', translation: 'Выгуливать собаку', note: 'Dogs need exercise' },
            { word: 'Pet the cat', translation: 'Гладить кошку', note: 'Cats love being petted' },
            { word: 'Feed the fish', translation: 'Кормить рыбок', note: 'Small amounts of food' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide3',
    type: 'quiz_single',
    content: {
      question: 'Which animal is known as "man\'s best friend"?',
      options: ['Cat', 'Dog', 'Fish', 'Bird'],
      correctAnswers: [1]
    },
    feedback: 'Dogs are known as "man\'s best friend" because they are loyal and friendly.'
  },
  {
    id: 'slide4',
    type: 'quiz_multiple',
    content: {
      question: 'Which of these are small pets? (Select all that apply)',
      options: ['Hamster', 'Dog', 'Guinea pig', 'Rabbit'],
      correctAnswers: [0, 2, 3]
    },
    feedback: 'Hamsters, guinea pigs, and rabbits are all small pets.'
  },
  {
    id: 'slide5',
    type: 'match',
    content: {
      question: 'Match the pets with their Russian names:',
      pairs: [
        { left: 'Cat', right: 'Кошка' },
        { left: 'Dog', right: 'Собака' },
        { left: 'Fish', right: 'Рыбка' },
        { left: 'Bird', right: 'Птица' }
      ]
    },
    feedback: 'Great! You matched all the pets correctly.'
  },
  {
    id: 'slide6',
    type: 'fill_gap',
    content: {
      question: 'Complete: I have a pet _____. It likes to meow.',
      sentence: 'I have a pet _____. It likes to meow.',
      correctAnswers: ['cat', 'Cat']
    },
    feedback: 'Cats are the pets that meow!'
  },
  {
    id: 'slide7',
    type: 'theory',
    content: {
      title: 'Pet Sounds',
      text: 'Different pets make different sounds. Let\'s learn what sounds pets make.',
      sections: [
        {
          subtitle: 'Common Pet Sounds',
          text: 'Each pet has its own way of communicating:',
          examples: [
            { word: 'Dogs bark', translation: 'Собаки лают', note: 'Woof! Woof!' },
            { word: 'Cats meow', translation: 'Кошки мяукают', note: 'Meow! Meow!' },
            { word: 'Birds sing', translation: 'Птицы поют', note: 'Tweet! Tweet!' },
            { word: 'Hamsters squeak', translation: 'Хомяки пищат', note: 'Squeak! Squeak!' }
          ]
        }
      ]
    }
  },
  {
    id: 'slide8',
    type: 'quiz_single',
    content: {
      question: 'What sound do cats make?',
      options: ['Bark', 'Meow', 'Tweet', 'Squeak'],
      correctAnswers: [1]
    },
    feedback: 'Cats meow to communicate with humans.'
  },
  {
    id: 'slide9',
    type: 'fill_gap',
    content: {
      question: 'Complete: My _____ likes to swim in the aquarium.',
      sentence: 'My _____ likes to swim in the aquarium.',
      correctAnswers: ['fish', 'Fish']
    },
    feedback: 'Fish live and swim in aquariums!'
  },
  {
    id: 'slide10',
    type: 'theory',
    content: {
      title: 'Describing Pets',
      text: 'Learn how to describe your pets using simple adjectives.',
      sections: [
        {
          subtitle: 'Size',
          text: 'Pets can be different sizes:',
          examples: [
            { word: 'Big dog', translation: 'Большая собака', note: 'German Shepherd, Golden Retriever' },
            { word: 'Small cat', translation: 'Маленькая кошка', note: 'Kitten or small breed' },
            { word: 'Tiny hamster', translation: 'Крошечный хомяк', note: 'Very small pet' }
          ]
        },
        {
          subtitle: 'Colors',
          text: 'Pets come in many colors:',
          examples: [
            { word: 'Black cat', translation: 'Черная кошка', note: 'Dark colored' },
            { word: 'White dog', translation: 'Белая собака', note: 'Light colored' },
            { word: 'Brown rabbit', translation: 'Коричневый кролик', note: 'Earth tone' },
            { word: 'Colorful fish', translation: 'Разноцветная рыбка', note: 'Many colors' }
          ]
        }
      ]
    }
  }
]

export default function PetsLesson() {
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
                        <Card key={exampleIndex} className="border-l-4 border-l-pink-500">
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
            
            <div className="text-lg flex items-center gap-2 flex-wrap">
              I have a pet{' '}
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
              . It likes to meow.
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
                <h3 className="font-semibold text-center">English</h3>
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
            <Link href="/lessons/english/a1/animals" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Pets
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
              Pets
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
                <Heart className="w-5 h-5" />
                <span>Слайд {currentSlide + 1}</span>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
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