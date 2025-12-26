import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function EnglishA1Page() {
  const themes = [
    {
      id: 'greetings',
      title: 'Greetings and Introductions',
      description: 'Learn basic greetings and how to introduce yourself',
      lessons: [
        { id: 'basic-greetings', title: 'Basic Greetings', duration: '10 мин', completed: false },
        { id: 'introductions', title: 'Introducing Yourself', duration: '15 мин', completed: false },
        { id: 'asking-names', title: 'Asking for Names', duration: '12 мин', completed: false }
      ]
    },
    {
      id: 'numbers',
      title: 'Numbers and Counting',
      description: 'Master numbers from 1 to 100 and basic counting',
      lessons: [
        { id: 'numbers-1-10', title: 'Numbers 1-10', duration: '5 мин', completed: false },
        { id: 'numbers-11-20', title: 'Numbers 11-20', duration: '7 мин', completed: false },
        { id: 'number-recognition', title: 'Number Recognition', duration: '8 мин', completed: false },
        { id: 'counting-practice', title: 'Counting Practice', duration: '6 мин', completed: false }
      ]
    },
    {
      id: 'family',
      title: 'Family and Relationships',
      description: 'Vocabulary and expressions about family members',
      lessons: [
        { id: 'family-members', title: 'Family Members', duration: '6 мин', completed: false },
        { id: 'family-tree', title: 'My Family Tree', duration: '8 мин', completed: false },
        { id: 'family-descriptions', title: 'Describing Family', duration: '7 мин', completed: false }
      ]
    },
    {
      id: 'colors',
      title: 'Colors and Objects',
      description: 'Learn basic colors and how to describe objects',
      lessons: [
        { id: 'basic-colors', title: 'Basic Colors', duration: '5 мин', completed: false },
        { id: 'color-objects', title: 'Colors and Objects', duration: '7 мин', completed: false }
      ]
    },
    {
      id: 'food',
      title: 'Food and Drinks',
      description: 'Common foods, drinks, and restaurant vocabulary',
      lessons: [
        { id: 'common-foods', title: 'Common Foods', duration: '8 мин', completed: false },
        { id: 'restaurant', title: 'At the Restaurant', duration: '10 мин', completed: false }
      ]
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
              <Link href="/lessons">
                <Button variant="outline">← Все языки</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">Дашборд</Button>
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
                English A1 - Beginner
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Basic English for absolute beginners
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Прогресс курса</span>
              <span className="text-sm text-muted-foreground">0 из 14 уроков</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>

        {/* Themes */}
        <div className="space-y-8">
          {themes.map((theme, themeIndex) => (
            <Card key={theme.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                    {themeIndex + 1}
                  </div>
                  {theme.title}
                </CardTitle>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {theme.lessons.map((lesson, lessonIndex) => (
                    <Link 
                      key={lesson.id} 
                      href={`/lessons/english/a1/${theme.id}/${lesson.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            {lesson.completed ? (
                              <span className="text-green-600 text-sm">✓</span>
                            ) : (
                              <span className="text-gray-400 text-xs">{lessonIndex + 1}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Начать →
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>О курсе English A1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Что вы изучите:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Базовые приветствия и знакомство</li>
                  <li>• Числа от 1 до 100</li>
                  <li>• Семья и родственники</li>
                  <li>• Основные цвета</li>
                  <li>• Еда и напитки</li>
                  <li>• Описание предметов</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Формат обучения:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Интерактивные слайды с теорией</li>
                  <li>• Тесты с выбором ответа</li>
                  <li>• Упражнения на заполнение пропусков</li>
                  <li>• Задания на сопоставление</li>
                  <li>• Мгновенная обратная связь</li>
                  <li>• Отслеживание прогресса</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}