import { Component, Input } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { Category }   from './category';
import { MyListService }   from './mylist.service';
@Component({
  selector: 'category-creator',
  templateUrl:'./app/categoryCreator.component.html'
})
export class CategoryCreatorComponent {

    name: string;
    constructor(private myListService:MyListService) {
    }

    addCategory(event){
        this.myListService.addCategory(new Category(this.name));
        this.name = "";
    }
}