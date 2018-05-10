import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pendingprojectfinancials',
  templateUrl: './pendingprojectfinancials.component.html',
  styleUrls: [
    './pendingprojectfinancials.component.css',
  ]
})

export class PendingProjectFinancialsComponent implements OnInit {

  financialsInfo = {
    totalBudget: 17000,
    purchaseOrders: 7000,
    reservedInventory: 3500,
    labourCosts: 4500,
    totalRevenue: 20000
  };

  paymentSchedule = [
    {
      id: 1,
      date: '2016-12-12',
      percent: 50,
      amount: 10000
    },
    {
      id: 2,
      date: '2018-5-12',
      percent: 30,
      amount: 6500
    },
    {
      id: 3,
      date: '2018-12-5',
      percent: 20,
      amount: 3500
    },
  ];

  costType = 'amount';
  additionalCosts = [];
  budgetList = [];
  checkOverdue = [];
  monthPickerConfig = {
    mode: 'month',
  };
  selectedDate = '';
  invalidDate = false;
  invalidBudget = false;
  budgetAmount = undefined;
  costAmount = undefined;
  costTitle = '';
  unusedBudget = 0;
  costTotal = 0;
  scheduleDateList = [];
  today = moment().format('YYYY-MM-DD');

  constructor( private pendingProjectService: PendingProjectService, private router: Router ) {
  }

  ngOnInit() {
    // Initial cost total
    this.costTotal = this.financialsInfo.purchaseOrders + this.financialsInfo.reservedInventory + this.financialsInfo.labourCosts;
    // create new array to show formatted date for payment schedule
    this.scheduleDateList = this.paymentSchedule.map(p => moment(p.date).format('MMMM DD, YYYY'));
    // check overdue days and creat array of boolean
    for (let i = 0; i < this.paymentSchedule.length; i++) {
      if (moment(this.scheduleDateList[i]) > moment()) {
        this.checkOverdue[i] = false;
      } else {
        this.checkOverdue[i] = true;
      }
    }
  }

  addCost(costTitle, costType, costAmount) {
    if (costTitle && costType && costAmount) {
      if (costType === 'percent') {
        costAmount = this.financialsInfo.totalBudget * costAmount / 100;
        this.additionalCosts.push({
          'title': costTitle,
          'value': costAmount
        });
      } else {
        this.additionalCosts.push({
          'title': costTitle,
          'value': costAmount
        });
      }
      // calc cost total
      const costListTotal = this.additionalCosts.reduce(function(prev, cur) {
        return prev + cur.value;
      }, 0);
      this.costTotal = costListTotal + this.financialsInfo.purchaseOrders +
                      this.financialsInfo.reservedInventory + this.financialsInfo.labourCosts;
      // calc unused budget
      this.unusedBudget = this.costTotal - this.budgetList.reduce(function(prev, cur) {
        return prev + cur.value;
      }, 0);
      // refresh input
      this.costAmount = undefined;
      this.costTitle = '';
    }
  }

  removeAddtional(index) {
    this.additionalCosts.splice(index, 1);
    const costListTotal = this.additionalCosts.reduce(function(prev, cur) {
      return prev + cur.value;
    }, 0);
    this.costTotal = costListTotal + this.financialsInfo.purchaseOrders +
                    this.financialsInfo.reservedInventory + this.financialsInfo.labourCosts;
    // calc unused budget
    this.unusedBudget = this.costTotal - this.budgetList.reduce(function(prev, cur) {
      return prev + cur.value;
    }, 0);
  }

  addBudget(budgetDate, budgetAmount) {
    this.invalidDate = false;
    budgetDate = moment(budgetDate).format('MMMM, YYYY');
    const selectedMonthes = this.budgetList.map(b => b.date);
    if (!selectedMonthes.includes(budgetDate)) {
      if (budgetDate && budgetAmount) {
        this.budgetList.push({
          'date': budgetDate,
          'value': budgetAmount
        });
        // calc unused budget
        this.unusedBudget = this.costTotal - this.budgetList.reduce(function(prev, cur) {
          return prev + cur.value;
        }, 0);
        // unused budget color change
        if (this.unusedBudget < 0) {
          this.budgetList.pop();
          this.invalidBudget = true;
        } else {
          this.invalidBudget = false;
        }
        // refresh inputs
        this.budgetAmount = undefined;
        this.selectedDate = '';
      }
    } else {
      this.invalidDate = true;
    }
  }

  removeBudget(index) {
    this.budgetList.splice(index, 1);
    // calc unused budget
    this.unusedBudget = this.costTotal - this.budgetList.reduce(function(prev, cur) {
      return prev + cur.value;
    }, 0);
  }

  checkCostInputValidation(value, costType) {
    if (value < 0) {
      this.costAmount = undefined;
    }
    if (costType === 'percent' && value > 100) {
      this.costAmount = undefined;
    }
  }

  costTypeChange() {
    this.costAmount = undefined;
  }

  selectScheduleDate(event, pos) {
    const updatedDate = moment(event.value).format('YYYY-MM-DD');
    this.scheduleDateList[pos] = moment(event.value).format('MMMM DD, YYYY');
    this.paymentSchedule[pos].date = updatedDate;
  }

  startProject() {
    this.router.navigate(['./pm/pending-projects']);
  }

  toProjectTasks() {
    this.router.navigate(['./pm/pending-project/pending-tasks']);
  }

}
