import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changelogsettings',
  templateUrl: './changelogsettings.component.html',
  styleUrls: [
    './changelogsettings.component.css'
  ]
})
export class ChangeLogSettingsComponent {

  settingsCollapsed = true;
  showReminderModal = false;
}
