import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: [
    './breadcrumb.component.css'
  ]
})


export class BreadcrumbComponent {
  @Input() data;
  // this.data = ['Contacts', 'John Moss'];

}

