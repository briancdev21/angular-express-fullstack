import { Component, Input, OnInit, HostListener, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { CompleterService, CompleterData } from 'ng2-completer';
import * as moment from 'moment';
import { AvailabilityComponent } from '../orderprofile/availability/availability.component';
import { SharedService } from '../../../../services/shared.service';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { ProductsService } from '../../../../services/inventory/products.service';
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'app-addworkorder',
  templateUrl: './addworkorder.component.html',
  styleUrls: [
    './addworkorder.component.css',
  ]
})


export class AddWorkOrderComponent implements OnInit {

  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;
  projectsList = [
  ];

  projectInfo = [
  ];

  taskTicketInfo: Array<object> = [
  ];

  deliveryProducts: Array<object> = [];

  workorderDetails = {
    projectId: undefined,
    contactId : undefined,
    selectedProject: undefined,
    workorderNumber: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    description: '',
    followers: [],
    changeLog: undefined,
    workorderName: undefined
  };

  addWorkorderModalCollapsed = true;
  customerList: CompleterData;
  projectManagerList = ['Manager1', 'Manager2', 'Manager3'];
  accountReceivableList = ['Account Receivable 1', 'Account Receivable 2', 'Account Receivable 3'];
  associationList = ['Associatioin 1', 'Associatioin 2', 'Associatioin 3'];
  workorderPricingList = ['Friend & Family', 'Royalty Program', 'Retail', 'Builders Program', 'Wholesale', 'Cost'];
  projectTypeList = ['Project Type 1', 'Project Type 2', 'Project Type 3'];
  priorityList = ['1', '2', '3'];

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
  invalidName = false;
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
  config2: any = {'placeholder': 'No Result', 'sourceField': 'label'};
  items2: any[] = [
  ];
  newPriority = '3';
  newEstimateHour = 0;
  newEstimateMin = 0;

  searchableList = ['name'];
  newProduct = {
    id: 0,
    description: this.newTaskDescription,
    status: 'notStarted',
    estimateHour: 0,
    estimateMin: 0,
    priority: '1',
    createdDate: '',
    visibility: true,
    new: true,
  };

  selectName: any;
  topTimeEstimationModal = false;
  queryString: any;
  isAutocompleteUpdated = false;
  contactsList: any;
  usersList: any;
  followers = [];
  newCreatedWorkOrderId: any;
  availableProductsList = [];
  isoFormatStart: any;
  isoFormatEnd: any;
  savingWorkOrderData: any;
  today = new Date();
  formattedToday = moment(this.today).format('YYYY-MM-DD');

  constructor(private completerService: CompleterService, private sharedService: SharedService, private projectsService: ProjectsService,
    private collaboratorsService: CollaboratorsService, private productsService: ProductsService) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
    });

    this.sharedService.getContacts().subscribe(data => {
      this.contactsList = data;
      this.addContactName(this.contactsList);
      console.log('contacts: ', this.contactsList);
      this.customerList = completerService.local(this.contactsList, 'name', 'name');
    });

    this.sharedService.getUsers().subscribe(data => {
      this.usersList = data;
      for (let i = 0; i < this.usersList.length; i++) {
        const ele = {
          id: i + 1,
          label: this.usersList[i].firstName + ' ' + this.usersList[i].lastName,
          imageUrl: this.usersList[i].pictureURI,
          username: this.usersList[i].username
        };
        this.items2.push(ele);
      }
    });

    this.productsService.getProductCatalog().subscribe(data => {
      this.availableProductsList = data.results;
      console.log('proudctslist: ', data);
    });

    this.projectsService.getProjectsList().subscribe(res => {
      this.projectsList = res.results;
      this.projectsList = this.projectsList.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PENDING');
    });
  }

  ngOnInit() {

    this.editable = false;
    this.workorderDetails.workorderNumber = this.generateAutoId();
    this.taskTicketInfo.map( t => t['visibility'] = true);
  }

  onSelectCustomer(event) {
    console.log('selected customer: ', event);
    this.workorderDetails.contactId = event.originalObject.id;
    // this.openProjects = this.usersProjects.filter( p => p.owner === event);
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeUser(i: number) {
    const item = this.workorderDetails.followers[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl});
    this.workorderDetails.followers.splice(i, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  generateAutoId() {
    let month: any;
    let year: any;
    let count: any;
    month = this.today.getMonth() + 1;
    if (month.toString().length) {
      month = '0' + month;
    }
    year = this.today.getFullYear().toString().slice(-2);
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
      console.log('workorder name: ', this.workorderDetails.workorderName);
      this.invalidCustomerName = false;
      this.invalidStartTime = this.invalidStartDate = this.invalidEndDate = this.invalidEndTime = this.invalidName = false;
      if (this.workorderDetails.startTime && this.workorderDetails.workorderName &&
          this.workorderDetails.startDate && this.workorderDetails.endDate && this.workorderDetails.endTime)  {
            this.tabActiveSecond = true;
            this.tabActiveFirst = false;
            this.tabActiveThird = false;
            this.visibleAvail = true;

            const timeStart = moment(this.workorderDetails.startTime).format('hh:mm:ss');
            const timeAddedStart = this.workorderDetails.startDate + 'T' + timeStart;
            this.isoFormatStart = new Date (timeAddedStart).toISOString();
            const timeEnd = moment(this.workorderDetails.endTime).format('hh:mm:ss');
            const timeAddedEnd = this.workorderDetails.endDate + 'T' + timeEnd;
            this.isoFormatEnd = new Date (timeAddedEnd).toISOString();
            this.savingWorkOrderData = {
              contactId: this.workorderDetails.contactId,
              name: this.workorderDetails.workorderName,
              startDate: this.isoFormatStart,
              endDate: this.isoFormatEnd,
              followers: this.followers.length > 0 ? this.followers : undefined,
              projectId: this.workorderDetails.selectedProject ? this.workorderDetails.selectedProject : undefined,
              changelogId: this.workorderDetails.changeLog ? this.workorderDetails.changeLog : null,
              description: this.workorderDetails.description,
            };
      } else {
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
        if (!this.workorderDetails.workorderName) {
          this.invalidName = true;
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

  createNewWorkOrder() {
    console.log('saving work orders: ', this.workorderDetails);

    // remove undefined and null fields
    Object.keys(this.savingWorkOrderData).forEach((key) =>
      (this.savingWorkOrderData[key] == null || this.savingWorkOrderData[key] === undefined) && delete this.savingWorkOrderData[key]);

    this.collaboratorsService.createWorkOrder(this.savingWorkOrderData).subscribe(res => {
      if (res.error) {
        console.log('error: ', res);
      } else {
        console.log('successfully created: ', res);
        this.newCreatedWorkOrderId = res.data.id;
      }
    });
  }

  openAddWorkorderModal() {
    this.tabActiveFirst = true;
    this.tabActiveSecond = false;
    this.tabActiveThird = false;
    this.showAddWorkorderModal = true;
    this.addWorkorderModalCollapsed = false;
  }

  finishAddWorkorder() {
    console.log('added productslist: ', this.addedDeliveryProducts);
    this.addedDeliveryProducts.forEach(ele => {
      const savingData = {
        sku: ele.sku,
        quantity: ele.addedQuantity
      };
      this.collaboratorsService.createWorkOrderProduct(this.newCreatedWorkOrderId, savingData).subscribe(res => {
        console.log('succeesuflly created: ', res);
      });
    });
    this.tabActiveThird = false;
    this.tabActiveFirst = true;
    this.tabActiveSecond = false;
    this.showAddWorkorderModal = false;
    this.addWorkorderModalCollapsed = true;
  }

  selectStartDate(start) {
    this.workorderDetails.startDate = moment(start.value).format('YYYY-MM-DD');
    this.formattedStartDate = moment(start.value).format('MMMM DD, YYYY');
  }

  selectEndDate(end) {
    this.workorderDetails.endDate = moment(end.value).format('YYYY-MM-DD');
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
    console.log('selected project: ', event);
    this.projectsService.getProjectChangeLogs(event).subscribe(res => {
      this.openChangeLogs = res.results.filter(c => c.status === 'IN_PROGRESS' || c.status === 'NEW');
      console.log('openChangeLogs: ', this.openChangeLogs);
    });
    // this.openDependencies = this.projectInfo[index].dependency;
    // this.openMilestones = this.projectInfo[index].milestone;
    // this.openChangeLogs = this.projectInfo[index].changeLog;
  }

  onSelectFollowers(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    this.workorderDetails.followers.push({name: item.label, imageUrl: item.imageUrl });
    this.followers.push(item.username);
  }

  getColor(task) {
    if (task.priority === '1') {
      return 'red';
    } else if (task.priority === '2') {
      return 'orange';
    } else {
      return 'green';
    }
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
      estimateHour: this.newEstimateHour ? this.newEstimateHour : 0 ,
      estimateMin: this.newEstimateMin ? this.newEstimateMin : 0,
      priority: this.newPriority,
      createdDate: this.formattedToday,
      visibility: true,
      new: true,
    };
    this.newProduct.new = true;
    if (this.newTaskDescription) {
      this.taskTicketInfo.push(this.newProduct);
    }
    this.newTaskDescription = '';
    this.newPriority = '3';
    this.newEstimateHour = 0;
    this.newEstimateMin = 0;
  }

  checkAvailability (available, quantity, index) {
    available = parseInt(available, 10);
    quantity = parseInt(quantity, 10);
    console.log('check avail: ', available, quantity, index);
    if ((available < quantity ) || (quantity < 0) || (isNaN(quantity))) {
      this.addedDeliveryProducts[index].addedQuantity = 1;
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
      product.addedQuantity = 1;
      this.addedDeliveryProducts.push(product);
      console.log('added products list: ', this.addedDeliveryProducts);
      this.showAvailModal = false;
    }
  }

  getAvailability(event) {
    console.log('avail: ', event);
    this.savingWorkOrderData.collaborators = event;
    if (event.length) {
      this.resourceSelected = true;
    } else {
      this.resourceSelected = false;
    }
  }

  // newDependencySelect(task, i) {
  //   this.newProduct.dependency = task.id;
  //   this.topDependencyModal = false;
  // }

  newPrioritySelect(priority, i) {
    this.newPriority = priority;
    this.topPriorityModal = false;
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

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
  }
}
