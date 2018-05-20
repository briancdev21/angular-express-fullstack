import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { Ng2TimelineComponent } from '../../../../profile/ng2-timeline/ng2timeline.component';
import { MultiKeywordSelectComponent } from '../../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../../../../../services/shared.service';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EstimateModel } from '../../../../../models/estimate.model';
import { FilterService } from '../../filter.service';
import { EstimatesService } from '../../../../../services/estimates.service';

@Component({
  selector: 'app-addestimatebody',
  templateUrl: './addestimatebody.component.html',
  styleUrls: ['./addestimatebody.component.css']
})
export default class AddEstimateBodyComponent implements OnInit {

  @Input() set createdInvoice(_createdInvoice) {
    this.invoice_mock = _createdInvoice;
    if (_createdInvoice) {
      this.saveInvoiceData = _createdInvoice;
      console.log('saved estimate: ', this.saveInvoiceData);
      this.currentInvoiceId = this.invoice_mock.id;
      this.in_id = 'ES - ' + this.currentInvoiceId;
    }
  }

  invoice_mock: any;
  userList = [];
  classList = [];
  categoryList = [];
  projects = ['task1', 'task2', 'task3'];
  labelText = 'Same address for the billing address';
  title = 'Terms of the Estimate';
  dueDateTitle = 'Expiry date';
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

  locations = [];
  selectedLocation = '';
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
  expiryTitle = 'Expiry date';
  estimateNumberTitle = 'Estimate #';

  emailAddresses = [];
  termsOfInvoice = '';
  contactList: any;
  noteToSupplier: string;
  emails: any;
  showModal = false;
  newEmail: any;
  newCustomerName: any;
  newAddress: string;
  newCity: string;
  newState: string;
  newPostalCode: string;
  newCountry: string;
  newClass: any;
  newCategory: any;
  newInternalMemo: string;
  newCustomerNote: string;
  newTerms: string;
  newExpiryDate: string;

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
  selectItem: any;
  logNumber: any;

  currentInvoiceId: number;
  saveInvoiceData: any;

  constructor(private sharedService: SharedService, private invoicesService: InvoicesService, private router: Router,
    private route: ActivatedRoute, private filterService: FilterService, private estimatesService: EstimatesService) {
    this.createdDate = new Date().toJSON();
    this.dueDate = new Date().toJSON();
    this.sharedService.getContacts()
      .subscribe(data => {
        console.log('userlist: ', data);
        this.contactList = data;
        this.userList = this.contactList;
      });

    this.sharedService.getTerms().subscribe(res => {
      this.terms = res.results;
    });

    this.sharedService.getClassifications().subscribe(res => {
      this.classList = res.results;
    });

    this.sharedService.getPricingCategories().subscribe(res => {
      this.categoryList = res.results;
    });

  }

  ngOnInit() {

    this.filterService.chargeFeeData.subscribe(data => {
      if (data.lateFee) {
        this.saveInvoiceData.chargeLateFee = data.lateFee;
        this.saveInvoiceData.lateFee.value = data.value;
        this.saveInvoiceData.lateFee.unit = data.unit;
      }
    });

    this.filterService.saveClicked.subscribe(data => {
      if (data) {
        this.saveEstimate();
      }
    });
  }

  onCustomerSelected(user) {
  }

  onSelectUser(selectedIndex: any) {
    const contactIdList = this.contactList.map(c => c.id);
    const pos = contactIdList.indexOf(selectedIndex);
    this.customerAddress = this.contactList[pos].shippingAddress;
    this.saveInvoiceData.contactId = selectedIndex;
    this.newCustomerName = selectedIndex;
  }

  onSelectClass(val) {
    this.saveInvoiceData.classificationId = val;
    this.newClass = val;
  }

  onSelectCategory(val) {
    this.saveInvoiceData.categoryId = val;
    this.newCategory = val;
  }

  changedDueDate(event) {
    this.saveInvoiceData.expiryDate = event;
  }

  onChangedMemo(event) {
    this.saveInvoiceData.internalNote = event;
    this.newInternalMemo = event;
  }

  onChangedNote(event) {
    this.saveInvoiceData.customerNote = event;
    this.newCustomerNote = event;
  }

  onChangedTermsOfInvoice(event) {
    this.saveInvoiceData.terms = event;
    this.newTerms = event;
  }

  getMultiEmails(event) {
    this.saveInvoiceData.emails = event;
    this.newEmail = event;
  }

  onDepositChange(event) {
    this.saveInvoiceData.deposit = parseInt(event, 10);
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
      console.log('tax', taxrate);
      if (product.type === 'service') {
        if (product.total !== undefined) {
          this.subtotalServices += product.total;
          if (taxrate !== 0) { this.taxes += product.total * taxrate / 100; this.taxrate = taxrate; }
          this.subtotalServices = Math.round(this.subtotalServices * 100) / 100 ;
          this.taxes = Math.round(this.taxes * 100) / 100 ;
          this.origin_taxes = this.taxes;
          console.log('taxes:', this.origin_taxes);
        }
      } else {
        if (product.total !== undefined) {
          this.subtotalproducts += product.total;
          if (taxrate !== 0) { this.taxes += product.total * taxrate / 100; this.taxrate = taxrate; }
          this.subtotalproducts = Math.round(this.subtotalproducts * 100) / 100 ;
          this.taxes = Math.round(this.taxes * 100) / 100 ;
          this.origin_taxes = this.taxes;
          console.log('taxes:', this.origin_taxes);
        }
      }
    });
    this.onTotalPriceChange(this);

  }

  onTotalPriceChange(data) {
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
      console.log('totla price discountAmount change', discountAmount);
      const totalprice = this.subtotalproducts + subtotalServices;
      switch (this.discountType) {
        case 'percent': {
          console.log('taxes', this.taxes);
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

  saveEstimate() {
    if (this.newCustomerName && this.newEmail && this.newClass && this.newCategory && this.newInternalMemo
      && this.newCustomerNote && this.newTerms) {
      if (!this.saveInvoiceData.hasOwnProperty('deposit')) {
        this.saveInvoiceData.deposit = 0;
      }
      if (!this.saveInvoiceData.hasOwnProperty('classificationId')) {
        this.saveInvoiceData.classificationId = 1;
      }
      if (typeof(this.saveInvoiceData.contactId) !== 'string') {
        this.estimatesService.updateEstimate(this.currentInvoiceId, this.saveInvoiceData).subscribe( res => {
          console.log('saved invoice: ', res);
        });
      }
      this.router.navigate(['./sales/invoices']);
    } else {
      this.showModal = true;
    }
  }
}
