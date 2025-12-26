import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Brain, Trophy, Globe, CheckCircle } from 'lucide-react'

export default function LessonsPage() {
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
              <Link href="/dashboard">
                <Button variant="outline">Дашборд</Button>
              </Link>
              <Link href="/flashcards">
                <Button variant="outline">Карточки</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Выберите язык для изучения
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Начните свое путешествие в мир языков
          </p>
        </div>

        {/* Languages Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* English */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🇬🇧</div>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Globe className="w-6 h-6" />
                Английский язык
              </CardTitle>
              <CardDescription>
                Изучайте английский от базового до продвинутого уровня
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/lessons/english/a1">
                  <Button className="w-full justify-between" variant="outline">
                    <span>A1 - Начальный</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
                <Link href="/lessons/english/a2">
                  <Button className="w-full justify-between" variant="outline">
                    <span>A2 - Элементарный</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
                <Link href="/lessons/english/b1">
                  <Button className="w-full justify-between" variant="outline">
                    <span>B1 - Средний</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
                <Link href="/lessons/english/b2">
                  <Button className="w-full justify-between" variant="outline">
                    <span>B2 - Выше среднего</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* German */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">🇩🇪</div>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Globe className="w-6 h-6" />
                Немецкий язык
              </CardTitle>
              <CardDescription>
                Освойте немецкий язык с нуля до свободного владения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/lessons/german/a1">
                  <Button className="w-full justify-between" variant="outline">
                    <span>A1 - Anfänger</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
                <Link href="/lessons/german/a2">
                  <Button className="w-full justify-between" variant="outline">
                    <span>A2 - Grundstufe</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
                <Link href="/lessons/german/b1">
                  <Button className="w-full justify-between" variant="outline">
                    <span>B1 - Mittelstufe</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
                <Link href="/lessons/german/b2">
                  <Button className="w-full justify-between" variant="outline">
                    <span>B2 - Oberstufe</span>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Доступно
                    </Badge>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <BookOpen className="w-6 h-6" />
                Как это работает?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-semibold mb-1">Интерактивные уроки</h3>
                  <p className="text-muted-foreground">Изучайте через разнообразные упражнения и тесты</p>
                </div>
                <div>
                  <Brain className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold mb-1">Умные карточки</h3>
                  <p className="text-muted-foreground">Запоминайте слова с помощью системы повторений</p>
                </div>
                <div>
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-semibold mb-1">Отслеживание прогресса</h3>
                  <p className="text-muted-foreground">Следите за своими достижениями и статистикой</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}