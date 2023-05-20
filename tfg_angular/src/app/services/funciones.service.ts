import { Injectable } from '@angular/core';
import { Observable } from '@firebase/util';
import { FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(private firestoreSvc: FirestoreService,
    ) { }

  calculaPuntuacion(id_juego: string): Promise<Number>{
   return new Promise((resolve, reject) => {
    this.firestoreSvc.getResenasByJuego(id_juego).subscribe((data:any)=>{
      let resenas = data;

      let suma = 0;
      let num_resenas = resenas.length;
      for (let i = 0; i< resenas.length; i++){
        suma = suma+resenas[i].puntuacion;
        }
      let media= Number((suma/num_resenas).toFixed(1));
      resolve(media);
     });
   }); 
  }
}
