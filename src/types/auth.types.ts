export interface UserProfile {
  id?: string;
  phone?: string;
  location?: string;
  bio?: string;
  headline?: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  skills?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  emailVerified?: boolean;
  createdAt?: string;
  profileImage?: string;
  profile?: UserProfile;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}
