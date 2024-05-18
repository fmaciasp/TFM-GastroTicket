import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { EmpresaDTO } from '../Models/empresa';
import { environment } from 'src/environments/environment.development';
import { RestauranteDTO } from '../Models/restaurante';
import { Router } from '@angular/router';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private http: HttpClient, private router: Router) { }

  getEmpresas(): Observable<EmpresaDTO[]> {
    return this.http.get<EmpresaDTO[]>(API_URL + "empresas").pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  public getEmpresa(id:number): Observable<EmpresaDTO>{
    const param = new HttpParams().append('id', id.toString());
    return this.http.get<EmpresaDTO>(API_URL + "empresas/empresa",{params: param})
        .pipe(
            tap((empresa: EmpresaDTO) => console.log('Respuesta del servidor:', empresa))
        );
  }

  public getEmpresaPorUserId(id:number): Observable<EmpresaDTO>{
    const param = new HttpParams().append('id', id.toString());
    return this.http.get<EmpresaDTO>(API_URL + "empresas/empresa-por-usuario",{params: param})
        .pipe(
            tap((empresa: EmpresaDTO) => console.log('Respuesta del servidor:', empresa))
        );
  }

  public crearEmpresa(empresa: EmpresaDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empresas/create', empresa).pipe(
      map(response => response.mensaje)
    );
  }

  editarEmpresa(empresa: EmpresaDTO): Observable<any>  {
    return this.http.post<any>(API_URL + 'empresas/editar', empresa).pipe(
      map(response => response.mensaje),
      catchError(error => {
        return of(error);
      })
    );
  }

  public eliminarEmpresa(idEmpresa: number): Observable<any> {
    return this.http.delete<any>(
      API_URL + 'empresas/delete?id='+idEmpresa,
      {}
    ).pipe(
      map(response => response.mensaje),
      catchError(error => {
        return of(error);
      })
    );
  }

  getRestaurantes(): Observable<RestauranteDTO[]> {
    return this.http.get<RestauranteDTO[]>(API_URL + "restaurantes");
  }

  getRestaurantesActivos(): Observable<RestauranteDTO[]> {
    return this.http.get<RestauranteDTO[]>(API_URL + "restaurantes/restaurantes-activos");
  }

  public getRestaurante(idRestaurante:number): Observable<RestauranteDTO>{
    const param = new HttpParams().append('id', idRestaurante.toString());
    return this.http.get<RestauranteDTO>(API_URL + "restaurantes/restaurante",{params: param})
        .pipe(
            tap((restaurante: RestauranteDTO) => console.log('Respuesta del servidor:', restaurante))
        );
  }

  public crearRestaurante(restaurante: RestauranteDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'restaurantes/create', restaurante).pipe(
      map(response => response.mensaje)
    );
  }

  editarRestaurante(restaurante: RestauranteDTO): Observable<any>  {
    return this.http.post<any>(API_URL + 'restaurantes/editar', restaurante).pipe(
      map(response => response.mensaje),
      catchError(error => {
        throw error;
      })
    );
  }

  public eliminarRestaurante(idRestaurante: number): Observable<any> {
    return this.http.delete<any>(
      API_URL + 'restaurantes/delete?restauranteId='+idRestaurante,
      {}
    ).pipe(
      map(response => response.mensaje),
      catchError(error => {
        throw error;
      })
    );
  }
  
}
