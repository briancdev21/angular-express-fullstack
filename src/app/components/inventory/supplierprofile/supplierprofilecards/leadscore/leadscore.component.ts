import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leadscore',
  templateUrl: './leadscore.component.html',
  styleUrls: [
    './leadscore.component.css'
  ]
})

export class LeadScoreComponent {

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
