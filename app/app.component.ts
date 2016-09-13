import { Component } from '@angular/core';
import { Category }   from './category';
import { Item }   from './item';
@Component({
  selector: 'my-app',
  templateUrl:'./app/app.component.html' 
})
export class AppComponent {
    public variable1 = "A string from app component"; 

    categories: Category[];

    constructor() {
      this.categories = [];

      let items1 = [ new Item("item1"), new Item("item2")];
      let category1 = new Category("cat 1", items1);
      let items2 = [ new Item("item3"), new Item("item4")];
      let category2 = new Category("cat 2", items2);
      this.categories.push(category1);
      this.categories.push(category2);
    }


 }

