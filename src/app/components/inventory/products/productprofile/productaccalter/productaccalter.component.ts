import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productaccalter',
  templateUrl: './productaccalter.component.html',
  styleUrls: [
    './productaccalter.component.css'
  ],
  entryComponents: [
  ]
})

export class ProductAccAlterComponent {
  @Input() productAccessories;
  @Input() productAlternatives;

  constructor() {

  }
}
