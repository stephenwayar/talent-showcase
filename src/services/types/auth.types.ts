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