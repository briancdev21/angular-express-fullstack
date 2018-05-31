import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMarginsChartComponent } from './salesmarginschart.component';

describe('MorrisComponent', () => {
  let component: SalesMarginsChartComponent;
  let fixture: ComponentFixture<SalesMarginsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesMarginsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesMarginsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
