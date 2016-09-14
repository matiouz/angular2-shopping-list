import { Component } from '@angular/core';
import { Category }   from './category';
import { Item }   from './item';
import { MyListService } from './mylist.service';
@Component({
  selector: 'my-app',
  templateUrl:'./app/app.component.html', 
  providers: [MyListService]
})
export class AppComponent {

    categories: Category[];

    constructor(private myListService:MyListService) {
      this.categories = myListService.getCategories();
    }
 }

