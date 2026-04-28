import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse, UserLogin, UserRegister } from '../models/auth-user-models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly authApiUrl = 'http://localhost:3000/api/v1/auth';
  
  private http = inject(HttpClient);

  private readonly TOKEN_KEY = 'accessToken';
  private readonly USER_NAME = 'userName'

  public setUserName(name: string): void {
    localStorage.setItem(this.USER_NAME, name);
  }

  public getUserName(): string | null {
   return localStorage.getItem(this.USER_NAME);
  }

  public removeUserName(): void {
    localStorage.removeItem(this.USER_NAME);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  registerUser(user: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(`${this.authApiUrl}/register`, user);
  }

  loginUser(user: UserLogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authApiUrl}/login`, user).pipe(
      tap((res) => {
        this.setToken(res.accessToken);
        this.setUserName(res.user.firstname);
      }),
    );
  }
}
