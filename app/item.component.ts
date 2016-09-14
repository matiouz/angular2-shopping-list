import { Component, Input } from '@angular/core';
import { Item }   from './item';
import { MyListService }   from './mylist.service';
@Component({
  selector: 'my-item',
  templateUrl: './app/item.component.html'
})
export class ItemComponent {
    @Input()
    item: Item; 

    constructor(private myListService:MyListService) {
    }

    renameItem(event){
      this.item.name = "renamed";
    }

    deleteItem(event){
      this.myListService.deleteItem(this.item);
    }

    moveItemUp(event){
    }

    moveItemDown(event){
    }

 }

