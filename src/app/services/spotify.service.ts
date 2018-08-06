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
    const token = '[{"key":"Authorization","value":"Bearer BQB8Ud6bQuPa6bke92NrTI-5p_DEaJ-0stI1AsyAL57VGZWKVeYDm8HYXC1chaHRITfGNL88Nd0gMbugk8AqWS4urxB9-H1nIDyftRWu65ezGwanDEHH3F6s4Mx7un50pFBgP59-BHDZaQ","description":""}]';
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
