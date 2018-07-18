import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-receiveinventorydetail',
  templateUrl: './receiveinventorydetail.component.html',
  styleUrls: [
    './receiveinventorydetail.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
})
export class ReceiveInventoryDetailComponent implements OnInit {


  constructor( private sharedService: SharedService ) {
  
  }

  public purchaseOrdersInfo = [];

  ngOnInit() {
  }

}
