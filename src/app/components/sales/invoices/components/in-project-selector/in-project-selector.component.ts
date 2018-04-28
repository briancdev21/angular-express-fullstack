import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-in-project-selector',
  templateUrl: './in-project-selector.component.html',
  styleUrls: ['./in-project-selector.component.css']
})
export class InProjectSelectorComponent implements OnInit {

  @Input() projects;
  projectnames = ['john', 'smith'];

  ngOnInit() {
    this.projectnames = this.projects;
  }

  onChooseProject(val) {
    console.log(val);
  }
}
