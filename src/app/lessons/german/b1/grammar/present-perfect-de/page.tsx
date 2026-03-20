'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle, XCircle, Clock, Star, BookOpen } from 'lucide-react'

const exercises: Array<{
  id: number;
  type: 'quiz_single' | 'fill_gap';
  question: string;
  options?: string[];
  correct?: number;
  answer?: string;
  acceptableAnswers?: string[];
  explanation: string;
}> = [
  {
    id: 1,
    type: 'quiz_single',
    question: 'Wählen Sie die richtige Form: Er ___ gestern einen Film ___.',
    options: [
      'hat ... gesehen',
      'hat ... sehen',
      'hat ... gesesehen',
      'habe ... gesehen'
    ],
    correct: 0,
    explanation: 'Perfekt mit haben: hat + Partizip II (gesehen).'
  },
  {
    id: 2,
    type: 'fill_gap',
    question: 'Ich ___ gestern Deutsch ___. (lernen)',
    answer: 'habe gelernt',
    acceptableAnswers: ['habe gelernt', 'habe gelernt'],
    explanation: 'Perfekt mit haben. Partizip II: ge + lern + t.'
  },
  {
    id: 3,
    type: 'quiz_single',
    question: 'Welches Verb bildet Perfekt mit sein?',
    options: [
      'machen',
      'spielen',
      'gehen',
      'lernen'
    ],
    correct: 2,
    explanation: 'Gehen (gehen - gegangen) benutzt sein im Perfekt.'
  },
  {
    id: 4,
    type: 'fill_gap',
    question: 'Sie ___ nach Berlin ___. (fahren)',
    answer: 'ist gefahren',
    acceptableAnswers: ['ist gefahren', 'sie ist gefahren'],
    explanation: 'Fahren benutzt sein im Perfekt. Partizip II: ge + fahr + en.'
  },
  {
    id: 5,
    type: 'quiz_single',
    question: 'Wie bildet man das Partizip II von "spielen"?',
    options: [
      'gespielt',
      'spielet',
      'gespielt',
      'spielte'
    ],
    correct: 0,
    explanation: 'ge + spiel + t = gespielt.'
  }
]

export default function PerfektLesson() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number[]>([])
  const [fillGapAnswer, setFillGapAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const totalSteps = exercises.length
  const currentExercise = exercises[currentStep]
  const progress = ((currentStep + 1) / totalSteps) * 100

  const checkAnswer = () => {
    if (!currentExercise) return
    let isCorrect = false
    
    if (currentExercise.type === 'quiz_single') {
      isCorrect = selectedAnswer[0] === currentExercise.correct
    } else if (currentExercise.type === 'fill_gap' && currentExercise.acceptableAnswers) {
      isCorrect = currentExercise.acceptableAnswers.some(
        ans => fillGapAnswer.toLowerCase().trim() === ans.toLowerCase()
      )
    }

    if (isCorrect) setCorrectCount(prev => prev + 1)
    setShowResult(true)
    setIsAnswerSubmitted(true)
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
    setSelectedAnswer([])
    setFillGapAnswer('')
    setShowResult(false)
    setIsAnswerSubmitted(false)
  }

  const handleOptionSelect = (index: number) => {
    if (!isAnswerSubmitted) setSelectedAnswer([index])
  }

  if (!mounted) return null

  const isComplete = currentStep === totalSteps - 1 && showResult
  const finalScore = Math.round((correctCount / exercises.length) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/b1/grammar">
              <Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-2" />B1 Grammatik</Button>
            </Link>
            <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary" /><span className="font-semibold">Perfekt</span></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4" /><span>15 min</span></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Fortschritt</span>
              <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {!isComplete ? (
            <Card>
              <CardContent className="p-6">
                <Badge variant="outline" className="mb-2">Übung {currentStep + 1} von {exercises.length}</Badge>
                <h2 className="text-xl font-bold mb-4">Das Perfekt</h2>
                <p className="text-lg mb-6">{currentExercise.question}</p>

                {currentExercise.type === 'quiz_single' && currentExercise.options && (
                  <div className="space-y-3">
                    {currentExercise.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                          selectedAnswer[0] === i ? (isAnswerSubmitted ? (currentExercise.correct === i ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-primary bg-primary/10') 
                          : (isAnswerSubmitted && currentExercise.correct === i ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-primary/50')
                        }`}
                      >
                        {option}
                        {isAnswerSubmitted && selectedAnswer[0] === i && (currentExercise.correct === i ? <CheckCircle className="inline w-5 h-5 ml-2 text-green-500" /> : <XCircle className="inline w-5 h-5 ml-2 text-red-500" />)}
                        {isAnswerSubmitted && currentExercise.correct === i && selectedAnswer[0] !== i && <CheckCircle className="inline w-5 h-5 ml-2 text-green-500" />}
                      </button>
                    ))}
                  </div>
                )}

                {currentExercise.type === 'fill_gap' && (
                  <div className="space-y-4">
                    <input type="text" value={fillGapAnswer} onChange={(e) => !isAnswerSubmitted && setFillGapAnswer(e.target.value)} disabled={isAnswerSubmitted} placeholder="Schreiben Sie Ihre Antwort..." className="w-full p-4 text-lg rounded-xl border-2 border-slate-200 focus:border-primary focus:outline-none" />
                    {isAnswerSubmitted && <p className="text-sm text-muted-foreground">Richtig: {currentExercise.answer}</p>}
                  </div>
                )}

                {showResult && (
                  <div className={`mt-4 p-4 rounded-xl ${(currentExercise.type === 'quiz_single' && selectedAnswer[0] === currentExercise.correct) || (currentExercise.type === 'fill_gap' && currentExercise.acceptableAnswers?.some(ans => fillGapAnswer.toLowerCase().trim() === ans.toLowerCase())) ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="font-medium">
                      {(currentExercise.type === 'quiz_single' && selectedAnswer[0] === currentExercise.correct) || (currentExercise.type === 'fill_gap' && currentExercise.acceptableAnswers?.some(ans => fillGapAnswer.toLowerCase().trim() === ans.toLowerCase())) ? 'Richtig!' : 'Nicht ganz.'}
                    </p>
                    <p className="text-sm mt-1 text-muted-foreground">{currentExercise.explanation}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {!isAnswerSubmitted ? (
                    <Button onClick={checkAnswer} className="flex-1" size="lg" disabled={(currentExercise.type === 'quiz_single' && selectedAnswer.length === 0) || (currentExercise.type === 'fill_gap' && !fillGapAnswer.trim())}>
                      Antwort prüfen
                    </Button>
                  ) : (
                    <Button onClick={nextStep} className="flex-1" size="lg">
                      {currentStep < totalSteps - 1 ? 'Weiter' : 'Ergebnisse'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Lektion abgeschlossen!</h2>
                <p className="text-muted-foreground mb-6">Sie haben die Perfekt-Lektion beendet.</p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">{finalScore}%</div>
                  <p className="text-muted-foreground">{correctCount} von {exercises.length} richtig</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/lessons/german/b1" className="flex-1">
                    <Button variant="outline" className="w-full">Zurück</Button>
                  </Link>
                  <Link href="/lessons/german" className="flex-1">
                    <Button className="w-full">Weiter lernen</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
