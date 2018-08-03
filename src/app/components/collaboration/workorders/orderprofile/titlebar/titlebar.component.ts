import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: [
    './titlebar.component.css'
  ]
})
export class TitleBarComponent implements OnInit {

  @Input() set orderProfileInfo(val) {
    if (val.followers !== undefined) {
      this._orderProfileInfo = val;
    }
  }
  @Input() showAvailabilityModal;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  orderTitle = '';
  titleOrigin = '';
  availableStaff: any;

  items2: any[] = [
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};
  _orderProfileInfo: any;

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    // if (this.orderProfileInfo.followers) {
    //   this.orderProfileInfo.followers.forEach(element => {
    //     this.items2 = this.items2.filter(function( obj ) {
    //       return obj.payload.label !== element.name;
    //     });
    //   });
    // }

    this.titleOrigin = this.orderTitle;
    this.orderService.getAvailableStaff.subscribe(
      data => {
        this.availableStaff = data;
      }
    );

  }



  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  openAvailabilityModal() {
    this.orderService.showAvailabilityModal(true);
  }

  clickOutsideTitle(title) {
    if (title !== this.titleOrigin) {
      this.orderService.postTimelineData({title: title, type: 'titleChange'});
      this.titleOrigin = title;
    }
  }
}
