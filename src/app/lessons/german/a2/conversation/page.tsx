'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ThemeToggle } from '@/components/theme-toggle'

interface Slide {
  id: number
  type: 'theory' | 'quiz_single' | 'completion'
  title: string
  content?: string
  question?: string
  options?: string[]
  correctAnswer?: string
  explanation?: string
}

const lessonSlides: Slide[] = [
  {
    id: 1,
    type: 'theory',
    title: 'Gespräche - Разговоры',
    content: `
      <div class="space-y-6">
        <p class="text-lg text-center mb-6">Разговорные фразы для повседневного общения</p>
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-green-400">📞 Назначение встречи</h3>
          <div class="glass p-4 rounded-xl">
            <div class="space-y-2">
              <div class="flex justify-between"><span class="text-white">Ich möchte einen Termin vereinbaren</span><span class="text-white/60">Я хотел бы назначить встречу</span></div>
              <div class="flex justify-between"><span class="text-white">Wann haben Sie Zeit?</span><span class="text-white/60">Когда у вас есть время?</span></div>
              <div class="flex justify-between"><span class="text-white">Am ... um ... Uhr</span><span class="text-white/60">... в ... часов</span></div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-blue-400">🆘 Просьба о помощи</h3>
          <div class="glass p-4 rounded-xl">
            <div class="space-y-2">
              <div class="flex justify-between"><span class="text-white">Können Sie mir helfen?</span><span class="text-white/60">Можете ли вы мне помочь?</span></div>
              <div class="flex justify-between"><span class="text-white">Entschuldigung, können Sie mir sagen...</span><span class="text-white/60">Извините, не могли бы вы сказать...</span></div>
              <div class="flex justify-between"><span class="text-white">Ich brauche Hilfe</span><span class="text-white/60">Мне нужна помощь</span></div>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h3 class="text-xl font-bold text-purple-400">💭 Выражение мнения</h3>
          <div class="glass p-4 rounded-xl">
            <div class="space-y-2">
              <div class="flex justify-between"><span class="text-white">Ich denke, dass...</span><span class="text-white/60">Я думаю, что...</span></div>
              <div class="flex justify-between"><span class="text-white">Meiner Meinung nach...</span><span class="text-white/60">По моему мнению...</span></div>
              <div class="flex justify-between"><span class="text-white">Ich stimme zu / nicht zu</span><span class="text-white/60">Я согласен / не согласен</span></div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    type: 'quiz_single',
    title: 'Gespräche Quiz',
    question: 'Как сказать "Можете ли вы мне помочь?"',
    options: ['Können Sie mir helfen?', 'Ich brauche Hilfe', 'Wann haben Sie Zeit?', 'Ich denke, dass...'],
    correctAnswer: 'Können Sie mir helfen?',
    explanation: 'Правильно! "Können Sie mir helfen?" - вежливая форма просьбы о помощи.'
  },
  {
    id: 3,
    type: 'quiz_single',
    title: 'Gespräche Quiz',
    question: 'Что означает "Meiner Meinung nach"?',
    options: ['По моему мнению', 'Я думаю, что', 'Я согласен', 'Мне нужно'],
    correctAnswer: 'По моему мнению',
    explanation: 'Верно! "Meiner Meinung nach" используется для выражения мнения.'
  },
  {
    id: 4,
    type: 'completion',
    title: 'Урок завершен! 🎉',
    content: `
      <div class="text-center space-y-6">
        <div class="text-6xl mb-4">💬</div>
        <h2 class="text-2xl font-bold text-green-600">Поздравляем!</h2>
        <p class="text-lg">Вы выучили разговорные фразы!</p>
        <div class="bg-green-50 p-6 rounded-xl">
          <h3 class="font-semibold mb-3">Что вы изучили:</h3>
          <ul class="text-left space-y-2">
            <li>✅ Назначение встречи</li>
            <li>✅ Просьба о помощи</li>
            <li>✅ Выражение мнения</li>
          </ul>
        </div>
        <div class="flex gap-4 justify-center">
          <div class="text-center"><div class="text-2xl font-bold text-blue-600">+45</div><div class="text-sm text-gray-500">XP</div></div>
        </div>
      </div>
    `
  }
]

export default function ConversationLesson() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const progress = ((currentSlide + 1) / lessonSlides.length) * 100

  useEffect(() => {
    const progressEvent = new CustomEvent('lessonProgressUpdate', {
      detail: { lessonId: 'conversation-a2', progress: Math.round(progress), completed: currentSlide === lessonSlides.length - 1 }
    })
    window.dispatchEvent(progressEvent)
  }, [currentSlide, progress])

  const handleAnswer = (answer: string) => { setSelectedAnswer(answer); setShowFeedback(true) }
  const nextSlide = () => { if (currentSlide < lessonSlides.length - 1) { setCurrentSlide(c => c + 1); setSelectedAnswer(null); setShowFeedback(false) } }
  const prevSlide = () => { if (currentSlide > 0) { setCurrentSlide(c => c - 1); setSelectedAnswer(null); setShowFeedback(false) } }

  const slide = lessonSlides[currentSlide]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center"><MessageCircle className="w-6 h-6 text-white" /></div>
              <h1 className="text-xl font-bold text-white">LinguaFlow</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/lessons/german/a2"><Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10"><ArrowLeft className="w-4 h-4 mr-2" />Назад</Button></Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center"><MessageCircle className="w-8 h-8 text-white" /></div>
            <div>
              <div className="text-primary font-medium">Урок</div>
              <h1 className="text-3xl font-bold text-white mb-2">Gespräche</h1>
              <p className="text-white/80">Разговорная практика A2</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-white/80">Прогресс</span><span className="text-2xl font-bold text-white">{Math.round(progress)}%</span></div>
            <Progress value={progress} className="h-3" />
            <div className="flex gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />15 мин</span>
              <span className="flex items-center gap-1"><Zap className="w-4 h-4" />45 XP</span>
            </div>
          </div>
        </div>

        <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
          <CardHeader><CardTitle className="text-white flex items-center gap-2"><span className="text-purple-400">#{slide.id}</span>{slide.title}</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            {slide.type === 'theory' && <div className="text-slate-200 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: slide.content || '' }} />}
            {slide.type === 'quiz_single' && (
              <div className="space-y-4">
                <p className="text-lg text-white">{slide.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {slide.options?.map((option, index) => (
                    <Button key={index} variant={selectedAnswer === option ? "default" : "outline"}
                      className={`p-4 h-auto text-left justify-start ${showFeedback ? option === slide.correctAnswer ? "bg-green-600 border-green-500" : selectedAnswer === option ? "bg-red-600 border-red-500" : "border-slate-600" : selectedAnswer === option ? "bg-purple-600 border-purple-500" : "border-slate-600 hover:border-slate-500"}`}
                      onClick={() => !showFeedback && handleAnswer(option)} disabled={showFeedback}>{option}</Button>
                  ))}
                </div>
                {showFeedback && slide.explanation && <div className="glass border border-purple-700/50 rounded-xl p-4"><p className="text-purple-200">{slide.explanation}</p></div>}
              </div>
            )}
            {slide.type === 'completion' && <div className="text-slate-200" dangerouslySetInnerHTML={{ __html: slide.content || '' }} />}
            <div className="flex justify-between items-center pt-6 border-t border-slate-700">
              <Button variant="outline" onClick={prevSlide} disabled={currentSlide === 0} className="border-slate-600 hover:border-slate-500"><ArrowLeft className="w-4 h-4 mr-2" />Назад</Button>
              <div className="flex items-center gap-2">{lessonSlides.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === currentSlide ? 'bg-purple-500' : i < currentSlide ? 'bg-green-500' : 'bg-slate-600'}`} />)}</div>
              {currentSlide === lessonSlides.length - 1 ? (
                <Link href="/lessons/german/a2"><Button className="bg-gradient-to-r from-green-500 to-emerald-500"><CheckCircle className="w-4 h-4 mr-2" />Завершить</Button></Link>
              ) : (
                <Button onClick={nextSlide} disabled={slide.type === 'quiz_single' && !showFeedback} className="bg-purple-600 hover:bg-purple-700">Далее<ArrowRight className="w-4 h-4 ml-2" /></Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
