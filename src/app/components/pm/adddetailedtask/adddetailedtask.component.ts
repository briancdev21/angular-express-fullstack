import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SubTasksManagementComponent } from './subtasksmanagement/subtasksmanagement.component';
import { MultiKeywordSelectComponent } from './../../profile/multikeywordselect/multikeywordselect.component';
import { PmService } from '../projectmanagement/pm.service';
import * as moment from 'moment';

@Component({
  selector: 'app-adddetailedtask',
  templateUrl: './adddetailedtask.component.html',
  styleUrls: [
    './adddetailedtask.component.css'
  ]
})
export class AddDetailedTaskComponent implements OnInit {

  @Input() showDetailedTaskModal;
  @Output() addNewTaskToTable: EventEmitter<any> = new EventEmitter;
  public subTasks = [];
  public selectedSubTasks = [];

  ownerModalCollapsed = false;
  dDate: any;
  dateDue: any;
  minDate = new Date();
  editable: boolean;
  dependencyEditable = false;
  selectedDependency: any = '';
  selectedItem: any = '';
  inputChanged: any = '';
  projectName = 'Remodel with a Nu life';
  projectTags = ['test'];
  showSettingsModal = false;
  today = new Date();
  showDeleteConfirmModal = false;
  completeness: any;
  internalNotes: string;
  openedModalPosition = [];
  mainTitle = '';
  mainContent = '';
  dependencyEditableTop = false;
  following = false;
  isAutocompleteUpdated1 = false;
  isAutocompleteUpdated2 = false;
  isAutocompleteUpdated3 = false;

  private taskOwners = [
    {
      imageUrl: 'assets/users/user1.png',
      profileLink: 'crm/contacts/michael',
      name: 'John Moss',
      userId: 1

    },
    {
      imageUrl: 'assets/users/user2.png',
      profileLink: 'crm/contacts/michael',
      name: 'Tyler Labonte',
      userId: 2
    },
    {
      imageUrl: 'assets/users/user3.png',
      profileLink: 'crm/contacts/joseph',
      name: 'Michael Yue',
      userId: 3
    }];

  followers = [
    {
      imageUrl: 'assets/users/user1.png',
      name: 'John Moss',
      userId: 1
    },
    {
      imageUrl: 'assets/users/user2.png',
      name: 'Tyler Labonte',
      userId: 2
    }
  ];

  selectedDependencies = [];
  currentTaskOwner: any;

  dependencyData: any[] = [
    {id: 0, title: 'Task 0'},
    {id: 1, title: 'Task 1'},
    {id: 2, title: 'Task 2'},
    {id: 3, title: 'Task 3'},
  ];
  dependencyConfig: any = {'placeholder': 'Type here', 'sourceField': 'title'};

  items2: any[] = [
    {id: 0, label: 'John Moss', imageUrl: 'assets/users/user1.png', userId: 1},
    {id: 1, label: 'Tyler Labonte', imageUrl: 'assets/users/user2.png', userId: 2},
    {id: 2, label: 'Michael Yue', imageUrl: 'assets/users/user3.png', userId: 3},
    {id: 3, label: 'Sepehr', imageUrl: 'assets/users/man.png', userId: 4},
  ];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'label'};
  subscription: any;
  duration = 0;
  updatingInProgress = false;

  constructor( private pmService: PmService ) {
    const comp = this;
    document.addEventListener('click', function() {
      comp.editable = false;
      comp.dependencyEditable = false;
    });

    this.subscription = this.pmService.openDetailedTaskModal().subscribe(data => {
      console.log('data234: ', data);
      // this.showDetailedTaskModal = data.openModal;
      // this.subTasks = data.task;
      this.updatingInProgress = true;
      this.selectedDependencies = data.task.dependency;
      this.currentTaskOwner = data.task.profile;
      this.currentTaskOwner.imageUrl = data.task.profile.imgUrl;
      this.dDate = data.task.dueDate;
      // change format from 'mmmm dd, yyyy' to 'YYYY-MM-DD'
      this.dateDue = moment(data.task.dueDate).format('YYYY-MM-DD').toString();
      this.projectTags = data.task.projectTags ? data.task.projectTags : this.projectTags;
      this.duration = data.task.duration;
      this.internalNotes = data.task.internalNotes;
      this.openedModalPosition = data.milestone;
      if (data.task.subTasks) {
        this.subTasks = data.task.subTasks;
      } else {
        this.subTasks = [{
          id: 0,
          title: '',
          complete: false,
          editable: true,
        }];
      }
    });
  }

  ngOnInit() {
    this.currentTaskOwner = {};
    const cmp = this;
    for (let i = 0; i < this.followers.length; i++) {
      this.items2 = this.items2.filter(function( obj ) {
        return obj.userId !== cmp.followers[i].userId;
      });
    }

  }

  openOwnerModal() {
    this.ownerModalCollapsed = true;
  }

  getDateColor(date) {

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Intl.DateTimeFormat('en-US', options).format(this.today);
    if (new Date(date) > new Date(today)) {
      return 'black';
    }
    if (new Date(date).toString() === new Date(today).toString()) {
      return 'orange';
    } else {
      return 'red';
    }
   }
  closeOwnerModal() {
    this.ownerModalCollapsed = false;
  }

  onOwnerSelect(index) {
    this.currentTaskOwner = this.taskOwners[index];
  }

  selectDueDate(event) {
    this.dateDue = event.value;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    this.dDate = new Intl.DateTimeFormat('en-US', options).format(this.dateDue);
  }

  onDependencySelect(item: any) {
    this.selectedDependency = item;
    this.dependencyData = this.dependencyData.filter(function( obj ) {
      return obj.id !== item.id;
    });
    const checkAvail = this.selectedDependencies.filter( d => d.id === item.id).length;
    if (checkAvail) {
      return;
    } else {
      this.selectedDependencies.push(item);
    }
  }


  onInputChangedEvent(val: string) {
    this.inputChanged = val;
  }

  removeTask (i: number) {
    const item = this.selectedDependencies[i];
    console.log('item:', item);
    this.dependencyData.push({id: item.id, title: item.title});
    this.selectedDependencies.splice(i, 1);
    this.isAutocompleteUpdated2 = !this.isAutocompleteUpdated2;
    this.isAutocompleteUpdated1 = !this.isAutocompleteUpdated1;
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.items2 = this.items2.filter(function( obj ) {
      return obj.label !== item.label;
    });
    const checkAvail = this.followers.filter( d => d.name === item.label).length;
    if (checkAvail) {
      return;
    } else {
      this.followers.push({name: item.label, imageUrl: item.imageUrl, userId: item.userId });
    }
  }

  removeUser(i: number) {
    const item = this.followers[i];
    this.items2.push({id: this.items2.length, label: item.name, imageUrl: item.imageUrl, userId: item.userId});
    this.followers.splice(i, 1);
    this.isAutocompleteUpdated3 = !this.isAutocompleteUpdated3;
  }

  openAlert() {
    window.alert('Upload Files');
  }

  deleteSelectedSubTasks() {
    if (this.selectedSubTasks.length > 0) {
      // remove subtasks which has same id as selected index
      for (let i = 0; i < this.selectedSubTasks.length; i ++) {
        this.subTasks = this.subTasks.filter(s => s.id !== this.selectedSubTasks[i]);
      }
      // reset id after deleting subtasks
      for (let i = 0; i < this.subTasks.length; i ++) {
        this.subTasks[i].id = i;
      }
      this.selectedSubTasks = [];
    }
  }

  getSelectedSubTasks(event) {
    this.selectedSubTasks = event;
  }

  getSubTasks(event) {
    this.subTasks = event;
  }

  getTaskCompleteness(event) {
    this.completeness = event;
  }
  closeSettingsModal() {
    this.showSettingsModal = false;
  }

  copySelectedSubTasks() {
    if (this.selectedSubTasks.length > 0) {
      if (this.selectedSubTasks.length > 1) {
        window.alert('Select Only One Subtask To Copy');
      } else {
        this.subTasks.splice(this.selectedSubTasks[0], 0, this.subTasks[this.selectedSubTasks[0]]);
      }

      // reset id after deleting subtasks
      for (let i = 0; i < this.subTasks.length; i ++) {
        this.subTasks[i].id = i;
      }
      this.selectedSubTasks = [];
    }
  }

  getMainTask(event) {
    console.log('111111', event);
    this.mainTitle = event.mainTitle;
    this.mainContent = event.mainContent;
    this.completeness = event.progress;
  }

  closeModal() {
    this.pmService.hideDetailedTaskModal(true);
    const today = new Date();
    const formattedToday = today.getFullYear().toString() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const duration = this.duration ? this.duration : Math.floor((Date.parse(this.dateDue) - today.getTime()) / (60 * 60 * 24 * 1000)) + 1;

    const formattedDueDate = moment(this.dateDue).format('YYYY-MM-DD');
    const dependency = this.selectedDependencies.map(d => d = d.id);
    const newAddedTask = {
      id: 0,
      taskTitle: this.projectName,
      profile: {
        name: this.currentTaskOwner.name,
        imgUrl: this.currentTaskOwner.imageUrl,
        userId: this.currentTaskOwner.userId
      },
      progress: this.completeness,
      dueDate: formattedDueDate,
      start: formattedToday,
      duration: duration,
      dependency: dependency,
      like: false,
      attachment: false,
      starred: false,
      taskPath: '',
      subTasks: this.subTasks,
      internalNotes: this.internalNotes,
      mainTitle: this.mainTitle,
      mainContent: this.mainContent,
    };
    this.addNewTaskToTable.emit(newAddedTask);
    // return to empty after closing modal
    this.projectName = '';
    this.currentTaskOwner = {};
    this.completeness = 0;
    this.dDate = undefined;
    this.duration = 0;
    this.selectedDependencies = [];
    this.projectTags = [];
    this.subTasks = [];
  }

  confirmDeleteMainTask() {
    this.subTasks = [];
    this.selectedSubTasks = [];
    this.selectedDependencies = [];
    this.dDate = '';
    this.showDeleteConfirmModal = false;
    this.projectName = '';
    this.pmService.deleteOpenedModal(this.openedModalPosition);
  }

  // changeDependency(id, dependencies, i) {
  //   // change the certain selected dependencies array item with the typed item
  //   if (id) {
  //     this.selectedDependencies.splice(i, 1, {
  //       id: id.toString(),
  //       title: this.dependencyData.filter(d => d.id === id)[0].title
  //     });
  //   }
  // }
}
