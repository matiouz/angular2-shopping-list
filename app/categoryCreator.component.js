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
var mylist_service_1 = require('./mylist.service');
var CategoryCreatorComponent = (function () {
    function CategoryCreatorComponent(myListService) {
        this.myListService = myListService;
    }
    CategoryCreatorComponent.prototype.addCategory = function (event) {
        this.myListService.addCategory(new category_1.Category(this.newname));
    };
    CategoryCreatorComponent = __decorate([
        core_1.Component({
            selector: 'category-creator',
            templateUrl: './app/categoryCreator.component.html'
        }), 
        __metadata('design:paramtypes', [mylist_service_1.MyListService])
    ], CategoryCreatorComponent);
    return CategoryCreatorComponent;
}());
exports.CategoryCreatorComponent = CategoryCreatorComponent;
//# sourceMappingURL=categoryCreator.component.js.map