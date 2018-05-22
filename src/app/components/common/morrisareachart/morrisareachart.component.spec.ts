import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrisAreaComponent } from './morrisareachart.component';

describe('MorrisComponent', () => {
  let component: MorrisAreaComponent;
  let fixture: ComponentFixture<MorrisAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrisAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrisAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
