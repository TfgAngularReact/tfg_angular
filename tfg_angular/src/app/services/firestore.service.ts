import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc  } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: Firestore) { 


    /*createDoc(data: any, path: string, id: string){
      const coleccion = collection(database, 'usuario');
      return addDoc(coleccion, path);
    }*/
  
  }
}
