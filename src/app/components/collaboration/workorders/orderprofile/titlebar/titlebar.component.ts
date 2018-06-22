import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: [
    './titlebar.component.css'
  ]
})
export class TitleBarComponent {

  @Input() orderProfileInfo;
  @Input() showAvailabilityModal;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  orderTitle = '';
  titleOrigin = '';
  availableStaff: any;

  items2: any[] = [
    {id: 0, payload: {label: 'Michael', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Joseph', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Danny', imageUrl: 'assets/users/user1.png'}},
    {id: 3, payload: {label: 'John', imageUrl: 'assets/users/user3.png'}},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.orderProfileInfo.followers.forEach(element => {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.payload.label !== element.name;
      });
    });
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
