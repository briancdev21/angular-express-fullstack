import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-in-project-selector',
  templateUrl: './in-project-selector.component.html',
  styleUrls: ['./in-project-selector.component.css']
})
export class InProjectSelectorComponent implements OnInit {

  @Input() set projects(val) {
    this.projectnames = val;
  }
  @Output() changedProject: EventEmitter<any> = new EventEmitter();
  projectnames = [];

  ngOnInit() {
  }

  onChooseProject(event) {
    this.changedProject.emit(event.target.value);
  }
}
