import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { EmpleadoDTO } from '../Models/empleado';
import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpleadosPorEmpresa(idEmpresa: number): Observable<EmpleadoDTO[]> {
    return this.http.get<EmpleadoDTO[]>(API_URL + "empleados/por-empresa?empresaId="+idEmpresa);
  }

  getEmpleado(idEmpleado: number): Observable<EmpleadoDTO>{
    return this.http.get<EmpleadoDTO>(API_URL + "empleados/empleado?empleadoId="+idEmpleado);
  }

  public crearEmpleado(empleado: EmpleadoDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empleados/create', empleado);
  }

  public editarEmpleado(empleado: EmpleadoDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empleados/editar', empleado);
  }

  public eliminarEmpleado(idEmpleado: number): Observable<any> {
    console.log("kakafuti: " + idEmpleado)
    return this.http.delete<any>(
      API_URL + 'empleados/delete?id='+idEmpleado,
      {}
    );
  }
  
}
