import { Component } from '@angular/core';
import { FirebaseauthService } from '../../services/firebaseauth.service';
import { RawgApiService } from 'src/app/services/rawg-api.service';
import { Router } from '@angular/router';
import { game } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ActivatedRoute } from '@angular/router';

import { forkJoin, from, map, Observable, of, Subscription, switchMap } from 'rxjs';

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

  usuario:any;

  resenas:any;
  jugados:any;
  isYourUser: boolean;
  num_jugados:any;
  listas:any;
  num_listas:any;
  num_resenas: any;
  listaJuegos: any;
  stateAuth: boolean;
  datosResenas: any;
  tuUsuario: any;


  constructor(
    public firebaseauthService: FirebaseauthService, 
    private router :Router,
    private rawg: RawgApiService,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
) { 
   this.num_listas=0;
   this.num_jugados=0;
   this.num_resenas=0;
   this.stateAuth = false;



   this.descripcion = "";
   this.isYourUser = false;
   this.uid = route.snapshot.params['id'];
   this.getUsuario();
   this.firebaseauthService.stateAuth().subscribe(res => {
   if (res!==null){
    if(this.uid ==res.uid){
      this.isYourUser=true;
      this.loadTuUsuario(res.uid);
    }

   }
  });

}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

 

 //this.obtenerjuegos()
  
}
loadTuUsuario(uid: any){
  this.firestoreService.getDoc('Usuarios', uid).subscribe((res:any)=>{
    this.tuUsuario = res;
  });

}


getUsuario(){
  this.firestoreService.getDoc('Usuarios', this.uid).subscribe((res:any)=>{
    this.usuario = res;
    this.num_jugados=this.usuario.jugados.length;
    this.isAuth();
    this.loadResenas();
    this.loadJugados();
    this.loadListas();

  });
}

isAuth(){
  this.firebaseauthService.stateAuth().subscribe((data:any)=>{
    if(data!== null){
      this.stateAuth=true;
    }
  });
}
  

loadResenas(){
  this.firestoreService.getResenasPerfil(this.uid).subscribe((data:any)=> {
    this.resenas = data;
    this.num_resenas = this.resenas.length;

    let mapita = new Map();
    this.resenas.forEach((doc: any) =>{
          this.firestoreService.getJuegobyResena(doc.id_juego)
          .subscribe((response: any) => {
            this.datosResenas= mapita.set(doc,response);
          });
  
        });
    
  });

}


loadJugados(){
  this.firestoreService.getJugadosPerfil(this.usuario.jugados).subscribe((data:any)=>{
    this.jugados = data;
  });
}

 loadListas(){
  this.firestoreService.getColleccion("Listas", "==", "uid", this.usuario.uid).subscribe( (data:any)=>{
    this.listas = data;
    this.num_listas = this.listas.length;
    this.loadJuegosListas();
  });
}

loadJuegosListas(){
   let mapita = new Map();
  this.listas.forEach((doc: any) =>{
        this.firestoreService.getColleccion('Juegos', 'in', 'id', doc.juegos)
        .subscribe((response: any) => {
          this.listaJuegos= mapita.set(doc,response);
        });

      });

}
getLimitedMap(map: Map<any, any>, limit: number): Map<any, any> {
  const limitedMap = new Map();
  let count = 0;
  for (let [key, value] of map) {
    limitedMap.set(key, value);
    count++;

    if (count === limit) {
      break;
    }
  }
  return limitedMap;
}


isliked(id_resena:string){

  return this.usuario.resenas_like.includes(id_resena);


}

like(resena: any){
  console.log(resena);
  if(!this.tuUsuario.resenas_like.includes(resena.id)){
    resena.num_likes+=1;
    this.tuUsuario.resenas_like.push(resena.id);
    try{
      this.firestoreService.updateDoc(resena,'Resenas',resena.id);

      this.firestoreService.updateDoc(this.tuUsuario, 'Usuarios', this.uid);
    }catch(e){
      console.log('Error', e);
    }

  }
  else{
    resena.num_likes -= 1;

    const elementoAEliminar = resena.id;
    const indice = this.tuUsuario.resenas_like.indexOf(elementoAEliminar);
    if (indice !== -1) {
      this.tuUsuario.resenas_like.splice(indice, 1);
    }
    try{
      this.firestoreService.updateDoc(resena,'Resenas',resena.id);

      this.firestoreService.updateDoc(this.tuUsuario, 'Usuarios', this.uid);
    }catch(e){
      console.log('Error', e);
    }
  }
}

/*public obtenerjuegos(){
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
  }*/

 /* public getJuegoDescripcion(idJuego: number): Observable<string>{

    return this.rawg.getJuego(idJuego);
  }
*/
  
  async salir(){
    // const uid = await this.firebaseauthService.getuid();
    console.log(this.uid);
    this.firebaseauthService.logout()
    console.log('Sesion cerrada correctamente')
    
    this.router.navigate(['/']);

  }

}
