import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpleadoDTO } from '../Models/empleado';
import { HttpClient } from '@angular/common/http';
import { EmpleadoRequest } from '../Models/empleadoRequest';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpleadosPorEmpresa(request: EmpleadoRequest): Observable<any> {
    return this.http.post<any[]>(API_URL + 'empleados/por-empresa', request);
  }

  getEmpleado(request: EmpleadoRequest): Observable<any>{
    return this.http.post<any>(API_URL + "empleados/empleado", request);
  }

  public crearEmpleado(empleado: EmpleadoDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empleados/create', empleado);
  }

  public editarEmpleado(empleado: EmpleadoDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empleados/editar', empleado);
  }

  public eliminarEmpleado(idEmpleado: number): Observable<any> {
    return this.http.delete<any>(
      API_URL + 'empleados/delete?id='+idEmpleado,
      {}
    );
  }
  
}
