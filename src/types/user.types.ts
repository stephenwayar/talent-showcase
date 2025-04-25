export interface IUser {
  email: string;
  fullName: string;
  location: string;
  bio: string | null;
  accessToken: string;
  profilePhoto: string | null
}