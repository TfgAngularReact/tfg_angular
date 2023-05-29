import { Component } from '@angular/core';
import { juego } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'juegos-likes',
  templateUrl: './juegos-likes.component.html',
  styleUrls: ['./juegos-likes.component.css']
})
export class JuegosLikesComponent {

  likes:juego[];
  usuario:any;
  uid:any;

 constructor(
  private fireAuthSvc: FirebaseauthService,
  private firestoreService: FirestoreService,

 ){
  this.likes=[];
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
    this.loadMegusta();

  });
}

loadMegusta(){
  this.firestoreService.getColleccion('Juegos', 'in', 'id', this.usuario.likes).subscribe((data:any)=>{
    this.likes = data;

     });
  }
}
