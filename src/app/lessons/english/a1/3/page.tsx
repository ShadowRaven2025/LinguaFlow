'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, Play, Clock, Star, ArrowLeft, CheckCircle, XCircle, Users } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match'
  title: string
  content?: any
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
    title: 'Family Members',
    content: {
      title: 'Vocabulary for family relationships',
      sections: [
        {
          subtitle: 'Immediate Family',
          examples: [
            { word: 'father / dad', translation: 'папа, отец', emoji: '👨' },
            { word: 'mother / mom', translation: 'мама, мать', emoji: '👩' },
            { word: 'son', translation: 'сын', emoji: '👦' },
            { word: 'daughter', translation: 'дочь', emoji: '👧' },
            { word: 'brother', translation: 'брат', emoji: '👨‍🦱' },
            { word: 'sister', translation: 'сестра', emoji: '👩‍🦰' }
          ]
        },
        {
          subtitle: 'Extended Family',
          examples: [
            { word: 'grandfather / grandpa', translation: 'дедушка', emoji: '👴' },
            { word: 'grandmother / grandma', translation: 'бабушка', emoji: '👵' },
            { word: 'uncle', translation: 'дядя', emoji: '👨‍🦲' },
            { word: 'aunt', translation: 'тетя', emoji: '👩‍🦳' },
            { word: 'cousin', translation: 'двоюродный брат/сестра', emoji: '👫' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Family Quiz',
    question: 'How do you say "мама" in English?',
    options: ['mother', 'father', 'sister', 'daughter'],
    correctAnswer: 0
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Family Relationships',
    question: 'What is a "son"?',
    options: ['daughter', 'male child', 'brother', 'father'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'match',
    title: 'Match the Words',
    question: 'Match English words with Russian translations:',
    pairs: [
      { left: 'father', right: 'папа' },
      { left: 'sister', right: 'сестра' },
      { left: 'grandmother', right: 'бабушка' },
      { left: 'brother', right: 'брат' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'My Family',
    question: 'Complete the story about family:',
    fillText: 'My ___ is very kind. My ___ works in an office. I have one ___ and one ___.',
    fillAnswers: ['mother', 'father', 'brother', 'sister']
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Female Family Members',
    question: 'Which words refer to female family members?',
    options: ['mother', 'father', 'sister', 'brother', 'daughter', 'son', 'grandmother'],
    correctAnswer: [0, 2, 4, 6] // mother, sister, daughter, grandmother
  },
  {
    id: 7,
    type: 'theory',
    title: 'Lesson Complete! 🎉',
    content: {
      title: 'Great job!',
      completion: true,
      stats: {
        xp: 60,
        time: 18,
        progress: 100
      }
    }
  }
]

export default function Lesson3FamilyMembers() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})
  const [selectedPairs, setSelectedPairs] = useState<{ [key: string]: string }>({})
  const [fillInputs, setFillInputs] = useState<string[]>([])

  const slide = slides[currentSlide]
  // Динамический расчет прогресса на основе текущего слайда
  const progress = Math.round(((currentSlide + 1) / slides.length) * 100)

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

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        if (slide.content.completion) {
          return (
            <div className="text-center space-y-6">
              <div className="text-6xl mb-6">👨‍👩‍👧‍👦</div>
              <h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2>
              <p className="text-xl text-white/80">You've learned family vocabulary!</p>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div>
                  <div className="text-sm text-white/60">XP</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">{slide.content.stats.time}</div>
                  <div className="text-sm text-white/60">min</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{slide.content.stats.progress}%</div>
                  <div className="text-sm text-white/60">done</div>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">{slide.content.title}</h2>
              <p className="text-white/80">Learn the names of family members</p>
            </div>
            
            {slide.content.sections?.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400">{section.subtitle}</h3>
                <div className="grid gap-3">
                  {section.examples.map((example: any, exampleIndex: number) => (
                    <div key={exampleIndex} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <span className="text-3xl">{example.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-lg">{example.word}</div>
                        <div className="text-white/60">{example.translation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'quiz_single':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{slide.question}</h3>
            <div className="grid gap-3">
              {slide.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswers[slide.id] === index ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4 bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback[slide.id]}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'glass border-green-500 text-green-300' 
                  : 'bg-red-900/30 border-red-500 text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Correct! Well done!" 
                      : `Incorrect. The correct answer is: ${slide.options?.[slide.correctAnswer as number]}`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 'quiz_multiple':
        const selectedMultiple = userAnswers[slide.id] || []
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{slide.question}</h3>
            <div className="grid gap-3">
              {slide.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedMultiple.includes(index) ? "default" : "outline"}
                  className="justify-start text-left h-auto p-4 bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white"
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              Check Answer
            </Button>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'glass border-green-500 text-green-300' 
                  : 'bg-red-900/30 border-red-500 text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Perfect! You selected all female family members!" 
                      : "Try again. Female family members are: mother, sister, daughter, grandmother"
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 'match':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{slide.question}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-blue-400">English</h4>
                {slide.pairs?.map((pair, index) => (
                  <Button
                    key={`left-${index}`}
                    variant="outline"
                    className="w-full justify-start bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white"
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
              <div className="space-y-3">
                <h4 className="font-medium text-green-400">Russian</h4>
                {slide.pairs?.map((pair, index) => (
                  <div key={`right-${index}`} className="p-3 bg-slate-800/30 border border-slate-600 rounded text-center text-white">
                    {pair.right}
                  </div>
                ))}
              </div>
            </div>
            <Button 
              onClick={() => handleAnswer(selectedPairs)}
              disabled={Object.keys(selectedPairs).length !== slide.pairs?.length || showFeedback[slide.id]}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Check Matches
            </Button>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'glass border-green-500 text-green-300' 
                  : 'bg-red-900/30 border-red-500 text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Excellent! All matches are correct!" 
                      : "Check your matches again."
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      case 'fill_gap':
        const parts = slide.fillText?.split('___') || []
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">{slide.question}</h3>
            <div className="text-lg leading-relaxed bg-slate-800/30 p-6 rounded-xl border border-slate-600">
              {parts.map((part, index) => (
                <span key={index} className="text-white">
                  {part}
                  {index < parts.length - 1 && (
                    <input
                      type="text"
                      className="mx-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded w-32 text-center text-white"
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
            <div className="text-sm text-white/60">
              Hint: Use family words from the lesson (mother, father, brother, sister)
            </div>
            <Button 
              onClick={() => handleAnswer(fillInputs)}
              disabled={fillInputs.length !== slide.fillAnswers?.length || showFeedback[slide.id]}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Check Story
            </Button>
            {showFeedback[slide.id] && (
              <div className={`p-4 rounded-xl border ${
                isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                  ? 'glass border-green-500 text-green-300' 
                  : 'bg-red-900/30 border-red-500 text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  {isCorrectAnswer(slide.id, userAnswers[slide.id]) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>
                    {isCorrectAnswer(slide.id, userAnswers[slide.id]) 
                      ? "Perfect! Your family story is complete!" 
                      : `Correct answers: ${slide.fillAnswers?.join(', ')}`
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return <div className="text-white">Unknown slide type</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/lessons/english/a1">
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A1
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Урок 3</div>
              <h1 className="text-3xl font-bold">Family Members</h1>
              <p className="text-white/80">Vocabulary for family relationships</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Прогресс</span>
              <span className="text-2xl font-bold text-blue-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>18 мин</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>60 XP</span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
          <CardContent className="p-8">
            {renderSlideContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="border-slate-600 hover:bg-slate-700 text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentSlide === slides.length - 1 ? (
                <Link href="/lessons/english/a1">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8">
                    <Play className="w-4 h-4 mr-2" />
                    Продолжить
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={slide.type !== 'theory' && !showFeedback[slide.id]}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  Continue
                  <Play className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}