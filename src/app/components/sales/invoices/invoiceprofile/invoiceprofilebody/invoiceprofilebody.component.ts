import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { Ng2TimelineComponent } from '../../../../profile/ng2-timeline/ng2timeline.component';
import { MultiKeywordSelectComponent } from '../../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../../../../../services/shared.service';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceModel } from '../../../../../models/invoice.model';
import { FilterService } from '../../filter.service';
import * as moment from 'moment';
import { RecurseVisitor } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-invoiceprofilebody',
  templateUrl: './invoiceprofilebody.component.html',
  styleUrls: ['./invoiceprofilebody.component.css']
})
export class InvoiceProfileBodyComponent implements OnInit {
  // @Input() createdInvoice;

  @Input() set createdInvoice(_createdInvoice) {

  }

  invoice_mock: any;
  userList = [];
  classList = [];
  categoryList = [];
  projects = ['task1', 'task2', 'task3'];
  changeLogNumbers = ['Number 1', 'Number 2', 'Number 3' ];
  labelText = 'Use customer address';
  title = 'Terms of the Invoice';
  dueDateTitle = 'Due Date';
  invoiceNumberTitle = 'Invoice #';
  subtotalServices = undefined;
  shippingAddress = {
    address: '',
    street: '',
    city: '',
    country: '',
    postcode: ''
  };
  customerAddress =  {
    address: '',
    street: '',
    city: '',
    country: '',
    postcode: ''
  };

  terms = [];
  selectedTerm = '';
  dueDate: any;
  productDetails: any;
  internalMemo = undefined;
  subtotalproducts = undefined;
  discountType: string;
  discountAmount: number;
  freightcosts = undefined;
  taxes = undefined;
  totalamountdue = undefined;
  taxrate = 0;
  origin_taxes = undefined;
  oneSide = true;
  depositsAmount = undefined;
  in_id = '';
  createdDate: any;
  contactList: any;
  noteToSupplier: string;

  emailAddresses = [];
  termsOfInvoice = '';
  emails: any;
  currentClass: string;
  currentClassId: number;
  currentCategory: string;
  currentCategoryId: number;
  currentTerm: string;
  currentTermId: number;
  public timelineData: Array<Object> = [
    {
      title: 'Meeting',
      icon: 'fa-home',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'green-btn',
      buttontitle: 'More Info',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'getMoreInfo'
    },
    {
      title: 'Send Document to Mike',
      icon: 'fa-file-text-o',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'blue-btn',
      buttontitle: 'Download document',
      date: '2018-1-9',
      buttonClickEventHandlerName: 'downloadDoc'
    },
    {
      title: 'Coffee Break',
      icon: 'fa-coffee',
      content: 'Conference on the sales for the previous year. Monica please examine sales trends in marketing and products.\
       Below please find the currnet status of the sale',
      timelineBtnColor: 'lime-btn',
      buttontitle: 'Read more',
      date: '2018-1-8',
      buttonClickEventHandlerName: 'readMoreCoffee'
    },
    {
      title: 'Phone with Jeronimo',
      icon: 'fa-phone',
      content: 'Following step to complete',
      timelineBtnColor: 'orange-btn',
      buttontitle: 'Download doc',
      date: '2018-1-7',
      buttonClickEventHandlerName: 'downloadDoc'
    }
  ];

  currentInvoiceId: number;
  saveInvoiceData: any;
  currentOwner: string;
  invoiceStatus = 'NEW';

  constructor(private sharedService: SharedService, private invoicesService: InvoicesService,
              private route: ActivatedRoute, private filterService: FilterService) {

    this.currentInvoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.invoicesService.getIndividualInvoice(this.currentInvoiceId).subscribe(res => {
      this.invoiceStatus = res.data.status;
      this.sharedService.getContacts()
      .subscribe(data => {
        data = this.addContactName(data);
        this.contactList = data;
        this.userList = this.contactList;
        this.customerAddress = this.getContactAddress(this.contactList, res.data.contactId);
        this.currentOwner = this.getCustomerName(this.contactList, res.data.contactId);
        console.log('current owner:', this.currentOwner);
      });

      this.sharedService.getTerms().subscribe(data => {
        this.terms = data.results;
        const termPos = this.terms.map(t => t.id).indexOf(this.currentTermId);
        this.currentTerm = this.terms[termPos].name;
      });

      this.sharedService.getClassifications().subscribe(data => {
        this.classList = data.results;
        const classPos = this.classList.map(t => t.id).indexOf(this.currentClassId);
        this.currentClass = this.classList[classPos].name;
      });

      this.sharedService.getCategories().subscribe(data => {
        this.categoryList = data.results;
        const categoryPos = this.categoryList.map(t => t.id).indexOf(this.currentCategoryId);
        this.currentCategory = this.categoryList[categoryPos].name;
      });

      this.invoicesService.getInvoiceProducts(this.currentInvoiceId).subscribe(data => {
        const invoiceProducts = data.results;
        invoiceProducts.map( i => {
          if (this.invoiceStatus !== 'NEW') { i['readonly'] = true; }
          i['unitprice'] = i.unitPrice;
          i['discount'] = i.discount.value;
          return i;
        });
        this.productDetails = {
          products: invoiceProducts,
          status: this.invoiceStatus
        };
      });

      this.saveInvoiceData = res.data;
      // change contact id to number
      this.saveInvoiceData.contactId = parseInt(res.data.contactId.slice(-1), 10);

      this.discountType = res.data.discount.unit;
      this.discountAmount = res.data.discount.value;
      this.internalMemo = res.data.internalNote;
      this.noteToSupplier = res.data.customerNote;
      this.termsOfInvoice = res.data.terms;
      this.createdDate = res.data.startDate;
      this.dueDate = res.data.dueDate;
      this.subtotalproducts = res.data.productSubTotal;
      this.subtotalServices = res.data.serviceSubTotal;
      this.taxes = res.data.taxTotal;
      this.discountType = res.data.discount.unit;
      this.discountAmount = res.data.discount.value;
      this.totalamountdue = res.data.total;
      this.currentClassId = res.data.classificationId;
      this.currentCategoryId = res.data.categoryId;
      this.currentTermId = res.data.termId;
      this.emailAddresses = res.data.emails;
      this.shippingAddress = res.data.shippingAddress;
      this.depositsAmount = res.data.deposit;
    });

    this.saveInvoiceData = new InvoiceModel();
    this.createdDate = new Date().toJSON();
    this.dueDate = new Date().toJSON();
  }

  ngOnInit() {

    this.in_id = 'IN - ' + this.currentInvoiceId;

    this.filterService.chargeFeeData.subscribe(data => {
      if (data.lateFee) {
        this.saveInvoiceData.chargeLateFee = data.lateFee;
        this.saveInvoiceData.lateFee.value = data.value;
        this.saveInvoiceData.lateFee.unit = data.unit;
      }
    });

    this.filterService.saveClicked.subscribe(data => {
      if (data) {
        this.saveInvoice();
      }
    });
  }

  getContactAddress(list, id) {

    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[pos].shippingAddress;
  }

  getCustomerName(list, id) {
    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[pos].name;
  }

  onCustomerSelected(user) {
  }

  onSelectUser(selectedIndex: any) {
    const contactIdList = this.contactList.map(c => c.id);
    const pos = contactIdList.indexOf(selectedIndex);
    this.customerAddress = this.contactList[pos].shippingAddress;
    this.saveInvoiceData.contactId = selectedIndex;
  }

  onSelectClass(val) {
    this.saveInvoiceData.classificationId = val;
  }

  onSelectCategory(val) {
    this.saveInvoiceData.categoryId = val;
  }

  changedDueDate(event) {
    this.saveInvoiceData.startDate = event;
  }

  onChangedMemo(event) {
    this.saveInvoiceData.internalNote = event;
    console.log('123', this.saveInvoiceData);
  }

  onChangedNote(event) {
    this.saveInvoiceData.customerNote = event;
  }

  onChangedTermsOfInvoice(event) {
    this.saveInvoiceData.terms = event;
  }

  getMultiEmails(event) {
    this.saveInvoiceData.emails = event;
  }

  onChangeTerm(event) {
    this.saveInvoiceData['termId'] = parseInt(event, 10);
  }

  onDepositChange(event) {
    this.saveInvoiceData.deposit = parseInt(event, 10);
  }

  getShippingAddress(event) {
    this.saveInvoiceData.shippingAddress = event.data;
  }

  onPriceChanged() {
    this.saveInvoice();
  }

  onTotalPriceChange(data) {
    if (data.type) {
      this.saveInvoiceData.discount.unit = data.type;
      this.saveInvoiceData.discount.value = data.amount;
    } else {
      this.saveInvoiceData.deposit = data.depositsAmount;
    }
    this.saveInvoice();
  }

  saveInvoice() {
    if (!this.saveInvoiceData.hasOwnProperty('deposit')) {
      this.saveInvoiceData.deposit = 0;
    }
    if (this.saveInvoiceData.recurring === null) {
      this.saveInvoiceData.recurring = [];
    }
    if (this.saveInvoiceData.terms === null) {
      this.saveInvoiceData.terms = '';
    }
    if (this.saveInvoiceData.internalNote === null) {
      this.saveInvoiceData.internalNote = '';
    }
    if (this.saveInvoiceData.customerNote === null) {
      this.saveInvoiceData.customerNote = '';
    }
    if (this.saveInvoiceData.reminder === null) {
      this.saveInvoiceData.reminder = [];
    }
    this.invoicesService.updateInvoice(this.currentInvoiceId, this.saveInvoiceData).subscribe( res => {
      console.log('saved invoice: ', res);
      this.taxes = res.data.taxTotal;
      this.totalamountdue = res.data.total;
      this.subtotalServices = res.data.serviceSubTotal;
      this.subtotalproducts = res.data.productSubTotal;
    });
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
