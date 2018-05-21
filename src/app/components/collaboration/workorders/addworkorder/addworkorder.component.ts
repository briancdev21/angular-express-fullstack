import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import * as moment from 'moment';
import { AvailabilityComponent } from '../../../orderprofile/availability/availability.component';

@Component({
  selector: 'app-addworkorder',
  templateUrl: './addworkorder.component.html',
  styleUrls: [
    './addworkorder.component.css',
  ]
})


export class AddWorkOrderComponent implements OnInit {

  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  usersProjects = [
    {
      id: 0,
      projectName: 'Remodel with a Nu Life',
      projectId: 0,
      owner: 'John Moss',
    },
    {
      id: 1,
      projectName: 'Project 1',
      projectId: 1,
      owner: 'John Moss',
    },
    {
      id: 2,
      projectName: 'Project 2',
      projectId: 1,
      owner: 'Latif',
    },
    {
      id: 3,
      projectName: 'Project 3',
      projectId: 2,
      owner: 'Latif',
    },
    {
      id: 4,
      projectName: 'Project 4',
      projectId: 3,
      owner: 'Dennis',
    }
  ];

  projectInfo = [
    {
      id: 0,
      name: 'Remodel with a Nu Life',
      dependency: [1, 3],
      milestone: ['Planning 1', 'Planning 2', 'Complete'],
      changeLog: ['change log 1', 'change log 2']
    },
    {
      id: 1,
      name: 'Project 1',
      dependency: [1, 2],
      milestone: ['Planning 2', 'Implementation 2', 'Complete'],
      changeLog: ['change log 3', 'change log 4']
    },
    {
      id: 2,
      name: 'Project 2',
      dependency: [0, 1, 3],
      milestone: ['Planning 1', 'Implementation 3', 'Complete 3'],
      changeLog: ['change log 5', 'change log 6']
    },
    {
      id: 3,
      name: 'Project 3',
      dependency: [0, 1, 2],
      milestone: ['Planning 4', 'Integration', 'Complete'],
      changeLog: ['change log 7', 'change log 8']
    }
  ];

  taskTicketInfo: Array<object> = [
    {
      id: 0,
      description: 'Install TV in Kitchen',
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '60',
      priority: 'Level 1',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 1,
      description: 'Install TV in Kitchen',
      status: 'inProgress',
      estimateHour: '',
      estimateMin: '25',
      priority: 'Level 1',
      createdDate: 'December 17, 2017 at 5:42 PM'
    },
    {
      id: 2,
      description: 'Install TV in home',
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '25',
      priority: 'Level 3',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 3,
      description: 'Walking',
      status: 'inProgress',
      estimateHour: '',
      estimateMin: '30',
      priority: 'Level 2',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 4,
      description: 'Install TV in Masterbedroom',
      status: 'complete',
      estimateHour: '1',
      estimateMin: '45',
      priority: 'Level 1',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
    {
      id: 5,
      description: 'Walking through fuctioinality with the client',
      status: 'complete',
      estimateHour: '',
      estimateMin: '20',
      priority: 'Level 2',
      createdDate: 'December 17, 2016 at 5:42 PM'
    },
  ];

  deliveryProducts: Array<object> = [
    {
      id: 0,
      description: 'Samsung 60" LED TV',
      available: 2,
      quantity: 1,
      productNumber: 'SAM-UN60EH7400'
    },
    {
      id: 1,
      description: 'Fixed Mount 55"',
      available: 4,
      quantity: 1,
      productNumber: 'NU-WI88'
    },
    {
      id: 2,
      description: 'Gallexy Mobile',
      available: 3,
      quantity: 1,
      productNumber: 'GAL-UN60EH7400'
    },
    {
      id: 3,
      description: 'Samsung Laptop',
      available: 2,
      quantity: 2,
      productNumber: 'SAM-50EH7400'
    },
  ];

  workorderDetails = {
    projectId: '',
    contactName : '',
    selectedProject: 0,
    workorderNumber: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    dependency: '',
    followers: [],
    milestone: '',
    changeLog: '',
    workorderName: ''
  };

  addWorkorderModalCollapsed = true;
  customerList = ['John Moss', 'Latif', 'Dennis'];
  projectManagerList = ['Manager1', 'Manager2', 'Manager3'];
  accountReceivableList = ['Account Receivable 1', 'Account Receivable 2', 'Account Receivable 3'];
  associationList = ['Associatioin 1', 'Associatioin 2', 'Associatioin 3'];
  workorderPricingList = ['Friend & Family', 'Royalty Program', 'Retail', 'Builders Program', 'Wholesale', 'Cost'];
  projectTypeList = ['Project Type 1', 'Project Type 2', 'Project Type 3'];
  scopeEditorContent = 'Test';
  priorityList = ['Level 1', 'Level 2', 'Level 3'];

  sidebarCollapsed = true;
  WorkorderInfoModalCollapsed = true;
  tabActiveFirst = true;
  tabActiveSecond = false;
  tabActiveThird = false;
  receivable = '';
  showWorkorderInfo = false;
  showAddWorkorderModal = false;
  scheduleRemain: any;
  projectIDCount = [];
  invalidCustomerName = false;
  invalidStartTime = false;
  invalidEndTime = false;
  invalidStartDate = false;
  invalidEndDate = false;
  selectProject = '';
  selectReceivable = '';
  resourceSelected = false;

  //

  openProjects = [];
  formattedStartDate = '';
  formattedEndDate = '';
  switchIconDate = false;
  openDependencies = [];
  openMilestones = [];
  openChangeLogs = [];
  showDeleteConfirmModal = false;
  timeEstimationModalCollapsed = [];
  showTimeEstimationModal = false;
  dependencyModalCollapsed = [];
  showDependencyModal = false;
  priorityModalCollapsed = [];
  showPriorityModal = false;
  deletingId: any;
  newTaskDescription = '';
  visibleAvail = false;
  addedDeliveryProducts = [];
  showAvailModal = false;
  topDependencyModal = false;
  topPriorityModal = false;
  invalidQuantity = false;

  editable: boolean;
  newKeyword: string;
  selectedItem: any = '';
  inputChanged: any = '';
  config2: any = {'placeholder': 'Type here', 'sourceField': ['payload', 'label']};
  items2: any[] = [
    {id: 0, payload: {label: 'John Moss', imageUrl: 'assets/users/user1.png'}},
    {id: 1, payload: {label: 'Latif', imageUrl: 'assets/users/user2.png'}},
    {id: 2, payload: {label: 'Dennis', imageUrl: 'assets/users/user3.png'}},
    {id: 3, payload: {label: 'Sepher', imageUrl: 'assets/users/man.png'}},
  ];

  searchableList = ['description'];
  newProduct = {
    id: 0,
    description: this.newTaskDescription,
    status: 'notStarted',
    estimateHour: '',
    estimateMin: '',
    priority: 'Level 1',
    createdDate: '',
    visibility: true,
    new: true,
    dependency: ''
  };

  selectName: any;
  workorderName: any;
  topTimeEstimationModal = false;
  queryString: any;


  constructor(private completerService: CompleterService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });
  }

  ngOnInit() {

    this.editable = false;
    this.workorderDetails.workorderNumber = this.generateAutoId();
    this.taskTicketInfo.map( t => t['visibility'] = true);
  }

  onSelectCustomer(event) {
    this.workorderDetails.contactName = event;
    this.openProjects = this.usersProjects.filter( p => p.owner === event);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.workorderDetails.followers[i];
    this.items2.push({id: this.items2.length, payload: {label: item.name, imageUrl: item.imageUrl}});
    this.workorderDetails.followers.splice(i, 1);
  }

  generateAutoId() {
    let month: any;
    let year: any;
    let count: any;
    const today = new Date();
    month = today.getMonth() + 1;
    if (month.toString().length) {
      month = '0' + month;
    }
    year = today.getFullYear().toString().slice(-2);
    if (this.projectIDCount.length > 0) {
      count = this.projectIDCount[this.projectIDCount.length] + 1;
    } else {
      count = 1;
    }
    if (count.toString().length === 1) {
      count = '0' + count;
    }
    const projectId = 'WO ' + month + year + count;
    return projectId;
  }

  moveToProjectDetails() {

  }

  saveworkorderDetails() {
  }

  tabChange(event) {
    switch (event.tabTitle) {
      case 'DETAILS': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = true;
        this.tabActiveThird = false;
        break;
      }
      case 'SCHEDULER': {
        this.tabActiveSecond = true;
        this.tabActiveFirst = false;
        this.tabActiveThird = false;
        this.clickNext('tab-one');
        break;
      }
      case 'CHECKLIST': {
        this.tabActiveSecond = false;
        this.tabActiveFirst = false;
        this.tabActiveThird = true;
        if (this.tabActiveFirst) {
          this.clickNext('tab-one');
        } else {
          this.clickNext('tab-two');
        }
        break;
      }
    }
  }

  clickNext(pos) {
    if (pos === 'tab-one') {
      this.invalidCustomerName = false;
      this.invalidStartTime = this.invalidStartDate = this.invalidEndDate = this.invalidEndTime = false;
      if (this.workorderDetails.contactName && this.workorderDetails.startTime &&
          this.workorderDetails.startDate && this.workorderDetails.endDate && this.workorderDetails.endTime)  {
            this.tabActiveSecond = true;
            this.tabActiveFirst = false;
            this.tabActiveThird = false;
            this.visibleAvail = true;
      } else {
        if (!this.workorderDetails.contactName) {
          this.invalidCustomerName = true;
        }
        if (!this.workorderDetails.endDate) {
          this.invalidEndDate = true;
        }
        if (!this.workorderDetails.startDate) {
          this.invalidStartDate = true;
        }
        if (!this.workorderDetails.endTime) {
          this.invalidEndTime = true;
        }
        if (!this.workorderDetails.startTime) {
          this.invalidStartTime = true;
        }
        setTimeout(() => {
          this.tabActiveFirst = true;
          this.tabActiveSecond = false;
          this.tabActiveThird = false;
        });
      }
    } else if (pos === 'tab-two') {
      if (this.resourceSelected) {
        this.tabActiveSecond = false;
        this.tabActiveFirst = false;
        this.tabActiveThird = true;
      } else {
        setTimeout(() => {
          this.tabActiveFirst = false;
          this.tabActiveSecond = true;
          this.tabActiveThird = false;
        });
      }

    }
  }

  clickBack(pos) {
    if (pos === 'tab-one') {
      this.showAddWorkorderModal = false;
      this.addWorkorderModalCollapsed = true;
    } else if (pos === 'tab-two') {
      this.tabActiveThird = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
    } else if (pos === 'tab-three') {
      this.tabActiveThird = false;
      this.tabActiveFirst = false;
      this.tabActiveSecond = true;
    }
  }

  openAddWorkorderModal() {
    this.tabActiveFirst = true;
    this.tabActiveSecond = false;
    this.tabActiveThird = false;
    this.showAddWorkorderModal = true;
    this.addWorkorderModalCollapsed = false;
  }

  finishAddWorkorder() {
    if (this.scopeEditorContent) {
      this.tabActiveThird = false;
      this.tabActiveFirst = true;
      this.tabActiveSecond = false;
      this.showAddWorkorderModal = false;
      this.addWorkorderModalCollapsed = true;
    } else {
    }
  }

  selectStartDate(start) {
    this.formattedStartDate = moment(start.value).format('MMMM DD, YYYY');
  }

  selectEndDate(end) {
    this.formattedEndDate = moment(end.value).format('MMMM DD, YYYY');
  }

  clickIconDate() {
    if (this.workorderDetails.startDate) {
      this.workorderDetails.endDate = (!this.switchIconDate) ? this.workorderDetails.startDate : '';
      this.formattedEndDate = (!this.switchIconDate) ? this.formattedStartDate : '';
    }
    this.switchIconDate = !this.switchIconDate;
  }

  onSelectProject(event) {
    const index = parseInt(event, 10);
    this.openDependencies = this.projectInfo[index].dependency;
    this.openMilestones = this.projectInfo[index].milestone;
    this.openChangeLogs = this.projectInfo[index].changeLog;
  }

  onSelectFollowers(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.payload.label !== item.payload.label;
    });
    this.workorderDetails.followers.push({name: item.payload.label, imageUrl: item.payload.imageUrl });
  }

  getColor(task) {
    if (task.priority === 'Level 1') return 'green';
    else if (task.priority === 'Level 2') return 'orange';
    else return 'red';
  }

  changeVisibility(task, i) {
    this.taskTicketInfo[i]['visibility'] = !this.taskTicketInfo[i]['visibility'];
  }

  openTimeEstimationModal(index, task) {
    this.timeEstimationModalCollapsed[index] = true;
    this.closeDependencyModal(index);
    this.closePriorityModal(index);
  }

  closeTimeEstimationModal(i) {
    this.timeEstimationModalCollapsed[i] = false;
  }

  openDependencyModal(index, task) {
    this.dependencyModalCollapsed[index] = true;
    this.closeTimeEstimationModal(index);
    this.closePriorityModal(index);
  }

  closeDependencyModal(i) {
    this.dependencyModalCollapsed[i] = false;
  }

  openPriorityModal(index) {
    this.priorityModalCollapsed[index] = true;
    this.closeTimeEstimationModal(index);
    this.closeDependencyModal(index);
  }

  closePriorityModal(i) {
    this.priorityModalCollapsed[i] = false;
  }

  onClickedOutside(i, task) {
    this.taskTicketInfo[i]['visibility'] = true;

    this.closeTimeEstimationModal(i);
    this.closeDependencyModal(i);
    this.closePriorityModal(i);
  }

  deleteTicket(task) {
    this.deletingId = task.id;
    this.showDeleteConfirmModal = true;
  }

  confirmDelete() {
    const index = this.taskTicketInfo.indexOf(this.deletingId);
    this.taskTicketInfo.splice(index, 1);
    this.showDeleteConfirmModal = false;
  }

  onDependencySelect(i, task) {
    this.taskTicketInfo[task.id]['dependency'] = i;
  }

  onPrioritySelect(event, task) {
    this.taskTicketInfo[task.id]['priority'] = event;
  }

  addTicket() {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const newId = Math.max(...this.taskTicketInfo.map(t => t['id'])) + 1;
    const newDate = new Intl.DateTimeFormat('en-US', options).format(date);
    this.newProduct = {
      id: newId,
      description: this.newTaskDescription,
      status: 'notStarted',
      estimateHour: '',
      estimateMin: '',
      priority: 'Level 1',
      createdDate: newDate,
      visibility: true,
      new: true,
      dependency: '',
    };
    this.newProduct.new = true;
    if (this.newTaskDescription) {
      this.taskTicketInfo.push(this.newProduct);
    }
    this.newTaskDescription = '';
  }

  checkAvailability (available, quantity, index) {
    if ((available < quantity ) || (quantity < 0) || (isNaN(quantity))) {
      this.addedDeliveryProducts[index].quantity = 0;
      this.invalidQuantity = true;
    } else {
      this.invalidQuantity = false;
    }
  }

  addToAddedList(product) {
    const checkExistance = this.addedDeliveryProducts.filter(p => p.id === product.id);
    if (checkExistance.length) {
      return;
    } else {
      this.addedDeliveryProducts.push(product);
      this.showAvailModal = false;
    }
  }

  getAvailability(event) {
    console.log('avail: ', event);
    if (event) {
      this.resourceSelected = true;
    } else {
      this.resourceSelected = false;
    }
  }

  newDependencySelect(task, i) {
    this.newProduct.dependency = task.id;
    this.topDependencyModal = false;
  }

  newPrioritySelect(priority, i) {
    this.newProduct.priority = priority;
    this.topPriorityModal = false;
  }

}
