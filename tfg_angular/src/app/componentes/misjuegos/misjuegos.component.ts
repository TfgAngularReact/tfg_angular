import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { juego } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-misjuegos',
  templateUrl: './misjuegos.component.html',
  styleUrls: ['./misjuegos.component.css']
})
export class MisjuegosComponent {

  usuario:any;
  uid:any;
  isYourUser: boolean;


 constructor(
  private firestoreService: FirestoreService,
  private route: ActivatedRoute,
  private fireAuthSvc: FirebaseauthService,


 ){
  this.uid=route.snapshot.params['id'];
  this.isYourUser=false;
 }
 ngOnInit(): void {
  this.loadUsuario();
 }

 loadUsuario(){
  this.fireAuthSvc.stateAuth().subscribe((res: any) => {
    if (res!==null){
     if(this.uid==res.uid){
      this.isYourUser=true;
     }
     this.getUsuario();
   }else {
    }
   });
}

getUsuario(){
  this.firestoreService.getDoc('Usuarios', this.uid).subscribe((res:any)=>{
    this.usuario = res;
    console.log(this.usuario);
  });
}





}
