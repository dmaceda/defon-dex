import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() pokemon: any;
  @Input() img: string = '';
  @Input() hp: string = '';
  @Input() exp: string = '';
  @Input() attack: string = '';
  @Input() defense: string = '';
  @Input() speed: string = '';
  @Input() type: string = '';
}
