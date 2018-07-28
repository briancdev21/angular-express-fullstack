import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import { CommonComponent } from '../../../common/common.component';
import { FilterService } from './filter.service';
import { PmService } from '../../pm.service';
import { CollaboratorsService } from '../../../../services/collaborators.service';

@Component({
  selector: 'app-projectfinancialstable',
  templateUrl: './projectfinancialstable.component.html',
  styleUrls: [
    './projectfinancialstable.component.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class ProjectFinancialsTableComponent implements OnInit {

  @Input() purchaseOrdersList = [];
  @Input() invoicesList;
  public workOrdersList = [];
  public tableDataAll = [];

  menuCollapsed = true;
  saveFilterModalCollapsed = true;
  showSaveFilterModal = false;
  filterClicked = false;
  backUpLeads: any;
  openSavedFiltersList = false;
  savedFiltersListCollapsed = true;
  savedFiltersArr = [];
  filterAvaliableTo: any;
  filterName = '';
  currentProjectId: any;

  public filters  = {

  };

  public productNameList = [
    'Home Controller 800', 'Home Controller 250', 'Low-Voltage Wired Keypad', '55" Smart LED TV',
    '2 Year Warranty', 'Adaptive Phase Dimmer 120V'
  ];

  public supplierList = [
    'Control4', 'supplier test'
  ];

  statusList = [
    'Place order', 'Reserved'
  ];

  brandsList = [
    'Control4', 'Samsung', 'Nu Automation',
  ];

  tagsList = [
  ];

  constructor( private filterService: FilterService, private pmService: PmService, private collaboratorsService: CollaboratorsService) {

    this.filterAvaliableTo = 'everyone';
    this.currentProjectId = localStorage.getItem('current_projectId');

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
        });
      });
    });
  }

  getInvoices(id) {
    this.invoicesList = this.invoicesList.filter(b => b.projectId === id);
    return this.invoicesList;
  }

  ngOnInit() {
    // this.backUpLeads = this.leadsListInfo;
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  getFilteredLists(val) {
    this.purchaseOrdersList = val.filteredOrders;
    this.invoicesList = val.filteredInventories;
  }

  closeModal() {
  }

  onChangeAcailable(val) {
  }

  saveFilter() {
  }
}
