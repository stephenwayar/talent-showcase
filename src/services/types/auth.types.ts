export interface LoginPayload {
  email: string;
  password: string
}

export interface RegistrationPayload {
  email: string;
  fullName: string;
  location: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  location: string;
  bio: string | null;
  accessToken: string;
  profilePhoto: string | null
}