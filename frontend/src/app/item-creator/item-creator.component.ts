import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../model/category';
import { ListService } from '../list.service';
import { FormsModule } from '@angular/forms';
import { Item, ItemToAdd } from '../model/item';

@Component({
    selector: 'app-item-creator',
    imports: [FormsModule],
    templateUrl: './item-creator.component.html',
    styleUrl: './item-creator.component.scss'
})
export class ItemCreatorComponent {
  selectedCategory?: Category;
  name?: string;

  @Input({ required: true })
  categories!: Category[];

  @Output()
  addItemEvt = new EventEmitter<ItemToAdd>();

  constructor() {}

  addItem() {
    if (this.name && this.selectedCategory) {
      this.addItemEvt.next({ item: { name: this.name, isNeeded: true }, categoryName: this.selectedCategory.name });
    } else {
      // TODO: handle case where no category is selected
      console.log('item name and category are mandatory');
    }
    this.name = '';
  }
}
