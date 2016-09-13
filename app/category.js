"use strict";
var Category = (function () {
    function Category(name, items) {
        this.name = name;
        if (items == null) {
            this.items = new Array();
        }
        else {
            this.items = items;
        }
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map