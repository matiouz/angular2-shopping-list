import { Component, Input } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { ListService } from '../list.service';
import { AsyncPipe } from '@angular/common';
import { Category } from '../model/category';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CategoryCardComponent, AsyncPipe],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
})
export class CategoriesListComponent {
  constructor(public listService: ListService) {}

  @Input({ required: true })
  categories!: Category[];

  categoryUpdated(category: Category) {
    this.listService.saveToLocalStorage();
  }

  deleteCategory(category: Category) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] == category) {
        this.categories.splice(i, 1);
      }
    }
    this.listService.saveToLocalStorage();
  }

  moveCategoryUp(category: Category) {
    for (let i = 1; i < this.categories.length; i++) {
      // No need to run loop on fist category because it cannot be moved up
      if (this.categories[i] == category) {
        this.categories[i] = this.categories[i - 1];
        this.categories[i - 1] = category;
        break;
      }
    }
    this.listService.saveToLocalStorage();
  }

  moveCategoryDown(category: Category) {
    for (let i = 0; i < this.categories.length - 1; i++) {
      // No need to run loop on last category because it cannot be moved down
      if (this.categories[i] == category) {
        this.categories[i] = this.categories[i + 1];
        this.categories[i + 1] = category;
        break;
      }
    }
    this.listService.saveToLocalStorage();
  }
}
