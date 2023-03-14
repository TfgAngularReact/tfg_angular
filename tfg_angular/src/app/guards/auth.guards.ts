import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  afAuth: any;
  auth = false;


  constructor(private firebaseauthService: FirebaseauthService, private router: Router,
    afAuth: AngularFireAuth) {  
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////
////  Esta función bloquea las rutas de /login y /registro en caso que el usuario esté logueado  //////
////  Si vamos al archivo app-routing.module.ts desde ahí llamamos a los guards.                 //////
///////////////////////////////////////////////////////////////////////////////////////////////////////

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.firebaseauthService.stateAuth().pipe(
      map(res => {
        if (res !== null) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }



}
