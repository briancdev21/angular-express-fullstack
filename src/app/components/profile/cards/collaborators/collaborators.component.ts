import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../multikeywordselect/multikeywordselect.component';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: [
    './collaborators.component.css',
    '../../multikeywordselect/multikeywordselect.component.css'
  ]
})

export class CollaboratorsComponent {

  @Input() collaborators;

  showCollaboratorsDialog = false;
  constructor() {
  }
}
