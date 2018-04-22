import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplierlifetimestatus',
  templateUrl: './lifetimestatus.component.html',
  styleUrls: [
    './lifetimestatus.component.css'
  ]
})

export class SupplierLifeTimeStatusComponent {

  @Input() cards;

  constructor() {
  }

  getColor(score) {
    if (score > 80) {
      return 'green';
    } else if (score > 60) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
