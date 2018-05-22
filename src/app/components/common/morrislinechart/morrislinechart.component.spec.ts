import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrisLineComponent } from './morrislinechart.component';

describe('MorrisComponent', () => {
  let component: MorrisLineComponent;
  let fixture: ComponentFixture<MorrisLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrisLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrisLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
