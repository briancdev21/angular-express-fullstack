import { Component, OnInit, HostListener } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MapToKeysPipe} from './map-to-keys.pipe';
import { Renderer } from '@angular/core';
import * as _ from 'lodash';
import {MyTasksModel, TaskModel} from '../../../models/mytasks.model';
import * as moment from 'moment';
import { PmTasksService } from '../../../services/pmtasks.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-mytasks',
  templateUrl: './mytasks.component.html',
  styleUrls: [
    './mytasks.component.css',
    '../../../../../node_modules/dragula/dist/dragula.css'
  ],
  entryComponents: [
  ],
})
export class MyTasksComponent implements OnInit {

  menuCollapsed = true;
  newPanelTitle = '';
  addPanelClicked = false;
  ownerModalCollapsed = [[]];
  dependencyModalCollapsed = [[]];
  selectedOwner: any;
  customForm: any;
  heroForm: FormGroup;
  tasksTotalCount = 0;
  allTasks: any;
  inputChanged: any;
  selectedItem: any;
  completedTasksList = [];
  dDate: any;
  inputRowCount = 1;
  maxHeight = 30;
  isAutocompleteUpdated = false;

  config2 = {'placeholder': 'Type here', 'sourceField': ''};
  colors = ['#F0D7BD', '#DFE5B0', '#F0C9C9', '#CBE0ED', '#E0BBCC', '#C4BBE0', '#BBC0E0', '#BBE0CC', '#E0BBBB', '#E8E3A7'];

  defaultTaskOwner = {
    name: '',
    imgUrl: ''
  };
  taskOwners = [
    {
      name: 'John Moss',
      imgUrl: 'assets/users/user1.png',
      userId: 1
    },
    {
      name: 'Michael',
      imgUrl: 'assets/users/user3.png',
      userId: 2
    },
    {
      name: 'Joseph',
      imgUrl: 'assets/users/user2.png',
      userId: 3
    },
  ];

  // panels = [
  //   {
  //     title: 'INBOX',
  //     color: '',
  //     tasks: [
  //       {
  //         id: 1,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-10-05',
  //         duration: 2,
  //         dependency: [],
  //         like: false,
  //         attachment: false,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 2,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-15',
  //         duration: 2,
  //         dependency: [1],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 3,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [2],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 4,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 5,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 6,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       }
  //     ]
  //   },
  //   {
  //     title: 'ORGANIZATION',
  //     color: '',
  //     tasks: [
  //       {
  //         id: 1,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 2,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-11-05',
  //         duration: 2,
  //         dependency: [1, 2],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 3,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [2],
  //         like: true,
  //         attachment: false,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 4,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //     ]
  //   },
  //   {
  //     title: 'PROJECTS',
  //     color: '',
  //     tasks: [
  //       {
  //         id: 1,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 2,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [1],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 3,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [2],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 4,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 5,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 6,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: false,
  //         attachmentImg: '',
  //         taskPath: ''
  //       },
  //       {
  //         id: 7,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         subTaskCount: 5,
  //         subTaskComplete: 2,
  //         starred: false,
  //         taskPath: ''
  //       },
  //       {
  //         id: 8,
  //         taskTitle: ' Task title goes here',
  //         profile: {
  //           name: 'John Moss',
  //           imgUrl: 'assets/users/user1.png',
  //           userId: 1
  //         },
  //         progress: 100,
  //         dueDate: '2017-12-05',
  //         duration: 2,
  //         dependency: [],
  //         like: true,
  //         attachment: true,
  //         attachmentImg: '',
  //         starred: false,
  //         taskPath: ''
  //       }
  //     ]
  //   },
  // ] as MyTasksModel[];

  panels = [];
  usersList = [];

  constructor( private dragulaService: DragulaService, private fb: FormBuilder, private renderer: Renderer,
    private pmTasksService: PmTasksService, private sharedService: SharedService ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    // set draggable class
    const bag: any = this.dragulaService.find('dragPanel');
    if (bag !== undefined ) {
      this.dragulaService.destroy('dragPanel');
    }

    dragulaService.setOptions('dragPanel', {
      moves: function (el, container, handle) {
        return handle.className.includes('*');
      }
    });

    this.sharedService.getUsers().subscribe(users => {
      this.usersList = users;

      this.refreshTable();
    });



  }


  ngOnInit() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // this.panels.map(m => m.tasks.map(t => t.ownerModalCollapsed = false));

    for (let i = 0; i < this.panels.length; i++) {
        this.ownerModalCollapsed[i] = new Array();
        this.dependencyModalCollapsed[i] = new Array();
        this.tasksTotalCount += this.panels[i].tasks.length;
        if (i === 2) {
          this.panels[i].tasks.map(t => t.taskPath = t.profile.name + ' > Remodel with a Nu Life');
        }
       //  color selection
        const pickColorId = i % 10;
        this.panels[i].color = this.colors[pickColorId];
      for (let j = 0; j < this.panels[i].tasks.length; j++) {
        this.ownerModalCollapsed[i][j] = false;
        this.dependencyModalCollapsed[i][j] = false;
        const date = new Date (this.panels[i].tasks[j].dueDate);
        this.panels[i].tasks[j].dueDate = new Intl.DateTimeFormat('en-US', options).format(date);
      }
    }
    this.selectedOwner = 0;
    this.allTasks = _.range(1, this.tasksTotalCount + 1).map(t => t.toString());

    // task input's max height
    this.panels.forEach(element => {
      element.tasks.map( t => t.maxHeight = 30);
    });

  }

  refreshTable() {
    this.pmTasksService.getTaskGroups().subscribe(data => {
      this.panels = data.results;
      console.log('panels: ', data);
      for (let i = 0; i < this.panels.length; i++) {
        this.panels[i].color = this.colors[i];
      }
    });
  }

  getTaskId (panel, task) {
    let foreTaskCount;
    if (panel !== 0 ) {
      for (let i = 0; i <= panel - 1; i++) {
        if (i !== 0 ) {
          foreTaskCount = foreTaskCount + this.panels[i].tasks.length;
        } else {
          foreTaskCount = this.panels[0].tasks.length;
        }
      }
    } else {
      foreTaskCount = 0;
    }
    return foreTaskCount + this.panels[panel].tasks[task].id;
  }

  selectDueDate(event, i, j) {
    // this.dDate = event.value;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dDate = new Intl.DateTimeFormat('en-US', options).format(event.value);
    // Add dDate field to panel info and update it with formatted date.
    this.panels[i].tasks[j].dueDate = dDate;

  }

  private onDropModel(args) {
    const [el, target, source] = args;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  addTask(panel) {
    const newTask = {
      id: 1 + panel.tasks.length,
      taskTitle: '',
      profile: {
        name: '',
        imgUrl: '',
        userId: undefined
      },
      progress: 0,
      dueDate: '',
      duration: 0,
      dependency: [],
      like: false,
      attachment: false,
      attachmentImg: '',
      taskPath: 'John Moss > Remodel with a Nu Life',
      starred: false
    } as TaskModel;
    this.panels.filter(m => m.title === panel.title)[0].tasks.push(newTask);
  }

  addNewPanel() {
    if (!this.addPanelClicked) {
      this.addPanelClicked = !this.addPanelClicked;
    }

  }

  handleKeyDown(event) {
    const newPanel = {
      title: this.newPanelTitle,
    };
    if (event.key === 'Enter' && this.newPanelTitle ) {
      // this.panels.push(newPanel);
      this.newPanelTitle = '';
      this.addPanelClicked = !this.addPanelClicked;
      this.pmTasksService.createTaskGroup(newPanel).subscribe(res => {
        console.log('new panel created: ', res);
      });
    }
  }

  clickOutside() {
    this.addPanelClicked = false;
  }

  closeOwnerModal(i, j) {
    this.ownerModalCollapsed[i][j] = false;
  }

  onOwnerSelect(event, panel, task ) {
    this.panels[panel].tasks[task].profile = this.taskOwners[this.selectedOwner - 1];
  }

  openOwnerModal(i, j) {
    this.ownerModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.ownerModalCollapsed[i][j] = true;
    this.selectedOwner = this.panels[i].tasks[j].profile.userId;
  }

  openDependencyModal(i, j) {
    this.dependencyModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.dependencyModalCollapsed[i][j] = true;
  }

  closeDependencyModal(i, j) {
    this.dependencyModalCollapsed[i][j] = false;
  }

  removeDependency(i, j, k) {
    const item = this.panels[i].tasks[j].dependency[k];
    this.allTasks.push(item);
    this.panels[i].tasks[j].dependency.splice(k, 1);
    this.isAutocompleteUpdated = !this.isAutocompleteUpdated;
  }

  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  onSelect(i, j, item: Number) {
    this.selectedItem = item;
    this.allTasks = this.allTasks.filter(function( obj ) {
      return obj !== item;
    });
    const dependency = this.panels[i].tasks[j].dependency as any[];
    if (this.panels[i].tasks[j].dependency.length < 3) {
      dependency.push(item);
    }
  }

  uploadAttachment() {
    window.alert('Upload Files');
  }

  completeTask (i, j) {
    // add item to completed list
    this.completedTasksList.push(this.panels[i].tasks[j]);
    // remove item from column
    this.panels[i].tasks.splice(j, 1);
  }

  checkInput(i, j, event, title) {
    console.log('8888', event.target.offsetWidth, title.length);
    if (title.length * 8 - event.target.offsetWidth > 0) {
      this.panels[i].tasks[j].maxHeight = 54;
    } else {
      this.panels[i].tasks[j].maxHeight = 30;
    }
  }

  removeFocus(event) {
    event.preventDefault();
    this.renderer.invokeElementMethod(event.target, 'blur');
  }

  checkOverdue(date) {
    if (moment() > moment(date)) {
      return true;
    } else {
      return false;
    }
  }
}
