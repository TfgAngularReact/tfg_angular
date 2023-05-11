import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { juego } from '../models';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewFiresotreService {

  constructor(private firestore: Firestore) { }

  getCollectionNew(): Observable<juego[]>{
    const placeRef = collection(this.firestore, 'Juegos');
    return collectionData(placeRef, {idField: 'id'}) as Observable<juego[]>;
  }

}
