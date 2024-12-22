export interface BaseUser {
    id: number;
    email: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface User extends BaseUser {
    // Add any additional user properties here
    role?: string;
    avatar?: string;
    isActive?: boolean;
    preferences?: {
      theme?: 'light' | 'dark';
      notifications?: boolean;
      language?: string;
    };
  }