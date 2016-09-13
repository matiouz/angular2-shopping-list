import { Component, Input } from '@angular/core';
import { Item }   from './item';
@Component({
  selector: 'my-item',
  templateUrl: './app/item.component.html'
})
export class ItemComponent {
    @Input()
    item: Item; 
 }

