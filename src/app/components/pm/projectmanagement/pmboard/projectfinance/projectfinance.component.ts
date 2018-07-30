import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectManagementService } from '../../projectmanagement.service';
import { PmService } from '../../../pm.service';
import { CollaboratorsService } from '../../../../../services/collaborators.service';
import * as moment from 'moment';
import { SharedService } from '../../../../../services/shared.service';
@Component({
  selector: 'app-projectfinance',
  templateUrl: './projectfinance.component.html',
  styleUrls: [
    './projectfinance.component.css',
  ]
})

export class ProjectFinanceComponent implements OnInit {
  @Input() projectInfo;
  @Input() financialTableData;
  purchaseOrdersList = [];
  tableDataAll = [];
  invoicesList = [];
  workOrdersList = [];
  currentProjectId: any;
  sortClicked = true;
  usersList = [];

  constructor( private pmService: PmService, private collaboratorsService: CollaboratorsService, private router: Router,
  private sharedService: SharedService) {
    this.currentProjectId = localStorage.getItem('current_projectId');
    this.sharedService.getUsers().subscribe(user => {
      this.usersList = user;
      console.log('userslist: ', user);

      this.pmService.getPurchaseOrders(this.currentProjectId)
      .subscribe(res => {
        this.purchaseOrdersList = res.results;
        this.purchaseOrdersList.forEach(po => {
          po.type = 'Purchase Order';
          po.typeNumber = 'PO' + ' ' + po.id;
        });
        this.tableDataAll = this.purchaseOrdersList;

        this.pmService.getInvoices()
        .subscribe(invoice => {
          this.invoicesList = invoice.results;
          this.invoicesList = this.invoicesList.filter(b => b.projectId === this.currentProjectId);
          this.invoicesList.forEach(iv => {
            iv.type = 'Invoice';
            iv.typeNumber = 'IN' + ' ' + iv.id;
          });
          this.tableDataAll = this.tableDataAll.concat(this.invoicesList);

          this.collaboratorsService.getWorkOrders().subscribe(order => {
            this.workOrdersList = order.results;
            this.workOrdersList = this.workOrdersList.filter(w => w.projectId === this.currentProjectId);
            this.workOrdersList.forEach(wo => {
              wo.type = 'Work Order';
              wo.typeNumber = 'WO' + ' ' + wo.id;
            });
            this.tableDataAll = this.tableDataAll.concat(this.workOrdersList);
            console.log('data all: ', this.tableDataAll);
            this.tableDataAll.forEach(element => {
              if (element.collaborators) {
                const collData = [];
                element.collaborators.forEach(col => {
                  collData.push(this.usersList.filter(u => u.username === col)[0]);
                });
                element.collaboratorData = collData;
              } else {
                element.collaboratorData = [];
              }
            });
          });
        });
      });

    });
  }

  ngOnInit() {

  }

  getTotalColor(value) {
    if (value === 'Paid') {
      return 'green';
    } else {
      return 'red';
    }
  }

  getStatusColor(value) {
    if (value === 'Paid') {
      return 'green';
    }
  }

  getFormatedDate(date) {
    return moment(date).format('MMMM DD, YYYY');
  }

  sortArray(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.tableDataAll.sort( function(name1, name2) {
        if ( Math.abs(name1[field]) < Math.abs(name2[field])) {
          return -1;
        } else if ( Math.abs(name1[field]) > Math.abs(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.tableDataAll.reverse();
    }
  }

  sortArrayWithString(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.tableDataAll.sort( function(name1, name2) {
        return name1[field].localeCompare(name2[field]);
      });
    } else {
      this.tableDataAll.reverse();
    }
  }

  sortCreateDateArray(field) {
    const cmp = this;
    cmp.sortClicked = ! cmp.sortClicked;
    if (!cmp.sortClicked) {
      this.tableDataAll.sort( function(name1, name2) {
        if ( Date.parse(name1[field]) < Date.parse(name2[field]) ) {
          return -1;
        } else if ( Date.parse(name1[field]) > Date.parse(name2[field])) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      this.tableDataAll.reverse();
    }
  }

  navigateTo(item) {
    if (item.type === 'Invoice') {
      this.router.navigate([`./invoice-profile/${item.id}`]);
    } else if (item.type === 'Work Order') {
      this.router.navigate([`./collaboration/order-profile`, {id: item.id}]);
    } else if (item.type === 'Purchase Order') {
      this.router.navigate([`./inventory/stock-control/purchase-order/${item.id}`]);
    }
  }

}
