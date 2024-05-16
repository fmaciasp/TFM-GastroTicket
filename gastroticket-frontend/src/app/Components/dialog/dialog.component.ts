import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  cantidad!: number;
  importe!: number;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.cantidad = data.cantidad;
  }

  onSubmit(): void {
    this.dialogRef.close({cantidad: this.cantidad, importe: this.importe});
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
