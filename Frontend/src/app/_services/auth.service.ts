import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn$: Observable<boolean>;
  private baseUrl = environment.apiUrl + 'Account/';

  constructor(private http: HttpClient) {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const isLoggedIn = storedLoginStatus === 'true';
    this.isLoggedInSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  register(formData: any) {
    return this.http.post(this.baseUrl + 'register', formData);
  }

  login(formData: any) {
    return this.http.post(this.baseUrl + 'login', formData);
  }
  successLog() {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('isLoggedIn', 'true');
    const token = localStorage.getItem('token');
    if (token) {
    }
  }
  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('isLoggedIn');
  }
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  changePassword(formData: any) {
    return this.http.post(this.baseUrl + `ChangePassword`, formData);
  }

  forgetPassword(formData: any) {
    return this.http.post(this.baseUrl + `ForgetPassword`, formData);
  }

  resetPassword(data: any) {
    return this.http.post(this.baseUrl + `ResetPassword`, data);
  }
}
