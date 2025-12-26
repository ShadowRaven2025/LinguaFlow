export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          xp: number
          level: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          xp?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          xp?: number
          level?: number
          created_at?: string
          updated_at?: string
        }
      }
      languages: {
        Row: {
          id: string
          code: string
          name: string
          flag_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          flag_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          flag_url?: string | null
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          language_id: string
          level: string
          name: string
          description: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          language_id: string
          level: string
          name: string
          description?: string | null
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          language_id?: string
          level?: string
          name?: string
          description?: string | null
          order_index?: number
          created_at?: string
        }
      }
      themes: {
        Row: {
          id: string
          course_id: string
          name: string
          description: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          name: string
          description?: string | null
          order_index: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          name?: string
          description?: string | null
          order_index?: number
          created_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          theme_id: string
          name: string
          description: string | null
          slides: any // JSONB
          order_index: number
          estimated_duration: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          theme_id: string
          name: string
          description?: string | null
          slides: any
          order_index: number
          estimated_duration?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          theme_id?: string
          name?: string
          description?: string | null
          slides?: any
          order_index?: number
          estimated_duration?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          current_slide: number
          completed: boolean
          score: number | null
          time_spent: number | null
          started_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          current_slide?: number
          completed?: boolean
          score?: number | null
          time_spent?: number | null
          started_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          current_slide?: number
          completed?: boolean
          score?: number | null
          time_spent?: number | null
          started_at?: string
          completed_at?: string | null
        }
      }
      vocabulary: {
        Row: {
          id: string
          language_id: string
          word: string
          transcription: string | null
          translation: string
          part_of_speech: string | null
          audio_url: string | null
          example_sentence: string | null
          created_at: string
        }
        Insert: {
          id?: string
          language_id: string
          word: string
          transcription?: string | null
          translation: string
          part_of_speech?: string | null
          audio_url?: string | null
          example_sentence?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          language_id?: string
          word?: string
          transcription?: string | null
          translation?: string
          part_of_speech?: string | null
          audio_url?: string | null
          example_sentence?: string | null
          created_at?: string
        }
      }
      flashcard_sets: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          auto_generated: boolean
          source_lesson_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          auto_generated?: boolean
          source_lesson_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          auto_generated?: boolean
          source_lesson_id?: string | null
          created_at?: string
        }
      }
      flashcards: {
        Row: {
          id: string
          set_id: string
          vocabulary_id: string
          ease_factor: number
          interval_days: number
          repetitions: number
          next_review: string
          created_at: string
        }
        Insert: {
          id?: string
          set_id: string
          vocabulary_id: string
          ease_factor?: number
          interval_days?: number
          repetitions?: number
          next_review?: string
          created_at?: string
        }
        Update: {
          id?: string
          set_id?: string
          vocabulary_id?: string
          ease_factor?: number
          interval_days?: number
          repetitions?: number
          next_review?: string
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon_url: string | null
          type: string
          condition_data: any // JSONB
          xp_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon_url?: string | null
          type: string
          condition_data: any
          xp_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon_url?: string | null
          type?: string
          condition_data?: any
          xp_reward?: number
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
    }
  }
}