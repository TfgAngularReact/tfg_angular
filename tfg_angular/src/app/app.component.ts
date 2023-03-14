import { Component } from '@angular/core';
import { FirebaseauthService } from './services/firebaseauth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tfg_angular';

  margen: boolean=false;
  auth = false;


  constructor(private firebaseauthService: FirebaseauthService){
    this.getUid();
  }



  toggleMenu():void{
    this.margen = !this.margen;
    console.log(this.margen);
  }

  getUid(){ 
    this.firebaseauthService.stateAuth().subscribe(res =>{
      if(res !== null){
        this.auth=true;
      }
      else{
        this.auth=false;
      }
    });
  }

}
