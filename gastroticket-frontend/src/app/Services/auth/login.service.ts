import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { JwtDto } from 'src/app/Models/JwDto';
import { environment } from 'src/environments/environment.development';
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

  constructor(private http: HttpClient) {
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
   }

  login(credentials: LoginRequest): Observable<User>{
    return this.http.post<User>(BACK_URL + 'auth/login', credentials).pipe(
      tap((userData: User) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData.token);
      }),
      catchError(this.handleError)
    );
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
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

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userData(): Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userToken(): String{
    return this.currentUserData.value;
  }
}
