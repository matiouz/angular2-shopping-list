import { Component, Input } from '@angular/core';
import { Category }   from './category';
@Component({
  selector: 'my-category',
  templateUrl: './app/category.component.html'
})
export class CategoryComponent {
    @Input()
    category: Category; 

    constructor(){
    }
 }

