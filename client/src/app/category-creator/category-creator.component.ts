import { Component } from '@angular/core';
import { ListService } from '../list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category-creator.component.html',
  styleUrl: './category-creator.component.scss'
})
export class CategoryCreatorComponent {

  name?: string;

  constructor(public listService: ListService) {
  }

  addCategory() {
    if (this.name) {
      this.listService.addCategory(this.name);
    } else {
      //TODO: add check for empty category name
      console.log("category name is mandatory")
    }
    this.name = "";
  }
}
