import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCuponComponent } from '../../dialog-cupon/dialog-cupon.component';
import { LoginService } from 'src/app/Services/auth/login.service';
import { filter, map, switchMap, tap } from 'rxjs';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { CuponDTO } from 'src/app/Models/cupon';

@Component({
  selector: 'app-dash-empleado',
  templateUrl: './dash-empleado.component.html',
  styleUrls: ['./dash-empleado.component.css']
})
export class DashEmpleadoComponent implements OnInit {
  
  userLoginOn:boolean=false;
  userId:number = -1;
  codigo: string ="";
  cupon!: CuponDTO;

  constructor(
    private loginService: LoginService,
    private empleadoService: EmpleadoService,
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.loginService.currentUserId.pipe(
      filter(userId => !!userId), // Filtra solo si el ID del usuario está definido
      tap((userId) => {
        this.userId = parseInt(userId || "-1"); // Almacena el ID del usuario como número
        this.userLoginOn = true; // Establece userLoginOn a true cuando se cumplan las condiciones
        
      }),
      switchMap(() => this.empleadoService.getEmpleadoPorUserId(this.userId)),
      switchMap((empleado) => this.empleadoService.getCupon(empleado.id))
    ).subscribe({
      next: (cupon) => {
        this.cupon = cupon;
        console.log("cupon: " + cupon);
      },
      error: () => {
        console.log("eerrrrorrrrr");
      }
    })
  }

  openDialog() {
    this.dialog.open(DialogCuponComponent, {
      data: {
        codigo: this.cupon.codigo,
      },
    });
  }

}
