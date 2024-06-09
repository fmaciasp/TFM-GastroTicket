import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-cupon',
  templateUrl: './dialog-cupon.component.html',
  styleUrls: ['./dialog-cupon.component.css']
})
export class DialogCuponComponent {

  codigo!: string;
  errorEnSubmit: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.codigo = data.codigo;

  }

  onSubmit(): void {
    this.dialogRef.close();
  }

}
