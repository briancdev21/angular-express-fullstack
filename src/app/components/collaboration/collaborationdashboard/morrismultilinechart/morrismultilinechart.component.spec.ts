import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrisMultiLineComponent } from './morrismultilinechart.component';

describe('MorrisComponent', () => {
  let component: MorrisMultiLineComponent;
  let fixture: ComponentFixture<MorrisMultiLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrisMultiLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrisMultiLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
