import { Component } from '@angular/core';
import { ListService } from '../list.service';
import { FormsModule } from '@angular/forms';
import { CategoryCreatorComponent } from '../category-creator/category-creator.component';
import { ItemCreatorComponent } from '../item-creator/item-creator.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [FormsModule, CategoryCreatorComponent, ItemCreatorComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  isLoadInProgress: boolean = false;
  isSaveInProgress: boolean = false;

  constructor(public listService: ListService) {}

  saveList() {
    this.listService.saveToLocalStorage();
  }

  loadList() {
    this.listService.loadFromLocalStorage();
  }
}
