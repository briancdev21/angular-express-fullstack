import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueAreaComponent } from './revenueareachart.component';

describe('MorrisComponent', () => {
  let component: RevenueAreaComponent;
  let fixture: ComponentFixture<RevenueAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
