
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { RawgApiService } from 'src/app/services/rawg-api.service';
import * as moment from 'moment';
import { juego, resena, Usuario } from 'src/app/models';
import { map, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  novedades: any;
  resenas: resena[];
  juegos: juego[];
  resenasData: any;
  uid: any;
  usuario: any;
  stateAuth: boolean;
  private _unsubscribeAll: Subject<any>;


  constructor(
    public firebaseauthService: FirebaseauthService, 
    private router :Router,
    private rawg: RawgApiService,
    private firestoreService: FirestoreService,
    private fireAuthSvc: FirebaseauthService,

  ){
    this.juegos = [];
    this.resenas = [];
    this.resenasData = [];
    this.stateAuth = false;
    this._unsubscribeAll = new Subject();

  }

  ngOnInit(): void {
    this.isAuth();
    this.loadUsuario();
    this.loadJuegos();
    this.loadResenas();
    
  }

  isAuth(){
    this.fireAuthSvc.stateAuth().pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=>{
      if(data!== null){
        this.stateAuth=true;
      }
    });
  }

  loadJuegos(){
   this.firestoreService.getNovedadesJuegos().pipe(takeUntil(this._unsubscribeAll)).subscribe(data=>{
    this.novedades = data;
   });
  }

  loadResenas(){
    this.firestoreService.getResenasPopularesNuevas().pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=> {
      this.resenas = data;
      console.log(this.resenas);
    });

  }



  loadUsuario(){
    this.fireAuthSvc.stateAuth().pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      if (res!==null){
       this.uid=res.uid;
       this.getUsuario();
     }else {
      }
     });
  }
  getDataUsuario(indice: number){
    this.firestoreService.getDoc('Usuarios', this.resenas[indice].usuario).pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=>{
      this.resenasData[indice].usuario = data;
    });
  }

  getUsuario(){
    this.firestoreService.getDoc('Usuarios', this.uid).pipe(takeUntil(this._unsubscribeAll)).subscribe((res:any)=>{
      this.usuario = res;
      console.log(this.usuario);
    });
  }


}
