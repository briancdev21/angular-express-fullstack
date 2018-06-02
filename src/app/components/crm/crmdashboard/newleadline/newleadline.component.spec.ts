import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeadLineComponent } from './newleadline.component';

describe('MorrisComponent', () => {
  let component: NewLeadLineComponent;
  let fixture: ComponentFixture<NewLeadLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLeadLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeadLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
