'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { BookOpen, Play, Clock, Star, ArrowLeft, ArrowRight, CheckCircle, Volume2 } from 'lucide-react'

// Mock lesson data
const mockLessonData: { [key: string]: any } = {
  '1': {
    id: '1',
    title: 'Greetings and Introductions',
    description: 'Learn basic greetings and how to introduce yourself',
    duration: 15,
    xpReward: 50,
    exercises: [
      {
        id: 'ex1',
        type: 'theory',
        title: 'Common Greetings',
        content: `
          <h3>Basic Greetings in English</h3>
          <p>Here are the most common ways to greet someone in English:</p>
          <ul>
            <li><strong>Hello</strong> - Universal greeting, formal and informal</li>
            <li><strong>Hi</strong> - Casual greeting, used with friends</li>
            <li><strong>Good morning</strong> - Used before 12 PM</li>
            <li><strong>Good afternoon</strong> - Used from 12 PM to 6 PM</li>
            <li><strong>Good evening</strong> - Used after 6 PM</li>
          </ul>
          <p>Remember: "Good night" is used when saying goodbye, not as a greeting!</p>
        `
      },
      {
        id: 'ex2',
        type: 'quiz_single',
        title: 'Choose the correct greeting',
        question: 'What greeting would you use at 2 PM?',
        options: [
          'Good morning',
          'Good afternoon',
          'Good evening',
          'Good night'
        ],
        correctAnswer: 1,
        explanation: 'Good afternoon is used from 12 PM to 6 PM.'
      },
      {
        id: 'ex3',
        type: 'theory',
        title: 'Introducing Yourself',
        content: `
          <h3>How to Introduce Yourself</h3>
          <p>When meeting someone new, you can use these phrases:</p>
          <ul>
            <li><strong>My name is...</strong> - Formal introduction</li>
            <li><strong>I'm...</strong> - Casual introduction</li>
            <li><strong>Nice to meet you</strong> - Polite response after introduction</li>
            <li><strong>Pleased to meet you</strong> - More formal response</li>
          </ul>
          <div class="example-box">
            <h4>Example Conversation:</h4>
            <p><strong>Person A:</strong> Hello, my name is John.</p>
            <p><strong>Person B:</strong> Hi John, I'm Sarah. Nice to meet you.</p>
            <p><strong>Person A:</strong> Nice to meet you too, Sarah.</p>
          </div>
        `
      },
      {
        id: 'ex4',
        type: 'quiz_single',
        title: 'Complete the introduction',
        question: 'Person A: "Hello, my name is Mike." Person B: "Hi Mike, I\'m Lisa. ___"',
        options: [
          'Good night',
          'Nice to meet you',
          'Good morning',
          'See you later'
        ],
        correctAnswer: 1,
        explanation: '"Nice to meet you" is the appropriate response when someone introduces themselves.'
      }
    ]
  }
}

export default function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId as string
  const [currentExercise, setCurrentExercise] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set())

  const lesson = mockLessonData[lessonId]
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Урок не найден</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Запрашиваемый урок не существует или был удален.
            </p>
            <Link href="/lessons/english/a1">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к урокам
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentEx = lesson.exercises[currentExercise]
  const progress = ((currentExercise + 1) / lesson.exercises.length) * 100

  const handleAnswerSubmit = () => {
    console.log('Submit clicked, selectedAnswer:', selectedAnswer, 'currentEx:', currentEx)
    if (currentEx.type === 'quiz_single') {
      const correct = parseInt(selectedAnswer) === currentEx.correctAnswer
      console.log('Checking answer:', parseInt(selectedAnswer), 'vs', currentEx.correctAnswer, 'correct:', correct)
      setIsCorrect(correct)
      setShowResult(true)
      
      if (correct) {
        setCompletedExercises(prev => new Set([...prev, currentExercise]))
      }
    }
  }

  const handleNext = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1)
      setSelectedAnswer('')
      setShowResult(false)
    }
  }

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1)
      setSelectedAnswer('')
      setShowResult(false)
    }
  }

  const isLastExercise = currentExercise === lesson.exercises.length - 1
  const canProceed = currentEx.type === 'theory' || (currentEx.type === 'quiz_single' && showResult && isCorrect)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LinguaFlow
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">{lesson.title}</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lessons/english/a1">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  К урокам A1
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                Упражнение {currentExercise + 1} из {lesson.exercises.length}
              </span>
              <Badge className="bg-gradient-to-r from-red-500 to-blue-600 text-white">
                🇬🇧 A1
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Star className="w-4 h-4 text-yellow-500" />
              {lesson.xpReward} XP
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  {currentEx.type === 'theory' ? (
                    <BookOpen className="w-6 h-6 text-white" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-2xl">{currentEx.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {currentEx.type === 'theory' ? 'Теория' : 'Тест'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pb-8">
              {currentEx.type === 'theory' ? (
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: currentEx.content }}
                />
              ) : (
                <div className="space-y-6">
                  <div className="text-xl font-medium mb-6">
                    {currentEx.question}
                  </div>
                  
                  {/* Debug info */}
                  <div className="text-sm text-gray-500 p-2 bg-gray-100 rounded">
                    Debug: selectedAnswer = "{selectedAnswer}", showResult = {showResult.toString()}
                  </div>
                  
                  {/* Temporary simple radio buttons for debugging */}
                  <div className="space-y-3">
                    {currentEx.options.map((option: string, index: number) => (
                      <div 
                        key={index} 
                        className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${
                          showResult 
                            ? index === currentEx.correctAnswer
                              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                              : selectedAnswer === index.toString() && !isCorrect
                                ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                                : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                            : 'hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800'
                        }`}
                      >
                        <input
                          type="radio"
                          name="answer"
                          value={index.toString()}
                          checked={selectedAnswer === index.toString()}
                          onChange={(e) => {
                            console.log('Radio changed:', e.target.value)
                            setSelectedAnswer(e.target.value)
                          }}
                          disabled={showResult}
                          className="w-4 h-4"
                        />
                        <label className="flex-1 cursor-pointer text-base">
                          {option}
                        </label>
                        {showResult && index === currentEx.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>

                  {showResult && (
                    <div className={`p-4 rounded-lg ${
                      isCorrect 
                        ? 'bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                        : 'bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800'
                    }`}>
                      <div className={`font-medium mb-2 ${
                        isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                      }`}>
                        {isCorrect ? '✅ Правильно!' : '❌ Неправильно'}
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {currentEx.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentExercise === 0}
              className="bg-white/50 backdrop-blur-sm hover:bg-white/80 border-white/30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Предыдущее
            </Button>

            <div className="flex gap-3">
              {currentEx.type === 'quiz_single' && !showResult && (
                <Button 
                  onClick={() => {
                    console.log('Button clicked! selectedAnswer:', selectedAnswer)
                    handleAnswerSubmit()
                  }}
                  disabled={!selectedAnswer}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Проверить ответ
                </Button>
              )}

              {canProceed && (
                <Button 
                  onClick={isLastExercise ? () => {} : handleNext}
                  className={
                    isLastExercise 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  }
                >
                  {isLastExercise ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Завершить урок
                    </>
                  ) : (
                    <>
                      Далее
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}