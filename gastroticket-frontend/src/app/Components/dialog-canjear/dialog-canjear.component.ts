import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CanjearCuponDTO } from 'src/app/Models/canjearCupon';
import { MensajesService } from 'src/app/Services/mensajes.service';
import { RestaurantesService } from 'src/app/Services/restaurantes.service';

@Component({
  selector: 'app-dialog-canjear',
  templateUrl: './dialog-canjear.component.html',
  styleUrls: ['./dialog-canjear.component.css']
})
export class DialogCanjearComponent {
  importeFactura!: number;
  importeDescontado!: number;
  cuponId!: number;
  userId!: number;
  empleadoId!: number;
  restauranteId!: number;
  errorEnSubmit: boolean = false;
  canjearCupon!: CanjearCuponDTO;

  constructor(
    public dialogRef: MatDialogRef<DialogCanjearComponent>,
    private restauranteService: RestaurantesService,
    private mensajeService: MensajesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.importeFactura = data.importeFactura;
    let descuento = 11;
    if(this.importeFactura<11)
      descuento = this.importeFactura
    this.importeDescontado = descuento;
    this.cuponId = data.cuponId;
    this.userId = data.userId;
    this.empleadoId = data.empleadoId;
    this.restauranteId = data.restauranteId;
  }

  onSubmit(): void {
    this.canjearCupon = {
      cuponId: this.cuponId,
      importeDescontado: this.importeDescontado,
      importeFactura: this.importeFactura,
      userId: this.userId,
      empleadoId: this.empleadoId,
      restauranteId: this.restauranteId
    }

    console.log("this.canjearCupon: " + this.canjearCupon.importeFactura);

    this.restauranteService.canjearCupon(this.canjearCupon).subscribe({
      next: () => {
        this.dialogRef.close("exito");
      },
      error: (error) => {
        this.errorEnSubmit = true;
        console.log("error")
        this.mensajeService.sendErrorMessage(error.error);
        this.dialogRef.close("error");
      }
    })
    
  }

  onCancel(): void {
    this.dialogRef.close("cancelar");
  }
}
