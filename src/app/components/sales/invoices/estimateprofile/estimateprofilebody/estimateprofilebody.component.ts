import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { Ng2TimelineComponent } from '../../../../profile/ng2-timeline/ng2timeline.component';
import { MultiKeywordSelectComponent } from '../../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../../../../../services/shared.service';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceModel } from '../../../../../models/invoice.model';
import { FilterService } from '../../filter.service';
import { EstimatesService } from '../../../../../services/estimates.service';
import * as moment from 'moment';

@Component({
  selector: 'app-estimateprofilebody',
  templateUrl: './estimateprofilebody.component.html',
  styleUrls: ['./estimateprofilebody.component.css']
})
export default class EstimateProfileBodyComponent implements OnInit {
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
  title = 'Terms of the Estimate';
  dueDateTitle = 'Expiry Date';
  invoiceNumberTitle = 'Estimate #';
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
  productDetails = [];
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
  showConvertConfirmModal = false;

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

  constructor(private sharedService: SharedService, private estimatesService: EstimatesService, private invoicesServices: InvoicesService,
    private route: ActivatedRoute, private filterService: FilterService, private router: Router) {
    this.createdDate = new Date().toJSON();

    //
    this.currentInvoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.estimatesService.getIndividualEstimate(this.currentInvoiceId).subscribe(res => {

      this.sharedService.getContacts()
      .subscribe(data => {
        this.contactList = data;
        this.userList = this.contactList;
        this.customerAddress = this.getContactAddress(this.contactList, res.data.contactId);
      });

      this.sharedService.getTerms().subscribe(data => {
        this.terms = data.results;
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

      this.saveInvoiceData = res.data;
      // change contact id to number
      this.saveInvoiceData.contactId = parseInt(res.data.contactId.slice(-1), 10);
      this.discountType = res.data.discount.unit;
      this.discountAmount = res.data.discount.value;
      this.internalMemo = res.data.internalNote;
      this.noteToSupplier = res.data.customerNote;
      this.termsOfInvoice = res.data.terms;
      this.createdDate = moment(res.data.createdAt).format('YYYY-MM-DD');
      this.dueDate = res.data.expiryDate;
      this.subtotalproducts = res.data.productSubTotal;
      this.subtotalServices = res.data.serviceSubTotal;
      this.taxes = res.data.taxTotal;
      this.discountType = res.data.discount.unit;
      this.discountAmount = res.data.discount.value;
      this.totalamountdue = res.data.total;
      this.currentClassId = res.data.classificationId;
      this.currentCategoryId = res.data.categoryId;
      this.currentOwner = res.data.owner;
      this.emailAddresses = res.data.emails;
      this.shippingAddress = res.data.shippingAddress;
    });

  }

  ngOnInit() {
    console.log('createdInvoice', this.createdInvoice);
    // get id for new and existing lead

    this.currentInvoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.estimatesService.getIndividualEstimate(this.currentInvoiceId).subscribe(res => {
      console.log('getIndividualInvoice: ', res);

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
      this.currentOwner = res.data.owner;
      this.emailAddresses = res.data.emails;
      this.shippingAddress = res.data.shippingAddress;
      // retrieve current cateogry, classification
      const classPos = this.classList.map(t => t.id).indexOf(this.currentClassId);
      this.currentClass = this.classList[classPos].name;
      const categoryPos = this.categoryList.map(t => t.id).indexOf(this.currentCategoryId);
      this.currentCategory = this.categoryList[categoryPos].name;
    });
    this.in_id = 'ES - ' + this.currentInvoiceId;

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

    this.filterService.convertClicked.subscribe(data => {
      if (data) {
        this.convertInvoice();
      }
    });
  }

  getContactName(list, id) {
    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[id].person.firstName + ' ' + list[id].person.lastName;
  }

  getContactAddress(list, id) {

    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[pos].shippingAddress;
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
    this.saveInvoiceData.expiryDate = event;
  }

  onChangedMemo(event) {
    this.saveInvoiceData.internalNote = event;
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
  }

  getUpdatedShippiingAddress(event) {
    this.saveInvoiceData.billingAddress = event.data;
  }

  onPriceChanged() {
    this.subtotalproducts = 0;
    this.subtotalServices = 0;
    this.taxes = 0;
    this.taxrate = 0;
    this.productDetails.forEach( product => {
      let taxrate;
      switch (product.taxrate) {
        case 'GST': taxrate = 5; break;
        case 'PST': taxrate = 7; break;
        case undefined: taxrate = 0; break;
        default: {
          taxrate = parseInt(product.taxrate, 10);
        }
      }
      if (product.type === 'service') {
        if (product.total !== undefined) {
          this.subtotalServices += product.total;
          if (taxrate !== 0) { this.taxes += product.total * taxrate / 100; this.taxrate = taxrate; }
          this.subtotalServices = Math.round(this.subtotalServices * 100) / 100 ;
          this.taxes = Math.round(this.taxes * 100) / 100 ;
          this.origin_taxes = this.taxes;
        }
      } else {
        if (product.total !== undefined) {
          this.subtotalproducts += product.total;
          if (taxrate !== 0) { this.taxes += product.total * taxrate / 100; this.taxrate = taxrate; }
          this.subtotalproducts = Math.round(this.subtotalproducts * 100) / 100 ;
          this.taxes = Math.round(this.taxes * 100) / 100 ;
          this.origin_taxes = this.taxes;
        }
      }
    });
    this.onTotalPriceChange(this);

  }

  onTotalPriceChange(data) {
    if (data.type) {
      this.saveInvoiceData.discount.unit = data.type;
      this.saveInvoiceData.discount.value = data.amount;
    } else {
      this.saveInvoiceData.deposit = data.depositsAmount;
    }
    this.saveInvoiceData.deposit = data;
    let depositsAmount;
    let discountAmount;
    this.taxes = this.origin_taxes;

    if (data.amount !== undefined) { this.discountAmount = data.amount; }
    if (data.discountType !== this.discountType && data.type) { this.discountType = data.type; }
    if (data.depositsAmount !== undefined) { this.depositsAmount = data.depositsAmount; }
    depositsAmount = this.depositsAmount;
    discountAmount = this.discountAmount;
    if (depositsAmount === undefined) { depositsAmount = 0; }
    if (discountAmount === 0) { discountAmount = 0; this.discountAmount  = undefined; }
    let subtotalServices = this.subtotalServices;
    if (this.subtotalServices === undefined) { subtotalServices = 0; }
    if (depositsAmount !== undefined && this.subtotalproducts !== undefined) {
      if (discountAmount === undefined) { discountAmount = 0; }
      const totalprice = this.subtotalproducts + subtotalServices;
      switch (this.discountType) {
        case 'percent': {
          this.taxes = this.taxes * (1 - discountAmount / 100);
          this.totalamountdue = totalprice * (100 - discountAmount) / 100 - depositsAmount + this.taxes;
        }
        break;
        case 'dollar': {
          this.taxes -= discountAmount * this.taxrate / 100;
          this.totalamountdue = totalprice - discountAmount - depositsAmount + this.taxes;
        }
        break;
      }
      this.totalamountdue =  Math.round(this.totalamountdue * 100) / 100;
    }
  }

  saveInvoice() {
    if (!this.saveInvoiceData.hasOwnProperty('deposit')) {
      this.saveInvoiceData.deposit = 0;
    }
    this.estimatesService.updateEstimate(this.currentInvoiceId, this.saveInvoiceData).subscribe( res => {
    });
  }

  convertInvoice() {
    this.showConvertConfirmModal = true;
    console.log('1111111111');
  }

  confirmConvert() {
    this.showConvertConfirmModal = false;
    this.saveInvoiceData.startDate = moment().format('YYYY-MM-DD');
    this.saveInvoiceData.termId = 1;
    this.invoicesServices.createInvoice(this.saveInvoiceData).subscribe(res => {
      console.log('convert: ', res);
      this.router.navigate(['./invoice-profile', {id: res.data.id}]);
    });
  }
}
