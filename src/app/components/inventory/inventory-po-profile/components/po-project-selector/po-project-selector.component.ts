import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-project-selector',
  templateUrl: './po-project-selector.component.html',
  styleUrls: ['./po-project-selector.component.css']
})
export class POProjectSelectorComponent implements OnInit {

  @Input() projectname;
  projectnames = ['john', 'smith'];

  ngOnInit() {
  }

  onChooseProject(val) {
    console.log(val);
  }
}
