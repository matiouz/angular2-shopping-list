import { Component, Input } from '@angular/core';
import { Category } from '../model/category';
import { ListService } from '../list.service';
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

  constructor(public listService: ListService) {}

  saveCategory() {
    this.listService.saveToLocalStorage();
  }

  deleteCategory() {
    this.listService.deleteCategory(this.category);
  }

  moveCategoryUp() {
    this.listService.moveCategoryUp(this.category);
  }

  moveCategoryDown() {
    this.listService.moveCategoryDown(this.category);
  }

  itemUpdated(event: Item) {
    this.listService.saveToLocalStorage(); //TODO: instead, send event to parent
  }

  deleteItem(item: Item) {
    for (let i = 0; i < this.category.items.length; i++) {
      if (this.category.items[i] == item) {
        this.category.items.splice(i, 1);
        break;
      }
    }
    this.listService.saveToLocalStorage();
  }

  moveItemUp(item: Item) {
    // TODO: behaviour is not satisfying if already bought items are not displayed
    for (let i = 1; i < this.category.items.length; i++) {
      // No need to run the loop on the first item because the first item cannot be moved up
      if (this.category.items[i] == item) {
        this.category.items[i] = this.category.items[i - 1];
        this.category.items[i - 1] = item;
        break;
      }
    }
    this.listService.saveToLocalStorage();
  }

  moveItemDown(item: Item) {
    // TODO: behaviour is not satisfying if already bought items are not displayed
    for (let i = 0; i < this.category.items.length - 1; i++) {
      // No need to run the loop on the last item because the last item cannot be moved down
      if (this.category.items[i] == item) {
        this.category.items[i] = this.category.items[i + 1];
        this.category.items[i + 1] = item;
        break;
      }
    }
    this.listService.saveToLocalStorage();
  }
}
