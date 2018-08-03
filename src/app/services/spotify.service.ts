import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('provider spoti service listo!');
   }

  getQuery( query: string){
    
    // tslint:disable-next-line:max-line-length
    let token: string = '[{"key":"Authorization","value":"Bearer BQDNTeFK4xdjeWBlBWYTtLrvQugWTPaya8bOQGHa5zrff7HG6gIooHvjYzbxvL6KwBkTAU-_veW0-3WcY5YN2KT3jKHQwrMrLKcjXxVZwgwKPWUTTjIVzmHXPa7Z4Qpj57j33EcKzmrPeg","description":""}]';
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
      'Authorization': '[{"key":"Authorization","value":"Bearer '+ token +'","description":""}]'
    });

    return this.http.get(url, { headers });
  }
  
  
    getNewReleases() {
    
      return this.getQuery('browse/new-releases')
      .pipe( map( (data: any) => { /* el data asi o como esta abajo*/
        return data.albums.items;
      }));
    }

    getArtista(termino: string) {

      return this.getQuery(`search?q=${termino}&type=artist`)
              .pipe( map( data => data['artists'].items ) ); /*si solo devuelve una linea se puede mostrar asi*/

    }

}
