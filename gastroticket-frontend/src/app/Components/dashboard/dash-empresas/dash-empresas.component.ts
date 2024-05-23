import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { EmpresaDTO } from 'src/app/Models/empresa';
import { AdministracionService } from 'src/app/Services/administracion.service';
import { LoginService } from 'src/app/Services/auth/login.service';
import { EmpresaService } from 'src/app/Services/empresa.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { EmpleadoCuponDTO } from 'src/app/Models/empleadoCupon';
import { CuponCargaDTO } from 'src/app/Models/cuponCarga';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { EmpleadoRequest } from 'src/app/Models/empleadoRequest';
import { MensajesService } from 'src/app/Services/mensajes.service';

@Component({
  selector: 'app-dash-empresas',
  templateUrl: './dash-empresas.component.html',
  styleUrls: ['./dash-empresas.component.css']
})
export class DashEmpresasComponent implements OnInit {

  userLoginOn:boolean=false;
  userRole: String = "";
  userId:number = -1;
  empleadoExito: any = null;
  empleadoError: any = null;
  empleado!: EmpresaDTO;
  empleados!: EmpleadoCuponDTO[];
  importe!: number;
  cantidadCarga: number= 0;
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'acciones'];
  cuponCarga!: CuponCargaDTO;

  constructor(
    private administracionService: AdministracionService,
    private empresasService: EmpresaService,
    private router: Router,
    private loginService: LoginService,
    public dialog: MatDialog,
    private mensajesService: MensajesService
  ) {}

  openDialog(empleadoId: number, importeCupon: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {empleadoId: empleadoId, cantidadCarga: this.cantidadCarga, importeCupon: importeCupon},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "cargado") {
        this.empleadoExito = "El cupón se ha cargado correctamente";
        this.cargarEmpleados();
      } else if (result === "error") {
        this.empleadoError = "El cupón no se ha podido cargar. Inténtelo de nuevo más tarde"
      }
    });    
  }


  ngOnInit(): void {
    this.getMensajes()
    this.cargarEmpleados();
  }

  getMensajes(){
    this.mensajesService.getSuccessMessage().pipe(filter(mensaje => mensaje !== null))
    .subscribe(mensaje => {
      this.empleadoExito = mensaje;
      setTimeout(() => this.mensajesService.clearSuccessMessage(), 200); 
    });
    this.mensajesService.getErrorMessage().pipe(filter(mensaje => mensaje !== null))
    .subscribe(mensaje => {
      this.empleadoError = mensaje;
      setTimeout(() => this.mensajesService.clearErrorMessage(), 200); 
    });
  }

  cargarEmpleados(){
    this.loginService.currentUserId.pipe(
      filter(userId => !!userId), // Filtra solo si el ID del usuario está definido
      tap((userId) => {
        this.userId = parseInt(userId || "-1"); // Almacena el ID del usuario como número
        this.userLoginOn = true; // Establece userLoginOn a true cuando se cumplan las condiciones
      }),
      switchMap(() => this.administracionService.getEmpresaPorUserId(this.userId)), // Obtiene la empresa del usuario
      switchMap((empresa) => {
        const request = new EmpleadoRequest(0, this.userId, empresa.id); // Crear la solicitud
        return this.empresasService.getEmpleadosPorEmpresa(request); // Obtiene los empleados de la empresa
      })
    ).subscribe({
      next: (empleados) => {
        this.empleados = empleados;
        console.log("empleados: ", empleados);
      },
      error: (error) => {
        console.error("Error:", error)
        if(error.status == 403){
          console.log("no tienes permiso para editar al empleado");
        }
        this.userLoginOn = false;
        this.router.navigateByUrl("/login");
      }
    });
  }
  

  eliminarEmpleado(idEmpleado: number): void{
    if(idEmpleado > -1){
      const request = new EmpleadoRequest(idEmpleado, this.userId, 0);
      this.empresasService.getEmpleado(request).subscribe({
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
