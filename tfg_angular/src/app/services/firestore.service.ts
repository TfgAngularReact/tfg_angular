import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

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

  getCollection<tipo>(path:string){
    const collection = this.database.collection<tipo>(path);
    return collection;

  }

  getProductosUsuario<tipo>(path:string, uid:string){
    console.log(uid);
    const collection = this.database.collection<tipo>(path, ref => ref.where('uid','==',uid));
    return collection.valueChanges();
  }

  getUsuario<tipo>(path:string, uid:string){
    const collection = this.database.collection<tipo>(path);
    return collection.doc(uid).valueChanges();
    }

  getProductosNombre<tipo>(path:string, nombre:string){
    console.log(nombre);
    const collection = this.database.collection<tipo>(path, ref => ref.where('nombre','==',nombre));
    return collection.valueChanges();
  }
}
