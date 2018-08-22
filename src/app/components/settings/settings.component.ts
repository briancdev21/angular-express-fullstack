import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { SettingsService } from './settings.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [
    './settings.component.css'
  ],
  entryComponents: [
    CommonComponent
  ]
})
export class SettingsComponent implements OnInit {
  menuCollapsed = true;
  constructor(private router: Router) {
    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.menuCollapsed = true;
    } else if (m === 'false') {
      this.menuCollapsed = false;
    } else {
      this.menuCollapsed = true;
    }
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
