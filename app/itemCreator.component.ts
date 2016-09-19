import { Component, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Category }   from './category';
import { Item }   from './item';
import { MyListService }   from './mylist.service';
@Component({
  selector: 'item-creator',
  templateUrl:'./app/itemCreator.component.html' 
})
export class ItemCreatorComponent {

    categories: Category[];
    selectedCategory: Category;
    name: string;

    constructor(private myListService:MyListService) {
        this.categories = this.myListService.getCategories();
    }

    addItem(event){
        // TODO: handle case where no category is selected 
        this.myListService.addItem(new Item(this.name), this.selectedCategory);
        this.name = "";
    }
}