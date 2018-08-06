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
    const token = '[{"key":"Authorization","value":"Bearer BQDCoL9Nu4wk2pEl6DOT3v__OTU1un3L9n4fdBQoek8Guoxfy3ib5xHk10xCkFh5uyzz02SC_rW9LK2IwAzeSTINZF7JFTHWw-HInYQcggEwWF5r0nxmIIOo0csgFPtFY_OH3d9GNGPWIQ","description":""}]';
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

    getArtistas(termino: string) {

      return this.getQuery(`search?q=${termino}&type=artist`)
              .pipe( map( data => data['artists'].items ) ); /*si solo devuelve una linea se puede mostrar asi*/

    }

    getArtista(id: string) {

      return this.getQuery(`artists/${ id }`); 
              /*.pipe( map( data => data['artists'].items ) );*/
              /*si solo devuelve una linea se puede mostrar asi. NO ES NECESARIO EL PIPE PORQUE A DATA VIENE COMO LA QUIERO */

    }
    
    getArtistaToptracks(id: string) {

      return this.getQuery(`artists/${ id }/top-tracks?country=us`)
             .pipe( map( data => data['tracks'] ) ); 
            

    }

}
