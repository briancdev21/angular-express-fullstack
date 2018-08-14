import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProjectService } from '../pendingproject.service';
import * as moment from 'moment';
import { SharedService } from '../../../../../services/shared.service';
import { ProjectsService } from '../../../../../services/projects.service';
import { CommonService } from '../../../../common/common.service';

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
  allScheduleFilled = true;
  modalContent = 'You Should Fill in All Schedule Date First!';

  constructor( private pendingProjectService: PendingProjectService, private router: Router, private sharedService: SharedService,
    private projectsService: ProjectsService, private commonService: CommonService) {
    this.currentProjectId = localStorage.getItem('current_projectId');

    if (this.currentProjectId !== '') {

      this.projectsService.getIndividualProject(this.currentProjectId).subscribe(res => {

        this.projectInfo = res.data;
        this.sharedService.getMulipleContacts(res.data.contactId).subscribe(contact => {
          const selectedContact = contact[0];
          this.projectInfo.contactName = this.getContactName(selectedContact);
        });
        console.log('indi project: ', this.projectInfo);
        // Initial cost total
        this.costTotal = this.projectInfo.purchaseOrderTotal + this.projectInfo.inventoryCost + this.projectInfo.labourCost;

        this.projectsService.getProjectCostSummary(this.currentProjectId).subscribe( response => {
          this.summaryInfo = response.results;
          console.log('cost summary: ', response);
          this.projectInfo['purchaseOrderTotal'] = this.summaryInfo[0].amount;
        });
      });

      this.projectsService.getProjectBudget(this.currentProjectId).subscribe( response => {
        this.budgetList = response.results;
        this.budgetList.forEach(element => {
          element.date = moment(element.createdAt).format('MMMM, YYYY');
        });
        console.log('budget: ', response);
      });

      this.projectsService.getProjectPaymentSchedule(this.currentProjectId).subscribe( response => {
        this.paymentSchedule = response.results;
        this.paymentSchedule.forEach(element => {
          if (element.date) {
            element.date = moment(element.date).format('MMMM DD, YYYY');
          } else {
            element.date = 'set due date';
          }
        });
        console.log('schedule: ', response);
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
        costAmount = this.projectInfo.total * costAmount / 100;
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

  selectScheduleDate(event, pos, schedule) {
    const updatedDate = moment(event.value).format('YYYY-MM-DD');
    // this.scheduleDateList[pos] = moment(event.value).format('MMMM DD, YYYY');
    this.paymentSchedule[pos].date = updatedDate;
    const savingData = {
      'date': updatedDate
    };
    this.projectsService.updateProjectPaymentSchedule(this.currentProjectId, schedule.id, savingData).subscribe(res => {
      console.log('updated schedule : ', res);
    });
  }

  startProject() {

    console.log('project details: ', this.projectInfo);
    const savingData = {
      'projectManager': this.projectInfo.projectManager,
      'accountManager': this.projectInfo.accountManager,
      'clientProjectManagerId': this.getContactIdFromString(this.projectInfo.clientProjectManagerId),
      'accountReceivableId': this.getContactIdFromString(this.projectInfo.accountReceivableId),
      'followers': this.projectInfo.followers ? this.projectInfo.followers : [],
      'status': 'IN_PROGRESS',
      'internalNote': this.projectInfo.internalNote ? this.projectInfo.internalNote : ''
    };
    this.projectsService.getProjectPaymentSchedule(this.currentProjectId).subscribe( response => {
      const scheduleData = response.results;
      scheduleData.forEach(element => {
        console.log('p222s: ', element);
        if (!element.date) {
          this.allScheduleFilled = false;
        }
      });
      if (this.allScheduleFilled) {
        this.projectsService.updateIndividualProject(this.currentProjectId, savingData).subscribe(res => {
          console.log('project details: ', res);
          this.router.navigate(['./pm/pending-projects']);
        });
      } else {
        this.commonService.showAlertModal.next(true);
      }
    });
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

  getContactIdFromString(str) {
    return str.slice(-1);
  }

  getContactName(selectedContact) {
    if (selectedContact.type === 'PERSON') {
      selectedContact.name = selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
    } else {
      selectedContact.name = selectedContact.business.name;
    }
    return selectedContact.name;
  }

}
