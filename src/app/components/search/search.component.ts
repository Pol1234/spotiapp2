import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent  {

  artistas: any [] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService) { 
    
  }

  
  
  buscar(termino: string){
    this.error= false;
    this.loading = true;
    this.spotify.getArtistas( termino )
    .subscribe( (data: any) => {
      console.log(data);
      this.artistas = data;
      this.loading = false;
    }, (errorServicio)=>{
      this.loading= false;
      this.mensajeError= errorServicio.error.error.message;
      this.error= true;
    });
  }

}
