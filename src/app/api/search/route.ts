import { NextRequest, NextResponse } from 'next/server'

// Mock data for search - в реальном приложении это будет из базы данных
const searchData = [
  {
    id: 'english-a1',
    title: 'Английский A1 - Начальный',
    description: 'Базовые уроки английского языка',
    type: 'course',
    url: '/lessons/english/a1',
    language: 'english',
    level: 'a1'
  },
  {
    id: 'english-a1-greetings',
    title: 'Базовые приветствия',
    description: 'Изучите основные способы поздороваться на английском',
    type: 'lesson',
    url: '/lessons/english/a1/greetings/basic-greetings',
    language: 'english',
    level: 'a1'
  },
  {
    id: 'german-a1',
    title: 'Немецкий A1 - Anfänger',
    description: 'Начальные уроки немецкого языка',
    type: 'course',
    url: '/lessons/german/a1',
    language: 'german',
    level: 'a1'
  },
  {
    id: 'german-a1-greetings',
    title: 'Grundlegende Begrüßungen',
    description: 'Изучите основные приветствия на немецком языке',
    type: 'lesson',
    url: '/lessons/german/a1/greetings/basic-greetings',
    language: 'german',
    level: 'a1'
  },
  {
    id: 'flashcards',
    title: 'Карточки для изучения',
    description: 'Интерактивные карточки для запоминания слов',
    type: 'feature',
    url: '/flashcards',
    language: 'all',
    level: 'all'
  },
  {
    id: 'dashboard',
    title: 'Дашборд',
    description: 'Ваш прогресс и статистика обучения',
    type: 'feature',
    url: '/dashboard',
    language: 'all',
    level: 'all'
  },
  {
    id: 'achievements',
    title: 'Достижения',
    description: 'Отслеживайте свой прогресс и получайте награды за успехи',
    type: 'feature',
    url: '/achievements',
    language: 'all',
    level: 'all'
  },
  {
    id: 'exercises',
    title: 'Поиск заданий',
    description: 'Найдите подходящие упражнения для изучения языков',
    type: 'feature',
    url: '/exercises',
    language: 'all',
    level: 'all'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  if (!query) {
    return NextResponse.json([])
  }

  // Фильтруем результаты по запросу
  const results = searchData.filter(item => 
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.language.toLowerCase().includes(query) ||
    item.level.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  )

  // Сортируем по релевантности (точные совпадения в заголовке идут первыми)
  results.sort((a, b) => {
    const aExactTitle = a.title.toLowerCase().includes(query) ? 1 : 0
    const bExactTitle = b.title.toLowerCase().includes(query) ? 1 : 0
    
    if (aExactTitle !== bExactTitle) {
      return bExactTitle - aExactTitle
    }
    
    return a.title.localeCompare(b.title)
  })

  return NextResponse.json(results.slice(0, 10)) // Ограничиваем до 10 результатов
}