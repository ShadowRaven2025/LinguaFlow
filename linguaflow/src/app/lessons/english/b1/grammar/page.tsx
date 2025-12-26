import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'

export default function B1GrammarPage() {
  const lessons = [
    {
      id: 'present-perfect',
      title: 'Present Perfect',
      description: 'Настоящее совершенное время',
      duration: '15 мин',
      difficulty: 'Средне',
      completed: false,
      available: true
    },
    {
      id: 'perfect-vs-past',
      title: 'Present Perfect vs Past Simple',
      description: 'Различия между временами',
      duration: '18 мин',
      difficulty: 'Сложно',
      completed: false,
      available: false
    },
    {
      id: 'experience',
      title: 'Experience and Achievement',
      description: 'Опыт и достижения',
      duration: '12 мин',
      difficulty: 'Средне',
      completed: false,
      available: false
    },
    {
      id: 'first-conditional',
      title: 'First Conditional',
      description: 'Первый тип условных предложений',
      duration: '14 мин',
      difficulty: 'Средне',
      completed: false,
      available: false
    },
    {
      id: 'second-conditional',
      title: 'Second Conditional',
      description: 'Второй тип условных предложений',
      duration: '16 мин',
      difficulty: 'Сложно',
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
              <Link href="/lessons/english/b1">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад к B1
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
            <span className="text-4xl">📚</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                B1 Grammar - Грамматика
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Сложные грамматические структуры среднего уровня
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Прогресс раздела</span>
              <span className="text-sm text-muted-foreground">0 из {lessons.length} уроков</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-4 max-w-4xl mx-auto">
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
                        <Badge variant={lesson.difficulty === 'Сложно' ? 'destructive' : 'secondary'}>
                          {lesson.difficulty}
                        </Badge>
                        <Badge variant="outline">B1</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    {lesson.available ? (
                      <Link href={`/lessons/english/b1/grammar/${lesson.id}`}>
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

        {/* Section Info */}
        <Card className="mt-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>О разделе "Грамматика B1"</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Темы раздела:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Present Perfect Tense</li>
                  <li>• Сравнение времен</li>
                  <li>• Условные предложения</li>
                  <li>• Выражение опыта</li>
                  <li>• Сложные конструкции</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Навыки:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Правильное использование времен</li>
                  <li>• Выражение гипотез</li>
                  <li>• Описание опыта и результатов</li>
                  <li>• Сложные грамматические структуры</li>
                  <li>• Уверенное владение языком</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}