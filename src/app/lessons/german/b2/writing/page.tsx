'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, ArrowLeft, CheckCircle, XCircle, Play, Clock, Star } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single'
  title: string
  content?: any
  question?: string
  options?: string[]
  correctAnswer?: number
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Essay Writing',
    content: {
      title: 'Структура эссе',
      sections: [
        {
          subtitle: 'Einleitung',
          examples: [
            { word: 'Einleitung: Thema vorstellen', translation: 'Введение: представить тему' },
            { word: 'These formulieren', translation: 'Сформулировать тезис' },
            { word: 'In dieser Arbeit wird...', translation: 'В этой работе...' }
          ]
        },
        {
          subtitle: 'Hauptteil',
          examples: [
            { word: 'Erstens... Zweitens...', translation: 'Во-первых... Во-вторых...' },
            { word: 'Darüber hinaus...', translation: 'Кроме того...' },
            { word: 'Zum Beispiel...', translation: 'Например...' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'theory',
    title: 'Schluss',
    content: {
      title: 'Заключение',
      sections: [
        {
          subtitle: 'Schlussfolgerung',
          examples: [
            { word: 'Zusammenfassend lässt sich sagen...', translation: 'Таким образом...' },
            { word: 'Abschließend kann man sagen...', translation: 'В заключение можно сказать...' },
            { word: 'Alles in allem...', translation: 'В целом...' }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Essay Structure',
    question: '"Einleitung" means...',
    options: ['conclusion', 'introduction', 'main part', 'example'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'quiz_single',
    title: 'Transition words',
    question: '"Zum Beispiel" means...',
    options: ['therefore', 'however', 'for example', 'in conclusion'],
    correctAnswer: 2
  },
  {
    id: 5,
    type: 'quiz_single',
    title: 'Formal Writing',
    question: 'Which phrase is used for conclusion?',
    options: ['Zuerst', 'Darüber hinaus', 'Zusammenfassend', 'Außerdem'],
    correctAnswer: 2
  },
  {
    id: 6,
    type: 'theory',
    title: 'Lesson Complete!',
    content: { title: 'Gut gemacht!', completion: true, stats: { xp: 90, time: 35, progress: 100 } }
  }
]

export default function GermanEssayWritingLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})

  const slide = slides[currentSlide]
  const progress = Math.round(((currentSlide + 1) / slides.length) * 100)

  useEffect(() => { window.dispatchEvent(new CustomEvent('lessonProgressUpdate', { detail: { lessonId: 'german-b2-write', progress, completed: currentSlide === slides.length - 1 } })) }, [currentSlide, progress])

  const handleAnswer = (answer: any) => { setUserAnswers(prev => ({ ...prev, [slide.id]: answer })); setShowFeedback(prev => ({ ...prev, [slide.id]: true })) }
  const isCorrect = (slideId: number, answer: any) => { const s = slides.find(x => x.id === slideId); return s?.type === 'quiz_single' && answer === s.correctAnswer }
  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1) }
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1) }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        if (slide.content.completion) return (<div className="text-center space-y-6"><div className="text-6xl mb-6">✅</div><h2 className="text-3xl font-bold text-green-400">Lektion abgeschlossen!</h2><p className="text-xl text-white/80">Essay writing mastered!</p><div className="grid grid-cols-3 gap-4 max-w-md mx-auto"><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div><div className="text-sm text-white/60">XP</div></div><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-400">{slide.content.stats.time}</div><div className="text-sm text-white/60">min</div></div><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-400">{slide.content.stats.progress}%</div><div className="text-sm text-white/60">done</div></div></div></div>)
        return (<div className="space-y-8"><div className="text-center"><h2 className="text-2xl font-bold text-white mb-2">{slide.content.title}</h2></div>{slide.content.sections?.map((section: any, i: number) => (<div key={i} className="space-y-4"><h3 className="text-xl font-semibold text-green-400">{section.subtitle}</h3><div className="grid gap-3">{section.examples.map((ex: any, j: number) => (<div key={j} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"><div className="flex-1"><div className="font-semibold text-white text-lg">{ex.word}</div><div className="text-white/60">{ex.translation}</div></div></div>))}</div></div>))}</div>)
      case 'quiz_single':
        return (<div className="space-y-6"><h3 className="text-xl font-semibold text-white">{slide.question}</h3><div className="grid gap-3">{slide.options?.map((opt, i) => (<Button key={i} variant={userAnswers[slide.id] === i ? "default" : "outline"} className="justify-start text-left h-auto p-4 bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white" onClick={() => handleAnswer(i)} disabled={showFeedback[slide.id]}>{opt}</Button>))}</div>{showFeedback[slide.id] && (<div className={`p-4 rounded-xl border ${isCorrect(slide.id, userAnswers[slide.id]) ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-red-900/30 border-red-500 text-red-300'}`}><div className="flex items-center gap-2">{isCorrect(slide.id, userAnswers[slide.id]) ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}<span>{isCorrect(slide.id, userAnswers[slide.id]) ? "Richtig!" : `Richtig: ${slide.options?.[slide.correctAnswer as number]}`}</span></div></div>)}</div>)
      default: return <div className="text-white">Unknown</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50"><div className="container mx-auto px-4 py-4"><div className="flex items-center justify-between"><Link href="/lessons/german/b2" className="flex items-center space-x-2"><div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center"><BookOpen className="w-6 h-6 text-white" /></div><span className="text-2xl font-bold">LinguaFlow</span></Link><div className="flex items-center space-x-4"><ThemeToggle /><Link href="/lessons/german/b2"><Button variant="outline" className="border-slate-600 hover:bg-slate-700">Zurück zu B2</Button></Link></div></div></div></header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8"><div className="flex items-center gap-4 mb-6"><div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center"><BookOpen className="w-8 h-8 text-white" /></div><div><div className="text-sm text-white/60 mb-1">B2 • Schreiben</div><h1 className="text-3xl font-bold">Essay schreiben</h1><p className="text-white/80">Структура и написание эссе</p></div></div><div className="mb-6"><div className="flex items-center justify-between mb-2"><span className="text-sm text-white/60">Fortschritt</span><span className="text-2xl font-bold text-green-400">{progress}%</span></div><div className="w-full bg-slate-800 rounded-full h-3"><div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div></div><div className="flex items-center gap-6 text-sm text-white/60"><div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>35 min</span></div><div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /><span>90 XP</span></div></div></div>
        <Card className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"><CardContent className="p-8">{renderSlideContent()}<div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50"><Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0} className="border-slate-600 hover:bg-slate-700 text-white">Zurück</Button>{currentSlide === slides.length - 1 ? (<Link href="/lessons/german/b2"><Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8">Weiter<Play className="w-4 h-4 ml-2" /></Button></Link>) : (<Button onClick={nextSlide} disabled={slide.type !== 'theory' && !showFeedback[slide.id]} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">Weiter<Play className="w-4 h-4 ml-2" /></Button>)}</div></CardContent></Card>
      </main>
    </div>
  )
}
