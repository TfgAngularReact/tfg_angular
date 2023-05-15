import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { juego, lista } from '../models';
import { Firestore, collection, addDoc, collectionData, where, query, getDocs, limit } from '@angular/fire/firestore';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import * as moment from 'moment';




@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore,
              private firestore: Firestore) { }

  createDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string){
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }



  deleteDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId(){
    return this.database.createId();
  }

  getCollection<juego>(path:string){
    const collection = this.database.collection<juego>(path);
    return collection;

  }

  getProductosUsuario<tipo>(path:string, uid:string){
    console.log(uid);
    const collection = this.database.collection<tipo>(path, ref => ref.where('uid','==',uid));
    return collection.valueChanges();
  }

  getUsuario<tipo>(path:string, uid:string){
    console.log(path);
    const collection = this.database.collection<tipo>(path);
    return collection.doc(uid).valueChanges();
    }

  getProductosNombre<tipo>(path:string, nombre:string){
    console.log(nombre);
    const collection = this.database.collection<tipo>(path, ref => ref.where('nombre','==',nombre));
    return collection.valueChanges();
  }


  getCollectionNew(): Observable<juego[]>{
    const placeRef = collection(this.firestore, 'Juegos');
    return collectionData(placeRef, {idField: 'id'}) as Observable<juego[]>;
  }

  getNovedadesJuegos(): Observable<juego[]>{
    const collectionRef = collection(this.firestore, 'Juegos');
    const limitDate = moment().subtract(15, 'days').format("DD-MM-YYYY");
    console.log(limitDate);
    const queryRef = query(collectionRef, where('fechaCreacion', '>', moment(limitDate, "DD-MM-YYYY").toDate()), limit(6));
    console.log(queryRef);
    return collectionData(queryRef, {idField: 'id'}) as Observable<juego[]>;

  }

  getListasByUid(uid:string): Observable<lista[]>{
    const collectionRef = collection(this.firestore, 'Listas');
    const queryRef = query(collectionRef, where('uid', '==', uid ));
    console.log(queryRef);
    return collectionData(queryRef, {idField: 'id'}) as Observable<lista[]>;

  }



}
