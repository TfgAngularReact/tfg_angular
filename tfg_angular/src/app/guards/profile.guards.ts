
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
    providedIn: 'root'
  })
  export class ProfileGuard implements CanActivate {
    afAuth: any;
  
    constructor(private firebaseauthService: FirebaseauthService, private router: Router, afAuth: AngularFireAuth) {}
  
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.firebaseauthService.stateAuth().pipe(
          map(res => {
            if (res == null) {
              this.router.navigate(['/']);
              return false;
            } else {
              return true;
            }
          })
        );
      }
  
  }