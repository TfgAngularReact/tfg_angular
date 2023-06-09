import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { resena } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css']
})
export class ResenasComponent {
  resenas: any[];
  usuario:any;
  uid: any;
  isYourUser: boolean;
  constructor(
    private fireAuthSvc: FirebaseauthService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,

  
   ){
    
    this.resenas=[];
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
      this.loadResenas();
  
    });
  }

  loadResenas(){
    this.firestoreService.getColleccion('Resenas', '==', 'usuario', this.usuario.uid).subscribe((data:any)=> {
      let datos = data;
      console.log(datos);
      for(let i = 0; i<datos.length; i++){
        this.firestoreService.getJuegobyResena(datos[i].id_juego).subscribe((data:any)=>{
          this.resenas.push({resena:datos[i], juego:data[0]});
        });
      }
      
    });

  }
  
  
}
