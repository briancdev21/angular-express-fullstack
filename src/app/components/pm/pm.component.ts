import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { PmService } from './pm.service';
@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: [
    './pm.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [PmService]
})
export class PmComponent implements OnInit {
  menuCollapsed = true;
  constructor() {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
