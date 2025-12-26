'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Star, Target, BookOpen, Brain, Zap } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  type: 'lesson' | 'streak' | 'xp' | 'vocabulary' | 'speed' | 'perfect'
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: string
  xpReward: number
}

interface AchievementCardProps {
  achievement: Achievement
  size?: 'small' | 'medium' | 'large'
}

export function AchievementCard({ achievement, size = 'medium' }: AchievementCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-5 h-5" />
      case 'streak':
        return <Zap className="w-5 h-5" />
      case 'xp':
        return <Star className="w-5 h-5" />
      case 'vocabulary':
        return <Brain className="w-5 h-5" />
      case 'speed':
        return <Target className="w-5 h-5" />
      case 'perfect':
        return <Trophy className="w-5 h-5" />
      default:
        return <Trophy className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson':
        return 'text-blue-600'
      case 'streak':
        return 'text-orange-600'
      case 'xp':
        return 'text-yellow-600'
      case 'vocabulary':
        return 'text-purple-600'
      case 'speed':
        return 'text-green-600'
      case 'perfect':
        return 'text-pink-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'lesson':
        return 'Уроки'
      case 'streak':
        return 'Серия'
      case 'xp':
        return 'Опыт'
      case 'vocabulary':
        return 'Словарь'
      case 'speed':
        return 'Скорость'
      case 'perfect':
        return 'Совершенство'
      default:
        return 'Достижение'
    }
  }

  const progressPercentage = (achievement.progress / achievement.maxProgress) * 100

  if (size === 'small') {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg border ${
        achievement.unlocked 
          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800' 
          : 'bg-muted/50 border-muted'
      }`}>
        <div className={`p-2 rounded-full ${
          achievement.unlocked 
            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' 
            : 'bg-muted text-muted-foreground'
        }`}>
          {getIcon(achievement.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium truncate ${
              achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {achievement.title}
            </h4>
            {achievement.unlocked && (
              <Badge variant="secondary" className="text-xs">
                +{achievement.xpReward} XP
              </Badge>
            )}
          </div>
          {!achievement.unlocked && (
            <div className="mt-1">
              <Progress value={progressPercentage} className="h-1" />
              <div className="text-xs text-muted-foreground mt-1">
                {achievement.progress} / {achievement.maxProgress}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card className={`transition-all duration-200 ${
      achievement.unlocked 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md dark:from-yellow-950/20 dark:to-orange-950/20 dark:border-yellow-800' 
        : 'hover:shadow-md'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${
              achievement.unlocked 
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' 
                : `bg-muted ${getTypeColor(achievement.type)}`
            }`}>
              {getIcon(achievement.type)}
            </div>
            <div>
              <CardTitle className={`text-lg ${
                achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(achievement.type)}
                </Badge>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="text-xs">
                    +{achievement.xpReward} XP
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {achievement.unlocked && (
            <Trophy className="w-6 h-6 text-yellow-600" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {achievement.description}
        </CardDescription>
        
        {!achievement.unlocked ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Прогресс</span>
              <span className="text-muted-foreground">
                {achievement.progress} / {achievement.maxProgress}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>
              Получено {achievement.unlockedAt ? 
                new Date(achievement.unlockedAt).toLocaleDateString('ru-RU') : 
                'недавно'
              }
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}