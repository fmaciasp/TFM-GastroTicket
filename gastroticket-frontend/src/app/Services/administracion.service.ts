import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EmpresaDTO } from '../Models/empresa';
import { environment } from 'src/environments/environment.development';
import { RestauranteDTO } from '../Models/restaurante';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<EmpresaDTO[]> {
    return this.http.get<EmpresaDTO[]>(API_URL + "empresas");
  }

  public getEmpresa(id:number): Observable<EmpresaDTO>{
    const param = new HttpParams().append('id', id.toString());
    return this.http.get<EmpresaDTO>(API_URL + "empresas/empresa",{params: param})
        .pipe(
            tap((empresa: EmpresaDTO) => console.log('Respuesta del servidor:', empresa))
        );
  }

  public crearEmpresa(empresa: EmpresaDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empresas/create', empresa);
  }

  public editarEmpresa(empresa: EmpresaDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empresas/editar', empresa);
  }

  public eliminarEmpresa(idEmpresa: number): Observable<any> {
    return this.http.post<any>(
      API_URL + 'empresa/delete?id='+idEmpresa,
      {}
    );
  }

  getRestaurantes(): Observable<RestauranteDTO[]> {
    return this.http.get<RestauranteDTO[]>(API_URL + "restaurantes");
  }
  
}
