import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-configurator',
  standalone: true,
  imports: [[FormsModule]],
  templateUrl: './configurator.component.html',
  styleUrl: './configurator.component.scss',
})
export class ConfiguratorComponent {
  @ViewChild('configurationModal', { static: false })
  modal!: ElementRef;

  baseUrl: string = ''; //'http://localhost:3002/lists/';
  listId: string = ''; //list1
  code: string = ''; //xxxx

  constructor(private listService: ListService) {}

  open() {
    this.modal.nativeElement.style.display = 'block';
    this.baseUrl = this.listService.configuration.baseUrl;
    this.listId = this.listService.configuration.listId;
    this.code = this.listService.configuration.code;
  }

  onSubmit() {
    this.listService.configuration = { baseUrl: this.baseUrl, listId: this.listId, code: this.code };
    this.listService.saveConfiguration();

    this.close();
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
