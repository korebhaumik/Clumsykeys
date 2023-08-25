export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leaderboards: {
        Row: {
          acc: number
          email: string
          id: string
          raw: number
          std: number
          upserted_at: string
          username: string
          wpm: number
        }
        Insert: {
          acc: number
          email: string
          id?: string
          raw: number
          std: number
          upserted_at?: string
          username: string
          wpm: number
        }
        Update: {
          acc?: number
          email?: string
          id?: string
          raw?: number
          std?: number
          upserted_at?: string
          username?: string
          wpm?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          acc: number | null
          created_at: string
          email: string
          id: string
          pb: Json | null
          raw: number | null
          recent_tests: Json | null
          std: number | null
          testsCompleted: number
          testsStarted: number
          timeTyping: number | null
          username: string
          wpm: number | null
        }
        Insert: {
          acc?: number | null
          created_at?: string
          email: string
          id?: string
          pb?: Json | null
          raw?: number | null
          recent_tests?: Json | null
          std?: number | null
          testsCompleted?: number
          testsStarted?: number
          timeTyping?: number | null
          username: string
          wpm?: number | null
        }
        Update: {
          acc?: number | null
          created_at?: string
          email?: string
          id?: string
          pb?: Json | null
          raw?: number | null
          recent_tests?: Json | null
          std?: number | null
          testsCompleted?: number
          testsStarted?: number
          timeTyping?: number | null
          username?: string
          wpm?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      findpositionbyemail: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      findrankbyemail: {
        Args: {
          emailstr: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
