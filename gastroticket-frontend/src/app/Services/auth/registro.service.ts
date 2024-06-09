import { Injectable } from '@angular/core';
import { RegistroRequest } from './registroRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registro } from './registro';
import { ActivateRequest } from './activateRequest';

const BACK_URL = environment.APIHost;

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(private http: HttpClient) { }

  registro(credentials: RegistroRequest): Observable<Registro>{
    return this.http.post<Registro>(BACK_URL + 'auth/register', credentials).pipe(
      map((response: Registro) => {
        if (response && response.token) {
          return { token: response.token, role: response.role, id: response.id, mensaje: 'Registro exitoso' };
        } 
        else {
          throw new Error('No se recibió token en la respuesta');
        }
      }),
      catchError(this.handleError)
    );
  }

  activate(activateRequest: ActivateRequest): Observable<any>{
    return this.http.post<any>(BACK_URL + 'auth/activate', activateRequest).pipe(
      catchError(this.handleError)
    );
    
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else if(error.status===404){
      console.error('Se ha producido un error ', error.error);
      return throwError(()=> new Error(error.error));
    }
    else{
      console.error('Bakend devolvió el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor vuélvalo a intentar más tarde'));
  }
}
