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
    title: 'Debates',
    content: {
      title: 'Expressing Opinions in Debates',
      sections: [
        {
          subtitle: 'Agreeing',
          examples: [
            { word: 'I completely agree with you.', translation: 'Я полностью с вами согласен.' },
            { word: "That's exactly what I think.", translation: 'Именно это я и думаю.' },
            { word: "I couldn't agree more.", translation: 'Я не могу согласиться больше.' }
          ]
        },
        {
          subtitle: 'Disagreeing',
          examples: [
            { word: "I'm afraid I disagree.", translation: 'Боюсь, я не согласен.' },
            { word: "That's not quite right.", translation: 'Это не совсем так.' },
            { word: 'I see your point, but...', translation: 'Я понимаю вашу точку зрения, но...' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'theory',
    title: 'Arguments',
    content: {
      title: 'Presenting Arguments',
      sections: [
        {
          subtitle: 'Introducing arguments',
          examples: [
            { word: 'First of all...', translation: 'Прежде всего...' },
            { word: 'The main advantage is...', translation: 'Главное преимущество...' },
            { word: 'On the other hand...', translation: 'С другой стороны...' },
            { word: 'In conclusion...', translation: 'В заключение...' }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Agreeing',
    question: '"I couldn\'t agree more" means...',
    options: ['I totally disagree', 'I completely agree', 'I need more time', 'I am unsure'],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'quiz_single',
    title: 'Introducing Arguments',
    question: 'Which phrase introduces the first point?',
    options: ['On the other hand', 'First of all', 'In conclusion', 'However'],
    correctAnswer: 1
  },
  {
    id: 5,
    type: 'quiz_single',
    title: 'Disagreeing Politely',
    question: '"I see your point, but..." is used for...',
    options: ['strong agreement', 'polite disagreement', 'asking a question', 'giving examples'],
    correctAnswer: 1
  },
  {
    id: 6,
    type: 'theory',
    title: 'Lesson Complete!',
    content: { title: 'Great job!', completion: true, stats: { xp: 70, time: 25, progress: 100 } }
  }
]

export default function DebatesLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})

  const slide = slides[currentSlide]
  const progress = Math.round(((currentSlide + 1) / slides.length) * 100)

  useEffect(() => { window.dispatchEvent(new CustomEvent('lessonProgressUpdate', { detail: { lessonId: 'b2-conv-1', progress, completed: currentSlide === slides.length - 1 } })) }, [currentSlide, progress])

  const handleAnswer = (answer: any) => { setUserAnswers(prev => ({ ...prev, [slide.id]: answer })); setShowFeedback(prev => ({ ...prev, [slide.id]: true })) }
  const isCorrect = (slideId: number, answer: any) => { const s = slides.find(x => x.id === slideId); return s?.type === 'quiz_single' && answer === s.correctAnswer }
  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1) }
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1) }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        if (slide.content.completion) return (<div className="text-center space-y-6"><div className="text-6xl mb-6">✅</div><h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2><p className="text-xl text-white/80">Debate skills mastered!</p><div className="grid grid-cols-3 gap-4 max-w-md mx-auto"><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div><div className="text-sm text-white/60">XP</div></div><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-400">{slide.content.stats.time}</div><div className="text-sm text-white/60">min</div></div><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-400">{slide.content.stats.progress}%</div><div className="text-sm text-white/60">done</div></div></div></div>)
        return (<div className="space-y-8"><div className="text-center"><h2 className="text-2xl font-bold text-white mb-2">{slide.content.title}</h2></div>{slide.content.sections?.map((section: any, i: number) => (<div key={i} className="space-y-4"><h3 className="text-xl font-semibold text-purple-400">{section.subtitle}</h3><div className="grid gap-3">{section.examples.map((ex: any, j: number) => (<div key={j} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"><div className="flex-1"><div className="font-semibold text-white text-lg">{ex.word}</div><div className="text-white/60">{ex.translation}</div></div></div>))}</div></div>))}</div>)
      case 'quiz_single':
        return (<div className="space-y-6"><h3 className="text-xl font-semibold text-white">{slide.question}</h3><div className="grid gap-3">{slide.options?.map((opt, i) => (<Button key={i} variant={userAnswers[slide.id] === i ? "default" : "outline"} className="justify-start text-left h-auto p-4 bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white" onClick={() => handleAnswer(i)} disabled={showFeedback[slide.id]}>{opt}</Button>))}</div>{showFeedback[slide.id] && (<div className={`p-4 rounded-xl border ${isCorrect(slide.id, userAnswers[slide.id]) ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-red-900/30 border-red-500 text-red-300'}`}><div className="flex items-center gap-2">{isCorrect(slide.id, userAnswers[slide.id]) ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}<span>{isCorrect(slide.id, userAnswers[slide.id]) ? "Correct!" : `Correct: ${slide.options?.[slide.correctAnswer as number]}`}</span></div></div>)}</div>)
      default: return <div className="text-white">Unknown</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50"><div className="container mx-auto px-4 py-4"><div className="flex items-center justify-between"><Link href="/lessons/english/b2" className="flex items-center space-x-2"><div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center"><BookOpen className="w-6 h-6 text-white" /></div><span className="text-2xl font-bold">LinguaFlow</span></Link><div className="flex items-center space-x-4"><ThemeToggle /><Link href="/lessons/english/b2"><Button variant="outline" className="border-slate-600 hover:bg-slate-700"><ArrowLeft className="w-4 h-4 mr-2" />Back to B2</Button></Link></div></div></div></header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8"><div className="flex items-center gap-4 mb-6"><div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center"><BookOpen className="w-8 h-8 text-white" /></div><div><div className="text-sm text-white/60 mb-1">B2 • Conversation</div><h1 className="text-3xl font-bold">Debates & Arguments</h1><p className="text-white/80">Presenting your opinion in debates</p></div></div><div className="mb-6"><div className="flex items-center justify-between mb-2"><span className="text-sm text-white/60">Progress</span><span className="text-2xl font-bold text-purple-400">{progress}%</span></div><div className="w-full bg-slate-800 rounded-full h-3"><div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div></div><div className="flex items-center gap-6 text-sm text-white/60"><div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>25 min</span></div><div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /><span>70 XP</span></div></div></div>
        <Card className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"><CardContent className="p-8">{renderSlideContent()}<div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50"><Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0} className="border-slate-600 hover:bg-slate-700 text-white"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>{currentSlide === slides.length - 1 ? (<Link href="/lessons/english/b2"><Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8"><Play className="w-4 h-4 mr-2" />Continue</Button></Link>) : (<Button onClick={nextSlide} disabled={slide.type !== 'theory' && !showFeedback[slide.id]} className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">Continue<Play className="w-4 h-4 ml-2" /></Button>)}</div></CardContent></Card>
      </main>
    </div>
  )
}
