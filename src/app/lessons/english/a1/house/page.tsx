'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, ArrowLeft, CheckCircle, Volume2, RotateCcw } from 'lucide-react'

const vocabularyItems = [
  { english: 'house', russian: 'дом', russianGenitive: 'дома' },
  { english: 'apartment', russian: 'квартира', russianGenitive: 'квартиры' },
  { english: 'room', russian: 'комната', russianGenitive: 'комнаты' },
  { english: 'bedroom', russian: 'спальня', russianGenitive: 'спальни' },
  { english: 'living room', russian: 'гостиная', russianGenitive: 'гостиной' },
  { english: 'kitchen', russian: 'кухня', russianGenitive: 'кухни' },
  { english: 'bathroom', russian: 'ванная', russianGenitive: 'ванной' },
  { english: 'toilet', russian: 'туалет', russianGenitive: 'туалета' },
  { english: 'hall', russian: 'прихожая', russianGenitive: 'прихожей' },
  { english: 'dining room', russian: 'столовая', russianGenitive: 'столовой' },
]

const furnitureItems = [
  { english: 'bed', russian: 'кровать', russianGenitive: 'кровати' },
  { english: 'table', russian: 'стол', russianGenitive: 'стола' },
  { english: 'chair', russian: 'стул', russianGenitive: 'стула' },
  { english: 'sofa', russian: 'диван', russianGenitive: 'дивана' },
  { english: 'armchair', russian: 'кресло', russianGenitive: 'кресла' },
  { english: 'shelf', russian: 'полка', russianGenitive: 'полки' },
  { english: 'wardrobe', russian: 'шкаф', russianGenitive: 'шкафа' },
  { english: 'desk', russian: 'письменный стол', russianGenitive: 'письменного стола' },
  { english: 'lamp', russian: 'лампа', russianGenitive: 'лампы' },
  { english: 'carpet', russian: 'ковёр', russianGenitive: 'ковра' },
]

export default function AtHomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showVocabulary, setShowVocabulary] = useState(true)
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [exerciseComplete, setExerciseComplete] = useState(false)

  const allItems = showVocabulary ? vocabularyItems : furnitureItems
  const totalItems = allItems.length

  const handleAnswer = () => {
    const currentItem = allItems[currentSlide]
    const correct = userAnswer.toLowerCase().trim() === currentItem.english.toLowerCase()
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (currentSlide < totalItems - 1) {
        setCurrentSlide(currentSlide + 1)
        setUserAnswer('')
        setIsCorrect(null)
      } else {
        setExerciseComplete(true)
      }
    }, 1500)
  }

  const resetExercise = () => {
    setCurrentSlide(0)
    setUserAnswer('')
    setIsCorrect(null)
    setScore(0)
    setExerciseComplete(false)
  }

  const progress = ((currentSlide + 1) / totalItems) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <header className="relative z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">LinguaFlow</span>
                <div className="text-xs text-muted-foreground">At Home</div>
              </div>
            </Link>
            <Link href="/lessons/english/a1">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                К урокам
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Rooms & Furniture
            </span>
          </h1>
          <p className="text-muted-foreground">Комнаты и мебель</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            variant={showVocabulary ? 'default' : 'outline'}
            onClick={() => { setShowVocabulary(true); resetExercise() }}
            className={showVocabulary ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : ''}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Rooms (Комнаты)
          </Button>
          <Button
            variant={!showVocabulary ? 'default' : 'outline'}
            onClick={() => { setShowVocabulary(false); resetExercise() }}
            className={!showVocabulary ? 'bg-gradient-to-r from-blue-500 to-cyan-600' : ''}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Furniture (Мебель)
          </Button>
        </div>

        {/* Vocabulary Cards */}
        {!exerciseComplete && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {allItems.map((item, index) => (
              <Card 
                key={index}
                className={`transition-all duration-300 ${
                  index === currentSlide 
                    ? 'ring-2 ring-primary shadow-xl scale-105' 
                    : index < currentSlide 
                      ? 'opacity-50' 
                      : 'opacity-100'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    {index < currentSlide && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{item.english}</h3>
                  <p className="text-lg text-muted-foreground">{item.russian}</p>
                  <p className="text-sm text-muted-foreground/70">{item.russianGenitive}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Exercise */}
        {!exerciseComplete ? (
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">Вопрос {currentSlide + 1} из {totalItems}</Badge>
                <Badge variant="outline">{score} правильных</Badge>
              </div>
              <Progress value={progress} className="mt-4" />
              <CardTitle className="mt-4">
                Как переводится "{allItems[currentSlide].russian}"?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Введите ответ на английском..."
                className="w-full p-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-center"
                onKeyDown={(e) => e.key === 'Enter' && handleAnswer()}
              />
              
              {isCorrect !== null && (
                <div className={`p-4 rounded-xl text-center ${
                  isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {isCorrect ? (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="text-lg font-bold">Правильно!</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-lg font-bold">Неправильно. Правильный ответ: </span>
                      <span className="text-lg font-bold">{allItems[currentSlide].english}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button onClick={handleAnswer} className="flex-1" size="lg">
                  Проверить
                </Button>
                <Button variant="outline" onClick={resetExercise} size="lg">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Урок завершён!</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Вы ответили правильно на {score} из {totalItems} вопросов
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={resetExercise} size="lg">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Пройти снова
                </Button>
                <Link href="/lessons/english/a1">
                  <Button variant="outline" size="lg">
                    К списку уроков
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Изученные слова</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Rooms:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {vocabularyItems.map((item, i) => (
                    <li key={i}>• {item.english} - {item.russian}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Furniture:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {furnitureItems.map((item, i) => (
                    <li key={i}>• {item.english} - {item.russian}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
