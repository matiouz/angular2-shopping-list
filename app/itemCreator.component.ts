import { Component, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Category }   from './category';
import { Item }   from './item';
@Component({
  selector: 'item-creator',
  templateUrl:'./app/itemCreator.component.html' 
})
export class ItemCreatorComponent {

    @Input()
    categories: Category[];
    // TODO: categories devrait etre un service plutot qu'un parametre du composant

    newname: string;
    selectedCategory: Category;

    addItem(event){
        // TODO: handle case where no category is selected 
        this.selectedCategory.items.push(new Item(newname.value));
    }
}