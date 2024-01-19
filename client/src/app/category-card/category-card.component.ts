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

  deleteItem(event: Item) {
    console.log(event);
    this.listService.deleteItem(event);
  }

  moveItemUp(event: Item) {
    this.listService.moveItemUp(event);
  }

  moveItemDown(event: Item) {
    this.listService.moveItemDown(event);
  }
}
