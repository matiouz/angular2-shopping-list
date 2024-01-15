import { Component } from '@angular/core';
import { ListService } from '../list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  isLoadInProgress: boolean = false;
  isSaveInProgress: boolean = false;

  constructor(public listService: ListService) {
  }



  saveList(){}
  loadList(){}
}
