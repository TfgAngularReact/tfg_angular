import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';
import { juego } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { AddListaDialogComponent } from '../add-lista-dialog/add-lista-dialog.component';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';



@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {

idJuego:string;
juego: juego;
uid: any;
isLiked: boolean;
jugado: boolean;
usuario: any;
constructor(    
  private route: ActivatedRoute,
  private firestoreService: FirestoreService,
  private dialog: MatDialog,
  private fireAuthSvc: FirebaseauthService
  ){
  this.idJuego = route.snapshot.params['id'];
  this.juego = {
    id:'', 
    nombre:'', 
    fecha_lanzamiento: Timestamp.now(), 
    generos:[], 
    plataformas:[], 
    portada:'', 
    imagenes:[], 
    tiendas:[], 
    descripcion:'', 
    reseñas:[], 
    num_likes:0,
    num_jugados:0,
    puntuacion:0,
    listas: []
  };
  this.uid="";
  this.isLiked = false;
  this.jugado = false;

}

ngOnInit(): void {
  this.loadUsuario();

}

loadUsuario(){
  this.fireAuthSvc.stateAuth().subscribe((res: any) => {
    if (res!==null){
     this.uid=res.uid;
     this.getUsuario();
   }else {
    }
   });
}

getUsuario(){
  this.firestoreService.getDoc('Usuarios', this.uid).subscribe((res:any)=>{
    
    this.usuario = res;
    console.log("Primero",this.usuario);
    
    this.loadJuego();


  });
}

loadJuego(){
  this.firestoreService.getDoc<juego>('Juegos', this.idJuego).subscribe(res =>{
    if(res){
      this.juego = res;
      console.log(this.juego);
      this.compruebaIsLiked();

    }else{
      console.log("Error documento no encontrado");
    }

  });

}

compruebaIsLiked(){
  if(this.usuario.likes.includes(this.idJuego)){

    this.isLiked = true;

  }
}

compruebaIsJugado(){
  if(this.usuario.jugados.includes(this.idJuego)){

    this.jugado = true;

  }
}

getBackgroundImageStyle() {
  const backgroundImage = this.juego?.portada ? `linear-gradient(0deg, rgb(6, 16, 31) 20%, rgba(6, 16, 31, 0.6)), url(${this.juego.portada})` : '';
  return {
    'background-image': backgroundImage
  };
}

openDialogAddLista(): void {
  const dialogRef = this.dialog.open(AddListaDialogComponent, {
    width: '450px',
    height: '300px',
    data: { juego: this.juego,
            usuario: this.usuario } // Puedes pasar datos al diálogo mediante la opción `data`
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
    console.log('Resultado:', result);
  });
}

marcarJugado(){

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


}

like(){
  this.isLiked = !this.isLiked;
  if(this.isLiked === true){
    this.juego.num_likes+=1;
    this.usuario.likes.push(this.idJuego);
    try{
      this.firestoreService.updateDoc(this.juego,'Juegos',this.idJuego);

      this.firestoreService.updateDoc(this.usuario, 'Usuarios', this.uid);
    }catch(e){
      console.log('Error', e);
    }

  }
  else{
    this.juego.num_likes -= 1;

    const elementoAEliminar = this.idJuego;
    const indice = this.usuario.likes.indexOf(elementoAEliminar);
    if (indice !== -1) {
      this.usuario.likes.splice(indice, 1);
    }
    try{
      this.firestoreService.updateDoc(this.juego,'Juegos',this.idJuego);

      this.firestoreService.updateDoc(this.usuario, 'Usuarios', this.uid);
    }catch(e){
      console.log('Error', e);
    }
  }
}

}
