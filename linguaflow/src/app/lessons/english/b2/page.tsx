import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function EnglishB2Page() {
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
                Английский язык - B2 (Upper-Intermediate)
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Продвинутый средний уровень английского языка
              </p>
            </div>
          </div>
          <Badge variant="secondary">Скоро доступно</Badge>
        </div>

        {/* Course Sections */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <CardTitle>Advanced Grammar</CardTitle>
              <CardDescription>
                Продвинутая грамматика B2 уровня
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Пассивный залог, косвенная речь, сложные конструкции
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <CardTitle>Business English</CardTitle>
              <CardDescription>
                Деловой английский язык
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Презентации, переговоры, деловая переписка
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <CardTitle>Academic English</CardTitle>
              <CardDescription>
                Академический английский
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Научные тексты, исследования, эссе
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <CardTitle>Advanced Communication</CardTitle>
              <CardDescription>
                Продвинутое общение
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Дебаты, аргументация, сложные дискуссии
              </p>
              <Button variant="outline" disabled>
                Скоро доступно
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Course Info */}
        <Card className="mt-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>О курсе English B2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Что вы изучите:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Пассивный залог (Passive Voice)</li>
                  <li>• Косвенную речь (Reported Speech)</li>
                  <li>• Деловой английский</li>
                  <li>• Академическое письмо</li>
                  <li>• Сложные идиомы и фразовые глаголы</li>
                  <li>• Продвинутую лексику</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Уровень B2 означает:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Понимание сложных текстов</li>
                  <li>• Свободное общение с носителями</li>
                  <li>• Четкое выражение мнений</li>
                  <li>• Участие в дебатах</li>
                  <li>• Написание эссе и отчетов</li>
                  <li>• Профессиональное использование языка</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}