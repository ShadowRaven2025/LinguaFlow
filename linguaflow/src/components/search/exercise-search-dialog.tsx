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
import { Separator } from '@/components/ui/separator'
import { 
  BookOpen, 
  Brain, 
  Search, 
  Filter,
  Clock,
  Star,
  Target,
  CheckCircle,
  Circle,
  RotateCcw
} from 'lucide-react'

interface Exercise {
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
  const [results, setResults] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    language: '',
    level: '',
    type: '',
    difficulty: '',
    topic: ''
  })
  const [showFilters, setShowFilters] = useState(false)
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
        if (filters.language) params.append('language', filters.language)
        if (filters.level) params.append('level', filters.level)
        if (filters.type) params.append('type', filters.type)
        if (filters.difficulty) params.append('difficulty', filters.difficulty)
        if (filters.topic) params.append('topic', filters.topic)

        const response = await fetch(`/api/exercises/search?${params.toString()}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Exercise search error:', error)
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
    setFilters({
      language: '',
      level: '',
      type: '',
      difficulty: '',
      topic: ''
    })
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

  const activeFiltersCount = Object.values(filters).filter(f => f).length

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Поиск заданий по названию, теме или тегам..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="ml-2 shrink-0"
        >
          <Filter className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="border-b p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Фильтры</h4>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <RotateCcw className="w-3 h-3 mr-1" />
                Очистить
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Язык</label>
              <select
                className="w-full mt-1 px-2 py-1 text-sm border rounded"
                value={filters.language}
                onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
              >
                <option value="">Все языки</option>
                <option value="english">🇬🇧 Английский</option>
                <option value="german">🇩🇪 Немецкий</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Уровень</label>
              <select
                className="w-full mt-1 px-2 py-1 text-sm border rounded"
                value={filters.level}
                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
              >
                <option value="">Все уровни</option>
                <option value="a1">A1</option>
                <option value="a2">A2</option>
                <option value="b1">B1</option>
                <option value="b2">B2</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Тип</label>
              <select
                className="w-full mt-1 px-2 py-1 text-sm border rounded"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Все типы</option>
                <option value="quiz_single">Выбор одного</option>
                <option value="quiz_multiple">Множественный выбор</option>
                <option value="fill_gap">Заполнить пропуски</option>
                <option value="match">Сопоставление</option>
                <option value="theory">Теория</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground">Сложность</label>
              <select
                className="w-full mt-1 px-2 py-1 text-sm border rounded"
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              >
                <option value="">Любая</option>
                <option value="easy">Легко</option>
                <option value="medium">Средне</option>
                <option value="hard">Сложно</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <CommandList>
        <CommandEmpty>
          {loading ? 'Поиск заданий...' : 'Задания не найдены.'}
        </CommandEmpty>
        
        {results.length > 0 && (
          <CommandGroup heading={`Найдено заданий: ${results.length}`}>
            {results.map((exercise) => (
              <CommandItem
                key={exercise.id}
                value={exercise.id}
                onSelect={() => handleSelect(exercise.url)}
                className="flex items-start gap-3 p-4 cursor-pointer"
              >
                <div className="flex items-center gap-2 mt-1">
                  {getIcon(exercise.type)}
                  <span className="text-lg">{exercise.metadata.languageFlag}</span>
                </div>
                
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{exercise.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {exercise.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Badge variant="outline" className="text-xs">
                        +{exercise.xpReward} XP
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {exercise.metadata.typeLabel}
                    </Badge>
                    <Badge 
                      className={`text-xs ${getDifficultyColor(exercise.difficulty)}`}
                    >
                      {exercise.metadata.difficultyLabel}
                    </Badge>
                    <Badge variant="outline" className="text-xs uppercase">
                      {exercise.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {exercise.metadata.estimatedTime}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Урок: {exercise.lessonTitle}
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}