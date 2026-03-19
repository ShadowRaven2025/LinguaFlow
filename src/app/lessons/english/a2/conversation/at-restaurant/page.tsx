'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, ArrowLeft, CheckCircle, XCircle, Play, Clock, Star } from 'lucide-react'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'quiz_multiple' | 'fill_gap'
  title: string
  content?: any
  question?: string
  options?: string[]
  correctAnswer?: number | number[]
  fillText?: string
  fillAnswers?: string[]
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'At the Restaurant',
    content: {
      title: 'Phrases for restaurant',
      sections: [
        {
          subtitle: 'Ordering food',
          examples: [
            { word: 'Can I see the menu, please?', translation: 'Можно посмотреть меню?' },
            { word: "I'd like to order...", translation: 'Я хотел бы заказать...' },
            { word: 'What do you recommend?', translation: 'Что вы рекомендуете?' },
            { word: 'I am ready to order.', translation: 'Я готов сделать заказ.' }
          ]
        },
        {
          subtitle: 'Paying',
          examples: [
            { word: 'Can I have the bill, please?', translation: 'Можно счёт, пожалуйста?' },
            { word: 'How much is it?', translation: 'Сколько это стоит?' },
            { word: 'We\'d like to pay.', translation: 'Мы хотели бы заплатить.' }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    type: 'theory',
    title: 'Menu items',
    content: {
      title: 'Блюда и напитки',
      sections: [
        {
          subtitle: 'Food',
          examples: [
            { word: 'starter / appetizer', translation: 'закуска' },
            { word: 'main course', translation: 'основное блюдо' },
            { word: 'dessert', translation: 'десерт' },
            { word: 'side dish', translation: 'гарнир' }
          ]
        },
        {
          subtitle: 'Drinks',
          examples: [
            { word: 'soft drink', translation: 'безалкогольный напиток' },
            { word: 'a glass of wine', translation: 'бокал вина' },
            { word: 'a cup of coffee', translation: 'чашка кофе' }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Restaurant Quiz',
    question: 'How do you ask for the menu?',
    options: [
      'Can I have the bill?',
      'Can I see the menu, please?',
      'Where is the bathroom?',
      'I\'d like a coffee.'
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    type: 'quiz_single',
    title: 'Ordering',
    question: 'How do you ask for the check?',
    options: [
      'What do you recommend?',
      'Can I have the bill, please?',
      'I\'d like a table.',
      'The food is delicious.'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    type: 'quiz_multiple',
    title: 'Select all drinks',
    question: 'Which are drinks?',
    options: ['water', 'steak', 'coffee', 'salad', 'wine', 'bread'],
    correctAnswer: [0, 2, 4]
  },
  {
    id: 6,
    type: 'fill_gap',
    title: 'Complete the dialogue',
    question: 'Fill in the blanks:',
    fillText: 'Waiter: Can I take your ___? Customer: Yes, please. I\'d like to ___.',
    fillAnswers: ['order', 'order']
  },
  {
    id: 7,
    type: 'quiz_single',
    title: 'Vocabulary',
    question: '"Dessert" is...',
    options: ['main course', 'drink', 'sweet course after meal', 'appetizer'],
    correctAnswer: 2
  },
  {
    id: 8,
    type: 'theory',
    title: 'Lesson Complete!',
    content: { title: 'Great job!', completion: true, stats: { xp: 50, time: 20, progress: 100 } }
  }
]

export default function AtRestaurantLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: any }>({})
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({})
  const [fillInputs, setFillInputs] = useState<string[]>([])

  const slide = slides[currentSlide]
  const progress = Math.round(((currentSlide + 1) / slides.length) * 100)

  useEffect(() => { window.dispatchEvent(new CustomEvent('lessonProgressUpdate', { detail: { lessonId: 'a2-8', progress, completed: currentSlide === slides.length - 1 } })) }, [currentSlide, progress])

  const handleAnswer = (answer: any) => { setUserAnswers(prev => ({ ...prev, [slide.id]: answer })); setShowFeedback(prev => ({ ...prev, [slide.id]: true })) }

  const isCorrect = (slideId: number, answer: any) => {
    const s = slides.find(x => x.id === slideId)
    if (!s) return false
    if (s.type === 'quiz_single') return answer === s.correctAnswer
    if (s.type === 'quiz_multiple') return JSON.stringify((answer as number[]).sort()) === JSON.stringify((s.correctAnswer as number[]).sort())
    if (s.type === 'fill_gap') return JSON.stringify(answer.map((a: string) => a.toLowerCase().trim())) === JSON.stringify(s.fillAnswers?.map(a => a.toLowerCase().trim()))
    return false
  }
  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1) }
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1) }

  const renderSlideContent = () => {
    switch (slide.type) {
      case 'theory':
        if (slide.content.completion) return (<div className="text-center space-y-6"><div className="text-6xl mb-6">✅</div><h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2><p className="text-xl text-white/80">You can order food in a restaurant!</p><div className="grid grid-cols-3 gap-4 max-w-md mx-auto"><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-yellow-400">{slide.content.stats.xp}</div><div className="text-sm text-white/60">XP</div></div><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-blue-400">{slide.content.stats.time}</div><div className="text-sm text-white/60">min</div></div><div className="bg-slate-800/50 p-4 rounded-xl"><div className="text-2xl font-bold text-green-400">{slide.content.stats.progress}%</div><div className="text-sm text-white/60">done</div></div></div></div>)
        return (<div className="space-y-8"><div className="text-center"><h2 className="text-2xl font-bold text-white mb-2">{slide.content.title}</h2></div>{slide.content.sections?.map((section: any, i: number) => (<div key={i} className="space-y-4"><h3 className="text-xl font-semibold text-red-400">{section.subtitle}</h3><div className="grid gap-3">{section.examples.map((ex: any, j: number) => (<div key={j} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"><div className="flex-1"><div className="font-semibold text-white text-lg">{ex.word}</div><div className="text-white/60">{ex.translation}</div></div></div>))}</div></div>))}</div>)
      case 'quiz_single':
        return (<div className="space-y-6"><h3 className="text-xl font-semibold text-white">{slide.question}</h3><div className="grid gap-3">{slide.options?.map((opt, i) => (<Button key={i} variant={userAnswers[slide.id] === i ? "default" : "outline"} className="justify-start text-left h-auto p-4 bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white" onClick={() => handleAnswer(i)} disabled={showFeedback[slide.id]}>{opt}</Button>))}</div>{showFeedback[slide.id] && (<div className={`p-4 rounded-xl border ${isCorrect(slide.id, userAnswers[slide.id]) ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-red-900/30 border-red-500 text-red-300'}`}><div className="flex items-center gap-2">{isCorrect(slide.id, userAnswers[slide.id]) ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}<span>{isCorrect(slide.id, userAnswers[slide.id]) ? "Correct!" : `Correct: ${slide.options?.[slide.correctAnswer as number]}`}</span></div></div>)}</div>)
      case 'quiz_multiple':
        const sel = userAnswers[slide.id] || []
        return (<div className="space-y-6"><h3 className="text-xl font-semibold text-white">{slide.question}</h3><div className="grid gap-3">{slide.options?.map((opt, i) => (<Button key={i} variant={sel.includes(i) ? "default" : "outline"} className="justify-start text-left h-auto p-4 bg-slate-800/30 border-slate-600 hover:bg-slate-700 text-white" onClick={() => { const ns = sel.includes(i) ? sel.filter((x: number) => x !== i) : [...sel, i]; setUserAnswers(prev => ({...prev, [slide.id]: ns})) }} disabled={showFeedback[slide.id]}>{opt}</Button>))}</div><Button onClick={() => handleAnswer(sel)} disabled={sel.length === 0 || showFeedback[slide.id]} className="bg-red-600 hover:bg-red-700">Check Answer</Button>{showFeedback[slide.id] && (<div className={`p-4 rounded-xl border ${isCorrect(slide.id, userAnswers[slide.id]) ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-red-900/30 border-red-500 text-red-300'}`}><div className="flex items-center gap-2">{isCorrect(slide.id, userAnswers[slide.id]) ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}<span>{isCorrect(slide.id, userAnswers[slide.id]) ? "Perfect!" : "Try again."}</span></div></div>)}</div>)
      case 'fill_gap':
        const parts = slide.fillText?.split(/___/g) || []
        return (<div className="space-y-6"><h3 className="text-xl font-semibold text-white">{slide.question}</h3><div className="text-lg leading-relaxed bg-slate-800/30 p-6 rounded-xl border border-slate-600">{parts.map((part, index) => (<span key={index} className="text-white">{part}{index < parts.length - 1 && (<input type="text" className="mx-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded w-32 text-center text-white" value={fillInputs[index] || ''} onChange={(e) => { const ni = [...fillInputs]; ni[index] = e.target.value; setFillInputs(ni) }} disabled={showFeedback[slide.id]} placeholder="?" />)}</span>))}</div><Button onClick={() => handleAnswer(fillInputs)} disabled={fillInputs.length !== slide.fillAnswers?.length || showFeedback[slide.id]} className="bg-red-600 hover:bg-red-700">Check Answers</Button>{showFeedback[slide.id] && (<div className={`p-4 rounded-xl border ${isCorrect(slide.id, userAnswers[slide.id]) ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-red-900/30 border-red-500 text-red-300'}`}><div className="flex items-center gap-2">{isCorrect(slide.id, userAnswers[slide.id]) ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}<span>{isCorrect(slide.id, userAnswers[slide.id]) ? "Perfect!" : `Correct: ${slide.fillAnswers?.join(', ')}`}</span></div></div>)}</div>)
      default: return <div className="text-white">Unknown</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 text-white">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50"><div className="container mx-auto px-4 py-4"><div className="flex items-center justify-between"><Link href="/lessons/english/a2" className="flex items-center space-x-2"><div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center"><BookOpen className="w-6 h-6 text-white" /></div><span className="text-2xl font-bold">LinguaFlow</span></Link><div className="flex items-center space-x-4"><ThemeToggle /><Link href="/lessons/english/a2/conversation"><Button variant="outline" className="border-slate-600 hover:bg-slate-700"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button></Link></div></div></div></header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8"><div className="flex items-center gap-4 mb-6"><div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center"><BookOpen className="w-8 h-8 text-white" /></div><div><div className="text-sm text-white/60 mb-1">Урок 8 • Conversation</div><h1 className="text-3xl font-bold">At the Restaurant</h1><p className="text-white/80">В ресторане</p></div></div><div className="mb-6"><div className="flex items-center justify-between mb-2"><span className="text-sm text-white/60">Progress</span><span className="text-2xl font-bold text-red-400">{progress}%</span></div><div className="w-full bg-slate-800 rounded-full h-3"><div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div></div><div className="flex items-center gap-6 text-sm text-white/60"><div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>20 min</span></div><div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /><span>50 XP</span></div></div></div>
        <Card className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"><CardContent className="p-8">{renderSlideContent()}<div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50"><Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0} className="border-slate-600 hover:bg-slate-700 text-white"><ArrowLeft className="w-4 h-4 mr-2" />Back</Button>{currentSlide === slides.length - 1 ? (<Link href="/lessons/english/a2/conversation"><Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8"><Play className="w-4 h-4 mr-2" />Continue</Button></Link>) : (<Button onClick={nextSlide} disabled={slide.type !== 'theory' && !showFeedback[slide.id]} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white">Continue<Play className="w-4 h-4 ml-2" /></Button>)}</div></CardContent></Card>
      </main>
    </div>
  )
}
