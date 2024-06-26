import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtDto } from 'src/app/Models/JwDto';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { User } from './user';

const TOKEN_KEY = 'AuthToken';
const BACK_URL = environment.APIHost;

@Injectable({
  providedIn: 'root'
})
export class LoginService {  

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserRole: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserId: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn.next(sessionStorage.getItem("token") !== null);
    this.currentUserData.next(sessionStorage.getItem("token") || "");
    this.currentUserRole.next(sessionStorage.getItem("role") || "");
    this.currentUserId.next(sessionStorage.getItem("userId") || "");
  }

  updateUserLoginOn(value: boolean): void {
    this.currentUserLoginOn.next(value);
  }

  login(credentials: LoginRequest): Observable<User>{
    return this.http.post<User>(BACK_URL + 'auth/login', credentials).pipe(
      tap((userData: User) => {
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("role", userData.role);
        sessionStorage.setItem("userId", userData.id.toString());
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData.token);
        this.currentUserRole.next(userData.role);
        this.currentUserId.next(userData.id.toString());

      }),
      catchError(this.handleError)
    );
  }

  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
    this.currentUserLoginOn.next(false);
    this.currentUserRole.next("");
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else if(error.status===401){
      return throwError(()=> new Error(error.error));
    }
    else{
      console.error('Bakend devolvió el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor vuélvalo a intentar más tarde'));
  }

  get userRole(): Observable<String>{
    return this.currentUserRole.asObservable();
  }

  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userToken(): String{
    return this.currentUserData.value;
  }
}
