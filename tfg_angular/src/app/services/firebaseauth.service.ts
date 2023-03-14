
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Usuario } from '../models';


@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) { 
    this.getUid();
  }


  login(email: string, password: string){

   return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

  registrar(email: string, password: string, nickname: string){

    

    return this.auth.createUserWithEmailAndPassword(email, password).then(res =>{
      try{
        console.log(nickname);
        res.user?.updateProfile({
        displayName:nickname
      });}
      catch(error){
        console.log(error);
      }
      
    });
  }

  async getUid(){
    const user = await this.auth.currentUser;
    if(user === null){
      return null;
    }
    else{
      return user.uid;
    }
     
  }

  stateAuth() {
    return this.auth.authState;
  }

  currentUse(){
    return this.auth.currentUser;
  }



}
