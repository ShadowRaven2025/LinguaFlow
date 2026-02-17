// Progress tracking utility for LinguaFlow lessons

export interface LessonProgress {
  lessonId: string
  progress: number
  completed: boolean
  lastUpdated: Date
}

export interface CourseProgress {
  courseId: string
  lessons: Record<string, LessonProgress>
  overallProgress: number
  completedLessons: number
  totalLessons: number
}

const STORAGE_KEY = 'linguaflow-progress'

export class ProgressTracker {
  private static instance: ProgressTracker
  private progress: Record<string, CourseProgress> = {}

  private constructor() {
    this.loadProgress()
  }

  static getInstance(): ProgressTracker {
    if (!ProgressTracker.instance) {
      ProgressTracker.instance = new ProgressTracker()
    }
    return ProgressTracker.instance
  }

  private loadProgress(): void {
    if (typeof window === 'undefined') return
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        this.progress = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }

  private saveProgress(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress))
    } catch (error) {
      console.error('Error saving progress:', error)
    }
  }

  updateLessonProgress(courseId: string, lessonId: string, progress: number, completed: boolean = false): void {
    if (!this.progress[courseId]) {
      this.progress[courseId] = {
        courseId,
        lessons: {},
        overallProgress: 0,
        completedLessons: 0,
        totalLessons: 0
      }
    }

    this.progress[courseId].lessons[lessonId] = {
      lessonId,
      progress,
      completed,
      lastUpdated: new Date()
    }

    this.recalculateCourseProgress(courseId)
    this.saveProgress()

    // Dispatch event for UI updates
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('progressUpdated', {
        detail: { courseId, lessonId, progress, completed }
      })
      window.dispatchEvent(event)
    }
  }

  private recalculateCourseProgress(courseId: string): void {
    const course = this.progress[courseId]
    if (!course) return

    const lessons = Object.values(course.lessons)
    const totalLessons = lessons.length
    const completedLessons = lessons.filter(l => l.completed).length
    const totalProgress = lessons.reduce((sum, lesson) => sum + lesson.progress, 0)
    const overallProgress = totalLessons > 0 ? totalProgress / totalLessons : 0

    course.totalLessons = totalLessons
    course.completedLessons = completedLessons
    course.overallProgress = overallProgress
  }

  getLessonProgress(courseId: string, lessonId: string): LessonProgress | null {
    return this.progress[courseId]?.lessons[lessonId] || null
  }

  getCourseProgress(courseId: string): CourseProgress | null {
    return this.progress[courseId] || null
  }

  getAllProgress(): Record<string, CourseProgress> {
    return this.progress
  }

  resetProgress(courseId?: string): void {
    if (courseId) {
      delete this.progress[courseId]
    } else {
      this.progress = {}
    }
    this.saveProgress()
  }

  // Get progress for specific lesson types
  getA1EnglishProgress(): CourseProgress | null {
    return this.getCourseProgress('english-a1')
  }

  // Update A1 English lesson progress
  updateA1EnglishLesson(lessonId: string, progress: number, completed: boolean = false): void {
    this.updateLessonProgress('english-a1', lessonId, progress, completed)
  }
}

// Export singleton instance
export const progressTracker = ProgressTracker.getInstance()

// Helper function to initialize progress tracking for a lesson page
export function initializeLessonTracking(courseId: string, lessonId: string): () => void {
  if (typeof window === 'undefined') return () => {}

  const handleProgressUpdate = (event: CustomEvent) => {
    const { lessonId: eventLessonId, progress, completed } = event.detail
    if (eventLessonId === lessonId) {
      progressTracker.updateLessonProgress(courseId, lessonId, progress, completed)
    }
  }

  window.addEventListener('lessonProgressUpdate', handleProgressUpdate as EventListener)

  // Cleanup function
  return () => {
    window.removeEventListener('lessonProgressUpdate', handleProgressUpdate as EventListener)
  }
}

// Helper function to dispatch progress updates
export function updateLessonProgress(lessonId: string, progress: number, completed: boolean = false): void {
  if (typeof window === 'undefined') return

  const event = new CustomEvent('lessonProgressUpdate', {
    detail: { lessonId, progress, completed }
  })
  window.dispatchEvent(event)
}