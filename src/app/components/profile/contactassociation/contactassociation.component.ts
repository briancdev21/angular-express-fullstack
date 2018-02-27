import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactassociation',
  templateUrl: './contactassociation.component.html',
  styleUrls: [
    './contactassociation.component.css'
  ]
})

export class ContactAssociationComponent {

  @Input() contactUser;
  @Input() subAssoUsers;
  showContactAssoDialog: boolean = false;

  constructor() {

  }

}
