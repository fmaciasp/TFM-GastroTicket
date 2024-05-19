import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCuponComponent } from '../../dialog-cupon/dialog-cupon.component';
import { LoginService } from 'src/app/Services/auth/login.service';
import { concatMap, filter, forkJoin, map, switchMap, tap } from 'rxjs';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { CuponDTO } from 'src/app/Models/cupon';
import { CuponCanjeadoDTO } from 'src/app/Models/cuponCanjeado';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dash-empleado',
  templateUrl: './dash-empleado.component.html',
  styleUrls: ['./dash-empleado.component.css'],
  providers: [DatePipe]
})
export class DashEmpleadoComponent implements OnInit, AfterViewInit {
  
  userLoginOn:boolean=false;
  userId:number = -1;
  codigo: string ="";
  empleadoError: string = "";
  cupon!: CuponDTO;
  displayedColumnsCuponesCanjeados: string[] = ['restaurante', 'importeFactura', 'descuentoAplicado', 'pagado', 'fecha'];
  displayedColumnsMiCupon: string[] = ['codigo', 'importe', 'fecha', 'cupon'];
  cuponesCanjeados = new MatTableDataSource<CuponCanjeadoDTO>();
  miCupon = new MatTableDataSource<CuponDTO>();

  constructor(
    private loginService: LoginService,
    private empleadoService: EmpleadoService,
    public dialog: MatDialog) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.cuponesCanjeados.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loginService.currentUserId.pipe(
      filter(userId => !!userId), // Filtra solo si el ID del usuario está definido
      tap((userId) => {
        this.userId = parseInt(userId || "-1"); // Almacena el ID del usuario como número
        this.userLoginOn = true; // Establece userLoginOn a true cuando se cumplan las condiciones
      }),
      switchMap(() => this.empleadoService.getEmpleadoPorUserId(this.userId)),
      concatMap((empleado) => {
      return forkJoin({
        cupon: this.empleadoService.getCupon(empleado.id),
        cuponesCanjeados: this.empleadoService.getCuponesCanjeados(empleado.id),
      });
    })
    ).subscribe({
      next: (result) => {
        this.cupon = result.cupon;
        this.miCupon = new MatTableDataSource<CuponDTO>([
          {
            id: this.cupon.id,
            codigo: this.cupon.codigo,
            importe: this.cupon.importe,
            empleadoId: this.cupon.empleadoId,
            fechaUltimoUso: this.cupon.fechaUltimoUso
          }
        ]);
        this.cuponesCanjeados = new MatTableDataSource<CuponCanjeadoDTO>(result.cuponesCanjeados);
        console.log("cuponesCanjeados: " + this.cuponesCanjeados)
      },
      error: (error) => {
        console.log("error: " + error.mensaje);
        this.empleadoError = error;
      }
    })
  }

  calculatePagado(element: any): string {
    const importeFactura = element.importeFactura || 0;
    const importeGastado = element.importeGastado || 0;
    const pagado = importeFactura - importeGastado;
    return pagado.toFixed(2);
  }

  openDialog() {
    this.dialog.open(DialogCuponComponent, {
      data: {
        codigo: this.cupon.codigo,
      },
    });
  }

}
