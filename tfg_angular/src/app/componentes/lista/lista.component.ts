import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { juego, lista } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  usuario:any;
  list_id:any;
  juegos: juego[];
  lista: any;

 constructor(
  private fireAuthSvc: FirebaseauthService,
  private firestoreService: FirestoreService,
  private route: ActivatedRoute,

 ){
  this.juegos=[];
  this.list_id=route.snapshot.params['id'];
 }
 ngOnInit(): void {
  this.loadLista()    

 }

 loadLista(){
  this.firestoreService.getDoc('Listas', this.list_id).subscribe((data: any)=>{
    this.lista = data;
    this.loadUsuario()
    this.loadJuegos();
  });
}

loadUsuario(){
  this.firestoreService.getDoc('Usuarios', this.lista.uid).subscribe((res:any)=>{
    this.usuario = res;
    console.log(this.usuario);

  });
}


loadJuegos(){
  this.firestoreService.getColleccion('Juegos', 'in', 'id', this.lista.juegos).subscribe((data:any)=>{
    this.juegos = data;

     });
  }

}
