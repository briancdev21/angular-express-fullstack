import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productcards',
  templateUrl: './productcards.component.html',
  styleUrls: [
    './productcards.component.css'
  ],
  entryComponents: [
  ]
})

export class ProductCardsComponent {

  @Input() cardsInfo;
  @Input() dateSelectorList;

  constructor() {

  }
}
