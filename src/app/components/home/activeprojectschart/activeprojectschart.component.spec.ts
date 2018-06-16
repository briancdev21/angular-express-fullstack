import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProjectsChartComponent } from './activeprojectschart.component';

describe('MorrisComponent', () => {
  let component: ActiveProjectsChartComponent;
  let fixture: ComponentFixture<ActiveProjectsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveProjectsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProjectsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
