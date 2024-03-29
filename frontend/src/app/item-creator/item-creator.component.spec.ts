import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreatorComponent } from './item-creator.component';

describe('ItemCreatorComponent', () => {
  let component: ItemCreatorComponent;
  let fixture: ComponentFixture<ItemCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemCreatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
