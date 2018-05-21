import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customerdeals',
  templateUrl: './customerdeals.component.html',
  styleUrls: [
    './customerdeals.component.css'
  ]
})

export class CustomerDealsComponent {
  showContactAssoDialog = false;
  @Input() cards;
  @Input() deals;
  @Input() wonDeals;

  constructor() {
  }
}
