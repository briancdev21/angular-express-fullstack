import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsToWinChartComponent } from './leadstowinchart.component';

describe('MorrisComponent', () => {
  let component: LeadsToWinChartComponent;
  let fixture: ComponentFixture<LeadsToWinChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsToWinChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsToWinChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
