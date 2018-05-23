import { Component, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { OrderService } from './order.service';
import { Ng2TimelineComponent } from '../profile/ng2-timeline/ng2timeline.component';
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

  items2: any[] = [
    {id: 0, label: 'Michael', imageUrl: 'assets/users/user1.png'},
    {id: 1, label: 'Joseph', imageUrl: 'assets/users/user2.png'},
    {id: 2, label: 'Danny', imageUrl: 'assets/users/user1.png'},
    {id: 3, label: 'John', imageUrl: 'assets/users/user3.png'},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};

  constructor(private orderService: OrderService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  public timelineData: Array<Object> = [
    {
      title: 'Meeting',
      icon: 'fa-home',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. Below please find the currnet status of the sale',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'getMoreInfo'
    },
    {
      title: 'Send Document to Mike',
      icon: 'fa-file-text-o',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. Below please find the currnet status of the sale',
      timelineBtnColor: 'blue-btn',
      buttontitle: 'Download document',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'downloadDoc'
    },
    {
      title: 'Coffee Break',
      icon: 'fa-coffee',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products. Below please find the currnet status of the sale',
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

  public orderProfileInfo = {
    orderTitle: 'Work Order Title Here',
    orderStatus: 'IN PROGRESS',
    customerName: 'John Moss',
    productName: 'Remodel with a Nu Life',
    completion: 64,
    shippingAddress: {
      street: '301, 1615 10th Ave SW',
      city: 'Calgary',
      state: 'Alberta',
      country: 'Canada',
      zipcode: 'T3C 0J7',
    },
    workOrder: 'WO - 8802138',
    startDate: 'November 20, 2017',
    startTime: '12:00 PM',
    endDate: 'November 20, 2017',
    endTime: '6:30 PM',
    followers: [
      {
        imageUrl: 'assets/users/user1.png',
        name: 'Michael'
      },
      {
        imageUrl: 'assets/users/user2.png',
        name: 'Joseph'
      }
    ]
  };

  public taskTicketInfo: Array<object> = [
    {
      id: 0,
      description: 'Install TV in Kitchen',
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '60',
      priority: 'level1',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 1,
      description: 'Install TV in Kitchen',
      status: 'inProgress',
      estimateHour: '',
      estimateMin: '25',
      priority: 'level1',
      createdDate: 'December 17, 2017 at 5:42 PM'
    },
    {
      id: 2,
      description: 'Install TV in home',
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '25',
      priority: 'level3',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 3,
      description: 'Walking',
      status: 'inProgress',
      estimateHour: '',
      estimateMin: '30',
      priority: 'level2',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 4,
      description: 'Install TV in Masterbedroom',
      status: 'complete',
      estimateHour: '1',
      estimateMin: '45',
      priority: 'level1',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 5,
      description: 'Walking through fuctioinality with the client',
      status: 'complete',
      estimateHour: '',
      estimateMin: '20',
      priority: 'level2',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 6,
      description: "Install the client's Apple TV",
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '60',
      priority: 'level1',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 7,
      description: 'Install Apple TV',
      status: 'notComplete',
      estimateHour: '',
      estimateMin: '10',
      priority: 'level3',
      createdDate: 'December 17, 2016 at 5:42 PM'
    }
  ];

  public productDelivery: Array<object> = [
    {
      sku: 8802111,
      model: 'C4-HC800',
      productName: 'Home Controller 800',
      quantity: 1,
      delivery: 1
    },
    {
      sku: 8802118,
      model: 'C4-SR260',
      productName: 'Control4 Romote System Controller',
      quantity: 4,
      delivery: 4,
    },
    {
      sku: 8802123,
      model: 'C4-AMP8',
      productName: '8 Zone Switchable Matrix',
      quantity: 1,
      delivery: 0
    },
    {
      sku: 8802117,
      model: 'SM-UN55EH6300',
      productName: '55" Smart LED TV',
      quantity: 4,
      delivery: 4,
    },
    {
      sku: 8802113,
      model: 'C4-HC832',
      productName: 'Home Controller 600',
      quantity: 4,
      delivery: 2
    },
    {
      sku: 8802141,
      model: 'SM-HC800',
      productName: 'Controller 800',
      quantity: 1,
      delivery: 1
    }
  ];

  ngOnInit() {
    this.originalInternalNotes = this.internalNotes;
    this.originalWorkOrderDesc = this.workOrderDescription;

    this.editable = false;
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this.orderProfileInfo.followers.forEach(element => {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.label !== element.name;
      });
    });

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

  getColor(product) {
    if (product.quantity == product.delivery) {
      return 'green';
    } else {
      return 'red';
    }
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.orderService.postTimelineData({title: item.label, type: 'addNewStaff'});
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.orderProfileInfo.followers.push({name: item.label, imageUrl: item.imageUrl });
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
    if (product.delivery == product.quantity ) {
      this.orderService.postTimelineData({title: product.productName, type: 'delivered'});
    }
  }
}
