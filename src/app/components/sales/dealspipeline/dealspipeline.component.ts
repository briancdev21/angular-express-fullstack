import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonComponent } from '../../common/common.component';
import { CommonService } from '../../common/common.service';
import { FilterService } from './filter.service';
import { DragulaService } from 'ng2-dragula';
import { SharedService } from '../../../services/shared.service';
import { InvoicesService } from '../../../services/invoices.service';
import { EstimatesService } from '../../../services/estimates.service';
import { ProposalsService } from '../../../services/proposals.service';
import { CrmService } from '../../../services/crm.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dealspipeline',
  templateUrl: './dealspipeline.component.html',
  styleUrls: [
    './dealspipeline.component.css',
    '../../../../../node_modules/dragula/dist/dragula.css'
  ],
  entryComponents: [
    CommonComponent
  ],
  providers: [FilterService]
})
export class DealsPipelineComponent implements OnInit, OnDestroy {

  menuCollapsed = true;
  filterOptions = ['This Week', 'This Month', 'This Quarter', '90 Days', 'Last Quarter', 'This Year', 'Last Year', 'All time'];
  filterOption = 'All time';
  newDeals = [];
  followUpDeals = [];
  seenDeals = [];
  demoDeals = [];
  negotiationDeals = [];
  wonDeals = [];
  lostDeals = [];
  current = new Date();
  todayTime: number;
  weekStartTime: number;
  weekEndTime: number;
  monthStartTime: number;
  monthEndTime: number;
  quarterStartTime: number;
  quarterEndTime: number;
  lastQuartertartTime: number;
  lastQuarterEndTime: number;
  lastYearStartTime: number;
  lastYearEndTime: number;
  thisYearStartTime: number;
  thisYearEndTime: number;
  filteredDealsInfo = [];

  public dealsInfo = [];

  invoicesList = [];
  estimatesList = [];
  proposalsList = [];
  contactsList = [];
  leadsList = [];
  estContactsList = [];
  estLeadsList = [];
  updatingCard: any;
  modalContent = 'Are you sure you want to set the status to WON? \r\n You cannot undo this action.';
  targetStatus: any;
  sourceStatus: any;
  selectedDeal: any;

  constructor( private dragulaService: DragulaService, private filterService: FilterService, private sharedService: SharedService,
    private invoicesService: InvoicesService, private estimatesService: EstimatesService, private proposalsService: ProposalsService,
    private crmService: CrmService, private commonService: CommonService ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });

    this.invoicesService.getInvoices().subscribe(res => {
      // this.sharedService.getMulipleContacts()
    });

    this.proposalsService.getProposals().subscribe(res => {
      this.proposalsList = res.results;
      const contactIds = res.results.filter(data => data.contactId).map(data => data.contactId);
      const leadIds = res.results.filter(data => data.leadId).map(data => data.leadId);

      this.sharedService.getMulipleContacts(contactIds).subscribe(contact => {
        this.contactsList = this.contactsList.concat(contact);
        this.addContactName(this.contactsList);

        this.crmService.getMulipleLeads(leadIds).subscribe(lead => {
          this.leadsList = this.leadsList.concat(lead);
          this.addContactName(this.leadsList);

          this.proposalsList.forEach(element => {
            const indiItem = {
              name: 'test name',
              title: 'Proposal',
              total: element.total,
              id: element.number,
              created: moment(element.createdAt).format('MMM DD, YYYY'),
              status: element.status,
            };
            if (element.contactId) {
              indiItem.name = this.getContactNameFromId(this.contactsList, element.contactId);
            } else {
              indiItem.name = this.getLeadNameFromId(this.leadsList, element.leadId);
            }
            this.dealsInfo.push(indiItem);
            for (let i = 0; i < this.dealsInfo.length; i ++) {
              this.dealsInfo[i].index = i;
            }
          });
          this.categorizeDealsInfo();
        });
      });
    });

    this.estimatesService.getEstimates().subscribe(est => {
      this.estimatesList = est.results;
      const estContactIds = est.results.filter(data => data.contactId).map(data => data.contactId);
      const estLeadIds = est.results.filter(data => data.leadId).map(data => data.leadId);

      this.categorizeDealsInfo();

      this.sharedService.getMulipleContacts(estContactIds).subscribe(contact => {
        this.contactsList = this.contactsList.concat(contact);
        this.addContactName(this.contactsList);

        this.crmService.getMulipleLeads(estLeadIds).subscribe(lead => {
          this.leadsList = this.leadsList.concat(lead);
          this.addContactName(this.leadsList);

          this.estimatesList.forEach(estimate => {
            const indiItem = {
              name: 'test name',
              title: 'Estimate',
              total: estimate.total,
              id: estimate.number,
              created: moment(estimate.createdAt).format('MMM DD, YYYY'),
              status: estimate.status,
            };
            if (estimate.contactId) {
              indiItem.name = this.getContactNameFromId(this.contactsList, estimate.contactId);
            } else {
              indiItem.name = this.getLeadNameFromId(this.leadsList, estimate.leadId);
            }
            this.dealsInfo.push(indiItem);
            for (let i = 0; i < this.dealsInfo.length; i ++) {
              this.dealsInfo[i].index = i;
            }
          });
          this.categorizeDealsInfo();
        });
      });
    });
  }

  categorizeDealsInfo() {
    this.newDeals = this.dealsInfo.filter(d => d.status === 'NEW');
    this.followUpDeals = this.dealsInfo.filter(d => d.status === 'FOLLOW_UP');
    this.seenDeals = this.dealsInfo.filter(d => d.status === 'SEEN');
    this.demoDeals = this.dealsInfo.filter(d => d.status === 'DEMO');
    this.negotiationDeals = this.dealsInfo.filter(d => d.status === 'NEGOTIATION');
    this.wonDeals = this.dealsInfo.filter(d => d.status === 'WON');
    this.lostDeals = this.dealsInfo.filter(d => d.status === 'LOST');
  }

  private onDropModel(args) {
    const [el, target, source] = args;
    const selectedIndex = Number(el.id);
    this.targetStatus = target.id;
    this.sourceStatus = source.id;
    this.selectedDeal = this.dealsInfo[selectedIndex];
    console.log('column check: ', this.newDeals, this.followUpDeals);
    if (this.sourceStatus === 'WON') {
      this.undoTable();
    } else {
      if (this.targetStatus === 'WON') {
        this.commonService.showYnModal.next(true);
      } else {
        this.updatingTable();
      }
    }
  }

  ngOnInit() {

    this.todayTime = this.current.getTime();
    this.weekStartTime = new Date(this.current.setDate(this.current.getDate() - this.current.getDay())).getTime();
    this.weekEndTime = new Date(this.current.setDate(this.current.getDate() - this.current.getDay() + 6)).getTime();
    this.monthStartTime = new Date(this.current.getFullYear(), this.current.getMonth(), 1).getTime();
    this.monthEndTime = new Date(this.current.getFullYear(), this.current.getMonth() + 1, 0).getTime();
    const quarter = Math.floor((this.current.getMonth() / 3));
    this.quarterStartTime = new Date(this.current.getFullYear(), quarter * 3, 1).getTime();
    this.quarterEndTime = new Date(this.current.getFullYear(), quarter * 3 + 3, 0).getTime();
    this.lastQuartertartTime = new Date(this.current.getFullYear(), quarter * 3 - 3, 1).getTime();
    this.lastQuarterEndTime = new Date(this.current.getFullYear(), quarter * 3, 1).getTime();
    this.thisYearStartTime = new Date(this.current.getFullYear(), 0, 1).getTime();
    this.thisYearEndTime = new Date(this.current.getFullYear() + 1, 0, 1).getTime();
    this.lastYearStartTime = new Date(this.current.getFullYear() - 1, 0, 1).getTime();
    this.lastYearEndTime = new Date(this.current.getFullYear(), 0, 1).getTime();
  }

  updatingTable() {
    if (this.selectedDeal.title === 'Estimate') {
      this.updatingCard = this.estimatesList.filter(e => e.number === this.selectedDeal.id)[0];
    } else {
      this.updatingCard = this.proposalsList.filter(p => p.number === this.selectedDeal.id)[0];
    }

    this.updatingDeal(this.selectedDeal.title, this.updatingCard, this.targetStatus);
    this.newDeals.map(t => t.status = 'NEW');
    this.followUpDeals.map(t => t.status = 'FOLLOW_UP');
    this.seenDeals.map(t => t.status = 'SEEN');
    this.demoDeals.map(t => t.status = 'DEMO');
    this.negotiationDeals.map(t => t.status = 'NEGOTIATION');
    this.wonDeals.map(t => t.status = 'WON');
    this.lostDeals.map(t => t.status = 'LOST');
  }

  toggleMenubar(data: boolean) {
    this.menuCollapsed  = data;
  }

  total(arr) {
    let total = 0;
    for (let i = 0; i < arr.length ; i ++) {
      total = total + arr[i].total;
    }
    return total;
  }

  onChangeFilter(filter) {

    this.filteredDealsInfo = this.dealsInfo;

    switch (filter) {
      case 'This Week': {
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.weekStartTime && Date.parse(d.created) < this.weekEndTime
        );
        break;
      }
      case 'This Month':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.monthStartTime && Date.parse(d.created) < this.monthEndTime
        );
        break;
      case 'This Quarter':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.quarterStartTime && Date.parse(d.created) < this.quarterEndTime
        );
        break;
      case '90 Days':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > (this.todayTime - 90 * 86400000) && Date.parse(d.created) < this.todayTime
        );
        break;
      case 'Last Quarter':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.lastQuartertartTime && Date.parse(d.created) < this.lastQuarterEndTime
        );
        break;
      case 'This Year':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.thisYearStartTime && Date.parse(d.created) < this.thisYearEndTime
        );
        break;
      case 'Last Year':
        this.filteredDealsInfo = this.filteredDealsInfo.filter(
          d => Date.parse(d.created) > this.lastYearStartTime && Date.parse(d.created) < this.lastYearEndTime
        );
        break;
      case 'All time':
        break;
      default:
        console.log('default');
    }
    console.log('filtered: ', this.filteredDealsInfo);
    this.newDeals = this.filteredDealsInfo.filter(d => d.status === 'NEW');
    this.followUpDeals = this.filteredDealsInfo.filter(d => d.status === 'FOLLOW_UP');
    this.seenDeals = this.filteredDealsInfo.filter(d => d.status === 'SEEN');
    this.demoDeals = this.filteredDealsInfo.filter(d => d.status === 'DEMO');
    this.negotiationDeals = this.filteredDealsInfo.filter(d => d.status === 'NEGOTIATION');
    this.wonDeals = this.filteredDealsInfo.filter(d => d.status === 'WON');
    this.lostDeals = this.filteredDealsInfo.filter(d => d.status === 'LOST');
  }

  onSelect(event) {
    console.log('selected: ', event);
    if (event.data) {
      this.updatingTable();
    } else {
      this.undoTable();
    }
  }

  undoTable() {
    this.selectedDeal.status = this.sourceStatus;
    const indexArr = this.dealsInfo.map(d => d.index);
    const pos = indexArr.indexOf(this.selectedDeal.index);
    this.dealsInfo[pos].status = this.sourceStatus;
    this.categorizeDealsInfo();
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

  getContactName(selectedContact) {
    if (selectedContact.type === 'PERSON') {
      selectedContact.name = selectedContact.person.firstName + ' ' + selectedContact.person.lastName;
    } else {
      selectedContact.name = selectedContact.business.name;
    }
    return selectedContact.name;
  }

  getContactNameFromId (list, id) {
    const selectedContact = list.filter(c => c.id === id)[0];
    return this.getContactName(selectedContact);
  }

  getLeadNameFromId (list, id) {
    const selectedLead = list.filter(c => c.id === id)[0];
    return this.getContactName(selectedLead);
  }

  updatingDeal(type, deal, status) {
    deal.status = status;
    if (!deal.internalNote) {
      deal.internalNote = '';
    }
    if (!deal.customerNote) {
      deal.customerNote = '';
    }
    if (!deal.terms) {
      deal.terms = '';
    }
    if (type === 'Estimate') {
      this.estimatesService.updateEstimate(deal.id, deal).subscribe(res => {
        console.log('updated: ', res);
      });
    } else {
      this.proposalsService.updateIndividualProposal(deal.id, deal).subscribe(res => {
        console.log('updated: ', res);
      });
    }
  }

  ngOnDestroy() {
    this.commonService.showYnModal.next(false);
  }

}
