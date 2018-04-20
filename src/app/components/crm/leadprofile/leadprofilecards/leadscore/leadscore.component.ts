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
}
