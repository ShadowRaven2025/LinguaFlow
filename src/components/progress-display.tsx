'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Clock, Star } from 'lucide-react'
import { progressTracker, type CourseProgress } from '@/lib/progress-tracker'

interface ProgressDisplayProps {
  courseId: string
  lessons: Array<{
    id: string
    title: string
    duration: number
    xpReward: number
  }>
}

export function ProgressDisplay({ courseId, lessons }: ProgressDisplayProps) {
  const [courseProgress, setCourseProgress] = useState<CourseProgress | null>(null)

  useEffect(() => {
    // Load initial progress
    const loadProgress = () => {
      const progress = progressTracker.getCourseProgress(courseId)
      setCourseProgress(progress)
    }

    loadProgress()

    // Listen for progress updates
    const handleProgressUpdate = () => {
      loadProgress()
    }

    window.addEventListener('progressUpdated', handleProgressUpdate)
    return () => {
      window.removeEventListener('progressUpdated', handleProgressUpdate)
    }
  }, [courseId])

  if (!courseProgress) {
    return (
      <div className="max-w-md mx-auto mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Общий прогресс</span>
          <span>0%</span>
        </div>
        <Progress value={0} className="h-3" />
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          0 из {lessons.length} уроков завершено
        </div>
      </div>
    )
  }

  const completedLessons = Object.values(courseProgress.lessons).filter(l => l.completed).length
  const totalXP = Object.values(courseProgress.lessons)
    .filter(l => l.completed)
    .reduce((sum, lesson) => {
      const lessonData = lessons.find(l => l.id === lesson.lessonId)
      return sum + (lessonData?.xpReward || 0)
    }, 0)
  
  const totalTime = Object.values(courseProgress.lessons)
    .filter(l => l.completed)
    .reduce((sum, lesson) => {
      const lessonData = lessons.find(l => l.id === lesson.lessonId)
      return sum + (lessonData?.duration || 0)
    }, 0)

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-sm mb-2">
          <span>Общий прогресс</span>
          <span>{Math.round(courseProgress.overallProgress)}%</span>
        </div>
        <Progress value={courseProgress.overallProgress} className="h-3" />
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {completedLessons} из {lessons.length} уроков завершено
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{completedLessons}</div>
            <div className="text-sm text-muted-foreground">Уроков завершено</div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{totalXP}</div>
            <div className="text-sm text-muted-foreground">XP получено</div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalTime}</div>
            <div className="text-sm text-muted-foreground">Минут изучено</div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Lesson Progress */}
      <div className="max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-4">Прогресс по урокам</h3>
        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            const lessonProgress = courseProgress.lessons[lesson.id]
            const progress = lessonProgress?.progress || 0
            const completed = lessonProgress?.completed || false
            
            return (
              <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    completed 
                      ? 'bg-green-500 text-white' 
                      : progress > 0 
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <div className="flex items-center gap-2">
                      {completed && <Badge variant="secondary" className="bg-green-100 text-green-800">Завершено</Badge>}
                      {progress > 0 && !completed && <Badge variant="secondary" className="bg-orange-100 text-orange-800">В процессе</Badge>}
                    </div>
                  </div>
                  
                  {progress > 0 && (
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="flex-1 h-2" />
                      <span className="text-sm text-gray-500 min-w-[3rem]">{progress}%</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.duration} мин
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {lesson.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}