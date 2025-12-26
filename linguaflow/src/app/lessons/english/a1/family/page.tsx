import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft, Play, Clock, Star } from 'lucide-react'

export default function EnglishA1FamilyPage() {
  const lessons = [
    {
      id: 'family-members',
      title: 'Family Members',
      description: 'Learn the names of family members in English',
      duration: '6 мин',
      xp: 30,
      difficulty: 'Легко',
      completed: false
    },
    {
      id: 'family-tree',
      title: 'My Family Tree',
      description: 'Complete sentences about family relationships',
      duration: '8 мин',
      xp: 35,
      difficulty: 'Средне',
      completed: false
    },
    {
      id: 'family-descriptions',
      title: 'Describing Family',
      description: 'Learn to describe your family members',
      duration: '7 мин',
      xp: 32,
      difficulty: 'Средне',
      completed: false
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
            <span className="text-4xl">👨‍👩‍👧‍👦</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Family - Семья
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Изучите названия членов семьи и семейные отношения
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">A1 - Начальный</Badge>
            <Badge variant="outline">3 урока</Badge>
            <Badge variant="outline">97 XP</Badge>
          </div>
        </div>

        {/* Lessons */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{lesson.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {lesson.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.completed && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {lesson.xp} XP
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <Link href={`/lessons/english/a1/family/${lesson.id}`}>
                    <Button>
                      <Play className="w-4 h-4 mr-2" />
                      {lesson.completed ? 'Повторить' : 'Начать'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card className="mt-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Прогресс по теме</CardTitle>
            <CardDescription>
              Ваши достижения в изучении семьи
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">Уроков завершено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-muted-foreground">XP получено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">0%</div>
                <div className="text-sm text-muted-foreground">Прогресс</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}