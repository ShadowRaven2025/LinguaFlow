import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function EnglishA2Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-2xl font-bold">LinguaFlow</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/lessons">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к урокам
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🇬🇧</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Английский язык - A2 (Elementary)
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Элементарный уровень английского языка
              </p>
            </div>
          </div>
          <Badge variant="secondary">Скоро доступно</Badge>
        </div>

        {/* Coming Soon */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <CardTitle>Grammar - Грамматика</CardTitle>
              <CardDescription>
                Изучите основные грамматические структуры
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                5 уроков по прошедшему времени и другим темам
              </p>
              <Link href="/lessons/english/a2/grammar">
                <Button>
                  Начать изучение
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <CardTitle>Travel - Путешествия</CardTitle>
              <CardDescription>
                Полезные фразы для путешествий
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Аэропорт, отель, направления
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <CardTitle>Shopping - Покупки</CardTitle>
              <CardDescription>
                Словарь и фразы для покупок
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Магазины, цены, деньги
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <CardTitle>Daily Life - Повседневная жизнь</CardTitle>
              <CardDescription>
                Рутина и повседневные активности
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Распорядок дня, хобби, планы
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}