import { Component, Input } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'componente-lista',
  templateUrl: './componente-lista.component.html',
  styleUrls: ['./componente-lista.component.css']
})
export class ComponenteListaComponent {

  @Input() lista: any;

  juegos: any;
  numeros: any;
  constructor(
    private firestoreService: FirestoreService,
  ){
    this.numeros=[0,1,2]
  }


  ngOnInit(): void {
    if(this.lista.juegos.length>0){
      this.loadJuegos()
    }
    
  }

  loadJuegos(){
    this.firestoreService.getColleccion("Juegos","in","id",this.lista.juegos).subscribe((data)=>{
      this.juegos = data.slice(0,4);
    })
  }
}
