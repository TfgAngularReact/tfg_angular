import { Component } from '@angular/core';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  uid='';


  constructor(
    public firebaseauthService: FirebaseauthService, 
    private router :Router
) { 
this.firebaseauthService.stateAuth().subscribe(res => {
if (res!==null){
this.uid=res.uid;
}else {
}
});
}

  async salir(){
    // const uid = await this.firebaseauthService.getuid();
    console.log(this.uid);
    this.firebaseauthService.logout()
    console.log('Sesion cerrada correctamente')
    
    this.router.navigate(['/']);

  }

}
