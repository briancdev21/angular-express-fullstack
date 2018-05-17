import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PmService } from '../pm.service';
import { PmTasksData, TaskModel, SubTaskModel } from '../../../../models/pmtasksdata.model';
import * as moment from 'moment';

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
  public pmBoardTableData = [
    {
      title: 'PLANNING',
      color: '',
      tasks: [
        {
          id: 1,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 100,
          start: '2018-02-15',
          dueDate: '2018-03-05',
          duration: 18,
          dependency: [],
          like: false,
          attachment: false,
          attachmentImg: '',
          starred: false,
          taskPath: '',
          subTasks : [
            {
              id: 0,
              complete: true,
              title: 'test 1',
              editable: false
            },
            {
              id: 1,
              complete: true,
              title: 'test 2',
              editable: false
            },
          ]
        },
        {
          id: 2,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 80,
          start: '2018-02-17',
          dueDate: '2018-03-15',
          duration: 26,
          dependency: [1],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 3,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-02-15',
          dueDate: '2018-03-03',
          duration: 18,
          dependency: [2],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 4,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 0,
          start: '2018-02-15',
          dueDate: '2018-03-05',
          duration: 20,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 5,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 50,
          start: '2018-02-15',
          dueDate: '2018-03-07',
          duration: 22,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 6,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 0,
          start: '2018-02-18',
          dueDate: '2018-03-04',
          duration: 14,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        }
      ]
    },
    {
      title: 'IMPLEMENTATION',
      color: '',
      tasks: [
        {
          id: 1,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 100,
          start: '2018-03-17',
          dueDate: '2018-04-02',
          duration: 13,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 2,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 0,
          start: '2018-03-18',
          dueDate: '2018-04-03',
          duration: 13,
          dependency: [1, 2],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 3,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Michael Yue',
            imgUrl: 'assets/users/user3.png',
            userId: 3
          },
          progress: 0,
          start: '2018-03-17',
          dueDate: '2018-04-04',
          duration: 15,
          dependency: [2],
          like: true,
          attachment: false,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 4,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 100,
          start: '2018-03-17',
          dueDate: '2018-04-02',
          duration: 13,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
      ]
    },
    {
      title: 'INSTALLATIOIN',
      color: '',
      tasks: [
        {
          id: 1,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 2,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Michael Yue',
            imgUrl: 'assets/users/user3.png',
            userId: 3
          },
          progress: 0,
          start: '2018-04-19',
          dueDate: '2018-04-21',
          duration: 2,
          dependency: [1],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 3,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [2],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 4,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Michael Yue',
            imgUrl: 'assets/users/user3.png',
            userId: 3
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 5,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 6,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [],
          like: true,
          attachment: false,
          attachmentImg: '',
          taskPath: ''
        },
        {
          id: 7,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [1, 2, 3 ],
          like: true,
          attachment: true,
          attachmentImg: '',
          subTaskCount: 5,
          subTaskComplete: 2,
          starred: false,
          taskPath: ''
        },
        {
          id: 8,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-10',
          dueDate: '2018-04-20',
          duration: 10,
          dependency: [],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        }
      ]
    },
    {
      title: 'PROJECT COMPLETION',
      color: '',
      tasks: [
        {
          id: 1,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-25',
          dueDate: '2018-05-01',
          duration: 6,
          dependency: [2, 4],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 2,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'Tyler Labonte',
            imgUrl: 'assets/users/user2.png',
            userId: 2
          },
          progress: 0,
          start: '2018-04-24',
          dueDate: '2018-05-03',
          duration: 9,
          dependency: [1, 2],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 3,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-24',
          dueDate: '2018-05-03',
          duration: 9,
          dependency: [2],
          like: true,
          attachment: false,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
        {
          id: 4,
          taskTitle: ' Task title goes here',
          profile: {
            name: 'John Moss',
            imgUrl: 'assets/users/user1.png',
            userId: 1
          },
          progress: 0,
          start: '2018-04-24',
          dueDate: '2018-05-19',
          duration: 25,
          dependency: [5],
          like: true,
          attachment: true,
          attachmentImg: '',
          starred: false,
          taskPath: ''
        },
      ]
    },
  ] as PmTasksData[];
  tabActiveFirst = true;

  constructor( private pmService: PmService ) {
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
  }

  ngOnInit() {
    this.updateTasks();
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
      progressSum += element.progress;
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
        start_date: this.minDate(this.pmBoardTableData[i].tasks.map(t => t.start)),
        end_date: this.maxDate(this.pmBoardTableData[i].tasks.map(t => t.dueDate)),
        progress: this.getMilestoneProgress(this.pmBoardTableData[i].tasks)
      };
      tasks.push(midTk);
    }
    console.log('updatedTasks111111', tasks);
    this.tasks = tasks;
    // this.pmService.updateGantt(tasks);
  }

  getUpdatedGanttData(event) {
    const tasks = [];
    for (let i = 0; i < event.data.length; i ++) {
      const midTk = {
        id: i,
        title: event.data[i].title,
        start_date: moment(this.minDate(event.data[i].tasks.map(t => t.start))).format('YYYY-MM-DD'),
        end_date: this.maxDate(event.data[i].tasks.map(t => t.dueDate)),
        progress: this.getMilestoneProgress(event.data[i].tasks)
      };
      tasks.push(midTk);
    }
    this.tasks = tasks;
  }
}
