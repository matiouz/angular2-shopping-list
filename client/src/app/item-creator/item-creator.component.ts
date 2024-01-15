import { Component } from '@angular/core';
import { Category } from '../model/category';
import { ListService } from '../list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-creator.component.html',
  styleUrl: './item-creator.component.scss'
})
export class ItemCreatorComponent {

  selectedCategory?: Category;
  name?: string;

  constructor(public listService:ListService) {
  }

  addItem(){
    if (this.name && this.selectedCategory){
      this.listService.addItem(this.name, this.selectedCategory);
    } else {
        // TODO: handle case where no category is selected 
        console.log("item name and category are mandatory")
      }
      this.name = "";
  }
}
