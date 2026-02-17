'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { BookOpen, Play, Clock, Star, ArrowLeft, CheckCircle, XCircle, MessageCircle } from 'lucide-react'

const slides = [
  {
    id: 1,
    type: 'theory',
    title: 'Greetings and Introductions',
    content: {
      title: 'Learn basic greetings and how to introduce yourself',
      sections: [
        {
          subtitle: 'Basic Greetings',
          examples: [
            { word: 'Hello', translation: 'Привет/Здравствуйте', emoji: '👋' },
            { word: 'Hi', translation: 'Привет', emoji: '😊' },
            { word: 'Good morning', translation: 'Доброе утро', emoji: '🌅' },
            { word: 'Good afternoon', translation: 'Добрый день', emoji: '☀️' },
            { word: 'Good evening', translation: 'Добрый вечер', emoji: '🌆' }
          ]
        },
        {
          subtitle: 'Introductions',
          examples: [
            { word: 'My name is...', translation: 'Меня зовут...', emoji: '🏷️' },
            { word: 'I am...', translation: 'Я...', emoji: '👤' },
            { word: 'Nice to meet you', translation: 'Приятно познакомиться', emoji: '🤝' },
            { word: 'How are you?', translation: 'Как дела?', emoji: '❓' }
          ]
        }
      ]
    }
  }
]

export default function Lesson1GreetingsIntroductions() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const progress = 100 // Completed lesson

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/lessons/english/a1" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Урок 1</div>
              <h1 className="text-3xl font-bold">Greetings and Introductions</h1>
              <p className="text-white/80">Learn basic greetings and how to introduce yourself</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Прогресс</span>
              <span className="text-2xl font-bold text-green-400">{progress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>15 мин</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>50 XP</span>
            </div>
            <Badge className="bg-green-600 text-white">Завершено</Badge>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-green-400">Lesson Complete!</h2>
              <p className="text-xl text-white/80">You've mastered greetings and introductions!</p>
              
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-yellow-400">50</div>
                  <div className="text-sm text-white/60">XP</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">15</div>
                  <div className="text-sm text-white/60">min</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-white/60">done</div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4 text-green-400">What you learned:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">Greetings:</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• Hello / Hi</li>
                      <li>• Good morning/afternoon/evening</li>
                      <li>• How are you?</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">Introductions:</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      <li>• My name is...</li>
                      <li>• I am...</li>
                      <li>• Nice to meet you</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
              <Link href="/lessons/english/a1">
                <Button variant="outline" className="border-slate-600 hover:bg-slate-700 text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to A1
                </Button>
              </Link>

              <Link href="/lessons/english/a1/2">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8">
                  <Play className="w-4 h-4 mr-2" />
                  Next Lesson
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}