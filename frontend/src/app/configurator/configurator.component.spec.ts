import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorComponent } from './configurator.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConfiguratorComponent', () => {
  let component: ConfiguratorComponent;
  let fixture: ComponentFixture<ConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
