import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: [
    './orderdetails.component.css'
  ]
})
export class OrderDetailsComponent implements OnInit {

  @Input() orderProfileInfo;
  switchIconShipping = false;
  street: any;
  city: any;
  state = '';
  country = '';
  zipcode = '';
  public endMin;
  public startMax;
  startDateValue: Date;
  endDateValue: Date;
  startTimeValue: any;
  endTimeValue: any;

  constructor( private orderService: OrderService ) {

  }

  ngOnInit () {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };

    // const midVal = new Intl.DateTimeFormat('en-US', dateA11yLabel).format(this.orderProfileInfo.startDate);
    // this.startDateValue = new Date(midVal);
    console.log('order info: ', this.orderProfileInfo);
    this.startDateValue = new Date(this.orderProfileInfo.startDate);
    this.endDateValue = new Date(this.orderProfileInfo.endDate);
    this.startTimeValue = new Date (moment(this.orderProfileInfo.startDate).format('hh:mm:ss a'));
    this.endTimeValue = moment(this.orderProfileInfo.endDate).format('hh:mm:ss a');
    this.street = this.orderProfileInfo.shippingAddress.address;
    this.city = this.orderProfileInfo.shippingAddress.city;
    this.state = this.orderProfileInfo.shippingAddress.province;
    this.country = this.orderProfileInfo.shippingAddress.country;
    this.zipcode = this.orderProfileInfo.shippingAddress.postalCode;
  }

  clickIconShipping() {

    this.orderProfileInfo.shippingAddress.address = (this.switchIconShipping) ? this.street :
                                                                                this.orderProfileInfo.selectedContact.shippingAddress.city;
    this.orderProfileInfo.shippingAddress.city = (this.switchIconShipping) ? this.city :
                                            this.orderProfileInfo.selectedContact.shippingAddress.city;
    this.orderProfileInfo.shippingAddress.province = (this.switchIconShipping) ? this.state :
                                              this.orderProfileInfo.selectedContact.shippingAddress.province;
    this.orderProfileInfo.shippingAddress.country = (this.switchIconShipping) ? this.country :
                                              this.orderProfileInfo.selectedContact.shippingAddress.country;
    this.orderProfileInfo.shippingAddress.postalCode = (this.switchIconShipping) ? this.zipcode :
                                              this.orderProfileInfo.selectedContact.shippingAddress.postalCode;
    this.switchIconShipping = !this.switchIconShipping;
  }

  onStartDate(event) {
    this.startDateValue = event.value;
    this.endMin = this.startDateValue;
    this.orderService.postTimelineData({title: this.startDateValue.toDateString(), type: 'startDate'});
  }

  onEndDate(event) {
    this.endDateValue = event.value;
    this.startMax = this.endDateValue;
    this.orderService.postTimelineData({title: this.endDateValue.toDateString(), type: 'endDate'});
  }

  onStartTime(event) {
    this.startTimeValue = event.value;
    this.orderService.postTimelineData({title: this.startTimeValue.toTimeString(), type: 'startTime'});
  }

  onEndTime(event) {
    this.endTimeValue = event.value;
    this.orderService.postTimelineData({title: this.endTimeValue.toTimeString(), type: 'endTime'});
  }

}
