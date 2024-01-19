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
  itemChange = new EventEmitter<Item>(); // for 2 ways binding, it must be called <property name>Change

  @Output()
  deleteItemEvt = new EventEmitter<Item>();

  @Output()
  moveItemUpEvt = new EventEmitter<Item>();

  @Output()
  moveItemDownEvt = new EventEmitter<Item>();

  constructor() {}

  itemUpdated() {
    this.itemChange.emit(this.item); // we emit the same js object. For immutability, we should emit a new object
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
