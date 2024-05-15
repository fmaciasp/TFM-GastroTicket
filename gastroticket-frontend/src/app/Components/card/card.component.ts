import { Component, Input } from '@angular/core';
import { CardDTO } from 'src/app/Models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() item: CardDTO = {
    id: -1,
    nombre: '',
    ciudad: '',
    direccion: ''
  };

}
