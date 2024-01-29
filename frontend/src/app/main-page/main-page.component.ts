import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { ListService } from '../list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, CategoriesListComponent, ToolbarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  constructor(public listService: ListService) {}

  ngOnInit(): void {
    this.listService.loadFromLocalStorage();
  }
}
