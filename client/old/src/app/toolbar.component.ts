import { Component } from '@angular/core';
import { MyListService } from './mylist.service';
@Component({
  selector: 'toolbar',
  templateUrl:'./toolbar.component.html' 
})
export class ToolbarComponent {

    isLoadInProgress: boolean = false;
    isSaveInProgress: boolean = false;

    constructor(public myListService:MyListService) {
    }

    saveList(){
        this.isSaveInProgress = true;
        this.myListService.saveOnServer(
            () => this.onSaveListSuccess() , 
            (error) => this.onSaveListFailure(error));
    }

    onSaveListSuccess(){
        this.isSaveInProgress = false;
    }

    onSaveListFailure(error){
        console.log("Error when saving, from toolbar: " + error)
        alert("Error when saving");
        this.isSaveInProgress = false;
    }

    loadList(){
        if (confirm("Reload list: unsaved modifications will be lost. Continue?")){
            this.isLoadInProgress = true;
            this.myListService.loadFromServer( 
                () => this.onLoadListSuccess() , 
                (error) => this.onLoadListFailure(error));
        }
    }

    onLoadListSuccess(){
        this.isLoadInProgress = false;
    }

    onLoadListFailure(error){
        console.log("Error when loading, from toolbar: " + error)
        alert("Error when loading");
        this.isLoadInProgress = false;
    }

 }

