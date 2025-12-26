import { NextRequest, NextResponse } from 'next/server'

// Mock data для заданий - в реальном приложении это будет из базы данных
const exercisesData = [
  // ENGLISH A1 - GREETINGS
  {
    id: 'eng-a1-greet-1',
    title: 'Выберите правильное приветствие',
    description: 'Выберите подходящее приветствие для утреннего времени',
    type: 'quiz_single',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'greetings',
    lessonId: 'basic-greetings',
    lessonTitle: 'Базовые приветствия',
    url: '/lessons/english/a1/greetings/basic-greetings',
    xpReward: 10,
    timeEstimate: 30,
    tags: ['приветствие', 'утро', 'выбор']
  },
  {
    id: 'eng-a1-greet-2',
    title: 'Заполните пропуск в диалоге',
    description: 'Вставьте подходящее слово в диалог о знакомстве',
    type: 'fill_gap',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'greetings',
    lessonId: 'basic-greetings',
    lessonTitle: 'Базовые приветствия',
    url: '/lessons/english/a1/greetings/basic-greetings',
    xpReward: 15,
    timeEstimate: 45,
    tags: ['диалог', 'знакомство', 'пропуски']
  },
  {
    id: 'eng-a1-greet-3',
    title: 'Сопоставьте приветствия',
    description: 'Соедините английские приветствия с их русскими переводами',
    type: 'match',
    difficulty: 'medium',
    language: 'english',
    level: 'a1',
    topic: 'greetings',
    lessonId: 'basic-greetings',
    lessonTitle: 'Базовые приветствия',
    url: '/lessons/english/a1/greetings/basic-greetings',
    xpReward: 20,
    timeEstimate: 60,
    tags: ['сопоставление', 'перевод', 'словарь']
  },
  {
    id: 'eng-a1-greet-4',
    title: 'Формальные и неформальные приветствия',
    description: 'Определите, какие приветствия подходят для разных ситуаций',
    type: 'quiz_multiple',
    difficulty: 'medium',
    language: 'english',
    level: 'a1',
    topic: 'greetings',
    lessonId: 'basic-greetings',
    lessonTitle: 'Базовые приветствия',
    url: '/lessons/english/a1/greetings/basic-greetings',
    xpReward: 18,
    timeEstimate: 50,
    tags: ['формальность', 'этикет', 'ситуации']
  },

  // ENGLISH A1 - NUMBERS
  {
    id: 'eng-a1-num-1',
    title: 'Numbers 1-10',
    description: 'Learn to count from 1 to 10 in English',
    type: 'quiz_single',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'numbers',
    lessonId: 'numbers-1-10',
    lessonTitle: 'Numbers 1-10',
    url: '/lessons/english/a1/numbers/numbers-1-10',
    xpReward: 8,
    timeEstimate: 25,
    tags: ['числа', 'счет', 'основы']
  },
  {
    id: 'eng-a1-num-2',
    title: 'Numbers 11-20',
    description: 'Practice counting from 11 to 20',
    type: 'fill_gap',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'numbers',
    lessonId: 'numbers-11-20',
    lessonTitle: 'Numbers 11-20',
    url: '/lessons/english/a1/numbers/numbers-11-20',
    xpReward: 10,
    timeEstimate: 30,
    tags: ['числа', 'счет', 'подростковые']
  },
  {
    id: 'eng-a1-num-3',
    title: 'Number Recognition',
    description: 'Match written numbers with their numeric form',
    type: 'match',
    difficulty: 'medium',
    language: 'english',
    level: 'a1',
    topic: 'numbers',
    lessonId: 'number-recognition',
    lessonTitle: 'Number Recognition',
    url: '/lessons/english/a1/numbers/number-recognition',
    xpReward: 15,
    timeEstimate: 40,
    tags: ['распознавание', 'цифры', 'слова']
  },

  // ENGLISH A1 - FAMILY
  {
    id: 'eng-a1-fam-1',
    title: 'Family Members',
    description: 'Learn the names of family members in English',
    type: 'quiz_single',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'family',
    lessonId: 'family-members',
    lessonTitle: 'Family Members',
    url: '/lessons/english/a1/family/family-members',
    xpReward: 12,
    timeEstimate: 35,
    tags: ['семья', 'родственники', 'словарь']
  },
  {
    id: 'eng-a1-fam-2',
    title: 'My Family Tree',
    description: 'Complete sentences about family relationships',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'a1',
    topic: 'family',
    lessonId: 'family-tree',
    lessonTitle: 'My Family Tree',
    url: '/lessons/english/a1/family/family-tree',
    xpReward: 18,
    timeEstimate: 50,
    tags: ['отношения', 'генеалогия', 'описание']
  },

  // ENGLISH A1 - COLORS
  {
    id: 'eng-a1-col-1',
    title: 'Basic Colors',
    description: 'Learn the names of basic colors in English',
    type: 'quiz_single',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'colors',
    lessonId: 'basic-colors',
    lessonTitle: 'Basic Colors',
    url: '/lessons/english/a1/colors/basic-colors',
    xpReward: 10,
    timeEstimate: 30,
    tags: ['цвета', 'основные', 'визуальное']
  },
  {
    id: 'eng-a1-col-2',
    title: 'Color Matching',
    description: 'Match colors with objects that are typically that color',
    type: 'match',
    difficulty: 'medium',
    language: 'english',
    level: 'a1',
    topic: 'colors',
    lessonId: 'color-objects',
    lessonTitle: 'Colors and Objects',
    url: '/lessons/english/a1/colors/color-objects',
    xpReward: 15,
    timeEstimate: 40,
    tags: ['ассоциации', 'предметы', 'логика']
  },

  // ENGLISH A1 - FOOD
  {
    id: 'eng-a1-food-1',
    title: 'Common Foods',
    description: 'Learn the names of common foods and drinks',
    type: 'quiz_single',
    difficulty: 'easy',
    language: 'english',
    level: 'a1',
    topic: 'food',
    lessonId: 'common-foods',
    lessonTitle: 'Common Foods',
    url: '/lessons/english/a1/food/common-foods',
    xpReward: 12,
    timeEstimate: 35,
    tags: ['еда', 'напитки', 'повседневное']
  },
  {
    id: 'eng-a1-food-2',
    title: 'At the Restaurant',
    description: 'Practice ordering food at a restaurant',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'a1',
    topic: 'food',
    lessonId: 'restaurant',
    lessonTitle: 'At the Restaurant',
    url: '/lessons/english/a1/food/restaurant',
    xpReward: 20,
    timeEstimate: 55,
    tags: ['ресторан', 'заказ', 'диалог']
  },

  // ENGLISH A2 - PAST TENSE
  {
    id: 'eng-a2-past-1',
    title: 'Regular Past Tense',
    description: 'Learn how to form regular past tense verbs',
    type: 'quiz_single',
    difficulty: 'medium',
    language: 'english',
    level: 'a2',
    topic: 'grammar',
    lessonId: 'regular-past',
    lessonTitle: 'Regular Past Tense',
    url: '/lessons/english/a2/grammar/regular-past',
    xpReward: 15,
    timeEstimate: 45,
    tags: ['грамматика', 'прошедшее', 'правильные']
  },
  {
    id: 'eng-a2-past-2',
    title: 'Irregular Past Tense',
    description: 'Practice irregular past tense verb forms',
    type: 'fill_gap',
    difficulty: 'hard',
    language: 'english',
    level: 'a2',
    topic: 'grammar',
    lessonId: 'irregular-past',
    lessonTitle: 'Irregular Past Tense',
    url: '/lessons/english/a2/grammar/irregular-past',
    xpReward: 25,
    timeEstimate: 70,
    tags: ['грамматика', 'прошедшее', 'неправильные']
  },
  {
    id: 'eng-a2-past-3',
    title: 'Past Tense Stories',
    description: 'Complete stories using correct past tense forms',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'a2',
    topic: 'grammar',
    lessonId: 'past-stories',
    lessonTitle: 'Past Tense Stories',
    url: '/lessons/english/a2/grammar/past-stories',
    xpReward: 20,
    timeEstimate: 60,
    tags: ['рассказы', 'контекст', 'применение']
  },

  // ENGLISH A2 - TRAVEL
  {
    id: 'eng-a2-travel-1',
    title: 'At the Airport',
    description: 'Learn vocabulary and phrases for air travel',
    type: 'quiz_multiple',
    difficulty: 'medium',
    language: 'english',
    level: 'a2',
    topic: 'travel',
    lessonId: 'airport',
    lessonTitle: 'At the Airport',
    url: '/lessons/english/a2/travel/airport',
    xpReward: 18,
    timeEstimate: 50,
    tags: ['аэропорт', 'путешествия', 'фразы']
  },
  {
    id: 'eng-a2-travel-2',
    title: 'Hotel Check-in',
    description: 'Practice checking into a hotel',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'a2',
    topic: 'travel',
    lessonId: 'hotel',
    lessonTitle: 'Hotel Check-in',
    url: '/lessons/english/a2/travel/hotel',
    xpReward: 16,
    timeEstimate: 45,
    tags: ['отель', 'регистрация', 'сервис']
  },
  {
    id: 'eng-a2-travel-3',
    title: 'Asking for Directions',
    description: 'Learn how to ask for and give directions',
    type: 'match',
    difficulty: 'medium',
    language: 'english',
    level: 'a2',
    topic: 'travel',
    lessonId: 'directions',
    lessonTitle: 'Asking for Directions',
    url: '/lessons/english/a2/travel/directions',
    xpReward: 20,
    timeEstimate: 55,
    tags: ['направления', 'навигация', 'помощь']
  },

  // ENGLISH A2 - SHOPPING
  {
    id: 'eng-a2-shop-1',
    title: 'At the Store',
    description: 'Learn shopping vocabulary and phrases',
    type: 'quiz_single',
    difficulty: 'easy',
    language: 'english',
    level: 'a2',
    topic: 'shopping',
    lessonId: 'store',
    lessonTitle: 'At the Store',
    url: '/lessons/english/a2/shopping/store',
    xpReward: 14,
    timeEstimate: 40,
    tags: ['магазин', 'покупки', 'товары']
  },
  {
    id: 'eng-a2-shop-2',
    title: 'Prices and Money',
    description: 'Practice talking about prices and making purchases',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'a2',
    topic: 'shopping',
    lessonId: 'prices',
    lessonTitle: 'Prices and Money',
    url: '/lessons/english/a2/shopping/prices',
    xpReward: 18,
    timeEstimate: 50,
    tags: ['цены', 'деньги', 'покупка']
  },

  // ENGLISH B1 - PRESENT PERFECT
  {
    id: 'eng-b1-perf-1',
    title: 'Present Perfect Formation',
    description: 'Learn how to form the present perfect tense',
    type: 'quiz_single',
    difficulty: 'medium',
    language: 'english',
    level: 'b1',
    topic: 'grammar',
    lessonId: 'present-perfect',
    lessonTitle: 'Present Perfect',
    url: '/lessons/english/b1/grammar/present-perfect',
    xpReward: 20,
    timeEstimate: 60,
    tags: ['грамматика', 'перфект', 'время']
  },
  {
    id: 'eng-b1-perf-2',
    title: 'Present Perfect vs Past Simple',
    description: 'Understand when to use present perfect vs past simple',
    type: 'quiz_multiple',
    difficulty: 'hard',
    language: 'english',
    level: 'b1',
    topic: 'grammar',
    lessonId: 'perfect-vs-past',
    lessonTitle: 'Present Perfect vs Past Simple',
    url: '/lessons/english/b1/grammar/perfect-vs-past',
    xpReward: 25,
    timeEstimate: 75,
    tags: ['сравнение', 'времена', 'различия']
  },
  {
    id: 'eng-b1-perf-3',
    title: 'Experience and Achievement',
    description: 'Use present perfect to talk about experiences',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'b1',
    topic: 'grammar',
    lessonId: 'experience',
    lessonTitle: 'Experience and Achievement',
    url: '/lessons/english/b1/grammar/experience',
    xpReward: 22,
    timeEstimate: 65,
    tags: ['опыт', 'достижения', 'жизнь']
  },

  // ENGLISH B1 - CONDITIONALS
  {
    id: 'eng-b1-cond-1',
    title: 'First Conditional',
    description: 'Learn to express real future possibilities',
    type: 'quiz_single',
    difficulty: 'medium',
    language: 'english',
    level: 'b1',
    topic: 'grammar',
    lessonId: 'first-conditional',
    lessonTitle: 'First Conditional',
    url: '/lessons/english/b1/grammar/first-conditional',
    xpReward: 18,
    timeEstimate: 55,
    tags: ['условные', 'будущее', 'возможности']
  },
  {
    id: 'eng-b1-cond-2',
    title: 'Second Conditional',
    description: 'Express hypothetical situations in the present',
    type: 'fill_gap',
    difficulty: 'hard',
    language: 'english',
    level: 'b1',
    topic: 'grammar',
    lessonId: 'second-conditional',
    lessonTitle: 'Second Conditional',
    url: '/lessons/english/b1/grammar/second-conditional',
    xpReward: 24,
    timeEstimate: 70,
    tags: ['гипотетические', 'нереальное', 'мечты']
  },

  // ENGLISH B1 - WORK
  {
    id: 'eng-b1-work-1',
    title: 'Job Interview',
    description: 'Practice common job interview questions and answers',
    type: 'fill_gap',
    difficulty: 'medium',
    language: 'english',
    level: 'b1',
    topic: 'work',
    lessonId: 'job-interview',
    lessonTitle: 'Job Interview',
    url: '/lessons/english/b1/work/job-interview',
    xpReward: 22,
    timeEstimate: 65,
    tags: ['собеседование', 'работа', 'карьера']
  },
  {
    id: 'eng-b1-work-2',
    title: 'Office Communication',
    description: 'Learn professional communication in the workplace',
    type: 'quiz_multiple',
    difficulty: 'medium',
    language: 'english',
    level: 'b1',
    topic: 'work',
    lessonId: 'office-communication',
    lessonTitle: 'Office Communication',
    url: '/lessons/english/b1/work/office-communication',
    xpReward: 20,
    timeEstimate: 60,
    tags: ['офис', 'общение', 'профессиональное']
  },

  // ENGLISH B2 - PASSIVE VOICE
  {
    id: 'eng-b2-pass-1',
    title: 'Passive Voice Formation',
    description: 'Learn how to form and use the passive voice',
    type: 'quiz_single',
    difficulty: 'hard',
    language: 'english',
    level: 'b2',
    topic: 'grammar',
    lessonId: 'passive-voice',
    lessonTitle: 'Passive Voice',
    url: '/lessons/english/b2/grammar/passive-voice',
    xpReward: 25,
    timeEstimate: 75,
    tags: ['пассивный', 'залог', 'трансформация']
  },
  {
    id: 'eng-b2-pass-2',
    title: 'Passive in Different Tenses',
    description: 'Practice passive voice in various tenses',
    type: 'fill_gap',
    difficulty: 'hard',
    language: 'english',
    level: 'b2',
    topic: 'grammar',
    lessonId: 'passive-tenses',
    lessonTitle: 'Passive in Different Tenses',
    url: '/lessons/english/b2/grammar/passive-tenses',
    xpReward: 28,
    timeEstimate: 80,
    tags: ['времена', 'сложная', 'грамматика']
  },

  // ENGLISH B2 - REPORTED SPEECH
  {
    id: 'eng-b2-rep-1',
    title: 'Direct vs Reported Speech',
    description: 'Learn to convert direct speech to reported speech',
    type: 'quiz_multiple',
    difficulty: 'hard',
    language: 'english',
    level: 'b2',
    topic: 'grammar',
    lessonId: 'reported-speech',
    lessonTitle: 'Reported Speech',
    url: '/lessons/english/b2/grammar/reported-speech',
    xpReward: 26,
    timeEstimate: 78,
    tags: ['косвенная', 'речь', 'передача']
  },
  {
    id: 'eng-b2-rep-2',
    title: 'Reporting Verbs',
    description: 'Use different verbs to report what people said',
    type: 'match',
    difficulty: 'hard',
    language: 'english',
    level: 'b2',
    topic: 'grammar',
    lessonId: 'reporting-verbs',
    lessonTitle: 'Reporting Verbs',
    url: '/lessons/english/b2/grammar/reporting-verbs',
    xpReward: 24,
    timeEstimate: 70,
    tags: ['глаголы', 'сообщение', 'разнообразие']
  },

  // ENGLISH B2 - BUSINESS
  {
    id: 'eng-b2-bus-1',
    title: 'Business Presentations',
    description: 'Learn language for effective business presentations',
    type: 'fill_gap',
    difficulty: 'hard',
    language: 'english',
    level: 'b2',
    topic: 'business',
    lessonId: 'presentations',
    lessonTitle: 'Business Presentations',
    url: '/lessons/english/b2/business/presentations',
    xpReward: 30,
    timeEstimate: 85,
    tags: ['презентации', 'бизнес', 'публичные']
  },
  {
    id: 'eng-b2-bus-2',
    title: 'Negotiations',
    description: 'Practice language for business negotiations',
    type: 'quiz_multiple',
    difficulty: 'hard',
    language: 'english',
    level: 'b2',
    topic: 'business',
    lessonId: 'negotiations',
    lessonTitle: 'Business Negotiations',
    url: '/lessons/english/b2/business/negotiations',
    xpReward: 28,
    timeEstimate: 80,
    tags: ['переговоры', 'соглашения', 'стратегия']
  },

  // GERMAN TASKS (keeping existing ones)
  {
    id: 'ger-a1-greet-1',
    title: 'Deutsche Begrüßungen',
    description: 'Wählen Sie die richtige Begrüßung für verschiedene Tageszeiten',
    type: 'quiz_multiple',
    difficulty: 'easy',
    language: 'german',
    level: 'a1',
    topic: 'greetings',
    lessonId: 'basic-greetings',
    lessonTitle: 'Grundlegende Begrüßungen',
    url: '/lessons/german/a1/greetings/basic-greetings',
    xpReward: 10,
    timeEstimate: 40,
    tags: ['begrüßung', 'tageszeit', 'auswahl']
  },
  {
    id: 'ger-a1-greet-2',
    title: 'Формальные и неформальные приветствия',
    description: 'Определите, какие приветствия подходят для формальных ситуаций',
    type: 'quiz_single',
    difficulty: 'medium',
    language: 'german',
    level: 'a1',
    topic: 'greetings',
    lessonId: 'basic-greetings',
    lessonTitle: 'Grundlegende Begrüßungen',
    url: '/lessons/german/a1/greetings/basic-greetings',
    xpReward: 15,
    timeEstimate: 50,
    tags: ['формальность', 'этикет', 'ситуации']
  },
  {
    id: 'ger-a1-family-1',
    title: 'Familienmitglieder',
    description: 'Lernen Sie die deutschen Wörter für Familienmitglieder',
    type: 'match',
    difficulty: 'medium',
    language: 'german',
    level: 'a1',
    topic: 'family',
    lessonId: 'family-members',
    lessonTitle: 'Familienmitglieder',
    url: '/lessons/german/a1/family/family-members',
    xpReward: 18,
    timeEstimate: 55,
    tags: ['familie', 'verwandtschaft', 'wortschatz']
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const language = searchParams.get('language')?.toLowerCase()
  const level = searchParams.get('level')?.toLowerCase()
  const type = searchParams.get('type')?.toLowerCase()
  const difficulty = searchParams.get('difficulty')?.toLowerCase()
  const topic = searchParams.get('topic')?.toLowerCase()

  if (!query && !language && !level && !type && !difficulty && !topic) {
    return NextResponse.json([])
  }

  // Фильтруем результаты по всем параметрам
  let results = exercisesData.filter(exercise => {
    // Текстовый поиск
    const matchesQuery = !query || (
      exercise.title.toLowerCase().includes(query) ||
      exercise.description.toLowerCase().includes(query) ||
      exercise.tags.some(tag => tag.toLowerCase().includes(query)) ||
      exercise.topic.toLowerCase().includes(query) ||
      exercise.lessonTitle.toLowerCase().includes(query)
    )

    // Фильтры
    const matchesLanguage = !language || exercise.language === language
    const matchesLevel = !level || exercise.level === level
    const matchesType = !type || exercise.type === type
    const matchesDifficulty = !difficulty || exercise.difficulty === difficulty
    const matchesTopic = !topic || exercise.topic === topic

    return matchesQuery && matchesLanguage && matchesLevel && matchesType && matchesDifficulty && matchesTopic
  })

  // Сортируем по релевантности
  if (query) {
    results.sort((a, b) => {
      // Точные совпадения в заголовке идут первыми
      const aExactTitle = a.title.toLowerCase().includes(query) ? 2 : 0
      const bExactTitle = b.title.toLowerCase().includes(query) ? 2 : 0
      
      // Совпадения в описании
      const aExactDesc = a.description.toLowerCase().includes(query) ? 1 : 0
      const bExactDesc = b.description.toLowerCase().includes(query) ? 1 : 0
      
      const aScore = aExactTitle + aExactDesc
      const bScore = bExactTitle + bExactDesc
      
      if (aScore !== bScore) {
        return bScore - aScore
      }
      
      return a.title.localeCompare(b.title)
    })
  }

  // Добавляем метаданные для каждого результата
  const enrichedResults = results.map(exercise => ({
    ...exercise,
    metadata: {
      estimatedTime: `${exercise.timeEstimate}с`,
      difficultyLabel: getDifficultyLabel(exercise.difficulty),
      typeLabel: getTypeLabel(exercise.type),
      languageFlag: getLanguageFlag(exercise.language)
    }
  }))

  return NextResponse.json(enrichedResults.slice(0, 20)) // Ограничиваем до 20 результатов
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'Легко'
    case 'medium': return 'Средне'
    case 'hard': return 'Сложно'
    default: return difficulty
  }
}

function getTypeLabel(type: string): string {
  switch (type) {
    case 'quiz_single': return 'Выбор одного'
    case 'quiz_multiple': return 'Множественный выбор'
    case 'fill_gap': return 'Заполнить пропуски'
    case 'match': return 'Сопоставление'
    case 'theory': return 'Теория'
    default: return type
  }
}

function getLanguageFlag(language: string): string {
  switch (language) {
    case 'english': return '🇬🇧'
    case 'german': return '🇩🇪'
    default: return '🌐'
  }
}