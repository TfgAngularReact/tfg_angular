import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { resena } from 'src/app/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.component.html',
  styleUrls: ['./resenas.component.css']
})
export class ResenasComponent {
  private _unsubscribeAll: Subject<any>;
  resenas: any[];
  usuario:any;
  uid: any;
  isYourUser: boolean;
  stateAuth: boolean;
  constructor(
    private fireAuthSvc: FirebaseauthService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,

  
   ){
    this._unsubscribeAll = new Subject();
    this.resenas=[];
    this.uid=route.snapshot.params['id'];
    this.isYourUser=false;
    this.stateAuth = false

   }
   ngOnInit(): void {
    this.loadUsuario();
   }

   isAuth(){
    this.fireAuthSvc.stateAuth().pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=>{
      if(data!== null){
        this.stateAuth=true;
      }
    });
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
    this.firestoreService.getColleccion('Resenas', '==', 'usuario', this.usuario.uid).pipe(takeUntil(this._unsubscribeAll)).subscribe((data:any)=> {
      this.resenas = data;
      });
      
  }
  
  
}
