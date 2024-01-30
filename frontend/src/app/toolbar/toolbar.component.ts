import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListService } from '../list.service';
import { FormsModule } from '@angular/forms';
import { CategoryCreatorComponent } from '../category-creator/category-creator.component';
import { ItemCreatorComponent } from '../item-creator/item-creator.component';
import { ItemToAdd } from '../model/item';
import { Category } from '../model/category';

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

  @Input()
  categories!: Category[];

  @Output()
  displayConfigEvt = new EventEmitter();

  constructor(public listService: ListService) {}

  displayConfig() {
    this.displayConfigEvt.emit();
  }

  saveList() {
    this.isSaveInProgress = true;
    this.listService.saveOnServer(
      () => this.onSaveListSuccess(),
      (error) => this.onSaveListFailure(error)
    );
  }

  addCategory(name: string) {
    this.categories.push({ name: name, items: [] });
    this.listService.saveToLocalStorage();
  }

  addItem(itemToAdd: ItemToAdd) {
    this.categories.find((c) => c.name == itemToAdd.categoryName)?.items.push(itemToAdd.item);
    this.listService.saveToLocalStorage();
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
    this.listService.saveToLocalStorage();
    console.log('Load success');
    this.isLoadInProgress = false;
  }

  onLoadListFailure(error: unknown) {
    console.log('Error when loading, from toolbar: ' + error);
    alert('Error when loading');
    this.isLoadInProgress = false;
  }
}
