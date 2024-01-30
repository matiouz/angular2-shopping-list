import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { ListService } from '../list.service';
import { CommonModule } from '@angular/common';
import { ConfiguratorComponent } from '../configurator/configurator.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  imports: [CommonModule, CategoriesListComponent, ToolbarComponent, ConfiguratorComponent],
})
export class MainPageComponent implements OnInit {
  constructor(public listService: ListService) {}

  @ViewChild('configurator', { static: false })
  configuratorComponent!: ConfiguratorComponent;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  displayConfig(event: unknown) {
    this.configuratorComponent.open();
  }

  ngOnInit(): void {
    this.listService.loadFromLocalStorage();
    this.listService.loadConfiguration();
  }
}
