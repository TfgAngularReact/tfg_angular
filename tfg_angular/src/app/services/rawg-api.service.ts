import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RawgApiService {
  
  private apiKey: string = "99bbf21c81474c12a89581517f43ce31";

  constructor(private http: HttpClient) { }

  getGames(dates: string): Observable<any> {
    const url = `https://api.rawg.io/api/games?key=${this.apiKey}&dates=${dates}&ordering=-added`;
    return this.http.get(url);
  }

  getJuego(id: number): Observable<any> {
    const url = `https://api.rawg.io/api/games/${id}?key=${this.apiKey}`;
    return this.http.get(url);

  }
}
