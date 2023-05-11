import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-lista-dialog',
  templateUrl: './add-lista-dialog.component.html',
  styleUrls: ['./add-lista-dialog.component.css']
})
export class AddListaDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddListaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
