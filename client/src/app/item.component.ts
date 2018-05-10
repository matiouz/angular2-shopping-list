import { Component, Input } from '@angular/core';
import { Item }   from './item';
import { MyListService }   from './mylist.service';
@Component({
  selector: 'my-item',
  templateUrl: './item.component.html'
})
export class ItemComponent {
    @Input()
    item: Item; 

    constructor(public myListService:MyListService) {
    }

    // renameItem(event){
    //   this.item.name = "renamed";
    // }

    saveItem(){
      this.myListService.saveItem(this.item);
    }

    deleteItem(event){
      this.myListService.deleteItem(this.item);
    }

    moveItemUp(event){
      this.myListService.moveItemUp(this.item);
    }

    moveItemDown(event){
      this.myListService.moveItemDown(this.item);
    }

 }

