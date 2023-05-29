import { Component } from '@angular/core';
import { juego } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'jugados',
  templateUrl: './jugados.component.html',
  styleUrls: ['./jugados.component.css']
})
export class JugadosComponent {

  jugados:juego[];
  usuario:any;
  uid:any;

 constructor(
  private fireAuthSvc: FirebaseauthService,
  private firestoreService: FirestoreService,

 ){
  this.jugados=[];
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
    console.log(this.usuario);
    this.loadJugados();

  });
}

loadJugados(){

  this.firestoreService.getColleccion('Juegos', 'in', 'id', this.usuario.jugados).subscribe((data:any)=>{
    console.log(data);

    this.jugados = data;
  });
}

}
