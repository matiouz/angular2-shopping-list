import { Component, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { ListService } from '../list.service';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CategoryCardComponent, AsyncPipe],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit {

  constructor(public listService: ListService){
    
  }

  ngOnInit(): void {
    this.listService.loadFromLocalStorage();
  }

  
}
