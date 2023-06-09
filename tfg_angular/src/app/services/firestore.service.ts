import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { juego, lista, resena } from '../models';
import { Firestore, collection, addDoc, collectionData, where, query, getDocs, limit, orderBy, WhereFilterOp } from '@angular/fire/firestore';
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
    const limitDate = moment().subtract(70, 'days').format("DD-MM-YYYY");
    console.log(limitDate);
    const queryRef = query(collectionRef, where('fechaCreacion', '>', moment(limitDate, "DD-MM-YYYY").toDate()), limit(6));
    console.log(queryRef);
    return collectionData(queryRef, {idField: 'id'}) as Observable<juego[]>;

  }

  getResenasByJuego(id_juego: any):Observable<resena[]>{
    
    const collectionRef = collection(this.firestore,'Resenas');
    const queryRef = query(collectionRef, where('id_juego', '==', id_juego));
    return collectionData(queryRef, {idField: 'id'}) as Observable<resena[]>;

  }
  getListasByUid(uid:string): Observable<lista[]>{
    const collectionRef = collection(this.firestore, 'Listas');
    const queryRef = query(collectionRef, where('uid', '==', uid ));
    console.log(queryRef);
    return collectionData(queryRef, {idField: 'id'}) as Observable<lista[]>;

  }

  getResenasPopularesNuevas(): Observable<resena[]>{
    const collectionRef = collection(this.firestore, 'Resenas');
    const limitDate = moment().subtract(30, 'days').format("DD-MM-YYYY");
    const queryRef = query(collectionRef, where('fechaCreacion', '>', moment(limitDate, "DD-MM-YYYY").toDate()),orderBy('fechaCreacion'), orderBy('num_likes', 'desc'), limit(6));
    
    return collectionData(queryRef, {idField: 'id'}) as Observable<resena[]>;

  }

  getJuegobyResena(id_juego:string){
    const queryRef = this.database.collection('Juegos', ref => ref.where('id', '==', id_juego));

    return queryRef.valueChanges();
  }

  getUsuariobyResena(id_usuario:string){
    const queryRef = this.database.collection('Usuarios', ref => ref.where('id', '==', id_usuario));
    return queryRef.valueChanges();
  }

  getColleccion(colleccion: string, tipo_busqueda:WhereFilterOp, campo:string, dato:any){
    const queryRef = this.database.collection(colleccion, ref => ref.where(campo, tipo_busqueda, dato));

    return queryRef.valueChanges();

  }

  getJugadosPerfil( juegos:any){
    const collectionRef = collection(this.firestore, 'Juegos');

    const queryRef = query(collectionRef,where('id', 'in', juegos), limit(6));

    return collectionData(queryRef,{idField:'id'}) as Observable<juego[]>;

  }

  getResenasPerfil(uid:any){
    const collectionRef1 = collection(this.firestore, 'Resenas');

    const queryRef1 = query(collectionRef1,where('usuario', '==', uid), orderBy('fechaCreacion', 'desc'));

    return collectionData(queryRef1,{idField:'id'}) as Observable<resena[]>;

  }
 


}
