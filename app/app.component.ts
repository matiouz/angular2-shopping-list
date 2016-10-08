import {Component, OnInit} from '@angular/core'
import { Category }   from './category';
import { Item }   from './item';
import { MyListService } from './mylist.service';
@Component({
  selector: 'my-app',
  templateUrl:'./app/app.component.html', 
  providers: [MyListService]
})
export class AppComponent implements OnInit{

    categories: Category[];

    constructor(private myListService:MyListService) {
      
      //this.categories = myListService.getCategories();
    }

    ngOnInit(){

      // The service will notify the component when the list of categories changes (ie not the content changes, but the list points to a different array)
      this.myListService.categoriesStream.subscribe(
        categories => {
          this.categories = categories;
        }
      )

      // Initially, the service loads from the localStorage
      this.myListService.load();
    }
 }

