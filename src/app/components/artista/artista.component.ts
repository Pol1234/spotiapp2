import { Component } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent {

  artista: any = {};
  loadingArtist:boolean;
  topTracks: any[]=[];
  error: boolean;

  constructor( private router: ActivatedRoute, private spotify: SpotifyService) {

    this.router.params.subscribe( params => {
      this.getArtista( params['id'] );
      this.getTopTracks( params['id'] );
    });

  }

  getArtista( id: string ){
    this.loadingArtist= true;
    this.spotify.getArtista( id )
    .subscribe(artista => {
      this.artista= artista;
      this.loadingArtist= false;
      console.log(artista);
    });
  }

  getTopTracks( id: string){
    this.spotify.getArtistaToptracks( id )
    .subscribe( topTracks =>{
     this.topTracks= topTracks;
     console.log(topTracks);
    }, (errorServicio)=>{
      this.error= true;
    });

  }



}
