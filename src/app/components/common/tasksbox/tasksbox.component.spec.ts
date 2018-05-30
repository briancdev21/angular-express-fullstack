import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBoxComponent } from './tasksbox.component';

describe('MorrisComponent', () => {
  let component: TasksBoxComponent;
  let fixture: ComponentFixture<TasksBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
