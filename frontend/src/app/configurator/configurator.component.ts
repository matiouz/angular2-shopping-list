import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
    selector: 'app-configurator',
    imports: [[FormsModule]],
    templateUrl: './configurator.component.html',
    styleUrl: './configurator.component.scss'
})
export class ConfiguratorComponent {
  @ViewChild('configurationModal', { static: false })
  modal!: ElementRef;

  baseUrl: string = ''; //'http://localhost:3002/lists/';
  listId: string = ''; //list1
  code: string = ''; //xxxx
  zoomLevel: number = 1.0;

  constructor(private listService: ListService) {
    // Ensure zoomLevel is initialized from configuration if available
    if (this.listService.configuration && this.listService.configuration.zoomLevel !== undefined) {
      this.zoomLevel = this.listService.configuration.zoomLevel;
    }
  }

  open() {
    this.modal.nativeElement.style.display = 'block';
    this.baseUrl = this.listService.configuration.baseUrl;
    this.listId = this.listService.configuration.listId;
    this.code = this.listService.configuration.code;
    this.zoomLevel = this.listService.configuration.zoomLevel;
  }

  onSubmit() {
    this.listService.configuration = { baseUrl: this.baseUrl, listId: this.listId, code: this.code, zoomLevel: this.zoomLevel };
    this.listService.saveConfiguration();
    this.applyZoomLevel();

    this.close();
  }

  zoomIn() {
    this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2.0);
    this.applyZoomLevel();
  }

  zoomOut() {
    this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
    this.applyZoomLevel();
  }

  resetZoom() {
    this.zoomLevel = 1.0;
    this.applyZoomLevel();
  }

  private applyZoomLevel() {
    document.documentElement.style.fontSize = `${this.zoomLevel * 100}%`;
  }

  close() {
    this.modal.nativeElement.style.display = 'none';
  }
}
