import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { ListService } from '../list.service';
import { CommonModule } from '@angular/common';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { UiConfigService } from '../ui-config.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss',
    imports: [CommonModule, CategoriesListComponent, ToolbarComponent, ConfiguratorComponent]
})
export class MainPageComponent implements OnInit {
  constructor(
    public listService: ListService,
    public uiConfigService: UiConfigService
  ) {}

  @ViewChild('configurator', { static: false })
  configuratorComponent!: ConfiguratorComponent;

  isConfiguratorOpen: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  displayConfig(event: unknown) {
    this.configuratorComponent.open();
  }

  onConfiguratorOpen(event: unknown) {
    this.isConfiguratorOpen = true;
  }

  onConfiguratorClose(event: unknown) {
    this.isConfiguratorOpen = false;
  }

  ngOnInit(): void {
    this.listService.loadFromLocalStorage();
    this.listService.loadConfiguration();
  }
}
