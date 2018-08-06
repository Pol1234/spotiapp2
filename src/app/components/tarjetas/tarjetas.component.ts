import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent {

  @Input() items: any[]= [];
  constructor( private sanitizer: DomSanitizer , private router: Router) {
    
   }

   sanitizerUrl(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  verArtista( item:any ){
    let artistaId;

    if ( item.type ==='artist'){
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }

    this.router.navigate(['/artist', artistaId ]);

  }



}
