import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CuponCargaDTO } from '../Models/cuponCarga';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CuponDTO } from '../Models/cupon';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient
  ){}

  public cargarCupon(cuponCarga: CuponCargaDTO){
    return this.http.post<any>(API_URL + 'cupones/cargar-cupon', cuponCarga).pipe(
      map(response => response.mensaje)
    );
  }

  public getImporteCupon(empleadoId: number){
    return this.http.get<CuponDTO>(API_URL + 'cupones/get-cupon?empleadoId='+empleadoId);
  }
  
}
