import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplierprofilecards',
  templateUrl: './supplierprofilecards.component.html',
  styleUrls: [
    './supplierprofilecards.component.css'
  ],
  entryComponents: [
  ]
})

export class SupplierProfileCardsComponent {

  @Input() cardsInfo;

  constructor() {

  }
}
