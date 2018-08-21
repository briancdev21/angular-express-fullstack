import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
import { ProjectsService } from '../../../../../services/projects.service';
import { CommonService } from '../../../../common/common.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { countries } from '../../../../../../assets/json/countries';
import { provinces } from '../../../../../../assets/json/provinces';

@Component({
  selector: 'app-invoiceprofilebody',
  templateUrl: './invoiceprofilebody.component.html',
  styleUrls: ['./invoiceprofilebody.component.css']
})
export class InvoiceProfileBodyComponent implements OnInit, OnDestroy {
  // @Input() createdInvoice;

  @Input() set createdInvoice(_createdInvoice) {

  }

  invoice_mock: any;
  userList = [];
  classList = [];
  categoryList = [];
  projects = [];
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
  currentClassId: string;
  currentCategory: string;
  currentCategoryId: string;
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

  currentInvoiceId: string;
  saveInvoiceData: any;
  currentOwner: string;
  invoiceStatus = 'NEW';
  modalContent = 'You cannot update a PAID or VOID Invoice';

  contactsSource: CompleterData;
  currentInvoice: any;
  customerName: any;
  countriesSource: CompleterData;
  provincesSource: CompleterData;
  projectName: any;
  changeLogName: any;
  address = '';
  city = '';
  province = '';
  postalCode = '';
  country = '';
  invalidAddress = false;
  invalidCity = false;
  invalidProvince = false;
  invalidCountry = false;
  invalidPostalCode = false;
  switchIconShipping = true;
  selectedContact: any;
  invoiceNumber = '';
  today = new Date();
  deliveryStatus = 'NOT_DELIVERED';

  constructor(private sharedService: SharedService, private invoicesService: InvoicesService, private router: Router,
              private route: ActivatedRoute, private filterService: FilterService, private projectsService: ProjectsService,
              private commonService: CommonService, private completerService: CompleterService ) {

    this.currentInvoiceId = this.route.snapshot.paramMap.get('id');
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');

    this.invoicesService.getIndividualInvoice(this.currentInvoiceId).subscribe(res => {
      console.log('current invoice', res);
      this.currentInvoice = res.data;
      this.invoiceStatus = res.data.status;
      if (this.invoiceStatus === 'PAID' || this.invoiceStatus === 'CLOSED' ) {
        this.commonService.showAlertModal.next(true);
      }
      this.sharedService.getMulipleContacts(this.currentInvoice.contactId).subscribe(contact => {
        this.selectedContact = contact[0];
        this.customerName = this.getContactName(this.selectedContact);
        if (this.switchIconShipping) {
          this.address = this.selectedContact.shippingAddress.address;
          this.country = this.selectedContact.shippingAddress.country;
          this.city = this.selectedContact.shippingAddress.city;
          this.province = this.selectedContact.shippingAddress.province;
          this.postalCode = this.selectedContact.shippingAddress.postalCode;
        }
      });
      this.sharedService.getContacts()
        .subscribe(data => {
          data = this.addContactName(data);
          this.contactList = data;
          this.contactsSource = this.completerService.local(this.contactList, 'name', 'name');
          // this.userList = this.contactList;
          // if (res.data.contactId) {
          //   this.customerAddress = this.getContactAddress(this.contactList, res.data.contactId);
          //   this.currentOwner = this.getCustomerName(this.contactList, res.data.contactId);
          //   console.log('current owner:', this.currentOwner);
          // }
        });

      this.sharedService.getTerms().subscribe(data => {
        this.terms = data.results;
        if (this.currentTermId) {
          const termPos = this.terms.map(t => t.id).indexOf(this.currentTermId);
          this.currentTerm = this.terms[termPos].name;
        }
      });

      this.sharedService.getClassifications().subscribe(data => {
        this.classList = data.results;
        if (this.currentClassId) {
          const classPos = this.classList.map(t => t.id).indexOf(this.currentClassId);
          this.currentClass = this.classList[classPos].id;
        }
      });

      this.sharedService.getInvoiceCategories().subscribe(data => {
        console.log('category: ', data, this.currentCategoryId);
        this.categoryList = data.results;
        if (this.currentCategoryId) {
          const categoryPos = this.categoryList.map(t => t.id).indexOf(this.currentCategoryId);
          this.currentCategory = this.categoryList[categoryPos].id;
        }
      });

      this.invoicesService.getInvoiceProducts(this.currentInvoiceId).subscribe(data => {
        const invoiceProducts = data.results;
        invoiceProducts.map( i => {
          if (this.invoiceStatus !== 'NEW') { i['readonly'] = true; }
          i['unitprice'] = i.unitPrice;
          i['discountvalue'] = i.discount.value;
          return i;
        });
        this.productDetails = {
          products: invoiceProducts,
          status: this.invoiceStatus
        };
      });

      this.saveInvoiceData = res.data;
      // change contact id to number
      this.saveInvoiceData.contactId = res.data.contactId ? res.data.contactId : undefined;

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
      this.totalamountdue = res.data.total;
      this.currentClassId = res.data.classificationId;
      this.currentCategoryId = res.data.categoryId;
      this.currentTermId = res.data.termId;
      this.emailAddresses = res.data.emails;
      this.shippingAddress = res.data.shippingAddress;
      this.depositsAmount = res.data.deposit;
      this.invoiceNumber = res.data.number;
      this.deliveryStatus = res.data.deliveryStatus;
      if (res.data.projectId) {
        this.projectsService.getIndividualProject(res.data.projectId).subscribe(project => {
          this.projectName = project.data.name;
        });
      }

      if (res.data.changeLogid) {
        this.projectsService.getIndividualProjectChangeLog(res.data.projectId, res.data.changeLogId).subscribe(changeLog => {
          this.changeLogName = changeLog.data.title;
        });
      }
    });

    this.saveInvoiceData = new InvoiceModel();
    this.createdDate = new Date().toJSON();
    this.dueDate = new Date().toJSON();

    this.projectsService.getProjectsList().subscribe(res => {
      this.projects = res.results.map(project => project.id);
    });
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
    this.filterService.saveClicked.next(false);
    this.filterService.saveClicked.subscribe(data => {
      if (data) {
        this.saveInvoice();
      }
    });
    this.filterService.deleteClicked.next(false);
    this.filterService.deleteClicked.subscribe(data => {
      if (data) {
        this.deleteService();
      }
    });
  }

  getContactAddress(list, id) {

    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[pos] !== undefined ? list[pos].shippingAddress : '';
  }

  getCustomerName(list, id) {
    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[pos] !== undefined ? list[pos].name : '';
  }

  onCustomerSelected(user) {
  }

  onEnter() {
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
    this.saveInvoiceData['termId'] = event;
  }

  onDepositChange(event) {
    this.saveInvoiceData.deposit = event;
  }

  getShippingAddress(event) {
    this.saveInvoiceData.shippingAddress = event.data;
  }

  onChangeProject(event) {
    this.saveInvoiceData.projectId = event;
    this.projectsService.getProjectChangeLogs(event).subscribe(res => {
      this.changeLogNumbers = res.results;
      console.log('changeLog numbers:', this.changeLogNumbers);
    });
  }

  onChooseChangeLog(event) {
    this.saveInvoiceData.changeLog = event.target.value;
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
      this.invoicesService.sendEmail(this.currentInvoiceId).subscribe();
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

  getContactName(contact) {
    if (contact.type === 'PERSON') {
      contact.name = contact.person.firstName + ' ' + contact.person.lastName;
    } else {
      contact.name = contact.business.name;
    }
    return contact.name;
  }

  deleteService() {
    this.invoicesService.deleteIndividualInvoice(this.currentInvoiceId).subscribe(res => {
      this.router.navigate(['./sales/invoices']);
    });
  }

  onSelectCustomer(event) {
    if (event) {
      const selectedCustomerId = event.originalObject.id;
      this.selectedContact = this.contactList.filter(c => c.id === selectedCustomerId)[0];
      if (this.switchIconShipping) {
        this.address = this.selectedContact.shippingAddress.address;
        this.country = this.selectedContact.shippingAddress.country;
        this.city = this.selectedContact.shippingAddress.city;
        this.province = this.selectedContact.shippingAddress.province;
        this.postalCode = this.selectedContact.shippingAddress.postalCode;
      }
    }
  }

  clickIconShipping() {
    this.switchIconShipping = !this.switchIconShipping;
    if (this.switchIconShipping) {
      this.address = this.selectedContact.shippingAddress.address;
      this.country = this.selectedContact.shippingAddress.country;
      this.city = this.selectedContact.shippingAddress.city;
      this.province = this.selectedContact.shippingAddress.province;
      this.postalCode = this.selectedContact.shippingAddress.postalCode;
    } else {
      this.address = '';
      this.country = '';
      this.city = '';
      this.province = '';
      this.postalCode = '';
    }
  }

  selectDueDate(event) {
    this.saveInvoiceData.dueDate = moment(event).format('YYYY-MM-DD');
  }

  deliverProducts() {

  }

  updatingInvoice() {

  }



  ngOnDestroy() {
    this.commonService.showAlertModal.next(false);
  }
}
