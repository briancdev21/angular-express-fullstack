import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PmService } from '../../pm.service';
import * as moment from 'moment';
import { SharedService } from '../../../../services/shared.service';
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'app-pmfinancials',
  templateUrl: './pmfinancials.component.html',
  styleUrls: [
    './pmfinancials.component.css',
  ]
})

export class PmFinancialsComponent implements OnInit {

  menuCollapsed: any;

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

  costType = 'AMOUNT';
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
  currentProjectId: any;
  projectInfo: any;
  contactsList: any;
  summaryInfo: any;

  constructor( private pmService: PmService, private router: Router, private sharedService: SharedService,
    private projectsService: ProjectsService, private route: ActivatedRoute ) {
    this.currentProjectId = localStorage.getItem('current_projectId');

    if (this.currentProjectId !== '') {
      this.sharedService.getContacts().subscribe(data => {
        this.contactsList = data;
        this.addContactName(this.contactsList);
        this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {

          this.projectInfo = res.data;
          this.projectInfo.contactName = this.getContactNameFromId(res.data.contactId);
          // Initial cost total
          this.costTotal = this.projectInfo.purchaseOrderTotal + this.projectInfo.inventoryCost + this.projectInfo.labourCost;
          console.log('indi project: ', this.projectInfo);
          this.projectsService.getProjectCostSummary(this.currentProjectId).subscribe( response => {
            this.summaryInfo = response.results;
            this.projectInfo.purchaseOrderTotal = this.summaryInfo[0].amount;
            console.log('cost summary: ', response);
          });

          this.projectsService.getProjectBudget(this.currentProjectId).subscribe( response => {
            this.budgetList = response.results;
            this.budgetList.forEach(element => {
              element.date = moment(element.createdAt).format('MMMM, YYYY');
            });
            console.log('budget: ', response);
          });

          this.projectsService.getProjectPaymentSchedule(this.currentProjectId).subscribe( response => {
            const paymentScheduleData = response.results;
            paymentScheduleData.forEach(element => {
              if (element.date) {
                element.date = moment(element.createdAt).format('MMMM, YYYY');
              }
            });
            console.log('budget: ', response);
          });
        });
      });
    } else {
      console.error('product id error');
    }
  }

  ngOnInit() {
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
      if (costType === 'PERCENT') {
        costAmount = this.projectInfo.totalBudget * costAmount / 100;
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

      const savingCostData = {
        'name': costTitle,
        'value': costAmount,
        'unit': costType
      };

      this.projectsService.createProjectCostSummary(this.currentProjectId, savingCostData).subscribe(res => {
        console.log('new cost summary: ', res);
      });

      // calc cost total
      const costListTotal = this.additionalCosts.reduce(function(prev, cur) {
        return prev + cur.value;
      }, 0);
      this.costTotal = costListTotal + this.projectInfo.purchaseOrderTotal +
                      this.projectInfo.inventoryCost + this.projectInfo.labourCost;
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
    this.projectsService.deleteIndividualProjectCostSummary(this.currentProjectId, this.additionalCosts[index].id).subscribe(res => {
      console.log('budgetdeleted : ', res);
    });
    this.additionalCosts.splice(index, 1);
    const costListTotal = this.additionalCosts.reduce(function(prev, cur) {
      return prev + cur.value;
    }, 0);
    this.costTotal = costListTotal + this.projectInfo.purchaseOrderTotal +
                    this.projectInfo.inventoryCost + this.projectInfo.labourCost;
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
          'amount': budgetAmount
        });
        const savingData = {
          'date': moment(budgetDate).format('YYYY-MM-DD'),
          'amount': budgetAmount
        };
        this.projectsService.createProjectBudget(this.currentProjectId, savingData).subscribe(res => {
          console.log('budgetCreated : ', res);
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
    this.projectsService.deleteIndividualProjectBudget(this.currentProjectId, this.budgetList[index].id).subscribe(res => {
      console.log('budgetdeleted : ', res);
    });
    this.budgetList.splice(index, 1);
    // calc unused budget
    this.unusedBudget = this.costTotal - this.budgetList.reduce(function(prev, cur) {
      return prev + cur.amount;
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

}
