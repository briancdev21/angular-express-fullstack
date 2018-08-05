import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../../../profile/multikeywordselect/multikeywordselect.component';
import { SharedService } from '../../../../services/shared.service';
import { CrmService } from '../../../../services/crm.service';
import { countries } from '../../../../../assets/json/countries';
import { provinces } from '../../../../../assets/json/provinces';
import { CompleterService, CompleterData } from 'ng2-completer';
@Component({
  selector: 'app-supplierprofileinfobar',
  templateUrl: './supplierprofileinfobar.component.html',
  styleUrls: [
    './supplierprofileinfobar.component.css'
  ],
  entryComponents: [
    MultiKeywordSelectComponent,
  ]
})
export class SupplierProfileInfoBarComponent implements OnInit {

  @Input() userInfo;
  showModal = false;
  eventData: any;
  primaryphone: any;
  name: string;
  data1: any;
  showEditImageModal = false;
  contacts = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  countriesSource: CompleterData;
  provincesSource: CompleterData;
  provincesBillingSource: CompleterData;

  selectedProvince: any;
  selectedCountry: any;
  selectedBillingProvince: any;
  selectedBillingCountry: any;
  shippingProvince: any;
  shippingCountry: any;
  billingProvince: any;
  billingCountry: any;

  invalidContactName = false;
  invalidShippingAddress = false;
  invalidShippingCity = false;
  invalidShippingPostalCode = false;
  invalidShippingCountry = false;
  invalidShippingProvince = false;
  invalidBillingAddress = false;
  invalidBillingCity = false;
  invalidBillingProvince = false;
  invalidBillingCountry = false;
  invalidBillingPostalCode = false;
  invalidEmail = false;
  invalidPhoneNumber = false;
  invalidName = false;
  invalidPayableEmail = false;
  // croppedImage = this.userInfo.profileLink;

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }

  imageLoaded() {

  }
  constructor(private router: Router, private sharedService: SharedService, private crmService: CrmService,
    private completerService: CompleterService) {

    this.eventData = undefined;
    this.name = 'Angular2';

    this.data1 = {};
    this.sharedService.getContacts().subscribe(contacts => {
      contacts = this.addContactName(contacts);
      this.contacts = contacts;
    });
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');
    this.provincesBillingSource = completerService.local(provinces, 'name', 'name');
  }

  ngOnInit() {
    this.shippingCountry = this.userInfo.shippingAddress.country;
    this.shippingProvince = this.userInfo.shippingAddress.province;
    this.billingCountry = this.userInfo.billingAddress.country;
    this.billingProvince = this.userInfo.billingAddress.province;
    console.log('supplier userinfo: ', this.userInfo);
  }

  public onReturnData(data: any) {
    // Do what you want to do
    console.warn(JSON.parse(data));
  }

  cancelCrop() {
    this.showEditImageModal = false;
  }

  saveCrop() {
    this.showEditImageModal = false;
    this.userInfo.profileLink = this.croppedImage;
  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }

  phoneNumberValidation(number) {
    const re =  /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    return re.test(number);
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSelectShippingProvince(event) {
    console.log('province select: ', event);
    this.shippingProvince = event.originalObject.name;
    this.userInfo.shippingAddress.province = event.originalObject.short;
    const selectedCountryData = countries.filter(c => c.code === event.originalObject.country)[0];
    console.log('country select: ', selectedCountryData);
    this.shippingCountry = selectedCountryData.name;
    this.userInfo.shippingAddress.country = selectedCountryData.code;
    this.updateProfile();
  }

  onSelectShippingCountry(event) {
    console.log('country select: ', event);
    this.shippingCountry = event.originalObject.name;
    this.userInfo.shippingAddress.country = event.originalObject.code;
    // this.shippingCountry = countries.filter(c => c.code === this.selectedCountry)[0].name;
    const provincesSourceList = provinces.filter(p => p.country === event.originalObject.code);
    this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
    this.shippingProvince = '';
    this.userInfo.shippingAddress.province = '';
    this.updateProfile();
  }

  onSelectBillingProvince(event) {
    this.billingProvince = event.originalObject.name;
    this.userInfo.billingAddress.province = event.originalObject.short;
    // const provincesSourceList = provinces.filter(p => p.country === this.selectedCountry);
    // this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
    const selectedCountryData = countries.filter(c => c.code === event.originalObject.country)[0];
    console.log('country select: ', selectedCountryData);
    this.billingCountry = selectedCountryData.name;
    this.userInfo.billingAddress.country = selectedCountryData.code;
    this.updateProfile();
  }

  onSelectBillingCountry(event) {
    console.log('country select: ', event);
    this.billingCountry = event.originalObject.name;
    this.userInfo.billingAddress.country = event.originalObject.code;
    // this.shippingCountry = countries.filter(c => c.code === this.selectedCountry)[0].name;
    const provincesSourceList = provinces.filter(p => p.country === event.originalObject.code);
    this.provincesBillingSource = this.completerService.local(provincesSourceList, 'name', 'name');
    this.billingProvince = '';
    this.userInfo.billingAddress.province = '';
    this.updateProfile();
  }

  onKeywordsChanged(event) {
    const keywordIds = event.map( k => k.id);
    this.userInfo.keywordIds = keywordIds;
    // this.changedUserInfo.emit({'data': this.userInfo});
    this.updateProfile();
  }

  changeImage() {
    this.showEditImageModal = true;
  }

  getKeywords(event) {
    console.log('keyWords: ', event);
    this.userInfo.keywordIds = event.map(e => e.id);
  }

  loadImageFailed() {
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

  updateProfile() {
    this.invalidContactName = false;
    this.invalidContactName = false;
    this.invalidShippingAddress = false;
    this.invalidShippingCity = false;
    this.invalidShippingPostalCode = false;
    this.invalidShippingCountry = false;
    this.invalidShippingProvince = false;
    this.invalidBillingAddress = false;
    this.invalidBillingCity = false;
    this.invalidBillingProvince = false;
    this.invalidBillingCountry = false;
    this.invalidBillingPostalCode = false;
    this.invalidPayableEmail = false;
    this.invalidEmail = !this.checkEmailValidation(this.userInfo.contactEmail);
    this.invalidPhoneNumber = !this.phoneNumberValidation(this.userInfo.phoneNumber);
    if (this.userInfo.accountPayableEmail) {
      this.invalidPayableEmail = !this.checkEmailValidation(this.userInfo.accountPayableEmail);
    }
    console.log('user info: ', this.userInfo);
    if (this.userInfo.contactName !== '' && this.userInfo.contactEmail !== '' && !this.invalidEmail && this.userInfo.name &&
      this.userInfo.shippingAddress.address && this.userInfo.shippingAddress.city && this.userInfo.shippingAddress.postalCode &&
      !this.invalidPhoneNumber && this.userInfo.phoneNumber && this.billingProvince !== '' && this.billingCountry !== '' &&
      !this.invalidPayableEmail) {
        if (this.userInfo.billingAddress) {
          if (this.userInfo.billingAddress.address && this.userInfo.billingAddress.city && this.userInfo.billingAddress.postalCode) {
            this.saveData();
          } else {
            if (this.userInfo.billingAddress.address === ''  || this.userInfo.billingAddress.address === undefined) {
              this.invalidBillingAddress = true;
            }
            if (this.userInfo.billingAddress.city === ''  || this.userInfo.billingAddress.city === undefined) {
              this.invalidBillingCity = true;
            }
            if (this.userInfo.billingAddress.postalCode === ''  || this.userInfo.billingAddress.postalCode === undefined) {
              this.invalidBillingPostalCode = true;
            }
            if (this.billingProvince === ''  || this.billingProvince === undefined) {
              this.invalidBillingProvince = true;
            }
            if (this.billingCountry === ''  || this.billingCountry === undefined) {
              this.invalidBillingCountry = true;
            }
          }
        } else {
          this.saveData();
        }
    } else {
      console.log('check again: ', this.userInfo);
      if (this.userInfo.contactName === undefined || this.userInfo.contactName === '') {
        this.invalidContactName = true;
      }
      if (this.userInfo.name === '') {
        console.log('check again agai: ', this.userInfo, this.shippingProvince);
        this.invalidName = true;
      }
      if (!this.userInfo.contactEmail) {
        this.invalidEmail = true;
      }
      if (this.userInfo.shippingAddress.address === ''  || this.userInfo.shippingAddress.address === undefined) {
        this.invalidShippingAddress = true;
      }
      if (this.userInfo.shippingAddress.city === ''  || this.userInfo.shippingAddress.city === undefined) {
        this.invalidShippingCity = true;
      }
      if (this.userInfo.shippingAddress.postalCode === ''  || this.userInfo.shippingAddress.postalCode === undefined) {
        this.invalidShippingPostalCode = true;
      }
      if (this.shippingProvince === ''  || this.shippingProvince === undefined) {
        this.invalidShippingProvince = true;
      }
      if (this.billingCountry === ''  || this.billingCountry === undefined) {
        this.invalidShippingCountry = true;
      }
      if (!this.userInfo.phoneNumber) {
        this.invalidPhoneNumber = true;
      }
    }
  }

  saveData() {
    let savingData;
    savingData = {
      currencyId: this.userInfo.currencyId,
      termId: this.userInfo.termId,
      shippingAddress: this.userInfo.shippingAddress,
      contactEmail: this.userInfo.contactEmail,
      phoneNumber: this.userInfo.phoneNumber,
      name: this.userInfo.name,
      contactName: this.userInfo.contactName,
      keywordIds: this.userInfo.keywordIds ? this.userInfo.keywordIds : [],
      note: this.userInfo.note ? this.userInfo.note : '',
      billingAddress: this.userInfo.billingAddress,
      accountPayableEmail: this.userInfo.accountPayableEmail
    };

    Object.keys(savingData).forEach((key) => (savingData[key] == null) && delete savingData[key]);
    console.log('saving Data: ', savingData);
    this.sharedService.updateSupplier(this.userInfo.id, savingData).subscribe(res => {
      console.log('supplier update: ', res);
    });
  }
}

