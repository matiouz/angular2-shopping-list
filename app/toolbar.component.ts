import { Component } from '@angular/core';
import { MyListService } from './mylist.service';
@Component({
  selector: 'toolbar',
  templateUrl:'./app/toolbar.component.html' 
})
export class ToolbarComponent {

    constructor(private myListService:MyListService) {
    }

    saveList(){
        this.myListService.save();
    }

    loadList(){
        this.myListService.load();
    }

 }

