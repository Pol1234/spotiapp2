import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('provider spoti service listo!');
   }

  getQuery( query: string){

    // tslint:disable-next-line:max-line-length
    
    let token : string = 'BQBUGDTmgRjCkALaa3NJ88HNg71ILu0EiTGRJLLawWOTYNhBFYE7UyZPjrzq8oxuIS70GWBIkX8aWMSdfgQ6lDNsHrIejF7jFfVfoevbvQBH2a0OJpywtCQKCmKgu18AqNKI1dSgMJHbKQ';

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
      'Authorization': '[{"key":"Authorization","value":"Bearer '+ token +'","description":""}]'
    });

    return this.http.get(url, { headers });
  }
  
  
  getNewReleases() {
  
    return this.getQuery('browse/new-releases')
    .pipe( map( data => {
      return data['albums'].items;
    }));
  }

  getArtista(termino: String) {

    return this.http.getQuery('search?q=${ termino }&type=artist')
            .pipe( map( data=> {
              return data['artists'].items;
            }));

  }

}
