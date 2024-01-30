import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListComponent } from './categories-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesListComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
