'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, CheckCircle, Volume2, Star, BookOpen } from 'lucide-react'

const alphabetData = [
  { letter: 'A', pronunciation: 'а', example: 'Apfel (яблоко)' },
  { letter: 'B', pronunciation: 'бэ', example: 'Brot (хлеб)' },
  { letter: 'C', pronunciation: 'цэ', example: 'Cafe (кафе)' },
  { letter: 'D', pronunciation: 'дэ', example: 'Danke (спасибо)' },
  { letter: 'E', pronunciation: 'э', example: 'Ende (конец)' },
  { letter: 'F', pronunciation: 'эф', example: 'Familie (семья)' },
  { letter: 'G', pronunciation: 'гэ', example: 'Guten (добрый)' },
  { letter: 'H', pronunciation: 'ха', example: 'Haus (дом)' },
  { letter: 'I', pronunciation: 'и', example: 'Ich (я)' },
  { letter: 'J', pronunciation: 'йот', example: 'Ja (да)' },
  { letter: 'K', pronunciation: 'ка', example: 'Kaffee (кофе)' },
  { letter: 'L', pronunciation: 'эль', example: 'Liebe (любовь)' },
  { letter: 'M', pronunciation: 'эм', example: 'Mutter (мать)' },
  { letter: 'N', pronunciation: 'эн', example: 'Nein (нет)' },
  { letter: 'O', pronunciation: 'о', example: 'Orange (апельсин)' },
  { letter: 'P', pronunciation: 'пэ', example: 'Papa (папа)' },
  { letter: 'Q', pronunciation: 'ку', example: 'Quelle (источник)' },
  { letter: 'R', pronunciation: 'эр', example: 'Rot (красный)' },
  { letter: 'S', pronunciation: 'эс', example: 'Sonne (солнце)' },
  { letter: 'T', pronunciation: 'тэ', example: 'Tisch (стол)' },
  { letter: 'U', pronunciation: 'у', example: 'Uhr (час)' },
  { letter: 'V', pronunciation: 'фау', example: 'Vater (отец)' },
  { letter: 'W', pronunciation: 'вэ', example: 'Wasser (вода)' },
  { letter: 'X', pronunciation: 'икс', example: 'Xylofon (ксилофон)' },
  { letter: 'Y', pronunciation: 'ипсилон', example: 'Yoga (йога)' },
  { letter: 'Z', pronunciation: 'цэт', example: 'Zeit (время)' },
  { letter: 'Ä', pronunciation: 'э', example: 'Ärger (злость)' },
  { letter: 'Ö', pronunciation: 'о', example: 'Öffnen (открывать)' },
  { letter: 'Ü', pronunciation: 'ю', example: 'Über (над)' },
  { letter: 'ß', pronunciation: 'сс', example: 'Straße (улица)' }
]

const umlautPairs = [
  { basic: 'a', umlaut: 'ä', example: 'Mann → Männer (человек → люди)' },
  { basic: 'o', umlaut: 'ö', example: 'rot → röt (красный → красноватый)' },
  { basic: 'u', umlaut: 'ü', example: 'Hut → Hüte (шляпа → шляпы)' }
]

export default function GermanAlphabetPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState<string[]>([])

  const handleNext = () => {
    const currentLetter = alphabetData[currentIndex].letter
    if (!completed.includes(currentLetter)) {
      setCompleted([...completed, currentLetter])
    }
    if (currentIndex < alphabetData.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleComplete = () => {
    const currentLetter = alphabetData[currentIndex].letter
    if (!completed.includes(currentLetter)) {
      setCompleted([...completed, currentLetter])
    }
  }

  const current = alphabetData[currentIndex]
  const progress = ((currentIndex + 1) / alphabetData.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/lessons/german/a1" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold">Назад к урокам</span>
            </Link>
            <Badge variant="secondary">A1 • Alphabet</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Das deutsche Alphabet</h1>
            <p className="text-muted-foreground">Немецкий алфавит</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">{completed.length} / {alphabetData.length} букв изучено</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              {currentIndex + 1} из {alphabetData.length}
            </p>
          </div>

          <Card className="mb-6">
            <CardContent className="p-8 text-center">
              <div className="text-8xl font-bold text-primary mb-4">{current.letter}</div>
              <div className="text-2xl text-muted-foreground mb-2">Произношение: [{current.pronunciation}]</div>
              <div className="text-lg text-blue-600 dark:text-blue-400">Пример: {current.example}</div>
              
              {completed.includes(current.letter) && (
                <div className="mt-4 flex items-center justify-center gap-2 text-green-500">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-medium">Изучено!</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            
            {currentIndex === alphabetData.length - 1 ? (
              <Link href="/lessons/german/a1" className="flex-1">
                <Button className="w-full" onClick={handleComplete}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Завершить урок
                </Button>
              </Link>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                Далее
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {currentIndex === alphabetData.length - 1 && (
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Немецкие умлауты (Umlaute)
                </h3>
                <div className="space-y-3">
                  {umlautPairs.map((pair, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold">{pair.basic} → {pair.umlaut}</span>
                      </div>
                      <span className="text-muted-foreground">{pair.example}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
