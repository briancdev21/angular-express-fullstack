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

  searchKeyword: any;
  constructor( private sharedService: SharedService ) {
    // get collaborators
    this.getPurchaseOrderList();
  }

  public productsInfo = [];

  public documents: Array<Object> = [
    {
      documentName: 'Nu Life Proposal',
      documentDate: 'January 2, 2017'
    }
  ];
  public upcomingModal: object = {
    week: 'WEDNESDAY',
    date: 'NOVEMBER 1, 2017',
    start: '9:30 AM',
    end: '11:00 AM',
    duration: '1 hr, 30 min'
  };

  activity: {
    title: string;
    subject: string;
    contact: string;
    content: string;
  };


  ngOnInit() {
    
  }

  searchKeywordChanged(event) {
 
  }

  getPurchaseOrderList() {
    this.sharedService.getPurchaseOrders().subscribe(res => {
      console.log('total:', res.total);
    })
  }
}
