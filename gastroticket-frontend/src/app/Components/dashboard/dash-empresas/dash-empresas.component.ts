import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { EmpleadoDTO } from 'src/app/Models/empleado';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { Role } from 'src/app/Services/auth/registro';
import { EmpresaService } from 'src/app/Services/empresa.service';

@Component({
  selector: 'app-dash-empresas',
  templateUrl: './dash-empresas.component.html',
  styleUrls: ['./dash-empresas.component.css']
})
export class DashEmpresasComponent implements OnInit {

  userLoginOn:boolean=false;
  userRole: String = "";
  userId:number = -1;
  empleadoExito: string = "";
  empleadoError: string = "";
  empleado!: EmpresaDTO;
  empleados!: EmpleadoDTO[];
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'acciones'];

  constructor(private formBuilder: FormBuilder,
    private administracionService: AdministracionService,
    private empresasService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService) { }

    ngOnInit(): void {
      this.loginService.currentUserId.pipe(
        filter(userId => !!userId), // Filtra solo si el ID del usuario está definido
        tap((userId) => {
          this.userId = parseInt(userId || "-1"); // Almacena el ID del usuario como número
          this.userLoginOn = true; // Establece userLoginOn a true cuando se cumplan las condiciones
        }),
        switchMap(() => this.administracionService.getEmpresaPorUserId(this.userId)), // Obtiene la empresa del usuario
        switchMap((empresa) => this.empresasService.getEmpleadosPorEmpresa(empresa.id)) // Obtiene los empleados de la empresa
      ).subscribe({
        next: (empleados) => {
          this.empleados = empleados;
          console.log("empleados: ", empleados);
        },
        error: (error) => {
          console.error("Error:", error)
          this.userLoginOn = false;
          this.router.navigateByUrl("/login");
        }
      });
    }
    

    eliminarEmpleado(idEmpleado: number): void{
      if(idEmpleado > -1){
        this.empresasService.getEmpleado(idEmpleado).subscribe({
          next: (empleado) => {
            let result = confirm(
              "Vas a eliminar al empleado "+empleado.nombre.toUpperCase()+" "+empleado.apellidos.toUpperCase()+",  ¿deseas confirmar?"
            );
            if(result){
              this.empresasService.eliminarEmpleado(idEmpleado).subscribe({
                next: (res) => {
                  console.log("Se ha eliminado al empleado correctamente");
                  this.empleadoExito = "Se ha eliminado al empleado correctamente";
                  this.empleados = this.empleados.filter(e => e.id !== idEmpleado);
                },
                error: (error) => {
                  console.error("No se ha podido eliminar al empleado", error)
                  this.empleadoError = error;
                }
              })
            }
          },
          error: (error) => {
            console.error("No se ha podido recuperar al empleado", error)
            this.empleadoError = error;
          }
        })
      }
    }
    
}
