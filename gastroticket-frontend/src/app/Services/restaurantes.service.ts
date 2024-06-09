import { Injectable } from '@angular/core';
import { RestauranteDTO } from '../Models/restaurante';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuponCanjeadoDTO } from '../Models/cuponCanjeado';
import { CanjearCuponDTO } from '../Models/canjearCupon';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private http: HttpClient) { }

  getRestaurantes(idRestaurante: number): Observable<RestauranteDTO[]> {
    return this.http.get<RestauranteDTO[]>(API_URL + "restaurantes");
  }

  getRestaurantePorUsuario(userId: number): Observable<RestauranteDTO> {
    return this.http.get<RestauranteDTO>(API_URL + "restaurantes/restaurante-por-usuario?id="+userId);
  }

  getCuponesRestaurante(restauranteId: number): Observable<CuponCanjeadoDTO[]> {
    return this.http.get<CuponCanjeadoDTO[]>(API_URL + "cupones/get-cupones-canjeados-restaurante?restauranteId="+restauranteId);
  }

  canjearCupon(cupon: CanjearCuponDTO): Observable<any[]> {
    return this.http.post<CanjearCuponDTO[]>(API_URL + "cupones/canjear", cupon);
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
