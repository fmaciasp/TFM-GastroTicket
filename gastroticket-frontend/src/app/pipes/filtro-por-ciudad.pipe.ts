import { Pipe, PipeTransform } from '@angular/core';
import { CardDTO } from 'src/app/Models/card';

@Pipe({
  name: 'filtroPorCiudad'
})
export class FiltroPorCiudadPipe implements PipeTransform {
  transform(restaurantes: CardDTO[], ciudad: string): CardDTO[] {
    if (!ciudad) return restaurantes;
    return restaurantes.filter(restaurante => restaurante.ciudad === ciudad);
  }
}
