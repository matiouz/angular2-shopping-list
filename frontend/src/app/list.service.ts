import { Injectable } from '@angular/core';
import { type Category } from './model/category';
import { ListBackendService } from './list-backend.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  // Responsiblity of the data structure is not very clean currently:
  // The data is published by this service as an observable, but then the data is muted directly by the components
  // The components receive the data as input, and update the properties of this input directly (no immutability)

  // It could be cleaner to have a data structure that is immutable, and that is updated by the service, and then published as an observable
  // But this would require to have a deep copy of the data structure, and to emit a new value each time the data structure is updated,
  // -> so no two way bindings, even for standard web inputs. This would add complexity to the components
  // When using a state manager, the recommended good practice is to keep the state flat to avoid deep copies (but a state manager would be overkill for our situation)

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

  defaultConfiguration: Configuration = {
    code: 'xxxxx',
    baseUrl: 'http://localhost:3002/lists/',
    listId: 'list1',
  };

  configuration = this.defaultConfiguration;

  get listURL(): string {
    return this.configuration.baseUrl + this.configuration.listId;
  }

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private listBackendService: ListBackendService) {}

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

  saveConfiguration() {
    localStorage.setItem('configuration', JSON.stringify(this.configuration));
  }

  loadConfiguration() {
    const configurationAsString = localStorage.getItem('configuration');
    if (configurationAsString != null) {
      this.configuration = <Configuration>JSON.parse(configurationAsString);
    } else {
      this.configuration = this.defaultConfiguration;
    }
  }
}

interface Configuration {
  code: string;
  baseUrl: string;
  listId: string;
}
