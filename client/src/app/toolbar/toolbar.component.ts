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
    this.isSaveInProgress = true;
    this.listService.saveOnServer(
      () => this.onSaveListSuccess(),
      (error) => this.onSaveListFailure(error)
    );
  }

  onSaveListSuccess() {
    console.log('Save success');
    this.isSaveInProgress = false;
  }

  onSaveListFailure(error: unknown) {
    console.log('Error when saving, from toolbar: ' + error);
    alert('Error when saving');
    this.isSaveInProgress = false;
  }

  loadList() {
    if (confirm('Reload list: unsaved modifications will be lost. Continue?')) {
      this.isLoadInProgress = true;
      this.listService.loadFromServer(
        () => this.onLoadListSuccess(),
        (error) => this.onLoadListFailure(error)
      );
    }
  }

  onLoadListSuccess() {
    console.log('Load success');
    this.isLoadInProgress = false;
  }

  onLoadListFailure(error: unknown) {
    console.log('Error when loading, from toolbar: ' + error);
    alert('Error when loading');
    this.isLoadInProgress = false;
  }
}