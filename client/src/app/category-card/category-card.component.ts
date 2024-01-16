import { Component, Input } from '@angular/core';
import { Category } from '../model/category';
import { ListService } from '../list.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { FormsModule } from '@angular/forms';

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
}
