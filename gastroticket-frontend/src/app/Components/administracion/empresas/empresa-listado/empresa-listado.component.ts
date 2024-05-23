import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { catchError, filter, throwError } from 'rxjs';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { MensajesService } from 'src/app/Services/mensajes.service';

@Component({
  selector: 'app-empresa-listado',
  templateUrl: './empresa-listado.component.html',
  styleUrls: ['./empresa-listado.component.css']
})
export class EmpresaListadoComponent implements OnInit {

  userLoginOn:boolean=false;
  empresas!: EmpresaDTO[];
  displayedColumns: string[] = ['nombre', 'email', 'acciones'];
  empresaExito: any = null;
  empresaError: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private administracionService: AdministracionService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private mensajesService: MensajesService
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;

        if(this.userLoginOn){
            this.mensajesService.getSuccessMessage().pipe(filter(mensaje => mensaje !== null))
            .subscribe(mensaje => {
              this.empresaExito = mensaje;
              setTimeout(() => this.mensajesService.clearSuccessMessage(), 200);
            });
          this.administracionService.getEmpresas()
          .pipe(
            catchError(error => {
              if (error.status === 500) {
                this.logout();
              }
              throw error;
            })
          )
          .subscribe({
            next: (empresas) => {
              this.empresas = empresas;
              console.log("empresas: ", this.empresas)
            },
            error: (error) => {
              console.error('ngOnInit empresa-listado.component error', error);
              this.userLoginOn = false;
              if(error.status != 500)
                this.empresaError = error;
            }
          });
        }
      },
      error: (error) => {
        this.userLoginOn = false;
        this.empresaError = error;
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
                this.empresaExito = "Se ha eliminado la empresa correctamente";
                this.empresas = this.empresas.filter(e => e.id !== idEmpresa);
              },
              error: (error) => {
                console.error("No se ha podido eliminar la empresa", error)
                this.empresaError = error;
              }
            })
          }
        },
        error: (error) => {
          console.error("No se ha podido recuperar la empresa", error)
          this.empresaError = error;
        }
      })
    }
  }
  
  logout(){
    this.loginService.logout();
    this.mensajesService.sendErrorMessage("Ocurrió un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.")
    this.router.navigate(['/login'])
  }

}
