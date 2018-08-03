import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../../../common/common.component';
import { OrderService } from './order.service';
import { Ng2TimelineComponent } from '../../../profile/ng2-timeline/ng2timeline.component';
import * as moment from 'moment';
import { SharedService } from '../../../../services/shared.service';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderprofile',
  templateUrl: './orderprofile.component.html',
  styleUrls: [
    './orderprofile.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
})
export class OrderProfileComponent implements OnInit {

  menuCollapsed = true;
  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  showAvailabilityModal = false;
  oneSide = true;
  newTimelineData: any;
  workOrderDescription = '';
  internalNotes = '';
  originalInternalNotes = '';
  originalWorkOrderDesc = '';
  savedStaff: any;
  isAutocompleteUpdated = false;
  currentWorkOrderId: any;
  contactsList: any;
  public orderProfileInfo: any;
  usersList: any;
  selectedContact: any;
  followersDetails = [];

  items2 = [];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};

  constructor(private orderService: OrderService, private sharedService: SharedService,
    private collaboratorsService: CollaboratorsService, private route: ActivatedRoute) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });

    this.sharedService.getUsers().subscribe(res => {
      this.usersList = res;

      for (let i = 0; i < this.usersList.length; i++) {
        this.items2.push({
          id: i,
          label: this.usersList[i].username,
          imageUrl: this.usersList[i].pictureURI,
          userName: this.usersList[i].username
        });
      }
      console.log('item2:', this.items2);

      this.currentWorkOrderId = this.route.snapshot.paramMap.get('id');
      this.sharedService.getContacts().subscribe(data => {
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.collaboratorsService.getIndividualWorkOrder(this.currentWorkOrderId).subscribe(response => {
          console.log('work order details: ', response.data);
          this.orderProfileInfo = response.data;
          this.orderProfileInfo.contactName = this.getContactNameFromId(response.data.contactId);
          this.orderProfileInfo.selectedContact = this.selectedContact;
          // remove selected users from list

          if (this.orderProfileInfo.followers) {
            this.orderProfileInfo.followers.forEach(element => {
              this.items2 = this.items2.filter(function( obj ) {
                return obj.username !== element.username;
              });
              const selectedUser = this.usersList.filter(u => u.username === element)[0];
              this.followersDetails.push({
                name: selectedUser.username,
                imageUrl: selectedUser.pictureURI,
                userName: selectedUser.username
              });
            });
          } else {
            this.orderProfileInfo.followersDetails = [];
          }

          this.orderProfileInfo.followersDetails = this.followersDetails;
          console.log('followers details: ', this.orderProfileInfo);

          this.originalInternalNotes = this.orderProfileInfo.note;
          this.originalWorkOrderDesc = this.orderProfileInfo.description;
        });
      });

      this.getDeliveryData();
    });
  }


  public timelineData: Array<Object> = [
    {
      title: 'Meeting',
      icon: 'fa-home',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'getMoreInfo'
    },
    {
      title: 'Send Document to Mike',
      icon: 'fa-file-text-o',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'blue-btn',
      buttontitle: 'Download document',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'downloadDoc'
    },
    {
      title: 'Coffee Break',
      icon: 'fa-coffee',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. \
      Below please find the currnet status of the sale',
      timelineBtnColor: 'lime-btn',
      buttontitle: 'Read more',
      date: '2018-1-8',
      buttonClickEventHandlerName: 'readMoreCoffee'
    },
    {
      title: 'Phone with Jeronimo',
      icon: 'fa-phone',
      content: 'Following step to complete',
      timelineBtnColor: 'orange-btn',
      buttontitle: 'Download doc',
      date: '2018-1-7',
      buttonClickEventHandlerName: 'downloadDoc'
    }
  ];

  // public orderProfileInfo = {
  //   orderTitle: 'Work Order Title Here',
  //   orderStatus: 'IN PROGRESS',
  //   customerName: 'John Moss',
  //   productName: 'Remodel with a Nu Life',
  //   completion: 64,
  //   shippingAddress: {
  //     street: '301, 1615 10th Ave SW',
  //     city: 'Calgary',
  //     state: 'Alberta',
  //     country: 'Canada',
  //     zipcode: 'T3C 0J7',
  //   },
  //   workOrder: 'WO - 8802138',
  //   startDate: 'November 20, 2017',
  //   startTime: '12:00 PM',
  //   endDate: 'November 20, 2017',
  //   endTime: '6:30 PM',
  //   followers: [
  //     {
  //       imageUrl: 'assets/users/user1.png',
  //       name: 'Michael'
  //     },
  //     {
  //       imageUrl: 'assets/users/user2.png',
  //       name: 'Joseph'
  //     }
  //   ]
  // };

  public productDelivery = [
  ];

  ngOnInit() {

    this.editable = false;
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    this.orderService.openModal.subscribe(
      data => {
        this.showAvailabilityModal = true;
      }
    );
    this.showAvailabilityModal = false;


    this.orderService.getTimelineData.subscribe (
      data => {
        if (data.type) {
          if (data.type === 'titleChange') {
            this.newTimelineData = {
              title: 'Order Title Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'addNewStaff') {
            this.newTimelineData = {
              title: 'Add New Follower',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'removeStaff') {
            this.newTimelineData = {
              title: 'Remove Follower',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'startDate') {
            this.newTimelineData = {
              title: 'Start Date Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'endDate') {
            this.newTimelineData = {
              title: 'End Date Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'startTime') {
            this.newTimelineData = {
              title: 'Start Time Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'endTime') {
            this.newTimelineData = {
              title: 'End Time Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'descChanged') {
            this.newTimelineData = {
              title: 'Work Order Description Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'notesChanged') {
            this.newTimelineData = {
              title: 'Internal Notes Changed',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'delivered') {
            this.newTimelineData = {
              title: 'Product is delivered',
              icon: 'fa-home',
              content: data.title + ' is delivered',
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'newTask') {
            this.newTimelineData = {
              title: 'Added New Task',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          } else if (data.type === 'newTicket') {
            this.newTimelineData = {
              title: 'Added New Ticket',
              icon: 'fa-home',
              content: data.title,
              timelineBtnColor: 'blue-btn',
              buttontitle: 'More Info',
              date: today,
              buttonClickEventHandlerName: 'getMoreInfo'
            };
          }

          this.timelineData.unshift(this.newTimelineData);
        }
      }
    );
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }


  getDeliveryData() {
    this.collaboratorsService.getWorkOrderProducts(this.currentWorkOrderId).subscribe(data => {
      this.productDelivery = data.results;
    });
  }

  getColor(product) {
    const quantity = parseInt(product.quantity, 10);
    const delivered = parseInt(product.delivered, 10);

    if (quantity === delivered) {
      return 'green';
    } else {
      return 'red';
    }
  }

  onSelect(item: any) {
    console.log('follower: ', item);
    this.selectedItem = item;
    this.orderService.postTimelineData({title: item.label, type: 'addNewStaff'});
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.orderProfileInfo.followersDetails.push({name: item.label, imageUrl: item.imageUrl });
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.orderProfileInfo.followers[i];
    this.orderService.postTimelineData({title: item.name, type: 'removeStaff'});
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.orderProfileInfo.followers.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  clickOutsideDesc (data) {
    if (data !== this.originalWorkOrderDesc) {
      this.orderService.postTimelineData({title: data, type: 'descChanged'});
      this.originalWorkOrderDesc = this.workOrderDescription;
    }
  }

  clickOutsideNotes (data) {
    if (data !== this.originalInternalNotes) {
      this.orderService.postTimelineData({title: data, type: 'notesChanged'});
      this.originalInternalNotes = this.internalNotes;
    }
  }

  saveAvailability() {
    this.showAvailabilityModal = false;
  }

  checkDelivered(product) {
    console.log('product: ', product);
    const quantity = parseInt(product.quantity, 10);
    let delivered = parseInt(product.delivered, 10);
    if (delivered === quantity ) {
      this.orderService.postTimelineData({title: product.productName, type: 'delivered'});
    }

    if (quantity < delivered) {
      delivered = 1;
    }

    const savingData = {
      'delivered': delivered,
      'invoiceId': product.invoiceId
    };

    this.collaboratorsService.updateIndividualWorkOrderProduct(this.currentWorkOrderId, product.sku, savingData).subscribe(res => {
      this.getDeliveryData();
    });
    this.getDeliveryData();

  }

  getContactNameFromId(id) {
    this.selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return this.selectedContact.name;
  }

  addContactName(data) {
    data.forEach(element => {
      if (element.type === 'PERSON') {
        element.name = element.person.firstName + ' ' + element.person.lastName;
      } else {
        element.name = element.business.name;
      }
    });
    return data;
  }
}
