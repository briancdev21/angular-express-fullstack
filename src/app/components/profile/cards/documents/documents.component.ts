import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: [
    './documents.component.css'
  ]
})

export class DocumentsComponent {

  @Input() documents;
  showContactAssoDialog = false;

  constructor() {
  }
}
