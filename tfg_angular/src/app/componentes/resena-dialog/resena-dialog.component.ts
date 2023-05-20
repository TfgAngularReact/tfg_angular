
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { resena } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FuncionesService } from 'src/app/services/funciones.service';


@Component({
  selector: 'app-resena-dialog',
  templateUrl: './resena-dialog.component.html',
  styleUrls: ['./resena-dialog.component.css']
})
export class ResenaDialogComponent {
  texto: any;
  juego: any;
  usuario:any;
 // review:resena;
  resenaForm: FormGroup;
  ratingDisplay: number;
  resena: resena;

  constructor(
    public dialogRef: MatDialogRef<ResenaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private firestoreSvc:FirestoreService,
    private funcionesSvc: FuncionesService
  ){
    this.juego = data.juego;
    this.usuario = data.usuario;

    this.resenaForm = this.formBuilder.group({
      puntuacion: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      comentario: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.ratingDisplay=0;
    this.resena = {id:'',name:'', id_juego:this.juego.id, fechaCreacion:Timestamp.now(), texto:'', usuario: this.usuario.uid, num_likes:0, puntuacion:0}
  }


  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
    this.resena.puntuacion = rating
  }

  async guardarResena(){
  this.resena.id =  this.firestoreSvc.getId();
  this.resena.texto = this.texto;
  try{

      await this.firestoreSvc.createDoc(this.resena, "Resenas", this.resena.id);
      this.funcionesSvc.calculaPuntuacion(this.juego.id).then((res: any)=>{
        console.log(res);
        this.juego.puntuacion = res;
        this.firestoreSvc.updateDoc(this.juego, "Juegos", this.juego.id);
      });

      
  }catch(e){console.log('Error',e);}



}



}
