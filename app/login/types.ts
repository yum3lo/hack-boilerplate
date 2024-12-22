export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface LoginResponse {
    error: number,
    erorrMessage: string,
    data: User;
  }
  