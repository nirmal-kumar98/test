import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

// Router
import { Router } from '@angular/router';

// Environment
import { environment } from '../../environments/environment.prod';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private otpVerification = new Subject<any>();
  private registerVerification = new Subject<any>();
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStateListener = new Subject<boolean>();
  private userId: string;
  private role: string;
  private user = new Subject<any>();
  private currentUser = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: NbToastrService
  ) { }

  getToken(): string {
    // console.log(this.token);
    return this.token;
  }

  // getToken() {
  //   return this.token;
  // }

  // tslint:disable-next-line: typedef
  getAuthStateListener() {
    return this.authStateListener.asObservable();
  }


  getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  // tslint:disable-next-line: typedef
  getUserId() {
    return this.userId;
  }
// tslint:disable-next-line: typedef
  getUser() {
    return this.user.asObservable();
  }

  register(data: any): void {
    this.http.post<{ message: string, result: any, verification: boolean}>
    (`${environment.backendURL}/api/users`, data).subscribe((response) => {
      // console.log(response);
      this.registerVerification.next(response.verification);
    });
  }

  getRegisterVerification(): any {
    return this.registerVerification.asObservable();
  }


  confirmOTP(otpValue: string): void {
    this.http.post<{ message: string, verification: boolean}>
    (`${environment.backendURL}/api/users/otp`, {otp: otpValue}).subscribe((response) => {
      // console.log(response);
      this.otpVerification.next(response.verification);
    });
  }

  getOTPVerification(): any {
    return this.otpVerification.asObservable();
  }

  login(data): void {
    this.http.post<{ token: string, expiresIn: number, userId: string}>(`${environment.backendURL}/api/users/login`, data)
    .subscribe((response) => {
      // console.log(response);
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        // console.log(this.isAuthenticated);
        this.userId = response.userId;
        // this.role = response.role;
        this.authStateListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000 );
        // console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
        // this.getUserProfile();
        // this.openSnackBar('Login Successfull');
        this.router.navigate(['/']);
        this.showMessage('success', 'Login Successfully');
      }
    },
    err => {
      // console.log(err);
      // console.log(err.error.message);
      this.showMessage('warning', 'Please Check your Email Id and Password');
    }
    );
  }

  // tslint:disable-next-line: typedef
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log(authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      // console.log(this.isAuthenticated);
      this.userId = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStateListener.next(true);
      // this.getUserProfile();
    }
  }


  // tslint:disable-next-line: typedef
  logout() {

      this.token = null;
      this.isAuthenticated = false;
      this.authStateListener.next(false);
      clearTimeout(this.tokenTimer);
      this.clearAuthData();
      this.userId = null;
      this.user.next(null);
      this.router.navigate(['/login']);
      this.showMessage('success', 'Logout Successfully');
  }

  // tslint:disable-next-line: typedef
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // tslint:disable-next-line: typedef
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  // tslint:disable-next-line: typedef
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  // tslint:disable-next-line: typedef
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const user = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line: object-literal-shorthand
      user: user
    };
  }

  forgotPassword(data): void {
    this.http.post(`${environment.backendURL}/api/users/resetPassword`, data).subscribe((response) => {
      // console.log(response);
      this.showMessage('success', 'Please Check your Mail box !');
    });
  }

  changePassword(data): void {
    this.http.post(`${environment.backendURL}/api/users/changePassword`, data).subscribe((response) => {
      // console.log(response);
      this.showMessage('success', 'Password Updated Successfully');
      this.router.navigate(['/login']);
    });
  }

  showMessage(status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, message, { status });
  }
}
