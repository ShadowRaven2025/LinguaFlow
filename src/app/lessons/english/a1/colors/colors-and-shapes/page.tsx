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
    title: 'Colors and Shapes Vocabulary',
    content: `
      <div class="space-y-6">
        <h3 class="text-xl font-semibold mb-4">Basic Colors 🎨</h3>
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-red-500 rounded-full"></div>
            <span class="text-lg">Red - красный</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span class="text-lg">Blue - синий</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-green-500 rounded-full"></div>
            <span class="text-lg">Green - зеленый</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-yellow-500 rounded-full"></div>
            <span class="text-lg">Yellow - желтый</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-orange-500 rounded-full"></div>
            <span class="text-lg">Orange - оранжевый</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-purple-500 rounded-full"></div>
            <span class="text-lg">Purple - фиолетовый</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-pink-500 rounded-full"></div>
            <span class="text-lg">Pink - розовый</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gray-800 rounded-full"></div>
            <span class="text-lg">Black - черный</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-white border-2 border-gray-300 rounded-full"></div>
            <span class="text-lg">White - белый</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gray-500 rounded-full"></div>
            <span class="text-lg">Gray - серый</span>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold mb-4">Basic Shapes 📐</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
            <span class="text-lg">Circle - круг</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-red-500"></div>
            <span class="text-lg">Square - квадрат</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-6 bg-green-500"></div>
            <span class="text-lg">Rectangle - прямоугольник</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-500"></div>
            <span class="text-lg ml-2">Triangle - треугольник</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-purple-500 rounded-full transform scale-x-150"></div>
            <span class="text-lg">Oval - овал</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-orange-500 transform rotate-45"></div>
            <span class="text-lg">Diamond - ромб</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Color Recognition',
    question: 'What color is this? 🔴',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 'Red',
    explanation: 'Correct! 🔴 This is red - красный цвет.'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Shape Recognition',
    question: 'What shape is this? ⭕',
    options: ['Square', 'Triangle', 'Circle', 'Rectangle'],
    correctAnswer: 'Circle',
    explanation: 'Excellent! ⭕ This is a circle - круг.'
  },
  {
    id: 4,
    type: 'match',
    title: 'Match Colors with Objects',
    question: 'Match the colors with common objects:',
    pairs: [
      { left: 'Red', right: 'Apple 🍎' },
      { left: 'Yellow', right: 'Sun ☀️' },
      { left: 'Green', right: 'Grass 🌱' },
      { left: 'Blue', right: 'Sky 🌌' },
      { left: 'Orange', right: 'Orange 🍊' },
      { left: 'White', right: 'Snow ❄️' }
    ]
  },
  {
    id: 5,
    type: 'fill_gap',
    title: 'Complete the Sentences',
    question: 'Fill in the blanks with the correct colors and shapes:',
    content: `
      <div class="space-y-4">
        <p class="text-lg">1. The sun is <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="yellow" data-answer="yellow"> and round like a <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="circle" data-answer="circle">.</p>
        <p class="text-lg">2. A stop sign is <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="red" data-answer="red"> and has eight sides.</p>
        <p class="text-lg">3. Most leaves are <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="green" data-answer="green"> in summer.</p>
        <p class="text-lg">4. A book is usually shaped like a <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="rectangle" data-answer="rectangle">.</p>
        <p class="text-lg">5. Snow is <input type="text" class="border-b-2 border-blue-500 bg-transparent px-2 py-1 mx-2" placeholder="white" data-answer="white"> and very cold.</p>
      </div>
    `
  },
  {
    id: 6,
    type: 'quiz_multiple',
    title: 'Primary Colors',
    question: 'Which of these are primary colors? (Select all that apply)',
    options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'],
    correctAnswer: ['Red', 'Blue', 'Yellow'],
    explanation: 'Great! The primary colors are Red, Blue, and Yellow. All other colors can be made by mixing these three!'
  },
  {
    id: 7,
    type: 'quiz_single',
    title: 'Shape Properties',
    question: 'How many sides does a triangle have?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    explanation: 'Perfect! A triangle has 3 sides. "Tri" means three!'
  },
  {
    id: 8,
    type: 'completion',
    title: 'Lesson Complete! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">🎨</div>
        <h2 class="text-2xl font-bold text-green-600 dark:text-green-400">Congratulations!</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          You've successfully completed the "Colors and Shapes" lesson!
        </p>
        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">What you learned:</h3>
          <ul class="text-left space-y-2">
            <li>✅ 10 basic colors in English</li>
            <li>✅ 6 common shapes</li>
            <li>✅ How to describe objects using colors and shapes</li>
            <li>✅ Primary colors concept</li>
            <li>✅ Real-world color and shape associations</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">+75</div>
            <div class="text-sm text-gray-500">XP Earned</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">20</div>
            <div class="text-sm text-gray-500">New Words</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">95%</div>
            <div class="text-sm text-gray-500">Accuracy</div>
          </div>
        </div>
      </div>
    `
  }
]

export default function ColorsAndShapesLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({})
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  // Update progress when slide changes
  useEffect(() => {
    // Dispatch progress update event
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: {
        lessonId: '4',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/english/a1/colors">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Colors
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
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-primary font-medium">Урок 4</div>
              <h1 className="text-3xl font-bold text-white mb-2">Colors and Shapes</h1>
              <p className="text-white/80">Learn basic colors and shapes in English</p>
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
                20 мин
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                75 XP
              </span>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <span className="text-purple-400">#{slide.id}</span>
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
                          ? "bg-purple-600 border-purple-500"
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
                          ? "bg-purple-600 border-purple-500"
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
                    <h4 className="font-semibold text-white/80 mb-3">Colors</h4>
                    {slide.pairs?.map((pair, index) => (
                      <Button
                        key={`left-${index}`}
                        variant="outline"
                        className={`w-full text-left justify-start ${
                          selectedLeft === pair.left
                            ? "bg-purple-600 border-purple-500"
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
                    <h4 className="font-semibold text-white/80 mb-3">Objects</h4>
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
                    <p className="text-green-200">Perfect! You matched all the colors with their objects! 🎉</p>
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
                    <p className="text-green-200">Great job! You completed all the sentences correctly! 🌟</p>
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
                        ? 'bg-purple-500'
                        : index < currentSlide
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/english/a1/colors">
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
                  className="bg-purple-600 hover:bg-purple-700"
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