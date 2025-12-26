import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, CheckCircle } from 'lucide-react'

export default function GermanA1Page() {
  const themes = [
    {
      id: 'greetings',
      title: 'Begrüßungen und Vorstellungen',
      titleRu: 'Приветствия и знакомство',
      description: 'Lernen Sie grundlegende Begrüßungen und wie man sich vorstellt',
      descriptionRu: 'Изучите базовые приветствия и представление себя',
      lessons: [
        { id: 'basic-greetings', title: 'Grundlegende Begrüßungen', titleRu: 'Основные приветствия', duration: '12 мин', completed: false },
        { id: 'introductions', title: 'Sich vorstellen', titleRu: 'Представление себя', duration: '15 мин', completed: false },
        { id: 'formal-informal', title: 'Formell und informell', titleRu: 'Формальное и неформальное общение', duration: '14 мин', completed: false }
      ]
    },
    {
      id: 'numbers',
      title: 'Zahlen und Zeit',
      titleRu: 'Числа и время',
      description: 'Meistern Sie Zahlen, Datum und Uhrzeiten',
      descriptionRu: 'Освойте числа, даты и время',
      lessons: [
        { id: 'numbers-1-20', title: 'Zahlen 1-20', titleRu: 'Числа 1-20', duration: '10 мин', completed: false },
        { id: 'numbers-21-100', title: 'Zahlen 21-100', titleRu: 'Числа 21-100', duration: '12 мин', completed: false },
        { id: 'telling-time', title: 'Die Uhrzeit', titleRu: 'Время на часах', duration: '18 мин', completed: false }
      ]
    },
    {
      id: 'family',
      title: 'Familie und Freunde',
      titleRu: 'Семья и друзья',
      description: 'Wortschatz und Ausdrücke über Familie und Beziehungen',
      descriptionRu: 'Словарь и выражения о семье и отношениях',
      lessons: [
        { id: 'family-members', title: 'Familienmitglieder', titleRu: 'Члены семьи', duration: '16 мин', completed: false },
        { id: 'describing-people', title: 'Menschen beschreiben', titleRu: 'Описание людей', duration: '18 мин', completed: false },
        { id: 'relationships', title: 'Beziehungen', titleRu: 'Отношения', duration: '15 мин', completed: false }
      ]
    },
    {
      id: 'daily-life',
      title: 'Alltag und Routine',
      titleRu: 'Повседневная жизнь и рутина',
      description: 'Alltägliche Aktivitäten und Routinen beschreiben',
      descriptionRu: 'Описание повседневных дел и рутины',
      lessons: [
        { id: 'daily-activities', title: 'Tägliche Aktivitäten', titleRu: 'Ежедневные дела', duration: '14 мин', completed: false },
        { id: 'house-home', title: 'Haus und Wohnung', titleRu: 'Дом и квартира', duration: '16 мин', completed: false },
        { id: 'food-drinks', title: 'Essen und Trinken', titleRu: 'Еда и напитки', duration: '20 мин', completed: false }
      ]
    }
  ]

  const totalLessons = themes.reduce((acc, theme) => acc + theme.lessons.length, 0)
  const completedLessons = themes.reduce((acc, theme) => 
    acc + theme.lessons.filter(lesson => lesson.completed).length, 0
  )
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

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
            <span className="text-4xl">🇩🇪</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Deutsch A1 - Anfänger
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Grundlegendes Deutsch für absolute Anfänger
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Прогресс курса
                </span>
                <Badge variant="outline">
                  {completedLessons} из {totalLessons} уроков
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Themes */}
        <div className="space-y-8">
          {themes.map((theme, themeIndex) => (
            <Card key={theme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                    {themeIndex + 1}
                  </div>
                  <div>
                    <div className="text-lg">{theme.title}</div>
                    <div className="text-sm font-normal text-muted-foreground">{theme.titleRu}</div>
                  </div>
                </CardTitle>
                <CardDescription>
                  <div>{theme.description}</div>
                  <div className="text-xs mt-1">{theme.descriptionRu}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {theme.lessons.map((lesson, lessonIndex) => (
                    <Link 
                      key={lesson.id} 
                      href={`/lessons/german/a1/${theme.id}/${lesson.id}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <span className="text-gray-400 text-xs">{lessonIndex + 1}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.titleRu}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                            </div>
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
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              О курсе Deutsch A1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Что вы изучите:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Базовые приветствия и знакомство на немецком</li>
                  <li>• Числа от 1 до 100 и время</li>
                  <li>• Семья, друзья и описание людей</li>
                  <li>• Повседневная жизнь и рутина</li>
                  <li>• Дом, еда и напитки</li>
                  <li>• Основы немецкой грамматики</li>
                  <li>• Формальное и неформальное общение</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Особенности немецкого курса:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Двуязычные уроки (немецкий + русский)</li>
                  <li>• Изучение артиклей der/die/das</li>
                  <li>• Основы падежной системы</li>
                  <li>• Произношение и фонетика</li>
                  <li>• Культурные особенности Германии</li>
                  <li>• Практические диалоги</li>
                  <li>• Система интервального повторения</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}