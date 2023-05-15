import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';
import { lista } from 'src/app/models';
import { AnonymousSubject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-add-lista-dialog',
  templateUrl: './add-lista-dialog.component.html',
  styleUrls: ['./add-lista-dialog.component.css']
})
export class AddListaDialogComponent {


  juego: any;
  usuario: any;
  listas: any;

  constructor(
    public dialogRef: MatDialogRef<AddListaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fireStoreSvc: FirestoreService
  ) { 

    this.juego = data.juego;
    this.usuario = data.usuario;
    this.listas = [];
  }

  ngOnInit(): void {

    this.loadListas()

    
  }

  loadListas(){

  this.fireStoreSvc.getListasByUid(this.usuario.uid).subscribe(data => {
    this.listas = data;
    console.log(this.listas);
  });

  }

  isChecked(item:any){
    return item.juegos.includes(this.juego.id);
    
  }

  toggleCheckbox(item: any, event: any){

    const isChecked = event.checked;

    if (isChecked) {
      item.juegos.push(this.juego.id);
      try{
        console.log("entra");
        let result = this.fireStoreSvc.updateDoc(item, "Listas", item.id);
        console.log(result);

      }catch(e){
        console.log("Error", e);
      }
    } else {
        const index = item.juegos.indexOf(this.juego.id);
        if (index !== -1) {
          item.juegos.splice(index, 1);
        }
        this.fireStoreSvc.updateDoc(item, "Listas", item.id);

      try{

      }catch(e){

        console.log("Error",e);

      }

    }
  


  }

 /* añadeLista(){
    this.jugado = !this.jugado;

    if(this.jugado === true){
      this.juego.num_jugados+=1;
  
      this.usuario.jugados.push(this.idJuego);
      try{
  
        this.firestoreService.updateDoc(this.usuario, 'Usuarios', this.uid);
      }catch(e){
        console.log('Error', e);
      }
  
    }
    else{
      this.juego.num_jugados -= 1;
  
      const elementoAEliminar = this.idJuego;
      const indice = this.usuario.jugados.indexOf(elementoAEliminar);
      if (indice !== -1) {
        this.usuario.jugados.splice(indice, 1);
      }
      try{
  
        this.firestoreService.updateDoc(this.usuario, 'Usuarios', this.uid);
      }catch(e){
        console.log('Error', e);
      }
    }
  }*/

}
