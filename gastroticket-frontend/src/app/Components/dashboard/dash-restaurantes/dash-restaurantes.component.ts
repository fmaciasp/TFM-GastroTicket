import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription, filter, switchMap, tap } from 'rxjs';
import { CuponCanjeadoDTO } from 'src/app/Models/cuponCanjeado';
import { LoginService } from 'src/app/Services/auth/login.service';
import { RestaurantesService } from 'src/app/Services/restaurantes.service';
import { DialogCanjearComponent } from '../../dialog-canjear/dialog-canjear.component';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { DatePipe } from '@angular/common';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-dash-restaurantes',
  templateUrl: './dash-restaurantes.component.html',
  styleUrls: ['./dash-restaurantes.component.css'],
  providers: [DatePipe]
})
export class DashRestaurantesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('action', { static: false }) action!: NgxScannerQrcodeComponent;
  private subscription!: Subscription;

  userLoginOn:boolean=false;
  userId:number = -1;
  restauranteId!: number;
  cupones = new MatTableDataSource<CuponCanjeadoDTO>();
  restauranteError: any = null;
  restauranteExito: any = null;
  displayedColumnsVentas: string[] = ['fecha', 'importeFactura', 'descuentoAplicado', 'pagado'];
  sumaTotal: number = 0;
  sumaDescontado: number = 0;
  importe!: FormControl;
  codigoCupon!: FormControl;
  canjearCuponForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private restauranteService: RestaurantesService,
    private empleadoService: EmpleadoService,
    private router: Router,
    private formBuilder: FormBuilder, 
    private mensajeService: MensajesService,
    public dialog: MatDialog,
  ){ 
    this.canjearCuponForm = this.formBuilder.group({
      importe:['', Validators.required],
      codigoCupon:['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.cargarVentas();
  }

  ngAfterViewInit() {
    if (this.action && this.action.data) {
      this.action.data.subscribe((result: ScannerQRCodeResult[]) => {
        if (result && result.length > 0) {
          this.canjearCuponForm.patchValue({
            codigoCupon: result[0].value
          });
          this.action.isBeep = false;
          if (this.action.isBeep) {
            this.action.isBeep = false;
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  cargarVentas(){
    this.subscription = this.loginService.currentUserId.pipe(
      filter(userId => !!userId), 
      tap((userId) => {
        this.userId = parseInt(userId || "-1"); 
        this.userLoginOn = true; 
      }),
      switchMap(() => this.restauranteService.getRestaurantePorUsuario(this.userId)), 
      tap((restaurante) => {
        this.restauranteId = restaurante.id;
      }),
      switchMap((restaurante) => this.restauranteService.getCuponesRestaurante(restaurante.id)) 
    ).subscribe({
      next: (cupones) => {
        this.cupones = new MatTableDataSource<CuponCanjeadoDTO>(cupones);
        this.cupones.data.forEach(cupon => {
          this.sumaTotal += cupon.importeFactura;
          this.sumaDescontado += cupon.importeDescontado;
        });
      },
      error: (error) => {
        console.error("Error:", error)
        this.userLoginOn = false;
        this.router.navigateByUrl("/login");
      }
    });
  }

  canjearCupon(): void {
    if (this.canjearCuponForm.valid) {
      const importeFactura = this.canjearCuponForm.get('importe')?.value;
      const codigo = this.canjearCuponForm.get('codigoCupon')?.value;

      let descuento = 11;
      if(importeFactura<11)
        descuento = importeFactura

      this.empleadoService.getCuponPorCodigo(codigo).subscribe({
        next: (cupon) => {
          const dialogRef = this.dialog.open(DialogCanjearComponent, {
            data: {cuponId: cupon.id,
              importeDescontado: descuento,
              importeFactura: importeFactura,
              userId: this.userId,
              empleadoId: cupon.empleadoId,
              restauranteId: this.restauranteId
            },
          });
      
          dialogRef.afterClosed().subscribe((result) => {
            if (result === "exito") {
              this.canjearCuponForm.reset();
              this.restauranteExito = "Se ha efectuado la venta";
              this.cargarVentas();
            } else if (result === "error") {
              this.resetForm();
              this.mensajeService.getErrorMessage().subscribe(mensaje => {
                console.log("error: " + mensaje)
                this.restauranteError = mensaje;
              });
            }
          }); 
        }
      }) 
    }
    
  }

  calculatePagado(element: any): string {
    const importeFactura = element.importeFactura || 0;
    const importeGastado = element.importeGastado || 0;
    const pagado = importeFactura - importeGastado;
    return pagado.toFixed(2);
  }
  
  resetForm(): void {
    this.canjearCuponForm.reset({
        importe: '',
        codigoCupon: ''
    });

    Object.keys(this.canjearCuponForm.controls).forEach(key => {
        this.canjearCuponForm.get(key)?.setErrors(null);
        this.canjearCuponForm.get(key)?.markAsPristine();
        this.canjearCuponForm.get(key)?.markAsUntouched();
    });
  }

}
