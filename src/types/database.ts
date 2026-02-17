export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          condition_data: Json
          created_at: string | null
          description: string
          icon_url: string | null
          id: string
          name: string
          type: string
          xp_reward: number | null
        }
        Insert: {
          condition_data: Json
          created_at?: string | null
          description: string
          icon_url?: string | null
          id?: string
          name: string
          type: string
          xp_reward?: number | null
        }
        Update: {
          condition_data?: Json
          created_at?: string | null
          description?: string
          icon_url?: string | null
          id?: string
          name?: string
          type?: string
          xp_reward?: number | null
        }
        Relationships: []
      }
      audio_files: {
        Row: {
          created_at: string | null
          created_by: string | null
          duration_ms: number | null
          file_path: string
          file_size: number | null
          format: string | null
          id: string
          quality: string | null
          vocabulary_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          duration_ms?: number | null
          file_path: string
          file_size?: number | null
          format?: string | null
          id?: string
          quality?: string | null
          vocabulary_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          duration_ms?: number | null
          file_path?: string
          file_size?: number | null
          format?: string | null
          id?: string
          quality?: string | null
          vocabulary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audio_files_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audio_files_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          language_id: string | null
          level: string
          name: string
          order_index: number
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          language_id?: string | null
          level: string
          name: string
          order_index: number
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          language_id?: string | null
          level?: string
          name?: string
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_reviews: {
        Row: {
          flashcard_id: string | null
          id: string
          rating: number
          response_time: number | null
          reviewed_at: string | null
          user_id: string | null
        }
        Insert: {
          flashcard_id?: string | null
          id?: string
          rating: number
          response_time?: number | null
          reviewed_at?: string | null
          user_id?: string | null
        }
        Update: {
          flashcard_id?: string | null
          id?: string
          rating?: number
          response_time?: number | null
          reviewed_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_reviews_flashcard_id_fkey"
            columns: ["flashcard_id"]
            isOneToOne: false
            referencedRelation: "flashcards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcard_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_sets: {
        Row: {
          auto_generated: boolean | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          source_lesson_id: string | null
          user_id: string | null
        }
        Insert: {
          auto_generated?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          source_lesson_id?: string | null
          user_id?: string | null
        }
        Update: {
          auto_generated?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          source_lesson_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_sets_source_lesson_id_fkey"
            columns: ["source_lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcard_sets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          created_at: string | null
          ease_factor: number | null
          id: string
          interval_days: number | null
          next_review: string | null
          repetitions: number | null
          set_id: string | null
          vocabulary_id: string | null
        }
        Insert: {
          created_at?: string | null
          ease_factor?: number | null
          id?: string
          interval_days?: number | null
          next_review?: string | null
          repetitions?: number | null
          set_id?: string | null
          vocabulary_id?: string | null
        }
        Update: {
          created_at?: string | null
          ease_factor?: number | null
          id?: string
          interval_days?: number | null
          next_review?: string | null
          repetitions?: number | null
          set_id?: string | null
          vocabulary_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "flashcard_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flashcards_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          created_at: string | null
          flag_url: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          flag_url?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          flag_url?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      learning_sessions: {
        Row: {
          accuracy_rate: number | null
          activities_completed: number | null
          duration_seconds: number | null
          ended_at: string | null
          flashcard_set_id: string | null
          id: string
          lesson_id: string | null
          session_type: string
          started_at: string | null
          user_id: string | null
          xp_earned: number | null
        }
        Insert: {
          accuracy_rate?: number | null
          activities_completed?: number | null
          duration_seconds?: number | null
          ended_at?: string | null
          flashcard_set_id?: string | null
          id?: string
          lesson_id?: string | null
          session_type: string
          started_at?: string | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Update: {
          accuracy_rate?: number | null
          activities_completed?: number | null
          duration_seconds?: number | null
          ended_at?: string | null
          flashcard_set_id?: string | null
          id?: string
          lesson_id?: string | null
          session_type?: string
          started_at?: string | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_sessions_flashcard_set_id_fkey"
            columns: ["flashcard_set_id"]
            isOneToOne: false
            referencedRelation: "flashcard_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_sessions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          current_slide: number | null
          id: string
          lesson_id: string | null
          score: number | null
          started_at: string | null
          time_spent: number | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          current_slide?: number | null
          id?: string
          lesson_id?: string | null
          score?: number | null
          started_at?: string | null
          time_spent?: number | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          current_slide?: number | null
          id?: string
          lesson_id?: string | null
          score?: number | null
          started_at?: string | null
          time_spent?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_vocabulary: {
        Row: {
          lesson_id: string
          vocabulary_id: string
        }
        Insert: {
          lesson_id: string
          vocabulary_id: string
        }
        Update: {
          lesson_id?: string
          vocabulary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_vocabulary_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_vocabulary_vocabulary_id_fkey"
            columns: ["vocabulary_id"]
            isOneToOne: false
            referencedRelation: "vocabulary"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          created_at: string | null
          description: string | null
          estimated_duration: number | null
          id: string
          name: string
          order_index: number
          slides: Json
          theme_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          name: string
          order_index: number
          slides: Json
          theme_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          estimated_duration?: number | null
          id?: string
          name?: string
          order_index?: number
          slides?: Json
          theme_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          level: number | null
          name: string | null
          role: string | null
          updated_at: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          level?: number | null
          name?: string | null
          role?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          level?: number | null
          name?: string | null
          role?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      themes: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          order_index: number
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          order_index: number
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "themes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          earned_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          earned_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_answers: {
        Row: {
          answered_at: string | null
          attempts: number | null
          correct_answer: Json
          id: string
          is_correct: boolean
          lesson_id: string | null
          question_type: string
          response_time_ms: number | null
          session_id: string | null
          slide_id: string
          user_answer: Json
          user_id: string | null
        }
        Insert: {
          answered_at?: string | null
          attempts?: number | null
          correct_answer: Json
          id?: string
          is_correct: boolean
          lesson_id?: string | null
          question_type: string
          response_time_ms?: number | null
          session_id?: string | null
          slide_id: string
          user_answer: Json
          user_id?: string | null
        }
        Update: {
          answered_at?: string | null
          attempts?: number | null
          correct_answer?: Json
          id?: string
          is_correct?: boolean
          lesson_id?: string | null
          question_type?: string
          response_time_ms?: number | null
          session_id?: string | null
          slide_id?: string
          user_answer?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_answers_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "learning_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_answers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lesson_preferences: {
        Row: {
          created_at: string | null
          difficulty_rating: number | null
          id: string
          lesson_id: string | null
          notes: string | null
          preferred_pace: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          difficulty_rating?: number | null
          id?: string
          lesson_id?: string | null
          notes?: string | null
          preferred_pace?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          difficulty_rating?: number | null
          id?: string
          lesson_id?: string | null
          notes?: string | null
          preferred_pace?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_preferences_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_lesson_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string | null
          daily_goal_minutes: number | null
          id: string
          language_preference: string | null
          notifications_enabled: boolean | null
          reminder_time: string | null
          sound_enabled: boolean | null
          theme: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          daily_goal_minutes?: number | null
          id?: string
          language_preference?: string | null
          notifications_enabled?: boolean | null
          reminder_time?: string | null
          sound_enabled?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          daily_goal_minutes?: number | null
          id?: string
          language_preference?: string | null
          notifications_enabled?: boolean | null
          reminder_time?: string | null
          sound_enabled?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_statistics: {
        Row: {
          accuracy_rate: number | null
          date: string
          flashcards_reviewed: number | null
          id: string
          lessons_completed: number | null
          time_spent: number | null
          user_id: string | null
          xp_earned: number | null
        }
        Insert: {
          accuracy_rate?: number | null
          date: string
          flashcards_reviewed?: number | null
          id?: string
          lessons_completed?: number | null
          time_spent?: number | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Update: {
          accuracy_rate?: number | null
          date?: string
          flashcards_reviewed?: number | null
          id?: string
          lessons_completed?: number | null
          time_spent?: number | null
          user_id?: string | null
          xp_earned?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_statistics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_streaks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vocabulary: {
        Row: {
          audio_url: string | null
          created_at: string | null
          example_sentence: string | null
          id: string
          language_id: string | null
          part_of_speech: string | null
          transcription: string | null
          translation: string
          word: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string | null
          example_sentence?: string | null
          id?: string
          language_id?: string | null
          part_of_speech?: string | null
          transcription?: string | null
          translation: string
          word: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string | null
          example_sentence?: string | null
          id?: string
          language_id?: string | null
          part_of_speech?: string | null
          transcription?: string | null
          translation?: string
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "vocabulary_language_id_fkey"
            columns: ["language_id"]
            isOneToOne: false
            referencedRelation: "languages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_xp: {
        Args: { source?: string; user_uuid: string; xp_amount: number }
        Returns: undefined
      }
      calculate_user_level: { Args: { xp_amount: number }; Returns: number }
      check_and_award_achievements: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      create_notification: {
        Args: {
          data_json?: Json
          message_text: string
          notification_type: string
          title_text: string
          user_uuid: string
        }
        Returns: string
      }
      end_learning_session: {
        Args: {
          accuracy?: number
          activities_count?: number
          session_uuid: string
          xp_amount?: number
        }
        Returns: undefined
      }
      get_due_flashcards: {
        Args: { user_uuid: string }
        Returns: {
          audio_url: string
          ease_factor: number
          flashcard_id: string
          interval_days: number
          repetitions: number
          transcription: string
          translation: string
          vocabulary_id: string
          word: string
        }[]
      }
      get_user_analytics: {
        Args: { days_back?: number; user_uuid: string }
        Returns: {
          average_accuracy: number
          current_streak: number
          flashcards_reviewed: number
          lessons_completed: number
          level: number
          longest_streak: number
          total_time_minutes: number
          total_xp: number
        }[]
      }
      record_user_answer: {
        Args: {
          correct_answer_val: Json
          is_correct_val: boolean
          lesson_uuid: string
          question_type_val: string
          response_time_val?: number
          session_uuid: string
          slide_id_val: string
          user_answer_val: Json
          user_uuid: string
        }
        Returns: undefined
      }
      start_learning_session: {
        Args: {
          flashcard_set_uuid?: string
          lesson_uuid?: string
          session_type_val: string
          user_uuid: string
        }
        Returns: string
      }
      update_flashcard_review: {
        Args: {
          flashcard_uuid: string
          rating: number
          response_time_ms?: number
          user_uuid: string
        }
        Returns: undefined
      }
      update_user_streak: { Args: { user_uuid: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const