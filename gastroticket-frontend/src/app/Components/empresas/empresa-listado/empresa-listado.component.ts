import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { EmpresaService } from 'src/app/Services/empresa.service';

@Component({
  selector: 'app-empresa-listado',
  templateUrl: './empresa-listado.component.html',
  styleUrls: ['./empresa-listado.component.css']
})
export class EmpresaListadoComponent implements OnInit {

  empresas!: EmpresaDTO[];

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.empresaService.getEmpresas().subscribe({
      next: (empresas) => {
        this.empresas = empresas;
      },
      error: (error) => {
        console.error('kakafuti error', error);
      }
    });
  }

  editarEmpresa(idEmpresa: number): void{
    console.log('kakafuti editar empresa');
  }

  eliminarEmpresa(idEmpresa: number): void{
    console.log('kakafuti eliminar empresa');
  }

}
