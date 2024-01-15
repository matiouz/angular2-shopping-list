import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Category } from './model/category';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CategoriesListComponent, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
