import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lista } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'listas-likes',
  templateUrl: './listas-likes.component.html',
  styleUrls: ['./listas-likes.component.css']
})
export class ListasLikesComponent {

  likes:lista[];
  usuario:any;
  uid:any;
  listaJuegos: any;
  isYourUser: boolean;


 constructor(
  private firestoreService: FirestoreService,
  private route: ActivatedRoute,

 ){
  this.likes=[];
  this.uid=route.snapshot.params['id'];
  this.isYourUser=false;
 }
 ngOnInit(): void {
  this.loadUsuario();
 }

 

loadUsuario(){
  this.firestoreService.getDoc('Usuarios', this.uid).subscribe((res:any)=>{
    this.usuario = res;
    console.log(this.usuario);
    this.loadMegusta();

  });
}


  loadMegusta(){
    this.firestoreService.getColleccion('Listas', 'in', 'id', this.usuario.listas_like).subscribe((data:any)=>{
      this.likes = data;
      console.log(this.likes);
      this.loadJuegosListas();


      });
    }

  loadJuegosListas(){
    let mapita = new Map();
   this.likes.forEach((doc: any) =>{
         this.firestoreService.getColleccion('Juegos', 'in', 'id', doc.juegos)
         .subscribe((response: any) => {
           this.listaJuegos= mapita.set(doc,response);
           console.log(this.listaJuegos);
         });
 
       });
 
 }

}
