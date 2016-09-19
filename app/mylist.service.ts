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
    isEditionMode: boolean = false;
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
                    break;
                }
            }
        }
    }

    moveItemUp(item:Item){      // TODO: behaviour is not satisfying if already bought items are not displayed
        for (var currentCategory of this.categories){
            for (var i=1; i < currentCategory.items.length; i++){       // No need to run the loop on the first item because the first item cannot be moved up
                if (currentCategory.items[i] == item){
                    currentCategory.items[i] = currentCategory.items[i-1];
                    currentCategory.items[i-1] = item;
                    break;
                }
            }
        }
    }

    moveItemDown(item:Item){    // TODO: behaviour is not satisfying if already bought items are not displayed 
        for (var currentCategory of this.categories){
            for (var i=0; i < currentCategory.items.length - 1; i++){   // No need to run the loop on the last item because the last item cannot be moved down
                if (currentCategory.items[i] == item){
                    currentCategory.items[i] = currentCategory.items[i+1];
                    currentCategory.items[i+1] = item;
                    break; 
                }
            }
        }
    }

    moveCategoryUp(category:Category){
        for (var i=1; i < this.categories.length; i++){ // No need to run loop on fist category because it cannot be moved up
            if (this.categories[i] == category){
                this.categories[i] = this.categories[i-1];
                this.categories[i-1] = category;
                break;
            }
        }
    }

    moveCategoryDown(category:Category){
        for (var i=0; i < this.categories.length-1; i++){ // No need to run loop on last category because it cannot be moved down
            if (this.categories[i] == category){
                this.categories[i] = this.categories[i+1];
                this.categories[i+1] = category;
                break;
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
