import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';

@Component({
  selector: 'app-empresa-listado',
  templateUrl: './empresa-listado.component.html',
  styleUrls: ['./empresa-listado.component.css']
})
export class EmpresaListadoComponent implements OnInit {

  userLoginOn:boolean=false;
  empresas!: EmpresaDTO[];

  constructor(
    private formBuilder: FormBuilder,
    private administracionService: AdministracionService,
    private router: Router,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
          this.administracionService.getEmpresas().subscribe({
            next: (empresas) => {
              this.empresas = empresas;
              console.log("empresas: ", this.empresas)
            },
            error: (error) => {
              console.error('ngOnInit empresa-listado.component error', error);
            }
          });
        }
      }
    })
  }

  editarEmpresa(idEmpresa: number): void{
    console.log('editarEmpresa empresa-listado.component editar empresa');
  }

  eliminarEmpresa(idEmpresa: number): void{
    console.log('eliminarEmpresa empresa-listado.component eliminar empresa');
  }

}
