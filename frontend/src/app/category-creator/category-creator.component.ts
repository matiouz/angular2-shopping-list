import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-category-creator',
    imports: [FormsModule],
    templateUrl: './category-creator.component.html',
    styleUrl: './category-creator.component.scss'
})
export class CategoryCreatorComponent {
  name?: string;

  @Output()
  addCategoryEvt = new EventEmitter<string>();

  constructor() {}

  addCategory() {
    if (this.name) {
      this.addCategoryEvt.next(this.name);
    } else {
      //TODO: add check for empty category name
      console.log('category name is mandatory');
    }
    this.name = '';
  }
}
