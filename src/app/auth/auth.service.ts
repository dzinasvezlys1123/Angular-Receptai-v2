import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean; // for login so we made it opsenal
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null); // we will use it on the login and singup to set the data
  private tokenExpirationTimer:any

  constructor(private http: HttpClient) {}

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  singUp(email: string, pass: string) {
    // start of singup
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.APIKey,
        {
          email: email,
          password: pass,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandlling),
        //tap to pass a function to deal with the responce we create a new user instance and dass it to the subject to deal with it
        tap((responcedata) => {
          const expirationDate = new Date(
            new Date().getTime() + +responcedata.expiresIn * 1000
          );
          const user = new User(
            responcedata.email,
            responcedata.localId,
            responcedata.idToken,
            expirationDate
          );
          this.user.next(user);
        })
      );
  } //end of singup

  login(email: string, password: string) {
    //start of log in
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.APIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandlling),
        tap((responcedata) => {
          const expirationDate = new Date(
            new Date().getTime() + +responcedata.expiresIn * 1000
          );
          const user = new User(
            responcedata.email,
            responcedata.localId,
            responcedata.idToken,
            expirationDate
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user)); //to save the user on the local storage as string
        })
      );
  } // end of login

  errorHandlling(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unkunown Error check internet connection';
    if (!errorRes.error || !errorRes.error.error) {
      // if there is no responce with the error from the backend
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      //thous errors came from the server responce
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          ' There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
    }
    return throwError(() => new Error(errorMessage));
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
  }

  autoLogout(expirationDate:number){
    this.tokenExpirationTimer=setTimeout(()=>{
      this.logout()
    },expirationDate)
  }
}
