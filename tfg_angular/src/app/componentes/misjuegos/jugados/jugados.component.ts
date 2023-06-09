import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private route: ActivatedRoute,

 ){
  this.jugados=[];
  this.uid = this.route.snapshot.params['id'];
 }
 ngOnInit(): void {
  this.loadUsuario();
 }

loadUsuario(){
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
