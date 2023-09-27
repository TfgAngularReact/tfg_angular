import { Component, Input } from '@angular/core';
import { resena } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.css']
})
export class ResenaComponent {

  @Input() resena: any;
  @Input() user: any;
  @Input() stateAuth: any;


  juego:any;
  usuario:any;
  

  constructor(
    private firestoreService: FirestoreService,
  ){
  
  }

  ngOnInit(): void {

    this.loadJuego();
    this.loadUsuario();
  }

  loadJuego(){
    this.firestoreService.getDoc("Juegos",this.resena.id_juego).subscribe((data)=>{
      this.juego = data;
    });
  }

  loadUsuario(){
    this.firestoreService.getDoc("Usuarios", this.resena.usuario).subscribe((data)=>{
      this.usuario = data;
    })
  }


  like(resena: resena){
    if(!this.user.resenas_like.includes(resena.id)){
      resena.num_likes+=1;
      this.user.resenas_like.push(resena.id);
      try{
        this.firestoreService.updateDoc(resena,'Resenas',resena.id);
  
        this.firestoreService.updateDoc(this.user, 'Usuarios', this.user.uid);
      }catch(e){
        console.log('Error', e);
      }
  
    }
    else{
      resena.num_likes -= 1;
  
      const elementoAEliminar = resena.id;
      const indice = this.user.resenas_like.indexOf(elementoAEliminar);
      if (indice !== -1) {
        this.user.resenas_like.splice(indice, 1);
      }
      try{
        this.firestoreService.updateDoc(resena,'Resenas',resena.id);
  
        this.firestoreService.updateDoc(this.user, 'Usuarios', this.user.uid);
      }catch(e){
        console.log('Error', e);
      }
    }
  }

  isliked(id_resena:string){

    return this.user.resenas_like.includes(id_resena);


  }

}
