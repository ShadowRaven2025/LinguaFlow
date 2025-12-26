import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'

export default function A1FoodPage() {
  const lessons = [
    {
      id: 'common-foods',
      title: 'Common Foods',
      description: 'Обычная еда и напитки',
      duration: '10 мин',
      completed: false,
      available: true
    },
    {
      id: 'restaurant',
      title: 'At the Restaurant',
      description: 'В ресторане',
      duration: '12 мин',
      completed: false,
      available: false
    }
  ]

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
              <Link href="/lessons/english/a1">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к A1
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
            <span className="text-4xl">🍽️</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Food and Drinks - Еда и напитки
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Изучаем названия продуктов питания и напитков
              </p>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className={!lesson.available ? 'opacity-60' : ''}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {lesson.completed ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-400 font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                      <p className="text-muted-foreground">{lesson.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="outline">{lesson.duration}</Badge>
                        <Badge variant="secondary">A1</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    {lesson.available ? (
                      <Link href={`/lessons/english/a1/food/${lesson.id}`}>
                        <Button>
                          Начать урок
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" disabled>
                        Скоро доступно
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}