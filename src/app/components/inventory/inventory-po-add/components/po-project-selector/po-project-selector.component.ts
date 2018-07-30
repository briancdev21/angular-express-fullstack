import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-project-selector',
  templateUrl: './po-project-selector.component.html',
  styleUrls: ['./po-project-selector.component.css']
})
export class POProjectSelectorComponent implements OnInit {

  @Input() projects;
  projectnames = ['john', 'smith'];

  ngOnInit() {
    // this.projectnames = this.projects;
  }

  onChooseProject(val) {
    console.log(val);
  }
}
