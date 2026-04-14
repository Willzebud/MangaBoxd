export interface UserRegister {
  userId: number;
  emailId: string;
  fullName: string;
  password: string;
}

export interface UserLogin {
    emailId: string;
    password: string;
}

export interface LoginResponse {
    userId: number;
    emailId: string;
    token: string;
    refreshToken: string;
}
