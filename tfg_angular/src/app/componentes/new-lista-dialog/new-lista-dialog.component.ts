import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { lista } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-new-lista-dialog',
  templateUrl: './new-lista-dialog.component.html',
  styleUrls: ['./new-lista-dialog.component.css']
})
export class NewListaDialogComponent {
nombreLista:any;
lista: lista;

constructor(
  public dialogRef: MatDialogRef<NewListaDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private firestoreService: FirestoreService,

){
  this.lista = {  id:"",
    uid:this.data.usuario.uid,
    name: "",
    juegos:[],
    fechaCreacion: Timestamp.now(),
    num_likes:0}
}

crearLista(){
  this.lista.name = this.nombreLista;
  const id = this.firestoreService.getId();
  this.firestoreService.createDoc(this.lista, "Listas", id);
}

cerrarDialogo(): void {
  // Cierra el diálogo utilizando la referencia al diálogo
  this.dialogRef.close();
}

}
