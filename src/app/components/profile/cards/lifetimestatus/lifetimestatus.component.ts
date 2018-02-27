import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lifetimestatus',
  templateUrl: './lifetimestatus.component.html',
  styleUrls: [
    './lifetimestatus.component.css'
  ]
})

export class LifeTimeStatusComponent {

  @Input() cards;

  constructor() {
  }
}
