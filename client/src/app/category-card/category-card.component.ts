import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../model/category';
import { ItemCardComponent } from '../item-card/item-card.component';
import { FormsModule } from '@angular/forms';
import { Item } from '../model/item';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [FormsModule, ItemCardComponent],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input({ required: true })
  category!: Category;

  @Input({ required: true })
  isEditionMode!: boolean;

  @Input({ required: true })
  isDisplayNotNeededItems!: boolean;

  @Output()
  categoryChange = new EventEmitter<Category>(); // for 2 ways binding, it must be called <property name>Change

  @Output()
  deleteCategoryEvt = new EventEmitter<Category>();

  @Output()
  moveCategoryUpEvt = new EventEmitter<Category>();

  @Output()
  moveCategoryDownEvt = new EventEmitter<Category>();

  constructor() {}

  saveCategory() {
    this.categoryChange.emit(this.category); // we emit the same js object. For immutability, we should emit a new object
  }

  deleteCategory() {
    this.deleteCategoryEvt.emit(this.category);
  }

  moveCategoryUp() {
    this.moveCategoryUpEvt.emit(this.category);
  }

  moveCategoryDown() {
    this.moveCategoryDownEvt.emit(this.category);
  }

  itemUpdated(event: Item) {
    // we emit the same js object. For immutability, we should emit a new object
    this.categoryChange.emit(this.category);
  }

  deleteItem(item: Item) {
    // we emit the same js object. For immutability, we should emit a new object
    for (let i = 0; i < this.category.items.length; i++) {
      if (this.category.items[i] == item) {
        this.category.items.splice(i, 1);
        break;
      }
    }
    this.categoryChange.emit(this.category);
  }

  moveItemUp(item: Item) {
    // we emit the same js object. For immutability, we should emit a new object
    // TODO: behaviour is not satisfying if already bought items are not displayed
    for (let i = 1; i < this.category.items.length; i++) {
      // No need to run the loop on the first item because the first item cannot be moved up
      if (this.category.items[i] == item) {
        this.category.items[i] = this.category.items[i - 1];
        this.category.items[i - 1] = item;
        break;
      }
    }
    this.categoryChange.emit(this.category);
  }

  moveItemDown(item: Item) {
    // we emit the same js object. For immutability, we should emit a new object
    // TODO: behaviour is not satisfying if already bought items are not displayed
    for (let i = 0; i < this.category.items.length - 1; i++) {
      // No need to run the loop on the last item because the last item cannot be moved down
      if (this.category.items[i] == item) {
        this.category.items[i] = this.category.items[i + 1];
        this.category.items[i + 1] = item;
        break;
      }
    }
    this.categoryChange.emit(this.category);
  }
}
