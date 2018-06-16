import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLogLineChartComponent } from './backloglinechart.component';

describe('MorrisComponent', () => {
  let component: BackLogLineChartComponent;
  let fixture: ComponentFixture<BackLogLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackLogLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackLogLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
