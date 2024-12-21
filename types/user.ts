import { NamedEntity } from "./common";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface BaseUser {
  id: number;
  email: string;
  createdAt: string;
  mfaEnabled: boolean;
}

export interface UserRegisterCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
}

export interface User extends UserRegisterCredentials {
  isFirstLogin: boolean;
  role: "user" | "admin";
  createdOrganizations: number[] | null;
  bio: string | null;
  region?: NamedEntity;
  skils?: NamedEntity[];
  profilePicture: string | null;
  updatedAt: string;
}
