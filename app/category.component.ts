import { Component, Input } from '@angular/core';
import { Category }   from './category';
import { MyListService }   from './mylist.service';
@Component({
  selector: 'my-category',
  templateUrl: './app/category.component.html'
})
export class CategoryComponent {
    @Input()
    category: Category; 

    constructor(private myListService:MyListService) {
    }

    // renameCategory(event){
    //   this.category.name = "renamed";
    //   // TODO
    // }
  
    deleteCategory(event){
      this.myListService.deleteCategory(this.category);
    }

    moveCategoryUp(event){
      this.myListService.moveCategoryUp(this.category);
    }

    moveCategoryDown(event){
      this.myListService.moveCategoryDown(this.category);
    }
}

