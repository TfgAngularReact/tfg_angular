
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { RawgApiService } from 'src/app/services/rawg-api.service';
import * as moment from 'moment';
import { juego, resena, Usuario } from 'src/app/models';
import { map } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  novedades: any;
  resenas: resena[];
  juegos: juego[];
  datosResenas: any;
  uid: any;
  usuario: any;

  constructor(
    public firebaseauthService: FirebaseauthService, 
    private router :Router,
    private rawg: RawgApiService,
    private firestoreService: FirestoreService,
    private fireAuthSvc: FirebaseauthService,

  ){
    this.juegos = [];
    this.resenas = [];
    this.datosResenas = [];
    
  }

  ngOnInit(): void {
    this.loadUsuario();
    this.loadJuegos();
    this.loadResenas();
    
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

  loadResenas(){
    this.firestoreService.getResenasPopularesNuevas().subscribe((data:any)=> {
      this.resenas = data;
      console.log(this.resenas);
      for(let i = 0; i<this.resenas.length; i++){
        this.firestoreService.getJuegobyResena(this.resenas[i].id_juego).subscribe((data:any)=>{
          this.datosResenas.push({resena:this.resenas[i], juego:data[0], usuario:{}});
          this.getDataUsuario(i);
        });
      }
      
    });

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
  getDataUsuario(indice: number){
    this.firestoreService.getDoc('Usuarios', this.resenas[indice].usuario).subscribe((data:any)=>{
      this.datosResenas[indice].usuario = data;
    });
  }

  getUsuario(){
    this.firestoreService.getDoc('Usuarios', this.uid).subscribe((res:any)=>{
      this.usuario = res;
      console.log(this.usuario);
    });
  }

  like(resena: resena){
    if(!this.usuario.resenas_like.includes(resena.id)){
      resena.num_likes+=1;
      this.usuario.resenas_like.push(resena.id);
      try{
        this.firestoreService.updateDoc(resena,'Resenas',resena.id);
  
        this.firestoreService.updateDoc(this.usuario, 'Usuarios', this.uid);
      }catch(e){
        console.log('Error', e);
      }
  
    }
    else{
      resena.num_likes -= 1;
  
      const elementoAEliminar = resena.id;
      const indice = this.usuario.resenas_like.indexOf(elementoAEliminar);
      if (indice !== -1) {
        this.usuario.resenas_like.splice(indice, 1);
      }
      try{
        this.firestoreService.updateDoc(resena,'Resenas',resena.id);
  
        this.firestoreService.updateDoc(this.usuario, 'Usuarios', this.uid);
      }catch(e){
        console.log('Error', e);
      }
    }
  }

  isliked(id_resena:string){

    return this.usuario.resenas_like.includes(id_resena);


  }


}
