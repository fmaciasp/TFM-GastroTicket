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
    private loginService: LoginService,
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

  eliminarEmpresa(idEmpresa: number): void{
    if(idEmpresa > -1){
      this.administracionService.getEmpresa(idEmpresa).subscribe({
        next: (empresa) => {
          let result = confirm(
            "Vas a eliminar la empresa "+empresa.nombre.toUpperCase()+", ¿deseas confirmar?"
          );
          if(result){
            this.administracionService.eliminarEmpresa(idEmpresa).subscribe({
              next: (res) => {
                console.log("Se ha eliminado la empresa correctamente");
                this.empresas = this.empresas.filter(e => e.id !== idEmpresa);
              },
              error: (error) => {
                console.error("No se ha podido eliminar la empresa", error)
              }
            })
          }
        },
        error: (error) => {
          console.error("No se ha podido recuperar la empresa", error)
        }
      })
    }
  }
  

}
