import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../model/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input({ required: true })
  item!: Item;

  @Input({ required: true })
  isEditionMode!: boolean;

  @Output()
  itemUpdatedEvt = new EventEmitter<Item>();

  @Output()
  deleteItemEvt = new EventEmitter<Item>();

  @Output()
  moveItemUpEvt = new EventEmitter<Item>();

  @Output()
  moveItemDownEvt = new EventEmitter<Item>();

  constructor() {}

  itemUpdated() {
    this.itemUpdatedEvt.emit(this.item);
  }

  deleteItem() {
    this.deleteItemEvt.emit(this.item);
  }

  moveItemUp() {
    this.moveItemUpEvt.emit(this.item);
  }

  moveItemDown() {
    this.moveItemDownEvt.emit(this.item);
  }
}
