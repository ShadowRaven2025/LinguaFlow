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
import { BookOpen, Brain, Home, Globe, Search } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'course' | 'lesson' | 'feature'
  url: string
  language: string
  level: string
}

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const searchContent = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchContent, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSelect = (url: string) => {
    onOpenChange(false)
    router.push(url)
    setQuery('')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <Globe className="w-4 h-4" />
      case 'lesson':
        return <BookOpen className="w-4 h-4" />
      case 'feature':
        return <Brain className="w-4 h-4" />
      default:
        return <Search className="w-4 h-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'course':
        return 'Курс'
      case 'lesson':
        return 'Урок'
      case 'feature':
        return 'Функция'
      default:
        return type
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

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Поиск уроков, курсов и функций..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? 'Поиск...' : 'Ничего не найдено.'}
        </CommandEmpty>
        
        {results.length > 0 && (
          <CommandGroup heading="Результаты поиска">
            {results.map((result) => (
              <CommandItem
                key={result.id}
                value={result.id}
                onSelect={() => handleSelect(result.url)}
                className="flex items-center gap-3 p-3"
              >
                <div className="flex items-center gap-2">
                  {getIcon(result.type)}
                  <span className="text-lg">{getLanguageFlag(result.language)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium truncate">{result.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {getTypeLabel(result.type)}
                    </Badge>
                    {result.level !== 'all' && (
                      <Badge variant="secondary" className="text-xs uppercase">
                        {result.level}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {result.description}
                  </p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}