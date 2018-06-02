import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeLineChartComponent } from './pipelinechart.component';

describe('MorrisComponent', () => {
  let component: PipeLineChartComponent;
  let fixture: ComponentFixture<PipeLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
