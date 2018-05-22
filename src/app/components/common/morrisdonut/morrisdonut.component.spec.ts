import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrisDonutComponent } from './morrisdonut.component';

describe('MorrisComponent', () => {
  let component: MorrisDonutComponent;
  let fixture: ComponentFixture<MorrisDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrisDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrisDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
