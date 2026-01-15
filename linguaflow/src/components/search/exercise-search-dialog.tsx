'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { BookOpen, Brain, Search, Target, CheckCircle, Circle, Clock, Star, Filter } from 'lucide-react'

interface ExerciseSearchResult {
  id: string
  title: string
  description: string
  type: string
  difficulty: string
  language: string
  level: string
  topic: string
  lessonId: string
  lessonTitle: string
  url: string
  xpReward: number
  timeEstimate: number
  tags: string[]
  metadata: {
    estimatedTime: string
    difficultyLabel: string
    typeLabel: string
    languageFlag: string
  }
}

interface ExerciseSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExerciseSearchDialog({ open, onOpenChange }: ExerciseSearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ExerciseSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    language: '',
    level: '',
    type: '',
    difficulty: '',
    topic: ''
  })
  const router = useRouter()

  useEffect(() => {
    const searchExercises = async () => {
      if (!query.trim() && !Object.values(filters).some(f => f)) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (query.trim()) params.append('q', query)
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value)
        })

        const response = await fetch(`/api/exercises/search?${params}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchExercises, 300)
    return () => clearTimeout(debounceTimer)
  }, [query, filters])

  const handleSelect = (url: string) => {
    onOpenChange(false)
    router.push(url)
    setQuery('')
  }

  const clearFilters = () => {
    setFilters({
      language: '',
      level: '',
      type: '',
      difficulty: '',
      topic: ''
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'quiz_single':
      case 'quiz_multiple':
        return <CheckCircle className="w-4 h-4" />
      case 'fill_gap':
        return <Circle className="w-4 h-4" />
      case 'match':
        return <Target className="w-4 h-4" />
      case 'theory':
        return <BookOpen className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getLanguageFlag = (language: string) => {
    switch (language) {
      case 'english':
        return '🇬🇧'
      case 'german':
        return '🇩🇪'
      default:
        return '🌐'
    }
  }

  const hasActiveFilters = Object.values(filters).some(f => f)

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
        <CommandInput
          placeholder="Поиск упражнений по названию, теме или тегам..."
          value={query}
          onValueChange={setQuery}
        />
        
        {/* Filters */}
        <div className="p-4 border-b bg-muted/50">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Фильтры</span>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Очистить
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Select value={filters.language} onValueChange={(value) => setFilters(prev => ({ ...prev, language: value }))}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Язык" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все языки</SelectItem>
                <SelectItem value="english">🇬🇧 Английский</SelectItem>
                <SelectItem value="german">🇩🇪 Немецкий</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.level} onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Уровень" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все уровни</SelectItem>
                <SelectItem value="a1">A1</SelectItem>
                <SelectItem value="a2">A2</SelectItem>
                <SelectItem value="b1">B1</SelectItem>
                <SelectItem value="b2">B2</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все типы</SelectItem>
                <SelectItem value="quiz_single">Выбор одного</SelectItem>
                <SelectItem value="quiz_multiple">Множественный выбор</SelectItem>
                <SelectItem value="fill_gap">Заполнить пропуски</SelectItem>
                <SelectItem value="match">Сопоставление</SelectItem>
                <SelectItem value="theory">Теория</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.difficulty} onValueChange={(value) => setFilters(prev => ({ ...prev, difficulty: value }))}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Сложность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Любая</SelectItem>
                <SelectItem value="easy">Легко</SelectItem>
                <SelectItem value="medium">Средне</SelectItem>
                <SelectItem value="hard">Сложно</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.topic} onValueChange={(value) => setFilters(prev => ({ ...prev, topic: value }))}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Тема" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все темы</SelectItem>
                <SelectItem value="grammar">Грамматика</SelectItem>
                <SelectItem value="vocabulary">Словарь</SelectItem>
                <SelectItem value="listening">Аудирование</SelectItem>
                <SelectItem value="reading">Чтение</SelectItem>
                <SelectItem value="writing">Письмо</SelectItem>
                <SelectItem value="speaking">Говорение</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <CommandList className="flex-1">
          <CommandEmpty>
            {loading ? 'Поиск...' : 'Ничего не найдено.'}
          </CommandEmpty>
          
          {results.length > 0 && (
            <CommandGroup heading={`Найдено упражнений: ${results.length}`}>
              {results.map((exercise) => (
                <CommandItem
                  key={exercise.id}
                  value={exercise.id}
                  onSelect={() => handleSelect(exercise.url)}
                  className="flex items-center gap-3 p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      {getIcon(exercise.type)}
                    </div>
                    <span className="text-lg">{getLanguageFlag(exercise.language)}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium truncate">{exercise.title}</span>
                      <Badge variant="outline" className="text-xs uppercase">
                        {exercise.level}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {exercise.metadata.typeLabel}
                      </Badge>
                      <Badge className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.metadata.difficultyLabel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {exercise.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {exercise.metadata.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {exercise.xpReward} XP
                      </div>
                      <span>Урок: {exercise.lessonTitle}</span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </div>
    </CommandDialog>
  )
}