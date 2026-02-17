'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Play, Clock, Zap, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap' | 'match' | 'completion'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string | string[]
  pairs?: { left: string; right: string }[]
  explanation?: string
}

const lessonSlides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Greetings and Introductions',
    content: `
      <div class="space-y-6">
        <h3 class="text-xl font-semibold mb-4">Basic Greetings 👋</h3>
        <div class="grid grid-cols-1 gap-4 mb-6">
          <div class="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <span class="text-2xl">👋</span>
            <div>
              <div class="font-semibold text-lg">Hello / Hi</div>
              <div class="text-gray-600 dark:text-gray-400">Привет / Здравствуйте</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <span class="text-2xl">🌅</span>
            <div>
              <div class="font-semibold text-lg">Good morning</div>
              <div class="text-gray-600 dark:text-gray-400">Доброе утро</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <span class="text-2xl">☀️</span>
            <div>
              <div class="font-semibold text-lg">Good afternoon</div>
              <div class="text-gray-600 dark:text-gray-400">Добрый день</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <span class="text-2xl">🌙</span>
            <div>
              <div class="font-semibold text-lg">Good evening</div>
              <div class="text-gray-600 dark:text-gray-400">Добрый вечер</div>
            </div>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold mb-4">Introductions 🤝</h3>
        <div class="grid grid-cols-1 gap-4">
          <div class="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <span class="text-2xl">👤</span>
            <div>
              <div class="font-semibold text-lg">My name is...</div>
              <div class="text-gray-600 dark:text-gray-400">Меня зовут...</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
            <span class="text-2xl">❓</span>
            <div>
              <div class="font-semibold text-lg">What's your name?</div>
              <div class="text-gray-600 dark:text-gray-400">Как вас зовут?</div>
            </div>
          </div>
          <div class="flex items-center gap-3 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
            <span class="text-2xl">😊</span>
            <div>
              <div class="font-semibold text-lg">Nice to meet you</div>
              <div class="text-gray-600 dark:text-gray-400">Приятно познакомиться</div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Basic Greetings',
    question: 'How do you say "Доброе утро" in English?',
    options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'],
    correctAnswer: 'Good morning',
    explanation: 'Correct! "Good morning" means "Доброе утро" in English.'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Introductions',
    question: 'What do you say when you meet someone for the first time?',
    options: ['Goodbye', 'Nice to meet you', 'See you later', 'How are you?'],
    correctAnswer: 'Nice to meet you',
    explanation: 'Perfect! "Nice to meet you" is what you say when meeting someone new.'
  },
  {
    id: 4,
    type: 'match',
    title: 'Match Greetings',
    question: 'Match the English greetings with their Russian translations:',
    pairs: [
      { left: 'Hello', right: 'Привет' },
      { left: 'Good morning', right: 'Доброе утро' },
      { left: 'Good evening', right: 'Добрый вечер' },
      { left: 'Nice to meet you', right: 'Приятно познакомиться' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Complete the Conversation',
    question: 'Fill in the blanks in this conversation:',
    content: `
      <div class="space-y-4">
        <p class="text-lg">A: <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="Hello" data-answer="hello"> there!</p>
        <p class="text-lg">B: Hi! <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="My" data-answer="my"> name is Sarah.</p>
        <p class="text-lg">A: <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="Nice" data-answer="nice"> to meet you, Sarah!</p>
        <p class="text-lg">B: Nice to <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="meet" data-answer="meet"> you too!</p>
      </div>
    `
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Formal vs Informal',
    question: 'Which greetings are considered formal? (Select all that apply)',
    options: ['Hello', 'Hi', 'Good morning', 'Hey', 'Good afternoon', 'What\'s up'],
    correctAnswer: ['Hello', 'Good morning', 'Good afternoon'],
    explanation: 'Great! Formal greetings include "Hello", "Good morning", and "Good afternoon". "Hi", "Hey", and "What\'s up" are more informal.'
  },
  {
    id: 7,
    type: 'completion',
    title: 'Lesson Complete! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🎉</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Congratulations!</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          You've successfully completed the "Greetings and Introductions" lesson!
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">What you learned:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Basic greetings (Hello, Hi, Good morning, etc.)</li>
            <li>✅ How to introduce yourself</li>
            <li>✅ Polite expressions for meeting new people</li>
            <li>✅ Formal vs informal greetings</li>
            <li>✅ Common conversation starters</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+50</div>
            <div class="text-sm text-gray-500">XP Earned</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">12</div>
            <div class="text-sm text-gray-500">New Phrases</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">100%</div>
            <div class="text-sm text-gray-500">Accuracy</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function GreetingsAndIntroductionsLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  // Update progress when slide changes
  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: '1',
        progress: Math.round(progress),
        completed: currentSlide === lessonSlides.length - 1
      }
    })
    window.dispatchEvent(progressEvent)
  }, [currentSlide, progress])

  const handleAnswer = (answer: string) => {
    const slide = lessonSlides[currentSlide]
    if (slide.type === 'quiz_multiple') {
      if (selectedAnswers.includes(answer)) {
        setSelectedAnswers(selectedAnswers.filter(a => a !== answer))
      } else {
        setSelectedAnswers([...selectedAnswers, answer])
      }
    } else {
      setSelectedAnswers([answer])
      setShowFeedback(true)
    }
  }

  const handleMultipleChoice = () => {
    setShowFeedback(true)
  }

  const handleMatch = (item: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setSelectedLeft(item)
    } else if (selectedLeft) {
      setMatchedPairs({ ...matchedPairs, [selectedLeft]: item })
      setSelectedLeft(null)
    }
  }

  const nextSlide = () => {
    if (currentSlide < lessonSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswers([])
      setShowFeedback(false)
      setMatchedPairs({})
      setSelectedLeft(null)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswers([])
      setShowFeedback(false)
      setMatchedPairs({})
      setSelectedLeft(null)
    }
  }

  const isCorrectAnswer = (slide: Slide) => {
    if (slide.type === 'quiz_single') {
      return selectedAnswers[0] === slide.correctAnswer
    } else if (slide.type === 'quiz_multiple') {
      const correct = Array.isArray(slide.correctAnswer) ? slide.correctAnswer : []
      return selectedAnswers.length === correct.length && 
             selectedAnswers.every(answer => correct.includes(answer))
    }
    return false
  }

  const slide = lessonSlides[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english/a1/greetings">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Greetings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Lesson Info */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">Урок 1</div>
              <h1 className="text-3xl font-bold text-white mb-2">Greetings and Introductions</h1>
              <p className="text-white/80">Learn basic greetings and how to introduce yourself</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Прогресс</span>
              <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                15 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                50 XP
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-blue-400">#{slide.id}</span>
              {slide.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theory Slide */}
            {slide.type === 'theory' && (
              <div 
                className="text-slate-200 prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            {/* Quiz Single */}
            {slide.type === 'quiz_single' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers.includes(option) ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start ${
                        showFeedback
                          ? option === slide.correctAnswer
                            ? "bg-green-600 hover:bg-green-600 border-green-500"
                            : selectedAnswers.includes(option)
                            ? "bg-red-600 hover:bg-red-600 border-red-500"
                            : "border-slate-600"
                          : selectedAnswers.includes(option)
                          ? "bg-blue-600 border-blue-500"
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                      onClick={() => !showFeedback && handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showFeedback && slide.explanation && (
                  <div className="glass border border-blue-700/50 rounded-xl p-4">
                    <p className="text-blue-200">{slide.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Quiz Multiple */}
            {slide.type === 'quiz_multiple' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswers.includes(option) ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start ${
                        showFeedback
                          ? Array.isArray(slide.correctAnswer) && slide.correctAnswer.includes(option)
                            ? "bg-green-600 hover:bg-green-600 border-green-500"
                            : selectedAnswers.includes(option)
                            ? "bg-red-600 hover:bg-red-600 border-red-500"
                            : "border-slate-600"
                          : selectedAnswers.includes(option)
                          ? "bg-blue-600 border-blue-500"
                          : "border-slate-600 hover:border-slate-500"
                      }`}
                      onClick={() => !showFeedback && handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {!showFeedback && selectedAnswers.length > 0 && (
                  <Button onClick={handleMultipleChoice} className="bg-green-600 hover:bg-green-700">
                    Check Answer
                  </Button>
                )}
                {showFeedback && slide.explanation && (
                  <div className="glass border border-blue-700/50 rounded-xl p-4">
                    <p className="text-blue-200">{slide.explanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* Match Exercise */}
            {slide.type === 'match' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white/80 mb-3">English</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`left-${index}`}
                        variant="outline"
                        className={`w-full text-left justify-start ${
                          selectedLeft === pair.left
                            ? "bg-blue-600 border-blue-500"
                            : matchedPairs[pair.left]
                            ? "bg-green-600 border-green-500"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                        onClick={() => handleMatch(pair.left, 'left')}
                        disabled={!!matchedPairs[pair.left]}
                      >
                        {pair.left}
                      </Button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white/80 mb-3">Russian</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`right-${index}`}
                        variant="outline"
                        className={`w-full text-left justify-start ${
                          Object.values(matchedPairs).includes(pair.right)
                            ? "bg-green-600 border-green-500"
                            : "border-slate-600 hover:border-slate-500"
                        }`}
                        onClick={() => handleMatch(pair.right, 'right')}
                        disabled={Object.values(matchedPairs).includes(pair.right)}
                      >
                        {pair.right}
                      </Button>
                    ))}
                  </div>
                </div>
                {Object.keys(matchedPairs).length === slide.pairs?.length && (
                  <div className="glass border border-green-700/50 rounded-xl p-4">
                    <p className="text-green-200">Perfect! You matched all the greetings! 🎉</p>
                  </div>
                )}
              </div>
            )}

            {/* Fill Gap */}
            {slide.type === 'fill_gap' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div 
                  className="text-slate-200"
                  dangerouslySetInnerHTML={{ __html: slide.content || '' }}
                />
                <Button 
                  onClick={() => setShowFeedback(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Check Answers
                </Button>
                {showFeedback && (
                  <div className="glass border border-green-700/50 rounded-xl p-4">
                    <p className="text-green-200">Great job! You completed the conversation correctly! 🌟</p>
                  </div>
                )}
              </div>
            )}

            {/* Completion */}
            {slide.type === 'completion' && (
              <div 
                className="text-slate-200"
                dangerouslySetInnerHTML={{ __html: slide.content || '' }}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="border-slate-600 hover:border-slate-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex items-center gap-2">
                {lessonSlides.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentSlide
                        ? 'bg-blue-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/english/a1">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Lesson
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={nextSlide}
                  disabled={
                    (slide.type === 'quiz_single' && !showFeedback) ||
                    (slide.type === 'quiz_multiple' && !showFeedback) ||
                    (slide.type === 'match' && Object.keys(matchedPairs).length !== slide.pairs?.length) ||
                    (slide.type === 'fill_gap' && !showFeedback)
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}