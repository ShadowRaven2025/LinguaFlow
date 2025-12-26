'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Calendar, Target } from 'lucide-react'

interface ProgressData {
  date: string
  xp: number
  lessonsCompleted: number
  wordsLearned: number
}

interface ProgressChartProps {
  data: ProgressData[]
  currentXP: number
  currentLevel: number
  nextLevelXP: number
}

export function ProgressChart({ data, currentXP, currentLevel, nextLevelXP }: ProgressChartProps) {
  const progressToNextLevel = ((currentXP - (currentLevel * currentLevel * 100)) / ((nextLevelXP - (currentLevel * currentLevel * 100)))) * 100
  
  // Получаем данные за последние 7 дней
  const last7Days = data.slice(-7)
  const totalXPGained = last7Days.reduce((sum, day) => sum + day.xp, 0)
  const totalLessons = last7Days.reduce((sum, day) => sum + day.lessonsCompleted, 0)
  const totalWords = last7Days.reduce((sum, day) => sum + day.wordsLearned, 0)

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Прогресс уровня
          </CardTitle>
          <CardDescription>
            Ваш текущий прогресс до следующего уровня
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-primary">
                  {currentLevel}
                </div>
                <div>
                  <div className="font-medium">Уровень</div>
                  <div className="text-sm text-muted-foreground">
                    {currentXP} / {nextLevelXP} XP
                  </div>
                </div>
              </div>
              <Badge variant="outline">
                {Math.round(progressToNextLevel)}% до {currentLevel + 1}
              </Badge>
            </div>
            <Progress value={Math.max(0, Math.min(100, progressToNextLevel))} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Статистика за неделю
          </CardTitle>
          <CardDescription>
            Ваши достижения за последние 7 дней
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalXPGained}</div>
              <div className="text-sm text-muted-foreground">XP получено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalLessons}</div>
              <div className="text-sm text-muted-foreground">Уроков пройдено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalWords}</div>
              <div className="text-sm text-muted-foreground">Слов изучено</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Ежедневная активность
          </CardTitle>
          <CardDescription>
            Ваша активность за последние дни
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {last7Days.map((day, index) => (
              <div key={day.date} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">
                    {new Date(day.date).toLocaleDateString('ru-RU', { 
                      weekday: 'short', 
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-primary font-medium">{day.xp}</span>
                    <span className="text-muted-foreground">XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 font-medium">{day.lessonsCompleted}</span>
                    <span className="text-muted-foreground">уроков</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-purple-600 font-medium">{day.wordsLearned}</span>
                    <span className="text-muted-foreground">слов</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}