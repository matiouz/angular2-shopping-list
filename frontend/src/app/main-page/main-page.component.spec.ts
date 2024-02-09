import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageComponent } from './main-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListService } from '../list.service';
import { of } from 'rxjs';
import { UiConfigService } from '../ui-config.service';
import { Category } from '../model/category';

let listServiceMock: Partial<ListService>;

let uiConfigService: UiConfigService;

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    listServiceMock = {
      categories$: of([]),
      loadFromLocalStorage: () => {},
      loadConfiguration: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [MainPageComponent, HttpClientTestingModule],
      providers: [{ provide: ListService, useValue: listServiceMock }],
    }).compileComponents();

    uiConfigService = TestBed.inject(UiConfigService);

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function createCategory(items: [string, boolean][]): Category {
    return { name: 'cat1', items: items.map(([name, isNeeded]) => ({ name, isNeeded })) };
  }

  it('should contain 2 items', () => {
    // listServiceMock.categories$ = of(createSingleCategory(['item1', 'item2']));
    // listServiceMock.categories$ = of([{ name: 'cat1', items: [{name: 'item1', isNeeded: false}, {name: 'item2', isNeeded: true}] }]);
    listServiceMock.categories$ = of([
      createCategory([
        ['item1', true],
        ['item2', true],
      ]),
    ]);
    uiConfigService.isDisplayNotNeededItems = true;
    fixture.detectChanges();

    // display the generated html
    // console.log(fixture.nativeElement);

    const items = fixture.nativeElement.querySelectorAll('.itemName');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('item1');
    expect(items[1].textContent).toContain('item2');
  });

  it('should display only needed items when requested', () => {
    listServiceMock.categories$ = of([
      createCategory([
        ['item1', true],
        ['item2', false],
      ]),
    ]);
    uiConfigService.isDisplayNotNeededItems = false;
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.itemName');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('item1');
  });

  it('should display also not needed items when requested to display all', () => {
    listServiceMock.categories$ = of([
      createCategory([
        ['item1', true],
        ['item2', false],
      ]),
    ]);
    uiConfigService.isDisplayNotNeededItems = true;

    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.itemName');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('item1');
    expect(items[1].textContent).toContain('item2');
  });

  // when the user enters a filter in the toolbar, only the matching items should be displayed
  it('should only display items that match the filter', () => {
    listServiceMock.categories$ = of([
      createCategory([
        ['item abcd', true],
        ['item efgh', true],
      ]),
    ]);
    uiConfigService.isDisplayNotNeededItems = true;

    const filterInput = fixture.nativeElement.querySelector('.filter-config input');
    filterInput.value = 'efgh';
    filterInput.dispatchEvent(new Event('input'));
    filterInput.dispatchEvent(keyUpevent);

    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.itemName');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('item efgh');
  });

  const keyUpevent = new KeyboardEvent('keyup', {
    bubbles: true,
    cancelable: true,
    shiftKey: false,
  });
});
