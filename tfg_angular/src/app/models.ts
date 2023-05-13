import { Timestamp } from "firebase/firestore";

export interface Usuario{

    email: string;
    nickname: string;
    uid: string;
    likes: Array<string>;
    fechaRegistro:Timestamp;
    listas: Array<string>; //Array con los id de las listas
    reseñas:Array<string>;
    jugados:Array<string>;
    seguidos: Array<string>;
    seguidores: Array<string>;

}
export interface lista{
  id: string;
  name: string;
  juegos: Array<string>;
  fechaCreacion: Timestamp;
  num_likes: number;
}

export interface reseña{
  id: string;
  name: string;
  id_juego: string;
  fechaCreacion: Timestamp;
  num_likes: number;
  texto: string;
  usuario: string;
  puntuacion: number;
}

export interface game{


        added: number;
        added_by_status: {
          yet: number;
          owned: number;
          beaten: number;
          toplay: number;
          dropped: number;
          playing?: number;
        };
        background_image: string;
        clip: {
          clip: string;
          clips: {
            320: string;
            640: string;
            full: string;
          };
          video: string;
          preview: string;
        };
        dominant_color: string;
        esrb_rating: {
          id: number;
          name: string;
          slug: string;
          name_en: string;
          name_ru: string;
        };
        genres: {
          id: number;
          name: string;
          slug: string;
        }[];
        id: number;
        metacritic: number;
        name: string;
        parent_platforms: {
          platform: {
            id: number;
            name: string;
            slug: string;
          };
        }[];
        platforms: {
          platform: {
            id: number;
            name: string;
            slug: string;
          };
        }[];
        playtime: number;
        rating: number;
        rating_top: number;
        ratings: {
          id: number;
          title: string;
          count: number;
          percent: number;
        }[];
        ratings_count: number;
        released: string;
        reviews_count: number;
        reviews_text_count: number;
        saturated_color: string;
        score: null;
        short_screenshots: {
          id: number;
          image: string;
        }[];
        slug: string;
        stores: {
          id: number;
          store: {
            id: number;
            name: string;
            slug: string;
          };
        }[];
        suggestions_count: number;
        tags: {
          id: number;
          name: string;
          slug: string;
          language: string;
          games_count: number;
          image_background: string;
        }[];
        tba: boolean;
        updated: string;
        user_game: null;
      
}

export interface juego{
id: string;
nombre: string; 
fecha_lanzamiento:Timestamp; 
generos:Array<String>; 
plataformas: Array<string>; 
portada:string; 
imagenes:Array<string>; 
tiendas:Array<string>; 
descripcion: string;
reseñas: Array<string>;
num_likes: number;
num_jugados: number;
puntuacion: number;
listas: Array<string>;

}
