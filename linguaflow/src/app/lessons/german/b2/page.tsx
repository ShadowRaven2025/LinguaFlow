import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft } from 'lucide-react'

export default function GermanB2Page() {
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
            <span className="text-4xl">🇩🇪</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Немецкий язык - B2 (Oberstufe)
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Продвинутый уровень немецкого языка
              </p>
            </div>
          </div>
          <Badge variant="secondary">Скоро доступно</Badge>
        </div>

        {/* Coming Soon */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <CardTitle>Уроки B2 в разработке</CardTitle>
            <CardDescription>
              Мы работаем над созданием уроков продвинутого уровня немецкого языка
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Пока вы можете изучать уроки начального уровня A1
            </p>
            <Link href="/lessons/german/a1">
              <Button>
                Перейти к урокам A1
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}