"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var category_1 = require('./category');
var item_1 = require('./item');
// Note: this service provides the categories/items to all the components.
// They are provided directly as an array of categories that is shared between all components, so that the binding keeps on working
// However, components should delegate insert/delete of items or categories to this service (even though actually it should not make much difference) 
var MyListService = (function () {
    function MyListService() {
    }
    MyListService.prototype.getCategories = function () {
        if (this.categories == null) {
            this.categories = [];
            var items1 = [new item_1.Item("item1"), new item_1.Item("item2")];
            var category1 = new category_1.Category("cat 1", items1);
            var items2 = [new item_1.Item("item3"), new item_1.Item("item4"), new item_1.Item("item5")];
            var category2 = new category_1.Category("cat 2", items2);
            this.categories.push(category1);
            this.categories.push(category2);
        }
        return this.categories;
    };
    MyListService.prototype.addItem = function (item, category) {
        category.items.push(item);
    };
    MyListService.prototype.addCategory = function (category) {
        this.categories.push(category);
        // TODO
    };
    MyListService.prototype.deleteCategory = function (category) {
        // TODO
    };
    MyListService.prototype.deleteItem = function (item) {
        // TODO
    };
    MyListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyListService);
    return MyListService;
}());
exports.MyListService = MyListService;
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
//# sourceMappingURL=mylist.service.js.map