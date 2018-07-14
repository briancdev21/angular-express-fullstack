import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SubTasksManagementComponent } from './subtasksmanagement/subtasksmanagement.component';
import { MultiKeywordSelectComponent } from './../../profile/multikeywordselect/multikeywordselect.component';
import { ProjectManagementService } from '../projectmanagement/projectmanagement.service';
import * as moment from 'moment';
import { SharedService } from '../../../services/shared.service';
import { ProjectsService } from '../../../services/projects.service';
import { PmTasksService } from '../../../services/pmtasks.service';

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
  projectName = '';
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

  taskOwners = [];
  projectId: any;
  followers = [];

  selectedDependencies = [];
  currentTaskOwner: any;

  dependencyData: any[] = [ ];
  dependencyConfig: any = {'placeholder': 'Type here', 'sourceField': 'title'};

  items2: any[] = [];
  config2: any = {'placeholder': 'Type here', 'sourceField': 'username'};
  subscription: any;
  duration = 0;
  updatingInProgress = false;

  constructor( private sharedService: SharedService, private pmService: ProjectManagementService,
    private projectsService: ProjectsService, private pmTasksService: PmTasksService ) {
    const comp = this;
    this.projectId = localStorage.getItem('current_projectId');
    this.projectsService.getIndividualProject(this.projectId).subscribe(res => {
      this.projectName = res.data.name;
    });
    document.addEventListener('click', function() {
      comp.editable = false;
      comp.dependencyEditable = false;
    });

    this.sharedService.getUsers().subscribe(users => {
      this.taskOwners = users;
      this.items2 = users;
    });

    this.pmTasksService.getTaskGroupsWithParams({projectId: this.projectId}).subscribe(res => {
      const taskgroups = res.results;
      taskgroups.forEach(group => {
          for (let i = 0; i < group.taskIds.length; i++) {
            const taskId = group.taskIds[i];
            this.pmTasksService.getIndividualTask(group.id, taskId).subscribe(taskRes => {
              this.dependencyData.push({title: taskRes.data.title, id: taskId});
              console.log('dependency data:', this.dependencyData);
            });
          }
        });
    });

    this.subscription = this.pmService.openDetailedTaskModal().subscribe(data => {
      console.log('data234: ', data);
      // this.showDetailedTaskModal = data.openModal;
      // this.subTasks = data.task;
      this.updatingInProgress = true;
      this.selectedDependencies = data.task.dependency;
      this.currentTaskOwner = data.task.profile;
      this.currentTaskOwner.pictureURI = data.task.profile.imgUrl;
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
      return obj.username !== item.username;
    });
    const checkAvail = this.followers.filter( d => d.name === item.username).length;
    if (checkAvail) {
      return;
    } else {
      this.followers.push({username: item.username, pictureURI: item.pictureURI});
    }
  }

  removeUser(i: number) {
    const item = this.followers[i];
    this.items2.push({username: item.name, pictureURI: item.pictureURI});
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
    const formattedToday = today.toISOString().slice(0, 10);
    const duration = this.duration ? this.duration : Math.floor((Date.parse(this.dateDue) - today.getTime()) / (60 * 60 * 24 * 1000)) + 1;
    const followers = this.followers.map(follower => follower.username);
    const formattedDueDate = moment(this.dateDue).format('YYYY-MM-DD');
    const dependency = this.selectedDependencies.map(d => d = d.id);
    const newAddedTask = {
      title: this.mainTitle,
      assignee: this.currentTaskOwner.username,
      completion: this.completeness,
      startDate: formattedToday,
      duration: parseInt(duration.toString(), 10),
      dependencyIds: dependency,
      isImportant: false,
      isComplete: this.completeness === 100 ? true : false,
      attachment: false,
      starred: false,
      taskPath: '',
      subTasks: this.subTasks,
      note: this.internalNotes,
      keywordIds: [],
      followers: followers
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
