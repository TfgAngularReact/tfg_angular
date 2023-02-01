import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfg_angular';

  margen: boolean=false;

  toggleMenu():void{
    this.margen = !this.margen;
    console.log(this.margen);
  }


}
