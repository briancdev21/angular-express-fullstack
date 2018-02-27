import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

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
  street = '';
  city = '';
  state = '';
  country = '';
  zipcode = '';
  public endMin;
  public startMax;
  startDateValue: Date;
  endDateValue: Date;
  startTimeValue: Date;
  endTimeValue: Date;

  constructor( private orderService: OrderService ) {

  }

  ngOnInit () {
    var options = { month: 'long', year: 'numeric', day: 'numeric' };
    
    // const midVal = new Intl.DateTimeFormat('en-US', dateA11yLabel).format(this.orderProfileInfo.startDate);
    // this.startDateValue = new Date(midVal);
    this.startDateValue = new Date(this.orderProfileInfo.startDate);
    this.endDateValue = new Date(this.orderProfileInfo.endDate);
    this.startTimeValue = new Date(this.orderProfileInfo.startTime);
    this.endTimeValue = new Date(this.orderProfileInfo.startEnd);
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    this.street = (this.switchIconShipping) ? this.orderProfileInfo.shippingAddress.street : '';
    this.city = (this.switchIconShipping) ? this.orderProfileInfo.shippingAddress.city : '';
    this.state = (this.switchIconShipping) ? this.orderProfileInfo.shippingAddress.state : '';
    this.country = (this.switchIconShipping) ? this.orderProfileInfo.shippingAddress.country : '';
    this.zipcode = (this.switchIconShipping) ? this.orderProfileInfo.shippingAddress.zipcode : '';
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
