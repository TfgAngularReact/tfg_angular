import { Component } from '@angular/core';
import { FirebaseauthService } from './services/firebaseauth.service';
import { FirestoreService } from './services/firestore.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tfg_angular';

  margen: boolean=false;
  auth = false;

  nombreUsuario: string;


  constructor(private firebaseauthService: FirebaseauthService,
              private firestoreService: FirestoreService
              ){
    this.nombreUsuario="";
    this.estadoSesion();

  }
  async ngOnInit() {
    const id = await this.firebaseauthService.getUid();

    //this.loadUsuario(id);


  }
  

 /* async loadUsuario(id: any){

    this.firestoreService.getUsuario('Usuarios', id ).subscribe((res:any)=>{
      this.nombreUsuario=res.nickname;
    });
  }*/


  toggleMenu():void{
    this.margen = !this.margen;
    console.log(this.margen);
  }

  estadoSesion(){ 
    this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res !== null){
        this.auth=true;
      }
      else{
        this.auth=false;
      }
    });
  }

}
