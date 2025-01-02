export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      advisors: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          advisor_id: string;
          created_at: string;
          date: string;
          id: string;
          lead_id: string;
          link: string;
        };
        Insert: {
          advisor_id?: string;
          created_at?: string;
          date: string;
          id?: string;
          lead_id: string;
          link: string;
        };
        Update: {
          advisor_id?: string;
          created_at?: string;
          date?: string;
          id?: string;
          lead_id?: string;
          link?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_advisor_id_fkey";
            columns: ["advisor_id"];
            isOneToOne: false;
            referencedRelation: "advisors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
        ];
      };
      characteristics: {
        Row: {
          icon: string;
          id: string;
          label: string;
          order: number;
        };
        Insert: {
          icon: string;
          id?: string;
          label: string;
          order: number;
        };
        Update: {
          icon?: string;
          id?: string;
          label?: string;
          order?: number;
        };
        Relationships: [];
      };
      chatbot_messages: {
        Row: {
          created_at: string;
          from: Database["public"]["Enums"]["CHATBOT_SENDER"];
          id: string;
          message: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          from: Database["public"]["Enums"]["CHATBOT_SENDER"];
          id?: string;
          message: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          from?: Database["public"]["Enums"]["CHATBOT_SENDER"];
          id?: string;
          message?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chatbot_messages_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      cities: {
        Row: {
          department_id: number;
          id: number;
          name: string;
        };
        Insert: {
          department_id: number;
          id?: number;
          name: string;
        };
        Update: {
          department_id?: number;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cities_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
        ];
      };
      companies: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          logo_url: string;
          name: string;
          subscription_status: Database["public"]["Enums"]["SUBSCRIPTION_STATUS"];
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          logo_url: string;
          name: string;
          subscription_status?: Database["public"]["Enums"]["SUBSCRIPTION_STATUS"];
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          logo_url?: string;
          name?: string;
          subscription_status?: Database["public"]["Enums"]["SUBSCRIPTION_STATUS"];
        };
        Relationships: [];
      };
      departments: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      draft_project_characteristics: {
        Row: {
          characteristic_id: string;
          draft_project_id: string;
          id: string;
        };
        Insert: {
          characteristic_id: string;
          draft_project_id: string;
          id?: string;
        };
        Update: {
          characteristic_id?: string;
          draft_project_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "draft_project_characteristics_characteristic_id_fkey";
            columns: ["characteristic_id"];
            isOneToOne: false;
            referencedRelation: "characteristics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "draft_project_characteristics_draft_project_id_fkey";
            columns: ["draft_project_id"];
            isOneToOne: false;
            referencedRelation: "draft_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      draft_projects: {
        Row: {
          address: string | null;
          city_id: number | null;
          company_id: string;
          created_at: string;
          deadline: string | null;
          department_id: number | null;
          description: string | null;
          features: string[];
          housing_state: Database["public"]["Enums"]["HOUSING_STATE"] | null;
          housing_type: Database["public"]["Enums"]["HOUSING_TYPES"] | null;
          id: string;
          latitude: number | null;
          logo: string | null;
          longitude: number | null;
          name: string | null;
          photos: string[];
          plan_id: string | null;
          project_class: Database["public"]["Enums"]["PROJECT_CLASS"];
          project_id: string | null;
          rejected_message: string | null;
          status: Database["public"]["Enums"]["PROJECT_STATUS"];
          step: number;
          stratum: number | null;
          updated_at: string | null;
          urbanism_files: string[];
          urbanism_photos: string[];
          videos: string[] | null;
        };
        Insert: {
          address?: string | null;
          city_id?: number | null;
          company_id: string;
          created_at?: string;
          deadline?: string | null;
          department_id?: number | null;
          description?: string | null;
          features?: string[];
          housing_state?: Database["public"]["Enums"]["HOUSING_STATE"] | null;
          housing_type?: Database["public"]["Enums"]["HOUSING_TYPES"] | null;
          id?: string;
          latitude?: number | null;
          logo?: string | null;
          longitude?: number | null;
          name?: string | null;
          photos?: string[];
          plan_id?: string | null;
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"];
          project_id?: string | null;
          rejected_message?: string | null;
          status: Database["public"]["Enums"]["PROJECT_STATUS"];
          step: number;
          stratum?: number | null;
          updated_at?: string | null;
          urbanism_files?: string[];
          urbanism_photos?: string[];
          videos?: string[] | null;
        };
        Update: {
          address?: string | null;
          city_id?: number | null;
          company_id?: string;
          created_at?: string;
          deadline?: string | null;
          department_id?: number | null;
          description?: string | null;
          features?: string[];
          housing_state?: Database["public"]["Enums"]["HOUSING_STATE"] | null;
          housing_type?: Database["public"]["Enums"]["HOUSING_TYPES"] | null;
          id?: string;
          latitude?: number | null;
          logo?: string | null;
          longitude?: number | null;
          name?: string | null;
          photos?: string[];
          plan_id?: string | null;
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"];
          project_id?: string | null;
          rejected_message?: string | null;
          status?: Database["public"]["Enums"]["PROJECT_STATUS"];
          step?: number;
          stratum?: number | null;
          updated_at?: string | null;
          urbanism_files?: string[];
          urbanism_photos?: string[];
          videos?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "draft_projects_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "draft_projects_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "draft_projects_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "draft_projects_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "project_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "draft_projects_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      draft_typologies: {
        Row: {
          area: number;
          bathrooms: number;
          blueprints: string[];
          delivery_date: string | null;
          description: string;
          id: string;
          name: string;
          order: number;
          parking: number | null;
          price: number;
          private_area: number;
          project_id: string;
          rooms: number;
          units: number;
          updated_at: string | null;
        };
        Insert: {
          area: number;
          bathrooms: number;
          blueprints: string[];
          delivery_date?: string | null;
          description: string;
          id?: string;
          name: string;
          order: number;
          parking?: number | null;
          price: number;
          private_area: number;
          project_id: string;
          rooms: number;
          units: number;
          updated_at?: string | null;
        };
        Update: {
          area?: number;
          bathrooms?: number;
          blueprints?: string[];
          delivery_date?: string | null;
          description?: string;
          id?: string;
          name?: string;
          order?: number;
          parking?: number | null;
          price?: number;
          private_area?: number;
          project_id?: string;
          rooms?: number;
          units?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "draft_typologies_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "draft_projects";
            referencedColumns: ["id"];
          },
        ];
      };
      housing_types: {
        Row: {
          icon: string;
          id: number;
          label: Database["public"]["Enums"]["HOUSING_TYPES"];
        };
        Insert: {
          icon: string;
          id?: number;
          label: Database["public"]["Enums"]["HOUSING_TYPES"];
        };
        Update: {
          icon?: string;
          id?: number;
          label?: Database["public"]["Enums"]["HOUSING_TYPES"];
        };
        Relationships: [];
      };
      leads: {
        Row: {
          created_at: string;
          id: string;
          nickname: string | null;
          phone: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          nickname?: string | null;
          phone: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          nickname?: string | null;
          phone?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      project_characteristics: {
        Row: {
          characteristic_id: string;
          id: string;
          project_id: string;
        };
        Insert: {
          characteristic_id: string;
          id?: string;
          project_id: string;
        };
        Update: {
          characteristic_id?: string;
          id?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_characteristics_characteristic_id_fkey";
            columns: ["characteristic_id"];
            isOneToOne: false;
            referencedRelation: "characteristics";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_characteristics_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_plans: {
        Row: {
          created_at: string;
          days_term: number;
          features: string[];
          id: string;
          name: Database["public"]["Enums"]["PROJECT_PLAN"];
          price: number;
        };
        Insert: {
          created_at?: string;
          days_term?: number;
          features: string[];
          id?: string;
          name: Database["public"]["Enums"]["PROJECT_PLAN"];
          price: number;
        };
        Update: {
          created_at?: string;
          days_term?: number;
          features?: string[];
          id?: string;
          name?: Database["public"]["Enums"]["PROJECT_PLAN"];
          price?: number;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          address: string;
          automatic_renewal: boolean;
          city_id: number;
          company_id: string;
          created_at: string;
          deadline: string | null;
          department_id: number;
          description: string;
          editing: boolean;
          expiration_date: string | null;
          features: string[];
          housing_state: Database["public"]["Enums"]["HOUSING_STATE"];
          housing_type: Database["public"]["Enums"]["HOUSING_TYPES"];
          id: string;
          latitude: number;
          logo: string;
          longitude: number;
          name: string;
          photos: string[];
          plan_id: string;
          project_class: Database["public"]["Enums"]["PROJECT_CLASS"];
          status: Database["public"]["Enums"]["PROJECT_STATUS"];
          stratum: number;
          updated_at: string | null;
          urbanism_files: string[];
          urbanism_photos: string[];
          videos: string[] | null;
        };
        Insert: {
          address: string;
          automatic_renewal?: boolean;
          city_id: number;
          company_id: string;
          created_at?: string;
          deadline?: string | null;
          department_id: number;
          description: string;
          editing?: boolean;
          expiration_date?: string | null;
          features: string[];
          housing_state: Database["public"]["Enums"]["HOUSING_STATE"];
          housing_type: Database["public"]["Enums"]["HOUSING_TYPES"];
          id?: string;
          latitude: number;
          logo: string;
          longitude: number;
          name: string;
          photos: string[];
          plan_id: string;
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"];
          status?: Database["public"]["Enums"]["PROJECT_STATUS"];
          stratum: number;
          updated_at?: string | null;
          urbanism_files: string[];
          urbanism_photos: string[];
          videos?: string[] | null;
        };
        Update: {
          address?: string;
          automatic_renewal?: boolean;
          city_id?: number;
          company_id?: string;
          created_at?: string;
          deadline?: string | null;
          department_id?: number;
          description?: string;
          editing?: boolean;
          expiration_date?: string | null;
          features?: string[];
          housing_state?: Database["public"]["Enums"]["HOUSING_STATE"];
          housing_type?: Database["public"]["Enums"]["HOUSING_TYPES"];
          id?: string;
          latitude?: number;
          logo?: string;
          longitude?: number;
          name?: string;
          photos?: string[];
          plan_id?: string;
          project_class?: Database["public"]["Enums"]["PROJECT_CLASS"];
          status?: Database["public"]["Enums"]["PROJECT_STATUS"];
          stratum?: number;
          updated_at?: string | null;
          urbanism_files?: string[];
          urbanism_photos?: string[];
          videos?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_city_id_fkey";
            columns: ["city_id"];
            isOneToOne: false;
            referencedRelation: "cities";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_department_id_fkey";
            columns: ["department_id"];
            isOneToOne: false;
            referencedRelation: "departments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "projects_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "project_plans";
            referencedColumns: ["id"];
          },
        ];
      };
      typologies: {
        Row: {
          area: number;
          bathrooms: number;
          blueprints: string[];
          delivery_date: string | null;
          description: string;
          id: string;
          name: string;
          order: number;
          parking: number | null;
          price: number;
          private_area: number;
          project_id: string;
          rooms: number;
          units: number;
          updated_at: string | null;
        };
        Insert: {
          area: number;
          bathrooms: number;
          blueprints: string[];
          delivery_date?: string | null;
          description: string;
          id?: string;
          name: string;
          order: number;
          parking?: number | null;
          price: number;
          private_area: number;
          project_id: string;
          rooms: number;
          units: number;
          updated_at?: string | null;
        };
        Update: {
          area?: number;
          bathrooms?: number;
          blueprints?: string[];
          delivery_date?: string | null;
          description?: string;
          id?: string;
          name?: string;
          order?: number;
          parking?: number | null;
          price?: number;
          private_area?: number;
          project_id?: string;
          rooms?: number;
          units?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "typologies_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      user_companies: {
        Row: {
          company_id: string;
          id: string;
          user_id: string;
        };
        Insert: {
          company_id: string;
          id?: string;
          user_id: string;
        };
        Update: {
          company_id?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_companies_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_invitations: {
        Row: {
          company_id: string;
          created_at: string;
          email: string;
          id: string;
        };
        Insert: {
          company_id: string;
          created_at?: string;
          email: string;
          id?: string;
        };
        Update: {
          company_id?: string;
          created_at?: string;
          email?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_invitations_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          is_confirmed: boolean;
          name: string;
          role: Database["public"]["Enums"]["USER_ROLE"];
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          is_confirmed?: boolean;
          name: string;
          role: Database["public"]["Enums"]["USER_ROLE"];
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          is_confirmed?: boolean;
          name?: string;
          role?: Database["public"]["Enums"]["USER_ROLE"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      approve_draft_project: {
        Args: {
          draft_project_id: string;
        };
        Returns: undefined;
      };
      approve_project_update: {
        Args: {
          draft_project_id: string;
        };
        Returns: undefined;
      };
      cancel_project_edition: {
        Args: {
          project_id: string;
          draft_project_id: string;
        };
        Returns: undefined;
      };
      init_project_edition: {
        Args: {
          project_id: string;
          new_name: string;
          new_description: string;
          new_stratum: number;
          new_logo_path: string;
          new_step: number;
        };
        Returns: string;
      };
      is_user_admin: {
        Args: {
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      CHATBOT_SENDER: "USER" | "BOT";
      HOUSING_STATE: "NEW" | "OFF_PLAN" | "USED";
      HOUSING_TYPES: "APARTAMENTO" | "CASA" | "BODEGA" | "LOTE";
      PROJECT_CLASS: "PROJECT" | "DRAFT";
      PROJECT_PLAN: "LITE" | "PLUS" | "ENTERPRISE";
      PROJECT_STATUS:
        | "DRAFT"
        | "PENDING"
        | "PUBLISHED"
        | "REJECTED"
        | "SUSPENDED";
      SUBSCRIPTION_STATUS:
        | "NOT_ACQUIRED"
        | "PAID"
        | "PAYMENT_PENDING"
        | "PAYMENT_REJECTED"
        | "PAYMENT_EXPIRED"
        | "MEMBERSHIP_CANCELLED";
      USER_ROLE: "ADMIN" | "COMPANY" | "INVESTOR" | "LEAD";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
