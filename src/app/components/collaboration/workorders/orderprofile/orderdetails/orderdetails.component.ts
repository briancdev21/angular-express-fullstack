import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import * as moment from 'moment';
import { CollaboratorsService } from '../../../../../services/collaborators.service';
import { SharedService } from '../../../../../services/shared.service';

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
  public startMax: any;
  startMin = new Date();
  startDateValue: Date;
  endDateValue: Date;
  startTimeValue: any;
  endTimeValue: any;
  currentWorkOrderId: any;
  showStartTime = true;
  showEndTime = true;
  currentContactId: any;

  constructor( private orderService: OrderService, private router: Router, private collaboratorsService: CollaboratorsService,
    private route: ActivatedRoute, private sharedService: SharedService ) {
    this.orderService.saveWorkOrder.subscribe(res => {
      // this.router.navigate(['../collaboration/work-order']);
      this.currentWorkOrderId = this.route.snapshot.paramMap.get('id');
      console.log('save: ', res);
      if (res.sendSaveDataToDetails) {
        if (res.sendSaveDataToDetails.saveClicked) {
          this.orderProfileInfo.isBillable = res['sendSaveDataToDetails']['isBillable'];
          this.checkValidation();
        }
      }
    });
  }

  ngOnInit () {
    const options = { month: 'long', year: 'numeric', day: 'numeric' };

    // const midVal = new Intl.DateTimeFormat('en-US', dateA11yLabel).format(this.orderProfileInfo.startDate);
    // this.startDateValue = new Date(midVal);
    console.log('order info: ', this.orderProfileInfo);

    this.sharedService.getMulipleContacts(this.orderProfileInfo.contactId).subscribe(res => {
      this.currentContactId = res.id;
      console.log('current contact: ', res);
    });
    this.startDateValue = new Date(this.orderProfileInfo.startDate);
    this.endDateValue = new Date(this.orderProfileInfo.endDate);
    this.startTimeValue = moment(this.orderProfileInfo.startDate).format('hh:mm:ss a');
    this.endTimeValue = moment(this.orderProfileInfo.endDate).format('hh:mm:ss a');
    this.street = this.orderProfileInfo.shippingAddress.address;
    this.city = this.orderProfileInfo.shippingAddress.city;
    this.state = this.orderProfileInfo.shippingAddress.province;
    this.country = this.orderProfileInfo.shippingAddress.country;
    this.zipcode = this.orderProfileInfo.shippingAddress.postalCode;
  }

  clickIconShipping() {

    if (this.orderProfileInfo.completion) {
      return;
    } else {
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
    this.startTimeValue = moment(event.value).format('hh:mm:ss a');
    this.orderService.postTimelineData({title: this.startTimeValue, type: 'startTime'});
  }

  onEndTime(event) {
    this.endTimeValue = moment(event.value).format('hh:mm:ss a');
    this.orderService.postTimelineData({title: this.endTimeValue, type: 'endTime'});
  }

  checkValidation() {
    console.log('saving: ', this.orderProfileInfo);
    if (this.orderProfileInfo.shippingAddress.address && this.orderProfileInfo.shippingAddress.city
      && this.orderProfileInfo.shippingAddress.province && this.orderProfileInfo.shippingAddress.country &&
      this.orderProfileInfo.shippingAddress.postalCode && this.orderProfileInfo.contactId && this.startDateValue && this.endDateValue) {
        this.saveWorkOrder();
    }
  }

  saveWorkOrder() {
    const savingData = this.orderProfileInfo;
    const startDate = moment(this.startDateValue).format('YYYY-MM-DD') + 'T' + moment(this.orderProfileInfo.startDate).format('hh:mm:ss');
    console.log('start date', startDate);
    savingData.startDate = new Date (startDate).toISOString();
    const endDate = moment(this.endDateValue).format('YYYY-MM-DD') + 'T' + moment(this.orderProfileInfo.endDate).format('hh:mm:ss');
    savingData.endDate = new Date (endDate).toISOString();

    savingData.followers = this.orderProfileInfo.followersDetails.map(f => f.name);
    savingData.note = this.orderProfileInfo.note ? this.orderProfileInfo.note : '';
    savingData.description = this.orderProfileInfo.description ? this.orderProfileInfo.description : '';
    Object.keys(savingData).forEach((key) => (savingData[key] == null) && delete savingData[key]);
    console.log('saving Data: ', savingData);
    this.collaboratorsService.updateIndividualWorkOrder(this.currentWorkOrderId, savingData).subscribe(res => {
      console.log('saving workorder: ', res);
      this.router.navigate(['../collaboration/work-order']);
    });
  }

}
