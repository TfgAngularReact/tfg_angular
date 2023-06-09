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

  jugados:juego[];
  uid: any;
  usuario: any;
  likes:juego[];
  @Output() datosEnviados = new EventEmitter<any>();


  constructor(
    public firebaseauthService: FirebaseauthService, 
    private firestoreService: FirestoreService,

  ){
    this.jugados=[];
    this.likes=[];
  }






}
