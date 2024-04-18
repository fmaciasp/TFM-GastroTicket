import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EmpresaDTO } from '../Models/empresa';

const API_URL = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<EmpresaDTO[]> {
    return this.http.get<EmpresaDTO[]>(API_URL + "empresas");
  }

  public crearEmpresa(empresa: EmpresaDTO): Observable<any> {
    return this.http.post<any>(API_URL + 'empresas/create∫', empresa);
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
}
