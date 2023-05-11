import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';
import { juego } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddListaDialogComponent } from '../add-lista-dialog/add-lista-dialog.component';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent {

idJuego:string;
juego: juego;

constructor(    
  private route: ActivatedRoute,
  private firestoreService: FirestoreService,
  private dialog: MatDialog
  ){
  this.idJuego = route.snapshot.params['id'];
  this.juego = {
    id:'', 
    nombre:'', 
    fecha_lanzamiento: Timestamp.now(), 
    generos:[], 
    plataformas:[], 
    portada:'', 
    imagenes:[], 
    tiendas:[], 
    descripcion:'', 
    reseñas:[], 
    num_likes:0,
    puntuacion:0};

}

ngOnInit(): void {
  this.loadJuego();

}

loadJuego(){
  this.firestoreService.getDoc<juego>('Juegos', this.idJuego).subscribe(res =>{
    if(res){
      this.juego = res;
      console.log(this.juego);

    }else{
      console.log("Error documento no encontrado");
    }

  });

}

getBackgroundImageStyle() {
  const backgroundImage = this.juego?.portada ? `linear-gradient(0deg, rgb(6, 16, 31) 20%, rgba(6, 16, 31, 0.6)), url(${this.juego.portada})` : '';
  return {
    'background-image': backgroundImage
  };
}

openDialogAddLista(): void {
  const dialogRef = this.dialog.open(AddListaDialogComponent, {
    width: '250px',
    data: { juego: this.juego } // Puedes pasar datos al diálogo mediante la opción `data`
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('El diálogo se cerró');
    console.log('Resultado:', result);
  });
}
}
