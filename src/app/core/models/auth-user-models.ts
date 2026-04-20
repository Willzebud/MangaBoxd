export interface UserRegister {
  emailId: string;
  fullName?: string;
  password: string;
}

export interface UserLogin {
  emailId: string;
  password: string;
}

export interface AuthModel {
  emailId: string;
  fullName?: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  emailId: string;
  token: string;
  refreshToken: string;
}
