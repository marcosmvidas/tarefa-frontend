export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  