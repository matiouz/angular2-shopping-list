import { Injectable } from '@angular/core';
import { Category }   from './category';
import { Item }   from './item';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// Note: this service provides the categories/items to all the components.
// They are provided directly as an array of categories that is shared between all components, so that the binding keeps on working
// However, components should delegate insert/delete of items or categories to this service (even though actually it should not make much difference) 
@Injectable()
export class MyListService {
    
    categories: Category[];

    // Global settings. Since it's only 2 properties, we leave them in this service 
    isEditionMode: boolean = false;
    isDisplayNotNeededItems: boolean = true;

    listURL: string = "http://localhost:3002/lists/list1.json";
    // listURL: string = "http://142.3.32.98:3002/lists/list1.json";

    // Observable categories source
    private categoriesSource = new Subject<Category[]>();

    // Observable categories stream
    categoriesStream = this.categoriesSource.asObservable();

    // Notify observers that the list of categories is a new one (it points to a new array)
    notifyCategoriesChange(){
        this.categoriesSource.next(this.categories);
    }

    constructor(private http: Http){}

    getCategories(): Category[] {
        if (this.categories == null){
            this.categories = [];
            this.loadFromLocalStorage();
        // Create hardcoded list, for debugging:
        //     let items1 = [ new Item("item1"), new Item("item2")];
        //     let category1 = new Category("cat 1", items1);
        //     let items2 = [ new Item("item3"), new Item("item4"), new Item("item5")];
        //     let category2 = new Category("cat 2", items2);
        //     this.categories.push(category1);
        //     this.categories.push(category2);
        }
      return this.categories;
    }

    addItem(item:Item, category:Category){
        category.items.push(item);
        this.saveToLocalStorage();
    }
    
    saveItem(item:Item){
        // Since the the model is bound to the fields, no need to do anything except saving the whole list 
        this.saveToLocalStorage();
    }

    saveCategory(category:Category){
        // Since the the model is bound to the fields, no need to do anything except saving the whole list 
        this.saveToLocalStorage();
    }

    addCategory(category:Category){
        this.categories.push(category);
        this.saveToLocalStorage();
    }

    deleteCategory(category:Category){
        for (var i=0; i < this.categories.length; i++){
            if (this.categories[i] == category){
                this.categories.splice(i,1);
            }
        }
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
    }

    moveCategoryUp(category:Category){
        for (var i=1; i < this.categories.length; i++){ // No need to run loop on fist category because it cannot be moved up
            if (this.categories[i] == category){
                this.categories[i] = this.categories[i-1];
                this.categories[i-1] = category;
                break;
            }
        }
        this.saveToLocalStorage();
    }

    moveCategoryDown(category:Category){
        for (var i=0; i < this.categories.length-1; i++){ // No need to run loop on last category because it cannot be moved down
            if (this.categories[i] == category){
                this.categories[i] = this.categories[i+1];
                this.categories[i+1] = category;
                break;
            }
        }
        this.saveToLocalStorage();
    }

    saveToLocalStorage(){
        let categoriesAsString = this.serializeCategories();
        localStorage.setItem("shoppingList", categoriesAsString);
    }

    loadFromLocalStorage(){
        let categoriesAsString = localStorage.getItem("shoppingList");
        
        if (categoriesAsString != null){
            this.deserializeCategories(categoriesAsString);
        }
    }

    serializeCategories(): string{
        return JSON.stringify(this.categories, ['name', 'items', 'isNeeded'], 2);
    }

    deserializeCategories(serializedCategories:string){
        let loadedCategories = <Category[]>JSON.parse(serializedCategories);
        
        this.categories = loadedCategories;
        this.notifyCategoriesChange();

        // // Clear the current list of categories content
        // this.categories.length = 0;

        // for (var currentCategory of loadedCategories){
        //     this.categories.push(currentCategory);
        // }
    }

    // See https://angular.io/docs/ts/latest/guide/server-communication.html
    saveOnServer(successHandler: () => void, errorHandler: (any) => void){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        // observableResponse is of type Observable<boolean>, because this is what is returned by extractData
        // Note: Since it's a post request with content-type = application/json, 
        // before the POST request, angular will automatically send and OPTIONS request
        let observableRequest = this.http.post(this.listURL, this.categories, options)
                .map(this.extractPOSTData)
                .catch(this.handleError);

        observableRequest.subscribe(
                     successHandler,
                     errorHandler);
    }

    extractPOSTData(res: Response){
        // Commented out code, in case we want to extract the content of the response and return it (and this content is of type Categories)
        // (in this case, the reponse to http.post would be of type Observable<Categories>()) 
        //let body = res._body;
        //return body.data || { }; 

        // For now, simply return true if request successful, else false. 
        // Actually, the toolbarComponent, which observes this event simply ignores this return value
        let status = res.status;
        return res.status === 200;
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    loadFromServer(successHandler: () => void, errorHandler: (any) => void){
        let observableRequest = this.http.get(this.listURL)
                .map((res:Response) => res.json())
                .catch(this.handleError);

        observableRequest.subscribe(
            serverCategories => {
                this.categories = serverCategories;
                this.notifyCategoriesChange();
                successHandler();
            },
            errorHandler
        );
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
