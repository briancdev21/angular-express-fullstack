import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaBoxComponent } from './agendabox.component';

describe('MorrisComponent', () => {
  let component: AgendaBoxComponent;
  let fixture: ComponentFixture<AgendaBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
