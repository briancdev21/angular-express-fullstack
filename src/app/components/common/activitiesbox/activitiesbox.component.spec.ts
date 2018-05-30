import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesBoxComponent } from './activitiesbox.component';

describe('MorrisComponent', () => {
  let component: ActivitiesBoxComponent;
  let fixture: ComponentFixture<ActivitiesBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
