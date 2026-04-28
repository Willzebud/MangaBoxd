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
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
  };
}
