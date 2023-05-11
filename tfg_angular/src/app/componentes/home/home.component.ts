import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { RawgApiService } from 'src/app/services/rawg-api.service';
import * as moment from 'moment';
import { juego } from 'src/app/models';
import { map } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  novedades: any;

  juegos: juego[];

  constructor(
    public firebaseauthService: FirebaseauthService, 
    private router :Router,
    private rawg: RawgApiService,
    private firestoreService: FirestoreService,
  ){
    this.juegos = [];
  }

  ngOnInit(): void {
    this.loadJuegos();
    
  }

  loadJuegos(){
   this.firestoreService.getNovedadesJuegos().subscribe(data=>{
    this.novedades = data;
    console.log(this.novedades);
   });
  }

   actualizaJuegos(){
      
    this.firestoreService.getCollectionNew().subscribe(juegos=>{
      for(let i = 0; i<juegos.length;i++){
        this.firestoreService.updateDoc({fechaCreacion:moment().format('DD-MM-YYYY')},"Juegos",juegos[i].id);
      }
    });
   
  }

}
