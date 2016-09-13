import { Component, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Category }   from './category';
@Component({
  selector: 'category-creator',
  templateUrl:'./app/categoryCreator.component.html' 
})
export class CategoryCreatorComponent {

    @Input()
    categories: Category[];
    // TODO: categories devrait etre un service plutot qu'un parametre du composant

    newname: string;

    addCategory(event){
        this.categories.push(new Category(this.newname));
    }
}