import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectManagementService } from '../projectmanagement.service';
import { PmTasksData, TaskModel, SubTaskModel } from '../../../../models/pmtasksdata.model';
import * as moment from 'moment';
import { SharedService } from '../../../../services/shared.service';
import { CollaboratorsService } from '../../../../services/collaborators.service';
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'app-pmschedule',
  templateUrl: './pmschedule.component.html',
  styleUrls: [
    './pmschedule.component.css',
  ]
})

export class PmScheduleComponent implements OnInit {
  @ViewChild('tabsRef', {read: ElementRef}) tabsRef: ElementRef;

  tasks = [];
  showDetailedTaskModal = false;
  newAddedTask: any;
  temp: number;
  subscription: any;
  updatingTaskPosition = [];
  pmBoardTableData = [];
  tabActiveFirst = true;
  tabActiveSecond = false;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpWorkOrders: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  workorderTypes: any;
  usersList = [];
  contactsList = [];
  workOrdersList: any;
  currentProjectId: any;
  contactName: any;

  public workorderStatus = ['Not started', 'Not complete', 'Delivered', 'In progress', 'Complete'];

  public filters  = {
    startedFrom: '',
    startedTo: '',
    updatedFrom: '',
    updatedTo: '',
    selectTag: '',
    selectStatus: '',
  };

  public collaborators: Array<string> = [
  ];

  public workOrdersInfo = [];

  constructor( private pmService: ProjectManagementService, private sharedService: SharedService,
    private collaboratorsService: CollaboratorsService, private route: ActivatedRoute, private projectsService: ProjectsService   ) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.subscription = this.pmService.openDetailedTaskModal().subscribe(data => {
      this.showDetailedTaskModal = data.openModal;
      this.updatingTaskPosition = data.milestone;
    });
    this.pmService.closeTaskModal.subscribe(data => {
      this.showDetailedTaskModal = false;
    });

    this.pmService.deleteOpenedTask.subscribe(data => {
      if (data.length > 0) {
        this.showDetailedTaskModal = false;
        this.pmBoardTableData[data[0]].tasks.splice(data[1], 1);
      }
    });

    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;
      this.sharedService.getContacts().subscribe(data => {
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.collaboratorsService.getProjectWorkOrders(this.currentProjectId).subscribe(res => {
          this.workOrdersList = res.results;
          this.workOrdersList.forEach(element => {
            const colArr = [];
            element.startTime = moment(element.startDate).format('hh:mm a');
            element.endTime = moment(element.endDate).format('hh:mm a');
            element.startDate = moment(element.startDate).format('MMMM DD, YYYY');
            element.contactName = this.getContactNameFromId(element.contactId);
            element.barInfo = {
              title: element.completion + '%',
              completeness: element.completion
            };
            if (element.collaborators) {
              element.collaborators.forEach(col => {
                colArr.push(this.usersList.filter(u => u.username === col)[0]);
              });
            }
            element.collaboratorsData = colArr;
          });
          console.log('work order list: ', this.workOrdersList);
        });

        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {
          console.log('project info: ', res);
          this.contactName = this.contactsList.filter(c => c.id === res.data.contactId)[0].name;
          console.log('project info: ', this.contactName);
        });
      });
    });
  }

  ngOnInit() {
    // this.updateTasks();
  }
  minDate(arr) {
    let min = arr[0];
    arr.forEach(element => {
      if (Date.parse(element) < Date.parse(min)) {
        min = element;
      }
    });
    return min;
  }

  maxDate(arr) {
    let max = arr[0];
    arr.forEach(element => {
      if (Date.parse(element) > Date.parse(max)) {
        max = element;
      }
    });
    return max;
  }

  getMilestoneProgress(arr) {
    let progressSum = 0;
    arr.forEach(element => {
      progressSum += element.completion;
    });
    return progressSum / (arr.length * 100);
  }

  getUpdatedTask(event) {
    this.newAddedTask = event;
    event.id = this.pmBoardTableData[this.updatingTaskPosition[0]].tasks[this.updatingTaskPosition[1]].id;
    // event.dueDate = moment(event.dueDate).format('YYYY-MM-DD');
    this.pmBoardTableData[this.updatingTaskPosition[0]].tasks[this.updatingTaskPosition[1]] = event;
    this.pmBoardTableData.map( m => m.tasks.map(t => t.dueDate = moment(t.dueDate).format('YYYY-MM-DD')));
    this.updateTasks();
  }

  updateTasks() {
    const tasks = [];
    for (let i = 0; i < this.pmBoardTableData.length; i ++) {
      const midTk = {
        id: i,
        title: this.pmBoardTableData[i].title,
        start_date: moment(this.minDate(this.pmBoardTableData[i].tasks.map(t => t.startDate))).format('YYYY-MM-DD'),
        // tslint:disable-next-line:whitespace
        // tslint:disable-next-line:max-line-length
        end_date: moment(this.maxDate(this.pmBoardTableData[i].tasks.map(t => moment(t.startDate).add(t.duration, 'days').format('YYYY-MM-DD')))).format('YYYY-MM-DD'),
        progress: this.pmBoardTableData[i].completion / 100
      };
      tasks.push(midTk);
    }
    this.tasks = tasks;
  }

  getUpdatedGanttData(event) {
    const tasks = [];
    for (let i = 0; i < event.data.length; i ++) {
      if (event.data[i] !== undefined) {
        const panelTasks = event.data[i].tasks !== undefined ? event.data[i].tasks : [];
        const midTk = {
          id: i,
          title: event.data[i].title,
          start_date: moment(this.minDate(panelTasks.map(t => t.startDate))).format('YYYY-MM-DD'),
          // tslint:disable-next-line:max-line-length
          end_date: moment(this.maxDate(panelTasks.map(t => moment(t.startDate).add(t.duration, 'days').format('YYYY-MM-DD')))).format('YYYY-MM-DD'),
          progress: event.data[i].completion / 100
        };
        tasks.push(midTk);
      }
    }
    this.tasks = tasks;
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
