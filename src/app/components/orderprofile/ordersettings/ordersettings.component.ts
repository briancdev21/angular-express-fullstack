import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersettings',
  templateUrl: './ordersettings.component.html',
  styleUrls: [
    './ordersettings.component.css'
  ]
})
export class OrderSettingsComponent {

  settingsCollapsed = true;
  showReminderModal = false;

}