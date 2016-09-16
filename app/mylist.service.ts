import { Injectable } from '@angular/core';
import { Category }   from './category';
import { Item }   from './item';

// Note: this service provides the categories/items to all the components.
// They are provided directly as an array of categories that is shared between all components, so that the binding keeps on working
// However, components should delegate insert/delete of items or categories to this service (even though actually it should not make much difference) 
@Injectable()
export class MyListService {
    
    categories: Category[];

    // Global settings. Since it's only 2 properties, we leave them in this service 
    isEditionMode: boolean = true;
    isDisplayNotNeededItems: boolean = true;

    getCategories(): Category[] {
        if (this.categories == null){
            this.categories = [];
            let items1 = [ new Item("item1"), new Item("item2")];
            let category1 = new Category("cat 1", items1);
            let items2 = [ new Item("item3"), new Item("item4"), new Item("item5")];
            let category2 = new Category("cat 2", items2);
            this.categories.push(category1);
            this.categories.push(category2);
        }
      return this.categories;
    }

    addItem(item:Item, category:Category){
        category.items.push(item);
    }
    
    addCategory(category:Category){
        this.categories.push(category);
    }

    deleteCategory(category:Category){
        for (var i=0; i < this.categories.length; i++){
            if (this.categories[i] == category){
                this.categories.splice(i,1);
            }
        }
    }

    deleteItem(item:Item){
        for (var currentCategory of this.categories){
            for (var i=0; i < currentCategory.items.length; i++){
                if (currentCategory.items[i] == item){
                    currentCategory.items.splice(i,1);
                }
            }
        }
    }

    save(){
        let categoriesAsString = JSON.stringify(this.categories);
        localStorage.setItem("shoppingList", categoriesAsString);
    }

    load(){
        let categoriesAsString = localStorage.getItem("shoppingList");
        let loadedCategories = <Category[]>JSON.parse(categoriesAsString);
        
        // Clear the current list of categories content
        this.categories.length = 0;

        for (var currentCategory of loadedCategories){
            this.categories.push(currentCategory);
        }
    }

}

// TODO: storage service example:
// export class StorageService {
//     write(key: string, value: any) {
//         if (value) {
//             value = JSON.stringify(value);
//         }
//         localStorage.setItem(key, value);
//     }

//     read<T>(key: string): T {
//         let value: string = localStorage.getItem(key);

//         if (value && value != "undefined" && value != "null") {
//             return <T>JSON.parse(value);
//         }

//         return null;
//     }
// }
