import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductDetailInfo } from '../../../../../models/ProductDetailInfo.model';
import { Ng2TimelineComponent } from '../../../../profile/ng2-timeline/ng2timeline.component';
import { MultiKeywordSelectComponent } from '../../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../../../../../services/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from '../../filter.service';
import { EstimatesService } from '../../../../../services/estimates.service';
import * as moment from 'moment';
import { ProjectsService } from '../../../../../services/projects.service';
import { CommonService } from '../../../../common/common.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { countries } from '../../../../../../assets/json/countries';
import { provinces } from '../../../../../../assets/json/provinces';
import { CrmService } from '../../../../../services/crm.service';


@Component({
  selector: 'app-estimateprofilebody',
  templateUrl: './estimateprofilebody.component.html',
  styleUrls: ['./estimateprofilebody.component.css']
})
export class EstimateProfileBodyComponent implements OnInit, OnDestroy {
  // @Input() createdEstimate;

  @Input() set createdEstimate(_createdEstimate) {
  }

  invoice_mock: any;
  userList = [];
  classList = [];
  categoryList = [];
  projects = [];
  changeLogNumbers = ['Number 1', 'Number 2', 'Number 3' ];
  labelText = 'Use customer address';
  title = 'Terms of the Estimate';
  dueDateTitle = 'Expiry Date';
  modalContent = 'You can only generate Estimates for WON proposals.';
  estimateNumberTitle = 'Estimate #';
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
  termsOfEstimate = '';
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

  currentEstimateId: string;
  saveEstimateData: any;
  currentOwner: string;
  estimateStatus = 'NEW';
  alertModalContent = 'You cannot update a PAID or LOST Estimate';

  contactsSource: CompleterData;
  currentEstimate: any;
  customerName: any;
  countriesSource: CompleterData;
  provincesSource: CompleterData;
  projectName: any;
  changeLogName: any;
  address: any;
  city: any;
  province: any;
  postalCode: any;
  country: any;
  invalidAddress = false;
  invalidCity = false;
  invalidProvince = false;
  invalidCountry = false;
  invalidPostalCode = false;
  switchIconShipping = true;
  invalidEmail = false;
  invalidName = false;
  selectedContact: any;
  estimateNumber = '';
  today = new Date();
  deliveryStatus = 'NOT_DELIVERED';
  selectedProvince: any;
  selectedCountry: any;
  invalidCloseButton = true;

  constructor(private sharedService: SharedService, private invoicesService: EstimatesService, private router: Router,
    private route: ActivatedRoute, private filterService: FilterService, private projectsService: ProjectsService,
    private commonService: CommonService, private completerService: CompleterService, private estimatesService: EstimatesService,
    private crmService: CrmService) {

    this.currentEstimateId = this.route.snapshot.paramMap.get('id');
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');

    this.estimatesService.getIndividualEstimate(this.currentEstimateId).subscribe(res => {
      console.log('current estimate', res);
      this.currentEstimate = res.data;
      this.estimateStatus = res.data.status;

      if ( this.estimateStatus === 'WON' || this.estimateStatus === 'LOST') {
        this.commonService.showAlertModal.next(true);
      }

      // Estimate can have LeadId or ContactId
      if (this.currentEstimate.leadId) {
        this.crmService.getMulipleLeads(this.currentEstimate.leadId).subscribe(lead => {
          this.selectedContact = lead[0];
          this.customerName = this.getContactName(this.selectedContact);
          this.getAddresses();
        });
      } else {
        this.sharedService.getMulipleContacts(this.currentEstimate.contactId).subscribe(contact => {
          this.selectedContact = contact[0];
          this.customerName = this.getContactName(this.selectedContact);
          this.getAddresses();
        });
      }

      this.sharedService.getContacts()
      .subscribe(data => {
        data = this.addContactName(data);
        this.contactList = data;
        this.contactsSource = this.completerService.local(this.contactList, 'name', 'name');
      });

      this.sharedService.getClassifications().subscribe(data => {
        this.classList = data.results;
        if (this.currentClassId) {
          const classPos = this.classList.map(t => t.id).indexOf(this.currentClassId);
          this.currentClass = this.classList[classPos].id;
        }
      });

      this.sharedService.getInvoiceCategories().subscribe(data => {
        this.categoryList = data.results;
        if (this.currentCategoryId) {
          const categoryPos = this.categoryList.map(t => t.id).indexOf(this.currentCategoryId);
          this.currentCategory = this.categoryList[categoryPos].id;
        }
      });

      this.estimatesService.getEstimatesProducts(this.currentEstimateId).subscribe(data => {
        console.log('estimates productsS:', data.results);
        const estimateProducts = data.results;
        estimateProducts.map(i => {
          i['unitprice'] = i.unitPrice;
          i['discountvalue'] = i.discount.value;
          i['readonly'] = true;
          return i;
        });
        this.productDetails = {
          products: estimateProducts,
          status: this.estimateStatus
        };
      });

      this.saveEstimateData = res.data;
      // change contact id to number
      // tslint:disable-next-line:max-line-length
      this.saveEstimateData.contactId = res.data.contactId ? res.data.contactId : undefined;
      this.discountType = res.data.discount.unit;
      this.discountAmount = res.data.discount.value;
      this.internalMemo = res.data.internalNote;
      this.noteToSupplier = res.data.customerNote;
      this.termsOfEstimate = res.data.terms;
      this.createdDate = moment(res.data.createdAt).format('YYYY-MM-DD');
      this.dueDate = moment(res.data.expiryDate).format('YYYY-MM-DD');
      this.subtotalproducts = res.data.productSubTotal;
      this.subtotalServices = res.data.serviceSubTotal;
      this.taxes = res.data.taxTotal;
      this.totalamountdue = res.data.total;
      this.currentClassId = res.data.classificationId;
      this.currentCategoryId = res.data.categoryId;
      this.emailAddresses = res.data.emails;
      this.shippingAddress = res.data.shippingAddress;
      this.depositsAmount = res.data.deposit;
      this.estimateNumber = res.data.number;
      this.deliveryStatus = res.data.deliveryStatus;
      this.emails = res.data.emails;
      this.selectedProvince = res.data.shippingAddress.province;
      this.selectedCountry = res.data.shippingAddress.country;
      if (res.data.receivedPayment === res.data.total) {
        this.invalidCloseButton = false;
      }

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

    this.projectsService.getProjectsList().subscribe(res => {
      this.projects = res.results.map(project => project.id);
    });
  }

  ngOnInit() {

    this.in_id = 'ES - ' + this.currentEstimateId;

    this.filterService.chargeFeeData.subscribe(data => {
      if (data.lateFee) {
        this.saveEstimateData.chargeLateFee = data.lateFee;
        this.saveEstimateData.lateFee.value = data.value;
        this.saveEstimateData.lateFee.unit = data.unit;
      }
    });
    this.filterService.saveClicked.next(false);
    this.filterService.saveClicked.subscribe(data => {
      if (data) {
        this.updatingEstimate();
      }
    });
    this.filterService.deleteClicked.next(false);
    this.filterService.deleteClicked.subscribe(data => {
      if (data) {
        this.deleteService();
      }
    });

    this.filterService.convertClicked.subscribe(data => {
      if (data) {
        if (this.currentEstimate.status !== 'WON') {
          this.alertModalContent = '`You can only generate Invoices for WON proposals.';
          this.commonService.showAlertModal.next(true);
        } else {
          this.confirmConvert();
        }
      }
    });

    this.filterService.saveClicked.next(false);
    this.filterService.saveClicked.subscribe(data => {
      if (data) {
        this.estimatesService.sendEmail(this.currentEstimateId).subscribe(res => {
          console.log('email sent: ', res);
        });
      }
    });
  }

  getAddresses() {
    if (this.switchIconShipping) {
      this.address = this.selectedContact.shippingAddress.address;
      this.country = this.selectedContact.shippingAddress.country;
      this.city = this.selectedContact.shippingAddress.city;
      this.province = this.selectedContact.shippingAddress.province;
      this.postalCode = this.selectedContact.shippingAddress.postalCode;
    } else {
      this.address = this.currentEstimate.shippingAddress.address;
      this.country = this.currentEstimate.shippingAddress.country;
      this.city = this.currentEstimate.shippingAddress.city;
      this.province = this.currentEstimate.shippingAddress.province;
      this.postalCode = this.currentEstimate.shippingAddress.postalCode;
    }
  }

  getContactName(contact) {
    if (contact.type === 'PERSON') {
      contact.name = contact.person.firstName + ' ' + contact.person.lastName;
    } else {
      contact.name = contact.business.name;
    }
    return contact.name;
  }

  getContactAddress(list, id) {

    const idList = list.map( c => c.id);
    const pos = idList.indexOf(id);
    return list[pos].shippingAddress;
  }

  onCustomerSelected(user) {
  }

  onEnter() {
  }

  onSelectUser(selectedIndex: any) {

    const contactIdList = this.contactList.map(c => c.id);
    const pos = contactIdList.indexOf(selectedIndex);
    this.customerAddress = this.contactList[pos].shippingAddress;
    this.saveEstimateData.contactId = selectedIndex;
  }

  onSelectClass(val) {
    this.saveEstimateData.classificationId = val;
  }

  onSelectCategory(val) {
    this.saveEstimateData.categoryId = val;
  }

  changedDueDate(event) {
    this.saveEstimateData.expiryDate = event;
  }

  onChangedMemo(event) {
    this.saveEstimateData.internalNote = event;
  }

  onChangedNote(event) {
    this.saveEstimateData.customerNote = event;
  }

  getMultiEmails(event) {
    this.emails = event;
  }

  onDepositChange(event) {
    this.saveEstimateData.deposit = event;
  }

  getUpdatedShippiingAddress(event) {
    this.saveEstimateData.billingAddress = event.data;
  }

  getShippingAddress(event) {
    this.saveEstimateData.shippingAddress = event.data;
  }

  onPriceChanged() {
    this.updatingEstimate();
  }

  convertEstimate() {
    this.showConvertConfirmModal = true;
    console.log('1111111111');
  }

  confirmConvert() {
    // this.showConvertConfirmModal = false;
    // this.saveEstimateData.startDate = moment().format('YYYY-MM-DD');
    // this.saveEstimateData.termId = 1;
    this.estimatesService.convertEstimateToInvoice(this.currentEstimateId).subscribe(res => {
      console.log('convert: ', res);
      this.router.navigate(['./invoice-profile', {id: res.data.id}]);
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

  deleteService() {
    this.estimatesService.deleteIndividualEstimate(this.currentEstimateId).subscribe( res => {
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
      this.updatingEstimate();
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
    this.updatingEstimate();
  }

  selectDueDate(event) {
    console.log('due date: ', event);
    this.saveEstimateData.dueDate = moment(event.value).format('YYYY-MM-DD');
    this.updatingEstimate();
  }

  onSelectProvince(event) {
    this.selectedProvince = event.originalObject.short;
    // const countriesSourceList =  countries.filter(c => c.code === this.selectedProvince);
    this.selectedCountry = event.originalObject.country;
    this.country = countries.filter(c => c.code === this.selectedCountry)[0].name;
    this.updatingEstimate();
  }

  onSelectCountry(event) {
    console.log('country select: ', event);
    this.selectedCountry = event.originalObject.code;
    const provincesSourceList = provinces.filter(p => p.country === this.selectedCountry);
    this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
    this.updatingEstimate();
  }


  updatingEstimate() {
    this.invalidAddress = false;
    this.invalidCity = false;
    this.invalidProvince = false;
    this.invalidCountry = false;
    this.invalidPostalCode = false;
    this.invalidName = false;

    if (this.estimateStatus === 'WON' || this.estimateStatus === 'LOST' ) {
      this.commonService.showAlertModal.next(true);
    } else {
      if (this.address && this.province && this.city && this.country && this.postalCode && this.selectedContact) {
        const updatingData = {
          'contactId': this.selectedContact.id,
          'leadId': this.selectedContact.id,
          'classificationId': this.currentClassId,
          'categoryId': this.currentCategoryId,
          'emails': this.emails,
          'shippingAddress': {
            'address': this.address,
            'city': this.city,
            'province': this.selectedProvince,
            'postalCode': this.postalCode,
            'country': this.selectedCountry
          },
          'internalNote': this.internalMemo ? this.internalMemo : '',
          'customerNote': this.noteToSupplier ? this.noteToSupplier : '',
          'terms': this.termsOfEstimate ? this.termsOfEstimate : '',
          'discount': {
            'value': this.discountAmount ? this.discountAmount : 0,
            'unit': this.discountType ? this.discountType : 'AMOUNT'
          },
          'deposit': this.depositsAmount ? this.depositsAmount : 0,
          'currencyId': this.currentEstimate.currencyId,
          'pricingCategoryId': this.currentEstimate.pricingCategoryId,
          'status': this.currentEstimate.status,
          'startDate': this.currentEstimate.startDate,
          'acceptOnlinePayment': this.currentEstimate.acceptOnlinePayment,
          'chargeLateFee': this.currentEstimate.chargeLateFee,
          'lateFee': this.currentEstimate.lateFee,
          'reminder': this.currentEstimate.reminder ? this.currentEstimate.reminder : [],
          'billingAddress': this.currentEstimate.billingAddress,
          'receivedPayment': this.currentEstimate.receivedPayment,
          'deliverProducts': this.currentEstimate.deliverProducts,
          'expiryDate': this.saveEstimateData.dueDate ? this.saveEstimateData.dueDate : this.currentEstimate.expiryDate
        };
        Object.keys(updatingData).forEach((key) => (updatingData[key] == null) && delete updatingData[key]);
        if (this.currentEstimate.leadId) {
          delete updatingData['contactId'];
        } else {
          delete updatingData['leadId'];
        }
        this.invoicesService.updateEstimate(this.currentEstimateId, updatingData).subscribe(res => {
          console.log('updated: ', res);
          this.subtotalproducts = res.data.productSubTotal;
          this.subtotalServices = res.data.serviceSubTotal;
          this.totalamountdue = res.data.total;
        });
      } else {
        if (!this.address) {
          this.invalidAddress = true;
        }
        if (!this.city) {
          this.invalidCity = true;
        }
        if (!this.postalCode) {
          this.invalidPostalCode = true;
        }
        if (!this.country) {
          this.invalidCountry = true;
        }
        if (!this.province) {
          this.invalidProvince = true;
        }
        if (!this.customerName) {
          this.invalidName = true;
        }
      }
    }
  }

  ngOnDestroy() {
    this.commonService.showAlertModal.next(false);
  }
}
