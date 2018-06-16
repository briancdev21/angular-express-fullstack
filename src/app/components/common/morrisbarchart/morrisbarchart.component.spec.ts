import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrisBarChartComponent } from './morrisbarchart.component';

describe('MorrisComponent', () => {
  let component: MorrisBarChartComponent;
  let fixture: ComponentFixture<MorrisBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrisBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrisBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
