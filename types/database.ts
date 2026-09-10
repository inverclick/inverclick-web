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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      characteristics: {
        Row: {
          icon: string
          id: string
          label: string
          order: number
        }
        Insert: {
          icon: string
          id?: string
          label: string
          order: number
        }
        Update: {
          icon?: string
          id?: string
          label?: string
          order?: number
        }
        Relationships: []
      }
      chatbot_messages: {
        Row: {
          created_at: string
          from: Database["public"]["Enums"]["CHATBOT_SENDER"]
          id: string
          message: string
          user_id: string
        }
        Insert: {
          created_at?: string
          from: Database["public"]["Enums"]["CHATBOT_SENDER"]
          id?: string
          message: string
          user_id: string
        }
        Update: {
          created_at?: string
          from?: Database["public"]["Enums"]["CHATBOT_SENDER"]
          id?: string
          message?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          department_id: number
          id: number
          name: string
        }
        Insert: {
          department_id: number
          id?: number
          name: string
        }
        Update: {
          department_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          email_for_leads: string
          id: string
          logo_url: string
          name: string
          subscription_status: Database["public"]["Enums"]["SUBSCRIPTION_STATUS"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          email_for_leads: string
          id?: string
          logo_url: string
          name: string
          subscription_status?: Database["public"]["Enums"]["SUBSCRIPTION_STATUS"]
        }
        Update: {
          created_at?: string
          description?: string | null
          email_for_leads?: string
          id?: string
          logo_url?: string
          name?: string
          subscription_status?: Database["public"]["Enums"]["SUBSCRIPTION_STATUS"]
        }
        Relationships: []
      }
      companies_leads: {
        Row: {
          company_id: string
          created_at: string
          email_sent_to: string
          id: string
          lead_id: string
          project_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email_sent_to: string
          id?: string
          lead_id: string
          project_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email_sent_to?: string
          id?: string
          lead_id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_leads_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_leads_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_leads_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      draft_project_characteristics: {
        Row: {
          characteristic_id: string
          draft_project_id: string
          id: string
        }
        Insert: {
          characteristic_id: string
          draft_project_id: string
          id?: string
        }
        Update: {
          characteristic_id?: string
          draft_project_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "draft_project_characteristics_characteristic_id_fkey"
            columns: ["characteristic_id"]
            isOneToOne: false
            referencedRelation: "characteristics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_project_characteristics_draft_project_id_fkey"
            columns: ["draft_project_id"]
            isOneToOne: false
            referencedRelation: "draft_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      draft_projects: {
        Row: {
          address: string | null
          city_id: number | null
          company_id: string
          created_at: string
          deadline: string | null
          department_id: number | null
          description: string | null
          features: string[]
          housing_state: Database["public"]["Enums"]["HOUSING_STATE"] | null
          housing_type: Database["public"]["Enums"]["HOUSING_TYPES"] | null
          id: string
          latitude: number | null
          logo: string | null
          longitude: number | null
          name: string | null
          photos: string[]
          plan_id: string | null
          project_class: Database["public"]["Enums"]["PROJECT_CLASS"]
          project_id: string | null
          rejected_message: string | null
          show_valuation: boolean | null
          status: Database["public"]["Enums"]["PROJECT_STATUS"]
          step: number
          stratum: number | null
          updated_at: string | null
          urbanism_files: string[]
          urbanism_photos: string[]
          valuation: number
          valuation_months: number
          videos: string[] | null
        }
        Insert: {
          address?: string | null
          city_id?: number | null
          company_id: string
          created_at?: string
          deadline?: string | null
          department_id?: number | null
          description?: string | null
          features?: string[]
          housing_state?: Database["public"]["Enums"]["HOUSING_STATE"] | null
          housing_type?: Database["public"]["Enums"]["HOUSING_TYPES"] | null
          id?: string
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          name?: string | null
          photos?: string[]
          plan_id?: string | null
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"]
          project_id?: string | null
          rejected_message?: string | null
          show_valuation?: boolean | null
          status: Database["public"]["Enums"]["PROJECT_STATUS"]
          step: number
          stratum?: number | null
          updated_at?: string | null
          urbanism_files?: string[]
          urbanism_photos?: string[]
          valuation?: number
          valuation_months?: number
          videos?: string[] | null
        }
        Update: {
          address?: string | null
          city_id?: number | null
          company_id?: string
          created_at?: string
          deadline?: string | null
          department_id?: number | null
          description?: string | null
          features?: string[]
          housing_state?: Database["public"]["Enums"]["HOUSING_STATE"] | null
          housing_type?: Database["public"]["Enums"]["HOUSING_TYPES"] | null
          id?: string
          latitude?: number | null
          logo?: string | null
          longitude?: number | null
          name?: string | null
          photos?: string[]
          plan_id?: string | null
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"]
          project_id?: string | null
          rejected_message?: string | null
          show_valuation?: boolean | null
          status?: Database["public"]["Enums"]["PROJECT_STATUS"]
          step?: number
          stratum?: number | null
          updated_at?: string | null
          urbanism_files?: string[]
          urbanism_photos?: string[]
          valuation?: number
          valuation_months?: number
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "draft_projects_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_projects_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_projects_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "project_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "draft_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      draft_typologies: {
        Row: {
          area: number
          bathrooms: number
          blueprints: string[]
          delivery_date: string | null
          description: string
          id: string
          name: string
          order: number
          parking: number | null
          price: number
          private_area: number
          project_id: string
          rooms: number
          units: number
          updated_at: string | null
        }
        Insert: {
          area: number
          bathrooms: number
          blueprints: string[]
          delivery_date?: string | null
          description: string
          id?: string
          name: string
          order: number
          parking?: number | null
          price: number
          private_area: number
          project_id: string
          rooms: number
          units: number
          updated_at?: string | null
        }
        Update: {
          area?: number
          bathrooms?: number
          blueprints?: string[]
          delivery_date?: string | null
          description?: string
          id?: string
          name?: string
          order?: number
          parking?: number | null
          price?: number
          private_area?: number
          project_id?: string
          rooms?: number
          units?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "draft_typologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "draft_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      error_logs: {
        Row: {
          additional_details: Json | null
          created_at: string
          id: string
          message: string
          origin: string
          stack: string | null
        }
        Insert: {
          additional_details?: Json | null
          created_at?: string
          id?: string
          message: string
          origin: string
          stack?: string | null
        }
        Update: {
          additional_details?: Json | null
          created_at?: string
          id?: string
          message?: string
          origin?: string
          stack?: string | null
        }
        Relationships: []
      }
      housing_types: {
        Row: {
          icon: string
          id: number
          label: Database["public"]["Enums"]["HOUSING_TYPES"]
        }
        Insert: {
          icon: string
          id?: number
          label: Database["public"]["Enums"]["HOUSING_TYPES"]
        }
        Update: {
          icon?: string
          id?: number
          label?: Database["public"]["Enums"]["HOUSING_TYPES"]
        }
        Relationships: []
      }
      image_embeddings: {
        Row: {
          created_at: string
          embedding: string | null
          id: number
          image_category: string
          image_filename: string
          project_id: string
          typology_id: string | null
        }
        Insert: {
          created_at?: string
          embedding?: string | null
          id?: number
          image_category: string
          image_filename: string
          project_id: string
          typology_id?: string | null
        }
        Update: {
          created_at?: string
          embedding?: string | null
          id?: number
          image_category?: string
          image_filename?: string
          project_id?: string
          typology_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_project"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_typology"
            columns: ["typology_id"]
            isOneToOne: false
            referencedRelation: "typologies"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          id: string
          nickname: string | null
          phone: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          nickname?: string | null
          phone: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          nickname?: string | null
          phone?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      profile_favorite_projects: {
        Row: {
          profile_id: string
          project_id: string
        }
        Insert: {
          profile_id: string
          project_id: string
        }
        Update: {
          profile_id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_favorite_projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_favorite_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      project_characteristics: {
        Row: {
          characteristic_id: string
          id: string
          project_id: string
        }
        Insert: {
          characteristic_id: string
          id?: string
          project_id: string
        }
        Update: {
          characteristic_id?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_characteristics_characteristic_id_fkey"
            columns: ["characteristic_id"]
            isOneToOne: false
            referencedRelation: "characteristics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_characteristics_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_plans: {
        Row: {
          created_at: string
          days_term: number
          features: string[]
          id: string
          name: Database["public"]["Enums"]["PROJECT_PLAN"]
          price: number
        }
        Insert: {
          created_at?: string
          days_term?: number
          features: string[]
          id?: string
          name: Database["public"]["Enums"]["PROJECT_PLAN"]
          price: number
        }
        Update: {
          created_at?: string
          days_term?: number
          features?: string[]
          id?: string
          name?: Database["public"]["Enums"]["PROJECT_PLAN"]
          price?: number
        }
        Relationships: []
      }
      project_reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          project_id: string
          rating: number
          user_id: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          project_id: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          project_id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_reviews_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          address: string
          automatic_renewal: boolean
          city_id: number
          company_id: string
          created_at: string
          deadline: string | null
          department_id: number
          description: string
          editing: boolean
          expiration_date: string | null
          features: string[]
          housing_state: Database["public"]["Enums"]["HOUSING_STATE"]
          housing_type: Database["public"]["Enums"]["HOUSING_TYPES"]
          id: string
          latitude: number
          logo: string
          longitude: number
          name: string
          photos: string[]
          plan_id: string
          project_class: Database["public"]["Enums"]["PROJECT_CLASS"]
          show_valuation: boolean
          status: Database["public"]["Enums"]["PROJECT_STATUS"]
          stratum: number
          updated_at: string | null
          urbanism_files: string[]
          urbanism_photos: string[]
          valuation: number
          valuation_months: number
          videos: string[] | null
        }
        Insert: {
          address: string
          automatic_renewal?: boolean
          city_id: number
          company_id: string
          created_at?: string
          deadline?: string | null
          department_id: number
          description: string
          editing?: boolean
          expiration_date?: string | null
          features: string[]
          housing_state: Database["public"]["Enums"]["HOUSING_STATE"]
          housing_type: Database["public"]["Enums"]["HOUSING_TYPES"]
          id?: string
          latitude: number
          logo: string
          longitude: number
          name: string
          photos: string[]
          plan_id: string
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"]
          show_valuation?: boolean
          status?: Database["public"]["Enums"]["PROJECT_STATUS"]
          stratum: number
          updated_at?: string | null
          urbanism_files: string[]
          urbanism_photos: string[]
          valuation?: number
          valuation_months?: number
          videos?: string[] | null
        }
        Update: {
          address?: string
          automatic_renewal?: boolean
          city_id?: number
          company_id?: string
          created_at?: string
          deadline?: string | null
          department_id?: number
          description?: string
          editing?: boolean
          expiration_date?: string | null
          features?: string[]
          housing_state?: Database["public"]["Enums"]["HOUSING_STATE"]
          housing_type?: Database["public"]["Enums"]["HOUSING_TYPES"]
          id?: string
          latitude?: number
          logo?: string
          longitude?: number
          name?: string
          photos?: string[]
          plan_id?: string
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"]
          show_valuation?: boolean
          status?: Database["public"]["Enums"]["PROJECT_STATUS"]
          stratum?: number
          updated_at?: string | null
          urbanism_files?: string[]
          urbanism_photos?: string[]
          valuation?: number
          valuation_months?: number
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "project_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      typologies: {
        Row: {
          area: number
          bathrooms: number
          blueprints: string[]
          delivery_date: string | null
          description: string
          id: string
          name: string
          order: number
          parking: number | null
          price: number
          private_area: number
          project_id: string
          rooms: number
          units: number
          updated_at: string | null
        }
        Insert: {
          area: number
          bathrooms: number
          blueprints: string[]
          delivery_date?: string | null
          description: string
          id?: string
          name: string
          order: number
          parking?: number | null
          price: number
          private_area: number
          project_id: string
          rooms: number
          units: number
          updated_at?: string | null
        }
        Update: {
          area?: number
          bathrooms?: number
          blueprints?: string[]
          delivery_date?: string | null
          description?: string
          id?: string
          name?: string
          order?: number
          parking?: number | null
          price?: number
          private_area?: number
          project_id?: string
          rooms?: number
          units?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "typologies_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_admins: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_admins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_clients: {
        Row: {
          created_at: string
          id: string
          phone: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          phone?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_clients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_companies: {
        Row: {
          company_id: string
          id: string
          user_id: string
        }
        Insert: {
          company_id: string
          id?: string
          user_id: string
        }
        Update: {
          company_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          company_id: string
          created_at: string
          email: string
          id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_confirmed: boolean
          name: string
          recovery_password_code: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_confirmed?: boolean
          name: string
          recovery_password_code?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_confirmed?: boolean
          name?: string
          recovery_password_code?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_draft_project: {
        Args: { draft_project_id: string }
        Returns: undefined
      }
      approve_project_update: {
        Args: { draft_project_id: string }
        Returns: undefined
      }
      cancel_project_edition: {
        Args: { draft_project_id: string; project_id: string }
        Returns: undefined
      }
      init_project_edition: {
        Args: {
          new_description: string
          new_logo_path: string
          new_name: string
          new_step: number
          new_stratum: number
          project_id: string
        }
        Returns: string
      }
      is_user_admin: { Args: { user_id: string }; Returns: boolean }
      match_properties_by_image: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          matched_image_category: string
          matched_image_filename: string
          matched_project_id: string
          matched_typology_id: string
          similarity: number
        }[]
      }
    }
    Enums: {
      CHATBOT_SENDER: "USER" | "BOT"
      HOUSING_STATE: "NEW" | "OFF_PLAN" | "USED"
      HOUSING_TYPES: "APARTAMENTO" | "CASA" | "BODEGA" | "LOTE"
      PROJECT_CLASS: "PROJECT" | "DRAFT"
      PROJECT_PLAN: "LITE" | "PLUS" | "ENTERPRISE"
      PROJECT_STATUS:
        | "DRAFT"
        | "PENDING"
        | "PUBLISHED"
        | "REJECTED"
        | "SUSPENDED"
      SUBSCRIPTION_STATUS:
        | "NOT_ACQUIRED"
        | "PAID"
        | "PAYMENT_PENDING"
        | "PAYMENT_REJECTED"
        | "PAYMENT_EXPIRED"
        | "MEMBERSHIP_CANCELLED"
      USER_ROLE: "ADMIN" | "COMPANY" | "INVESTOR" | "LEAD"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      CHATBOT_SENDER: ["USER", "BOT"],
      HOUSING_STATE: ["NEW", "OFF_PLAN", "USED"],
      HOUSING_TYPES: ["APARTAMENTO", "CASA", "BODEGA", "LOTE"],
      PROJECT_CLASS: ["PROJECT", "DRAFT"],
      PROJECT_PLAN: ["LITE", "PLUS", "ENTERPRISE"],
      PROJECT_STATUS: [
        "DRAFT",
        "PENDING",
        "PUBLISHED",
        "REJECTED",
        "SUSPENDED",
      ],
      SUBSCRIPTION_STATUS: [
        "NOT_ACQUIRED",
        "PAID",
        "PAYMENT_PENDING",
        "PAYMENT_REJECTED",
        "PAYMENT_EXPIRED",
        "MEMBERSHIP_CANCELLED",
      ],
      USER_ROLE: ["ADMIN", "COMPANY", "INVESTOR", "LEAD"],
    },
  },
} as const
