import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { PendingProjectBreadcrumbBarComponent } from './pendingprojectbreadcrumbbar/pendingprojectbreadcrumbbar.component';
import { PendingProjectService } from './pendingproject.service';

@Component({
  selector: 'app-pendingproject',
  templateUrl: './pendingproject.component.html',
  styleUrls: [
    './pendingproject.component.css'
  ],
  entryComponents: [
    PendingProjectBreadcrumbBarComponent,
    CommonComponent
  ]
})
export class PendingProjectComponent implements OnInit {

  menuCollapsed = true;

  constructor() {

  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }
}
