import { Injectable } from '@angular/core';
import { type Category } from './model/category';
import { Item } from './model/item';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  addCategory(name: string) {
    this.categories.push({ name: name, items: [] });
    this.saveToLocalStorage();
  }

  addItem(name: string, selectedCategory: Category) {
    this.categories.find((c) => c.name == selectedCategory.name)?.items.push({ name: name, isNeeded: true });
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

  // listURL: string = "http://localhost:3002/lists/list1.json";
  // listURL: string = "http://142.3.32.98:3002/lists/list1.json";

  constructor() {}

  // This service acts as a global state for the app.
  // The categories variable is public, and directly referenced by the components
  categories: Category[] = [];

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
    const categoriesAsString = this.serializeCategories(this.categories);
    localStorage.setItem('shoppingList', categoriesAsString);
  }

  loadFromLocalStorage() {
    const categoriesAsString = localStorage.getItem('shoppingList');

    if (categoriesAsString != null) {
      this.categories = this.deserializeCategories(categoriesAsString);
    } else {
      this.categories = this.sampleCategories; // temporary, to work with sample data
    }
  }

  serializeCategories(categories: Category[]): string {
    return JSON.stringify(categories, ['name', 'items', 'isNeeded'], 2);
  }

  deserializeCategories(serializedCategories: string): Category[] {
    const loadedCategories = <Category[]>JSON.parse(serializedCategories);

    return loadedCategories;
  }

  deleteCategory(category: Category) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i] == category) {
        this.categories.splice(i, 1);
      }
    }
    this.saveToLocalStorage();
  }

  deleteItem(item: Item) {
    for (const currentCategory of this.categories) {
      for (let i = 0; i < currentCategory.items.length; i++) {
        if (currentCategory.items[i] == item) {
          currentCategory.items.splice(i, 1);
          break;
        }
      }
    }
    this.saveToLocalStorage();
  }

  moveItemUp(item: Item) {
    // TODO: behaviour is not satisfying if already bought items are not displayed
    for (const currentCategory of this.categories) {
      for (let i = 1; i < currentCategory.items.length; i++) {
        // No need to run the loop on the first item because the first item cannot be moved up
        if (currentCategory.items[i] == item) {
          currentCategory.items[i] = currentCategory.items[i - 1];
          currentCategory.items[i - 1] = item;
          break;
        }
      }
    }
    this.saveToLocalStorage();
  }

  moveItemDown(item: Item) {
    // TODO: behaviour is not satisfying if already bought items are not displayed
    for (const currentCategory of this.categories) {
      for (let i = 0; i < currentCategory.items.length - 1; i++) {
        // No need to run the loop on the last item because the last item cannot be moved down
        if (currentCategory.items[i] == item) {
          currentCategory.items[i] = currentCategory.items[i + 1];
          currentCategory.items[i + 1] = item;
          break;
        }
      }
    }
    this.saveToLocalStorage();
  }

  moveCategoryUp(category: Category) {
    for (let i = 1; i < this.categories.length; i++) {
      // No need to run loop on fist category because it cannot be moved up
      if (this.categories[i] == category) {
        this.categories[i] = this.categories[i - 1];
        this.categories[i - 1] = category;
        break;
      }
    }
    this.saveToLocalStorage();
  }

  moveCategoryDown(category: Category) {
    for (let i = 0; i < this.categories.length - 1; i++) {
      // No need to run loop on last category because it cannot be moved down
      if (this.categories[i] == category) {
        this.categories[i] = this.categories[i + 1];
        this.categories[i + 1] = category;
        break;
      }
    }
    this.saveToLocalStorage();
  }
}
