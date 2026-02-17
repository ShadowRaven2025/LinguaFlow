import { NextResponse } from 'next/server'

// Mock data для статистики заданий
const exerciseStats = {
  total: 85,
  byType: {
    quiz_single: 28,
    quiz_multiple: 15,
    fill_gap: 22,
    match: 12,
    theory: 8
  },
  byDifficulty: {
    easy: 35,
    medium: 32,
    hard: 18
  },
  byLanguage: {
    english: 62,
    german: 23
  },
  byLevel: {
    a1: 38,
    a2: 28,
    b1: 14,
    b2: 5
  },
  byTopic: {
    greetings: 12,
    numbers: 8,
    family: 6,
    colors: 4,
    food: 6,
    grammar: 18,
    travel: 8,
    shopping: 6,
    work: 4,
    business: 4,
    vocabulary: 9
  },
  totalXP: 1450,
  averageTime: 52, // seconds
  newThisWeek: 25,
  popularTags: [
    { tag: 'приветствие', count: 12 },
    { tag: 'грамматика', count: 28 },
    { tag: 'словарь', count: 22 },
    { tag: 'диалог', count: 18 },
    { tag: 'перевод', count: 15 },
    { tag: 'произношение', count: 8 },
    { tag: 'времена', count: 12 },
    { tag: 'работа', count: 8 },
    { tag: 'путешествия', count: 10 }
  ]
}

export async function GET() {
  return NextResponse.json(exerciseStats)
}