import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../projectmanagement.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { AUTOCOMPLETE_OPTION_HEIGHT } from '@angular/material';
// import {GanttComponent, GanttConfiguration, GanttTaskItem, GanttTaskLink, GanttEvents } from 'gantt-ui-component';

@Component({
  selector: 'app-ganttchart',
  templateUrl: './ganttchart.component.html',
  styleUrls: [
    './ganttchart.component.css',
  ]
})

export class GanttChartComponent implements OnInit {
  @Input() set tasks(_data) {
    this._tasks = _data;
    // this._tasks.map(task => {
    //   if (task !== undefined) {
    //     const dateDiff = moment(task.end_date).diff(moment(task.start_date), 'days');
    //     if (dateDiff < 1) {
    //       task.start_date = moment().format('YYYY-MM-DD'),
    //       task.end_date = moment().subtract(1, 'days').format('YYYY-MM-DD');
    //       task.title = '';
    //     }
    //   }
    // });
    while (this._tasks.length < 4) {
      const emptyArr = {
        id: this._tasks.length,
        title: '',
        start_date: moment().format('YYYY-MM-DD'),
        end_date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        progress: undefined
      };
      this._tasks.push(emptyArr);
    }
    // console.log('tasks gantt chart:', _data);
    this.calculate();
  }

  // @Input() set projectInfo(_data) {
  //   this._projectInfo = _data;
  //   this.calculate();
  //   console.log('details tasks:. ', this._projectInfo);
  // }

  // @Input() set detailsTasks(_data) {
  //   this._detailsTasks = _data;
  //   this.calculate();
  //   console.log('details tasks:. ', this._detailsTasks);
  // }

  _tasks = [];
  FebNumberOfDays: any;
  dateNow: Date;
  day: any;
  month: any;
  year: any;

// names of months and week days.
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  backgroundColors = ['#FFE5CC', '#EDF3BF', '#FFD7D7', '#CBE0ED', '#E0BBCC', '#C4BBE0', '#BBC0E0', '#BBE0CC', '#E0BBBB', '#E8E3A7'];
  filledColors = ['#FFAC58', '#C5D92D', '#FF7E7E', '#247FCC', '#b0547f', '#715bb3', '#4152c3', '#5bb384', '#bf7373', '#dccf41'];

  displayMonthes = [];
  dayCountArr = [];
  constructor( private pmService: ProjectManagementService ) {
  }

  ngOnInit() {
    // using service to update gantt chart
    this.pmService.ganttUpdated.subscribe(data => {
      if (data.length > 0) {
        this.tasks = data;
      }
      console.log('in gantt: ', this.tasks);
      this.calculate();
    });
    this.calculate();
  }

  calculate() {
    // refresh variables
    this.dateNow = new Date();
    this.month = this.dateNow.getMonth();
    this.day = this.dateNow.getDate();
    this.year = this.dateNow.getFullYear();
    this.displayMonthes = [];
    this.dayCountArr = [];
    // Determing if February (28,or 29)
    if (this.month === 1) {
      if ( (this.year % 100 !== 0) && (this.year % 4 === 0) || (this.year % 400 === 0)) {
        this.FebNumberOfDays = 29;
      } else {
        this.FebNumberOfDays = 28;
      }
    }
    // get min and max date from data to set the range of table
    let minDate = this.dateNow;
    let maxDate = this.dateNow;
    let nextMonth = new Date();
    let lastMonth = new Date();
    this._tasks.forEach(element => {
      if (new Date (element.start_date) < new Date(minDate)) {
        minDate = element.start_date;
      }
      if (new Date (element.end_date) > new Date (maxDate)) {
        maxDate = element.end_date;
      }
    });

    // compare the min and max with current date to set range
    const startDate = (new Date(minDate) < this.dateNow) ? new Date(minDate) : this.dateNow;
    const endDate = (new Date (maxDate) > this.dateNow) ? new Date (maxDate) : this.dateNow;
    this.displayMonthes = this.monthDiff(startDate, endDate);

    // if timeline shows only one or two months, should add 2 or 1 months forward and backward
    if (this.displayMonthes.length ===  2) {
      if (endDate.getMonth() === 11) {
        nextMonth = new Date(endDate.getFullYear() + 1, 0, 1);
      } else {
        nextMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
      }
      this.displayMonthes = this.monthDiff(startDate, nextMonth);
    }
    if (this.displayMonthes.length ===  1) {
      if (endDate.getMonth() === 11) {
        nextMonth = new Date(endDate.getFullYear() + 1, 0, 1);
      } else {
        nextMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
      }
      if (startDate.getMonth() === 1) {
        lastMonth = new Date(startDate.getFullYear() - 1, 0, 1);
      } else {
        lastMonth = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
      }

      this.displayMonthes = this.monthDiff(lastMonth, nextMonth);
    }

    _.forEach(this.displayMonthes, month => {
      const dayCount = {
        dateSubArr: [],
        isWeekendArr: [],
        isFirstArr: [],
        isLastArr: [],
        isLastActiveArr: [],
        getBgColorArr: [],
        getTodayLineArr: []
      };
      dayCount.dateSubArr = this.getDayCount(month.month, month.year);

      for (let i = 0; i < this._tasks.length; i ++) {
        const isWeekendSubArr = [];
        const getTodayLineSubArr = [];
        const isFirstSubArr = [];
        const isLastSubArr = [];
        const isLastActiveSubArr = [];
        const getBgColorSubArr = [];

        _.forEach(dayCount.dateSubArr, date => {
          isWeekendSubArr.push(this.isWeekend(month.year, month.month, date));
          getTodayLineSubArr.push(this.getTodayLine(month.year, month.month, date));
          isFirstSubArr.push(this.isFirst(month.year, month.month, date, this._tasks[i], i));
          isLastSubArr.push(this.isLast(month.year, month.month, date, this._tasks[i], i));
          isLastActiveSubArr.push(this.isLastActive(month.year, month.month, date + 1, this._tasks[i], i));
          getBgColorSubArr.push(this.getBgColor(month.year, month.month, date, this._tasks[i], i));
        });
        dayCount.isWeekendArr.push(isWeekendSubArr);
        dayCount.getTodayLineArr.push(getTodayLineSubArr);
        dayCount.isFirstArr.push(isFirstSubArr);
        dayCount.isLastArr.push(isLastSubArr);
        dayCount.isLastActiveArr.push(isLastActiveSubArr);
        dayCount.getBgColorArr.push(getBgColorSubArr);
      }
      this.dayCountArr.push(dayCount);
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  monthDiff(start, end) {
    const timeValues = [];
    const dateStart = moment(start);
    const dateEnd = moment(end);

    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      timeValues.push({year: dateStart.format('YYYY'), month: dateStart.format('MMMM')});
      dateStart.add(1, 'month');
    }
    return timeValues;
  }

  getDayCount (month, year) {
    const m = this.monthNames.indexOf(month) + 1; // get months index
    const monthCount = new Date(year, m, 0).getDate(); // get day counts for each months
    const weekDay = new Date(year, m, 0);
    let daysArr = Array.from(new Array(monthCount), (val, index) => index + 1); // create array filed with sequential numbers
    if (daysArr === undefined) { daysArr = []; }
    return daysArr;
  }

  isWeekend (year, month, date) {
    const m = this.monthNames.indexOf(month); // get months index
    const weekDay = new Date(year, m, date);
    if (weekDay.getDay() === 0 || weekDay.getDay() === 6) {
      return true;
    }
    return false;
  }

  isValidInTask (year, month, date, task) {
    const m = this.monthNames.indexOf(month);
    const curDate = new Date(year, m, date);
    const start_date_arr = task.start_date.split('-');
    const startDate = new Date(start_date_arr[0], start_date_arr[1] - 1, start_date_arr[2]);

    const end_date_arr = task.end_date.split('-');
    const endDate = new Date(end_date_arr[0], end_date_arr[1] - 1, end_date_arr[2]);
    if (curDate < startDate || curDate > endDate) { return 0; }

    const dateDiff = moment(task.end_date).diff(moment(task.start_date), 'days');
    const curDateDiff = moment(`${year}-${month}-${date}`).diff(moment(task.start_date), 'days');
    if (Math.round(dateDiff * task.progress) === 0) { return 2; }
    if (curDateDiff < Math.round(dateDiff * task.progress) + 1) {
      return 1;
    }
    return 2;
  }

  getBgColor(year, month, date, task, index) {
    if (this.isValidInTask(year, month, date, task) === 2) {
      return this.backgroundColors[index % 10];
    }
    if (this.isValidInTask(year, month, date, task) === 1) {
      return this.filledColors[index % 10];
    }
    if (this.isWeekend(year, month, date)) {
      return '#f5f5f5';
    }
    return '#fff';
  }

  isFirst (year, month, date, task, index) {
    const dateDiff = moment(task.end_date).diff(moment(task.start_date), 'days');
    const curDateDiff = moment(`${year}-${month}-${date}`).diff(moment(task.start_date), 'days');
    if (curDateDiff === 0) { return true; }
    return false;
  }

  isLast (year, month, date, task, index) {
    const dateDiff = moment(task.end_date).diff(moment(task.end_date), 'days');
    const curDateDiff = moment(`${year}-${month}-${date}`).diff(moment(task.end_date), 'days');
    if (curDateDiff === 0) { return true; }
    return false;
  }

  isLastActive (year, month, date, task, index) {
    const dateDiff = moment(task.end_date).diff(moment(task.start_date), 'days');
    const curDateDiff = moment(`${year}-${month}-${date}`).diff(moment(task.start_date), 'days');
    if (curDateDiff === Math.round(dateDiff * task.progress) + 1 &&  Math.round(dateDiff * task.progress) !== 0) { return true; }
    return false;
  }

  checkTaskMid(year, month, date, task, index) {
    const midDate = new Date((Date.parse(task.start_date) + Date.parse(task.end_date)) / 2);
    if (year === midDate.getFullYear().toString() && month === this.monthNames[midDate.getMonth()] && date === midDate.getDate()) {
      return true;
    }
  }

  getTodayLine(year, month, date) {
    if (year === this.dateNow.getFullYear().toString() &&
        month === this.monthNames[this.dateNow.getMonth()] &&
        date === this.dateNow.getDate()) {
      return true;
    }
  }
  getTodayTitle(year, month, date, index) {
    if (year === this.dateNow.getFullYear().toString() &&
        month === this.monthNames[this.dateNow.getMonth()] &&
        date === this.dateNow.getDate() &&
        index === 0
      ) {
      return true;
    }
  }

  updateService(data) {
    // update service for Gantt chart
    // Data model for Chart
    const {  endDate, startDate } = data;
    let nextMonth;
    let lastMonth;
    if (this.displayMonthes.length ===  2) {
      if (endDate.getMonth() === 11) {
        nextMonth = new Date(endDate.getFullYear() + 1, 0, 1);
      } else {
        nextMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
      }
      this.displayMonthes = this.monthDiff(startDate, nextMonth);
    }
    if (this.displayMonthes.length ===  1) {
      if (endDate.getMonth() === 11) {
        nextMonth = new Date(endDate.getFullYear() + 1, 0, 1);
      } else {
        nextMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);
      }
      if (startDate.getMonth() === 1) {
        lastMonth = new Date(startDate.getFullYear() - 1, 0, 1);
      } else {
        lastMonth = new Date(startDate.getFullYear(), startDate.getMonth() - 1, 1);
      }

      this.displayMonthes = this.monthDiff(lastMonth, nextMonth);
    }

    _.forEach(this.displayMonthes, month => {
      const dayCount = {
        dateSubArr: [],
        isWeekendArr: [],
        isFirstArr: [],
        isLastArr: [],
        isLastActiveArr: [],
        getBgColorArr: [],
        getTodayLineArr: []
      };
      dayCount.dateSubArr = this.getDayCount(month.month, month.year);

      for (let i = 0; i < this._tasks.length; i ++) {
        const isWeekendSubArr = [];
        const getTodayLineSubArr = [];
        const isFirstSubArr = [];
        const isLastSubArr = [];
        const isLastActiveSubArr = [];
        const getBgColorSubArr = [];

        _.forEach(dayCount.dateSubArr, date => {
          isWeekendSubArr.push(this.isWeekend(month.year, month.month, date));
          getTodayLineSubArr.push(this.getTodayLine(month.year, month.month, date));
          isFirstSubArr.push(this.isFirst(month.year, month.month, date, this._tasks[i], i));
          isLastSubArr.push(this.isLast(month.year, month.month, date, this._tasks[i], i));
          isLastActiveSubArr.push(this.isLastActive(month.year, month.month, date + 1, this._tasks[i], i));
          getBgColorSubArr.push(this.getBgColor(month.year, month.month, date, this._tasks[i], i));
        });
        dayCount.isWeekendArr.push(isWeekendSubArr);
        dayCount.getTodayLineArr.push(getTodayLineSubArr);
        dayCount.isFirstArr.push(isFirstSubArr);
        dayCount.isLastArr.push(isLastSubArr);
        dayCount.isLastActiveArr.push(isLastActiveSubArr);
        dayCount.getBgColorArr.push(getBgColorSubArr);
      }
    });
    // API Call
  }
}
