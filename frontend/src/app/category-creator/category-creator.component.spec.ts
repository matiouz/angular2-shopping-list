import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect, describe, it, beforeEach } from 'vitest'

import { CategoryCreatorComponent } from './category-creator.component';

describe('CategoryCreatorComponent', () => {
  let component: CategoryCreatorComponent;
  let fixture: ComponentFixture<CategoryCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
