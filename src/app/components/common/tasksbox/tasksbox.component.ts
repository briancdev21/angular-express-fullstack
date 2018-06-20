import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tasksbox',
  templateUrl: './tasksbox.component.html',
  styleUrls: ['./tasksbox.component.css']
})
export class TasksBoxComponent implements OnInit {

@Input() tasksInfo;
  constructor() { }

  ngOnInit() {
  }

  uploadAttachment() {
    window.alert('Upload file !');
  }

  makeJSON(event, index) {
    setTimeout(() => {
      this.tasksInfo.splice(index, 1);
    }, 500);
  }
}
