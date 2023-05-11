import { Component } from '@angular/core';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { RawgApiService } from 'src/app/services/rawg-api.service';
import { Router } from '@angular/router';
import { game } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  uid='';
  games: game =  {
    added: 0,
    added_by_status: {
      yet: 0,
      owned: 0,
      beaten: 0,
      toplay: 0,
      dropped: 0
    },
    background_image: '',
    clip: {
      clip: '',
      clips: {
        320: '',
        640: '',
        full: ''
      },
      video: '',
      preview: ''
    },
    dominant_color: '',
    esrb_rating: {
      id: 0,
      name: '',
      slug: '',
      name_en: '',
      name_ru: ''
    },
    genres: [],
    id: 0,
    metacritic: 0,
    name: '',
    parent_platforms: [],
    platforms: [],
    playtime: 0,
    rating: 0,
    rating_top: 0,
    ratings: [],
    ratings_count: 0,
    released: '',
    reviews_count: 0,
    reviews_text_count: 0,
    saturated_color: '',
    score: null,
    short_screenshots: [],
    slug: '',
    stores: [],
    suggestions_count: 0,
    tags: [],
    tba: false,
    updated: '',
    user_game: null
  };
  descripcion: string;

  constructor(
    public firebaseauthService: FirebaseauthService, 
    private router :Router,
    private rawg: RawgApiService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
) { 


   this.descripcion = "";


  this.firebaseauthService.stateAuth().subscribe(res => {
   if (res!==null){
    this.uid=res.uid;
  }else {
   }
  });
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

 // this.firestoreService.getUsuario()
 this.obtenerjuegos()
  
}


  
 public obtenerjuegos(){
    this.rawg.getGames(`2019-09-01,2019-09-30`).subscribe( async (data:any)=>{
      let res = data.results;

      console.log("HOLA",res);
      
      for (let i = 0; i<res.length; i++){
        let juego = {id: "", nombre: "", fecha_lanzamiento:"", generos:[] as string[], plataformas: [] as string[], portada:"", imagenes:[] as string[], tiendas:[] as string[], descripcion: ""};

        this.games=res[i];
        let nombre = this.games.name;
        let generos = [];
        for (let n = 0; n<this.games.genres.length; n++){
          generos.push(this.games.genres[n].name);

        }
        
        let fecha_lanzamiento = this.games.released;
        let plataformas = [];
        for (let n = 0; n<this.games.platforms.length; n++){
          plataformas.push(this.games.platforms[n].platform.name);
        }

        let portada = this.games.background_image;
        let imagenes = [];

        for (let n = 0; n<this.games.short_screenshots.length; n++){
          imagenes.push(this.games.short_screenshots[n].image);
        }

        let tiendas = [];

        for (let n = 0; n<this.games.stores.length; n++){
          tiendas.push(this.games.stores[n].store.name);
        }

        await this.getJuegoDescripcion(this.games.id).toPromise().then((datos:any) => {
          console.log(datos);
          this.descripcion = datos.description_raw;

        }).catch(error=>{
          console.error(error);
        });

       // this.descripcion.replace("")

        juego.id = this.firestoreService.getId();
        juego.nombre=nombre;
        juego.fecha_lanzamiento = fecha_lanzamiento;
        juego.generos = generos;
        juego.portada = portada;
        juego.plataformas = plataformas;
        juego.imagenes = imagenes;
        juego.tiendas = tiendas;
        juego.descripcion = this.descripcion;


        const path = 'Juegos';
      
       // this.firestoreService.createDoc(juego, path, juego.id);
        
        }
      
    });
  }

  public getJuegoDescripcion(idJuego: number): Observable<string>{

    return this.rawg.getJuego(idJuego);
  }

  
  async salir(){
    // const uid = await this.firebaseauthService.getuid();
    console.log(this.uid);
    this.firebaseauthService.logout()
    console.log('Sesion cerrada correctamente')
    
    this.router.navigate(['/']);

  }

}
