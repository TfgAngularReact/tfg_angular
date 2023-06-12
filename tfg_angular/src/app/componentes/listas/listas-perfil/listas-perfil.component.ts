import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lista } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'listas-perfil',
  templateUrl: './listas-perfil.component.html',
  styleUrls: ['./listas-perfil.component.css']
})
export class ListasPerfilComponent {

  listas:lista[];
  usuario:any;
  uid:any;
  listaJuegos: Map<any,any[]>;

 constructor(
  private firestoreService: FirestoreService,
  private route: ActivatedRoute,

 ){
  this.listas=[];
  this.uid=route.snapshot.params['id'];
  this.listaJuegos = new Map<any,any[]>;
 }
 ngOnInit(): void {
  this.loadUsuario();
 }


loadUsuario(){
  this.firestoreService.getDoc('Usuarios', this.uid).subscribe((res:any)=>{
    this.usuario = res;
    console.log(this.usuario);
    this.loadListas();

  });
}


  loadListas(){
    this.firestoreService.getColleccion('Listas', '==', 'uid', this.usuario.uid).subscribe((data:any)=>{
      this.listas = data;
      console.log(this.listas);
      this.loadJuegosListas();


      });
    }

  loadJuegosListas(){
    let mapita = new Map();
   this.listas.forEach((doc: any) =>{
         this.firestoreService.getColleccion('Juegos', 'in', 'id', doc.juegos)
         .subscribe((response: any) => {
           this.listaJuegos= mapita.set(doc,response);
           console.log(this.listaJuegos);
         });
 
       });
 
 }
}
