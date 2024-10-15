export interface UserTypes {
    id: number;
    name: string;
    email: string;
    email_verified_at?: Date | null;
    password: string;
    rememberToken?: string;
    current_team_id?: number | null;
    profile_photo_path?: string | null;
    created_at: Date;
    updated_at: Date;
    role_id: number;
  }
  