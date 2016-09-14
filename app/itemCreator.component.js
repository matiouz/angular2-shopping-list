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
var item_1 = require('./item');
var mylist_service_1 = require('./mylist.service');
var ItemCreatorComponent = (function () {
    function ItemCreatorComponent(myListService) {
        this.myListService = myListService;
        this.categories = this.myListService.getCategories();
    }
    ItemCreatorComponent.prototype.addItem = function (event) {
        // TODO: handle case where no category is selected 
        this.myListService.addItem(new item_1.Item(this.newname), this.selectedCategory);
    };
    ItemCreatorComponent = __decorate([
        core_1.Component({
            selector: 'item-creator',
            templateUrl: './app/itemCreator.component.html'
        }), 
        __metadata('design:paramtypes', [mylist_service_1.MyListService])
    ], ItemCreatorComponent);
    return ItemCreatorComponent;
}());
exports.ItemCreatorComponent = ItemCreatorComponent;
//# sourceMappingURL=itemCreator.component.js.map