import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noimages'
})
export class NoimagesPipe implements PipeTransform {

  transform(images: any[]): string {    
    

    return ( !images || images.length <1 ) ? 'assets/img/noimage.png' : images[0].url;

  }

}
