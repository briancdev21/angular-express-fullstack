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
  colors = ['#F0D7BD', '#CBE0ED', '#DFE5B0', '#F0C9C9', '#E0BBCC', '#C4BBE0', '#BBC0E0', '#BBE0CC', '#E0BBBB', '#E8E3A7'];

  defaultTaskOwner = {
    name: '',
    imgUrl: ''
  };
  taskOwners = [
  ];

  panels = [];
  usersList = [];
  contactsList = [];
  addedNewTask: any;
  showTaskGroupDeleteConfirmModal = [];
  showSettingsModal = [[]];
  showDeleteConfirmModal = [[]];

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

    // dragulaService.setOptions('dragTask', {
    //   accepts: (el, target, source, sibling) => {
    //     // To avoid dragging from first second, third column
    //     return target.id !== '1' && source.id !== '1' && target.id !== '2' && source.id !== '2' && target.id !== '0';
    //   }
    // });

    this.sharedService.getContacts().subscribe(contacts => {
      this.contactsList = contacts;
      this.addContactName(this.contactsList);

      this.sharedService.getUsers().subscribe(users => {
        this.usersList = users;
        this.taskOwners = users;
        this.refreshTable();
      });
    });


  }


  ngOnInit() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // this.panels.map(m => m.tasks.map(t => t.ownerModalCollapsed = false));

    for (let i = 0; i < this.panels.length; i++) {
        // this.ownerModalCollapsed[i] = new Array();
        // this.dependencyModalCollapsed[i] = new Array();
        this.tasksTotalCount += this.panels[i].tasks.length;
        if (i === 2) {
          this.panels[i].tasks.map(t => t.taskPath = t.assigneeInfo.username + ' > Remodel with a Nu Life');
        }
       //  color selection
        const pickColorId = i % 10;
        this.panels[i].color = this.colors[pickColorId];
      for (let j = 0; j < this.panels[i].tasks.length; j++) {
        // this.ownerModalCollapsed[i][j] = false;
        // this.dependencyModalCollapsed[i][j] = false;
        const date = new Date (this.panels[i].tasks[j].startDate);
        this.panels[i].tasks[j].startDate = moment(date).format('MMMM DD, YYYY');
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
      // sort task groups by order
      this.sortArray('order');

      for (let i = 0; i < this.panels.length; i++) {

        this.panels[i].color = this.colors[i];
        this.panels[i].editTitle = false;
        this.ownerModalCollapsed[i] = new Array();
        this.dependencyModalCollapsed[i] = new Array();
        this.showTaskGroupDeleteConfirmModal[i] = false;
        this.showSettingsModal[i] = new Array();
        this.showDeleteConfirmModal[i] = new Array();

        this.pmTasksService.getTasks(this.panels[i].id).subscribe(taskData => {
          this.panels[i].tasks = taskData.results;
          this.panels[i].tasks.forEach(element => {
            element.assigneeInfo = this.getUserInfo(element.assignee);
            element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
            element.taskTitle = element.title;
            element.dependency = element.dependencyIds ? element.dependencyIds : [];
          });
          let importantTasks = [];
          importantTasks = this.panels[i].tasks.filter(t => t.isImportant === true);
          const unImportantTasks = this.panels[i].tasks.filter(t => t.isImportant === false);
          this.panels[i].tasks = importantTasks.concat(unImportantTasks);

          for (let j = 0; j < this.panels[i].tasks.length; j++) {
            this.ownerModalCollapsed[i][j] = false;
            this.dependencyModalCollapsed[i][j] = false;
            this.showSettingsModal[i][j] = false;
            this.showDeleteConfirmModal[i][j] = false;
          }
        });
      }
      console.log('panels: ', this.panels);
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


  sortArray(field) {
    const cmp = this;
    this.panels.sort( function(name1, name2) {
      if ( name1[field] < name2[field]) {
        return -1;
      } else if ( name1[field] > name2[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log('sortscoreclick: ', cmp.panels);
  }

  selectStartDate(event, i, j) {
    this.updateInfo(i, j);
    // this.dDate = event.value;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dDate = new Intl.DateTimeFormat('en-US', options).format(event.value);
    // Add dDate field to panel info and update it with formatted date.
    this.panels[i].tasks[j].startDate = dDate;

  }

  private onDropModel(args) {
    const [el, target, source] = args;
    const taskIndex = el.id;
    const targetPanelIndex = target.id;
    const sourcePanelIndex = source.id;
    const selectedTaskData = this.panels[sourcePanelIndex].tasks[taskIndex];
    console.log('selected drag data: ', selectedTaskData, this.panels);
    if (target !== source) {
      this.panels[targetPanelIndex].tasks.push(selectedTaskData);
    }
    this.pmTasksService
    .deleteIndividualtask(this.panels[sourcePanelIndex].id, this.panels[sourcePanelIndex].tasks[taskIndex].id).subscribe(res => {
      console.log('task deleted: ', res);
    });
    const savingData = {
      'assignee': selectedTaskData.assigneeInfo ? selectedTaskData.assigneeInfo.username : selectedTaskData.assignee,
      'title': selectedTaskData.taskTitle ? selectedTaskData.taskTitle : selectedTaskData.title,
      'isImportant': selectedTaskData.isImportant,
      'isComplete': selectedTaskData.isComplete,
      'startDate': moment(selectedTaskData.startDate).format('YYYY-MM-DD'),
      'keywordIds': selectedTaskData.keywordIds ? selectedTaskData.keywordIds : [],
      'followers': selectedTaskData.followers ? selectedTaskData.followers : [],
      'dependencyIds': selectedTaskData.followers ? selectedTaskData.followers : [],
      'order': selectedTaskData.order,
      'duration': selectedTaskData.duration,
      'note': selectedTaskData.note ? selectedTaskData.note : '',
      'completion': selectedTaskData.completion,
    };
    this.pmTasksService.createTask(this.panels[targetPanelIndex].id, savingData).subscribe(res => {
      console.log('task created: ', res);
    });
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  addTask(panel) {
    const newMockTask = {
      title: ''
    };
    this.pmTasksService.createTask(panel.id, newMockTask).subscribe(res => {
      this.refreshTable();
    });
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
        this.refreshTable();
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
    const selectedUser = this.usersList.filter(u => u.username === event)[0];
    this.panels[panel].tasks[task].assigneeInfo = selectedUser;
    this.updateIndividualTask(this.panels[panel].id, this.panels[panel].tasks[task].id);
  }

  openOwnerModal(i, j) {
    this.ownerModalCollapsed = this.ownerModalCollapsed.map(m => m.map(t => t = false));
    this.ownerModalCollapsed[i][j] = true;
    this.selectedOwner = this.panels[i].tasks[j].assigneeInfo.username;
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
    this.updateIndividualTask(this.panels[i].id, this.panels[i].tasks[j].id);
    // remove item from column
    this.panels[i].tasks.splice(j, 1);
  }

  checkInput(i, j, event, title) {
    // console.log('8888', event.target.offsetWidth, title.length);
    if (title.length * 8 - event.target.offsetWidth > 0) {
      this.panels[i].tasks[j].maxHeight = 54;
    } else {
      this.panels[i].tasks[j].maxHeight = 30;
    }
  }

  updateInfo(i, j) {
    this.updateIndividualTask(this.panels[i].id, this.panels[i].tasks[j].id);
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

  getContactNameFromId(id) {
    const selectedContact = this.contactsList.filter(c => c.id === id)[0];
    return selectedContact.name;
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

  getUserInfo(username) {
    const selectedUser = this.usersList.filter(u => u.username === username)[0];
    return selectedUser;
  }

  updateIndividualTask(panelId, taskId) {
    const selectedPanel = this.panels.filter(p => p.id === panelId)[0];
    const selectedTask = selectedPanel.tasks.filter(t => t.id === taskId)[0];
    console.log('selected task: ', selectedTask);
    const savingData = {
      'assignee': selectedTask.assigneeInfo ? selectedTask.assigneeInfo.username : selectedTask.assignee,
      'title': selectedTask.taskTitle ? selectedTask.taskTitle : selectedTask.title,
      'isImportant': selectedTask.isImportant,
      'isComplete': selectedTask.isComplete,
      'startDate': moment(selectedTask.startDate).format('YYYY-MM-DD'),
      'keywordIds': selectedTask.keywordIds ? selectedTask.keywordIds : [],
      'followers': selectedTask.followers ? selectedTask.followers : [],
      'dependencyIds': selectedTask.followers ? selectedTask.followers : [],
      'order': selectedTask.order,
      'duration': selectedTask.duration,
      'note': selectedTask.note ? selectedTask.note : '',
      'completion': selectedTask.completion,
      'notify': selectedTask.notify,
    };

    const data = {
      'keywordIds': selectedTask.keywordIds ? selectedTask.keywordIds : [],
      'followers': selectedTask.followers ? selectedTask.followers : [],
      'dependencyIds': selectedTask.followers ? selectedTask.followers : [],
      'assignee': 'string',
      'title': 'string',
      'order': selectedTask.order,
      'isImportant': true,
      'isComplete': true,
      'completion': selectedTask.completion,
      'startDate': 'string',
      'duration': selectedTask.duration,
      'note': selectedTask.note ? selectedTask.note : '',
    };

    this.pmTasksService.updateIndividualTask(panelId, taskId, savingData).subscribe(res => {
      console.log('task updated: ', res);
    });
  }

   updateTaskId (panel, task) {
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

  removeTaskIdList (panel, task) {
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
  updatePanelTitle(index) {
    this.panels[index].editTitle = false;
    const body =  {
      owner: this.panels[index].owner,
      title: this.panels[index].title,
      order: this.panels[index].order,
      permission: this.panels[index].permission,
    };
    this.pmTasksService.updateIndividualTaskGroup(this.panels[index].id, body).subscribe(res => {
      this.refreshTable();
    });
  }

  confirmDeleteTaskGroup(milestoneId) {
    // console.log('taskgroup deleted');
    this.pmTasksService.deleteIndividualTaskGroup(milestoneId).subscribe(res => {
      this.refreshTable();
    });
  }

  openTitleChange(panel, i) {
    if (i === 0 || i === 1 || i === 2) {
      return;
    } else {
      this.panels[i].editTitle = true;
    }
  }

  confirmDeleteMainTask(panel, task) {
    this.pmTasksService.deleteIndividualtask(panel.id, task.id).subscribe(res => {
      this.refreshTable();
    });
  }

  copyTask(panel, task) {
    const savingData = task;
    savingData.startDate = moment(task.startDate).format('YYYY-MM-DD');
    // remove null
    Object.keys(savingData).forEach((key) => (savingData[key] == null) && delete savingData[key]);
    // savingData = JSON.parse(savingData);
    this.pmTasksService.createTask(panel.id, savingData).subscribe(res => {
      this.refreshTable();
    });
  }

  openShowSettingModal(i, j) {
    for (let ki = 0; ki < this.panels.length; ki++) {
      for (let kj = 0; kj < this.panels[ki].tasks.length; kj++) {
        this.showSettingsModal[ki][kj] = false;
      }
    }
    this.showSettingsModal[i][j] = true;
  }
}
