import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [
    './tasks.component.css'
  ]
})

export class TasksComponent {
  showAddTaskDialog = false;
  showCollaboratorsDialog = false;

  @Input() tasks;

  isLiked =  true;

  constructor() {
  }
  like() {
    this.isLiked = !this.isLiked;
  }
}
