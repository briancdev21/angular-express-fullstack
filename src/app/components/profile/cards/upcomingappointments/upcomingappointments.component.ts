import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcomingappointments',
  templateUrl: './upcomingappointments.component.html',
  styleUrls: [
    './upcomingappointments.component.css'
  ]
})

export class UpcomingAppointmentsComponent {

  @Input() cards;
  @Input() userInfo;
  @Input() upcomingModal;

  showModal: boolean = false;
  switchIcon: boolean = false;

  constructor() {

  }
}
