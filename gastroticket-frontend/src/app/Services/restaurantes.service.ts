import { Injectable } from '@angular/core';
import { RestauranteDTO } from '../Models/restaurante';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private http: HttpClient) { }

  getRestaurantes(idRestaurante: number): Observable<RestauranteDTO[]> {
    return this.http.get<RestauranteDTO[]>(API_URL + "restaurantes");
  }

  public crearRestaurante(restaurante: RestauranteDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'restaurantes/create', restaurante);
  }

  public editarRestaurante(restaurante: RestauranteDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'restaurantes/editar', restaurante);
  }

  public eliminarRestaurante(idRestaurante: number): Observable<any> {
    return this.http.post<any>(
      API_URL + 'restaurantes/delete?restauranteId='+idRestaurante,
      {}
    );
  }}
