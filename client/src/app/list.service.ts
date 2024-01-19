import { Injectable } from '@angular/core';
import { type Category } from './model/category';
import { ListBackendService } from './list-backend.service';
import { BehaviorSubject } from 'rxjs';
import { Item } from './model/item';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  addCategory(name: string) {
    // TODO: we should emit a new array, not modify the existing one
    this.categoriesSubject.getValue().push({ name: name, items: [] });
    this.saveToLocalStorage();
  }

  addItem(item: Item, categoryName: string) {
    // TODO: we should emit a new array of categories, not modify the existing one
    this.categoriesSubject
      .getValue()
      .find((c) => c.name == categoryName)
      ?.items.push(item);
    this.saveToLocalStorage();
  }

  sampleCategories: Category[] = [
    {
      name: 'cat1',
      items: [
        { name: 'item1', isNeeded: true },
        { name: 'item2', isNeeded: false },
      ],
    },
    {
      name: 'cat2',
      items: [
        { name: 'item3', isNeeded: true },
        { name: 'item4', isNeeded: false },
      ],
    },
  ];

  // Global settings. Since it's only 2 properties, we leave them in this service
  isEditionMode: boolean = false;
  isDisplayNotNeededItems: boolean = true;

  listURL: string = 'http://localhost:3002/lists/list1.json';
  // listURL: string = "http://142.3.32.98:3002/lists/list1.json";

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private listBackendService: ListBackendService) {}

  // When we add/remove/reorder items in the category and items arrays, angular detects it
  // this is because ngFor detects and rerenders elements from an array that are added/removed/reordered:
  // https://malcoded.com/posts/angular-ngfor/
  //    Generally, re-rendering of the list occurs in one of three cases:
  //      When an element is added to the array
  //      When an element is removed from the array
  //      When items are reordered

  // to make things clearner, we should ideally make the structure immutable, by making a deep copy of categories/items,
  // and emit a new array each time a category or an item is updated/added/deleted
  // but this seems to complicated for our need, and would cause a lot of rerendering ...

  saveToLocalStorage() {
    const categories = this.categoriesSubject.getValue();
    const categoriesAsString = this.serializeCategories(categories);
    localStorage.setItem('shoppingList', categoriesAsString);
  }

  loadFromLocalStorage() {
    const categoriesAsString = localStorage.getItem('shoppingList');

    let cats = [];
    if (categoriesAsString != null) {
      cats = this.deserializeCategories(categoriesAsString);
    } else {
      cats = this.sampleCategories; // temporary, to work with sample data
    }
    this.categoriesSubject.next(cats);
  }

  serializeCategories(categories: Category[]): string {
    return JSON.stringify(categories, ['name', 'items', 'isNeeded'], 2);
  }

  deserializeCategories(serializedCategories: string): Category[] {
    const loadedCategories = <Category[]>JSON.parse(serializedCategories);

    return loadedCategories;
  }

  saveOnServer(successHandler: () => void, errorHandler: (arg: unknown) => void) {
    const categories = this.categoriesSubject.getValue();
    this.listBackendService
      .saveCategories(this.listURL, categories)
      .subscribe({ next: successHandler, error: errorHandler });
  }

  loadFromServer(successHandler: () => void, errorHandler: (arg: unknown) => void) {
    this.listBackendService.getCategories(this.listURL).subscribe({
      next: (serverCategories: Category[]) => {
        this.categoriesSubject.next(serverCategories); // there may be a cleaner way to emit a value from another observable
        successHandler();
      },
      error: errorHandler,
    });
  }
}
