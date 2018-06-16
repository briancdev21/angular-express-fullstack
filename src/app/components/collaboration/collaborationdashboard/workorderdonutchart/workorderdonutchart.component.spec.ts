import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderDonutChartComponent } from './workorderdonutchart.component';

describe('MorrisComponent', () => {
  let component: WorkOrderDonutChartComponent;
  let fixture: ComponentFixture<WorkOrderDonutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderDonutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderDonutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
