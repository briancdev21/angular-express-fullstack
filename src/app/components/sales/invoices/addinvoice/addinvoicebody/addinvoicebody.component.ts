import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { Ng2TimelineComponent } from '../../../../profile/ng2-timeline/ng2timeline.component';
import { MultiKeywordSelectComponent } from '../../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../../../../../services/shared.service';
import { InvoicesService } from '../../../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceModel } from '../../../../../models/invoice.model';
import { FilterService } from '../../filter.service';

@Component({
  selector: 'app-addinvoicebody',
  templateUrl: './addinvoicebody.component.html',
  styleUrls: ['./addinvoicebody.component.css']
})
export class AddInvoiceBodyComponent implements OnInit {
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
  productDetails = [];
  internalMemo = undefined;
  noteToSupplier = undefined;
  selectItem = '';
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
  saveInvoiceData: InvoiceModel;

  constructor(private sharedService: SharedService, private invoicesService: InvoicesService,
    private route: ActivatedRoute, private filterService: FilterService) {
    this.saveInvoiceData = new InvoiceModel();
    this.createdDate = new Date().toJSON();
    this.dueDate = new Date().toJSON();
    this.sharedService.getContacts()
      .subscribe(data => {
        console.log('userlist: ', data);
        this.contactList = data;
        this.userList = this.contactList;
      });

    this.currentInvoiceId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.in_id = 'IN - ' + this.currentInvoiceId;
    this.invoicesService.getIndividualInvoice(this.currentInvoiceId).subscribe(res => {
      console.log('getIndividualInvoice: ', res);
      this.discountType = res.data.discount.unit;
      this.discountAmount = res.data.discount.value;
      this.internalMemo = res.data.internalNote;
      this.noteToSupplier = res.data.customerNote;
      this.termsOfInvoice = res.data.terms;
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
      console.log('lateFee: ', data);
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
      console.log('save clicked: ', data);
    });
  }

  onCustomerSelected(user) {
    console.log(user);
  }

  onSelectUser(selectedIndex: any) {
    console.log('selectedContactIndex:', selectedIndex);

    const contactIdList = this.contactList.map(c => c.id);
    const pos = contactIdList.indexOf(selectedIndex);
    this.customerAddress = this.contactList[pos].shippingAddress;
    this.saveInvoiceData.contactId = selectedIndex;
  }

  onSelectClass(val) {
    console.log('val', val);
    this.saveInvoiceData.classificationId = val;
  }

  onSelectCategory(val) {
    console.log('val', val);
    this.saveInvoiceData.categoryId = val;
  }

  changedCreatedDate(event) {
    console.log('changedCreatedDate: ', event);
    this.saveInvoiceData.startDate = event;
  }

  changedDueDate(event) {
    console.log('changedDueDate: ', event);
    this.saveInvoiceData.startDate = event;
  }

  onChangedMemo(event) {
    console.log('onChangedMemo: ', event);
    this.saveInvoiceData.internalNote = event;
  }

  onChangedNote(event) {
    console.log('onChangedNote: ', event);
    this.saveInvoiceData.customerNote = event;
  }

  onChangedTermsOfInvoice(event) {
    console.log('onChangedNote: ', event);
    this.saveInvoiceData.terms = event;
  }

  getMultiEmails(event) {
    this.saveInvoiceData.emails = event;
    console.log('multiemail: ', event);
  }

  onChangeTerm(event) {
    // this.saveInvoiceData.termId = event;
    console.log(event);
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
    console.log('discountChange: ', data);
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

  saveInvoice() {
    this.saveInvoiceData.emails = this.emails;
    this.invoicesService.updateInvoice(this.currentInvoiceId, this.saveInvoiceData).subscribe( res => {
      console.log('saved invoice: ', res);
    });
  }
}
