export interface UserRegister {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthModel {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  role?: string;
}

export interface LoginResponse {
  userId: number;
  emailId: string;
  accessToken: string;
  refreshToken: string;
}
