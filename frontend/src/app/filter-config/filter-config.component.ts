import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-config',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-config.component.html',
  styleUrl: './filter-config.component.scss',
})
export class FilterConfigComponent {
  @Output()
  filterConfigEvt = new EventEmitter<string | null>();

  filterExpression: string | null = null;

  filterExpressionChanged() {
    this.filterConfigEvt.emit(this.filterExpression);
  }
  resetFilter() {
    this.filterExpression = null;
    this.filterConfigEvt.emit(null);
  }
}
