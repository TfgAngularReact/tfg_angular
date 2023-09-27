import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  juegos: any
  parametro: any

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService
        ) {
          this.juegos = [];
         }
  
  

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.parametro = params.get('busqueda');
      // Hacer algo con el valor del parámetro aquí
      this.loadJuegos();
    });
  }

  loadJuegos(){
    this.firestoreService.getColeccionCompleta("Juegos").subscribe((res:any) =>{
      res.forEach((doc:any) => {
        if(doc.nombre.toLowerCase().includes(this.parametro.toLowerCase())){
            this.juegos.push(doc)
            console.log(this.juegos)
        }
    });
    });
  }
}
