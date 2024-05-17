import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { CuponCargaDTO } from 'src/app/Models/cuponCarga';
import { EmpleadoService } from 'src/app/Services/empleado.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  cantidadCarga!: number;
  importeCupon!: number;
  empleadoId!: number;
  errorEnSubmit: boolean = false;
  cuponCarga!: CuponCargaDTO;


  constructor(
    private empleadoService: EmpleadoService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.cantidadCarga = data.cantidadCarga;
    this.importeCupon = data.importeCupon;
    this.empleadoId = data.empleadoId;
  }

  onSubmit(): void {
    this.cuponCarga = {
      empleadoId: this.empleadoId,
      importe: this.cantidadCarga
    }

    this.empleadoService.cargarCupon(this.cuponCarga).subscribe({
      next: () => {
        this.dialogRef.close("cargado");
      },
      error: () => {
        this.errorEnSubmit = true;
        this.dialogRef.close("error");
      }
    })
    
  }

  onCancel(): void {
    this.dialogRef.close("cancelar");
  }

}
