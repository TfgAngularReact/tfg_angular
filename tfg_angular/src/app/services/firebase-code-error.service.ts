import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCodeErrorService {

  constructor() { }

  firebaseError(code: string){

    switch(code) {
      case 'auth/email-already-in-use':
        return 'El usuario ya existe'
      case 'auth/weak-password':
        return 'La contraseña es débil'
      case 'auth/invalid-email':
        return 'El correo es invalido'
      default:
        return 'Error desconocido'
    }

  }
}
