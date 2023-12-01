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
      event: {
        Row: {
          application_date: string | null
          cover_image_url: string | null
          created_at: string
          end_date: string | null
          event_data: Json | null
          event_name: string
          event_owner: string
          id: number
          location: string | null
          start_date: string | null
          type: number
        }
        Insert: {
          application_date?: string | null
          cover_image_url?: string | null
          created_at?: string
          end_date?: string | null
          event_data?: Json | null
          event_name: string
          event_owner: string
          id?: number
          location?: string | null
          start_date?: string | null
          type?: number
        }
        Update: {
          application_date?: string | null
          cover_image_url?: string | null
          created_at?: string
          end_date?: string | null
          event_data?: Json | null
          event_name?: string
          event_owner?: string
          id?: number
          location?: string | null
          start_date?: string | null
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_event_owner_fkey"
            columns: ["event_owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      event_comments: {
        Row: {
          comment: string | null
          created_at: string
          event_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          event_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          event_id?: number | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_comments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          id: string
          name: string | null
          type: number | null
        }
        Insert: {
          id: string
          name?: string | null
          type?: number | null
        }
        Update: {
          id?: string
          name?: string | null
          type?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_applied_event: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_applied_event_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_applied_event_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_saved_event: {
        Row: {
          created_at: string
          event_id: number | null
          id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          id?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: number | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_event_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_saved_event_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
