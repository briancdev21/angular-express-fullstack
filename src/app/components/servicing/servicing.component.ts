import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { ServicingService } from './servicing.service';
@Component({
  selector: 'app-servicing',
  templateUrl: './servicing.component.html',
  styleUrls: [
    './servicing.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [ServicingService]
})
export class ServicingComponent implements OnInit {
  menuCollapsed = true;
  constructor() {
  }

  ngOnInit() {
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

}
