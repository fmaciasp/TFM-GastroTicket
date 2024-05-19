import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CuponCargaDTO } from '../Models/cuponCarga';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CuponDTO } from '../Models/cupon';
import { EmpleadoDTO } from '../Models/empleado';
import { CuponCanjeadoDTO } from '../Models/cuponCanjeado';

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

  public getEmpleadoPorUserId(userId: number){
    return this.http.get<EmpleadoDTO>(API_URL + 'empleados/empleado-por-userId?userId='+userId);
  }

  public getCupon(empleadoId: number){
    return this.http.get<CuponDTO>(API_URL + 'cupones/get-cupon?empleadoId='+empleadoId);
  }

  public getCuponPorCodigo(codigo: string){
    return this.http.get<CuponDTO>(API_URL + 'cupones/get-cupon-codigo?codigo='+codigo);
  }

  public getCuponesCanjeados(empleadoId: number){
    return this.http.get<CuponCanjeadoDTO[]>(API_URL + 'cupones/get-cupones-canjeados-empleado?empleadoId='+empleadoId);
  }
  
}
