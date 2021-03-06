import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

nuevasCanciones: any[] = [];
loading:boolean;
error: boolean;
mensajeError: string;

  constructor( private spotify: SpotifyService, private sanitizer: DomSanitizer) {
      this.error= false;
      this.loading= true;

      this.spotify.getNewReleases()
      .subscribe( (data:any) =>{ /*al no saber como viene albums , en que formato, pongo data:any*/
        console.log(data);
        this.nuevasCanciones = data;
        this.loading= false;

      }, (errorServicio)=>{
        this.loading= false;
        this.mensajeError= errorServicio.error.error.message;
        this.error= true;
      });
     
  }

  sanitizerUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}
