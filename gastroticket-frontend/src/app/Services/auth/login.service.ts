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
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, name:'', apellidos:'', email:''});

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<User>{
    console.log('credentials ', credentials)
    return this.http.post<User>(BACK_URL + 'auth/login', credentials).pipe(
      tap((userData: User) => {
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else{
      console.error('Bakend devolvió el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor vuélvalo a intentar más tarde'));
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
