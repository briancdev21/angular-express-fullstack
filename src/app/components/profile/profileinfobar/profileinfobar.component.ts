import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../multikeywordselect/multikeywordselect.component';
import { CrmService } from '../../../services/crm.service';
import { countries } from '../../../../assets/json/countries';
import { provinces } from '../../../../assets/json/provinces';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-profileinfobar',
  templateUrl: './profileinfobar.component.html',
  styleUrls: [
    './profileinfobar.component.css'
  ],
  entryComponents: [
    MultiKeywordSelectComponent,
  ]
})
export class ProfileInfoBarComponent implements OnInit {

  @Input() userInfo;
  @Input() currentContact;
  @Output() changedUserInfo = new EventEmitter;
  showModal = false;
  eventData: any;
  primaryphone: any;
  name: string;
  data1: any;
  showEditImageModal = false;
  customerNotes: string;

  croppedImage: any = '';
  BASE64_MARKER = ';base64,';
  selectedUncroppedFile: any;
  imageChangedEvent: any;

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
  invalidPrimaryPhone = false;
  invalidSecondaryPhone = false;
  phoneNumberChanged = false;

  invalidBusinessName = false;
  invalidFirstName = false;
  invalidLastName = false;
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedUncroppedFile = event.target.files[0];
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }

  imageLoaded() {

  }
  constructor(private router: Router, private crmService: CrmService,  private completerService: CompleterService ) {

    this.eventData = undefined;
    this.name = 'Angular2';

    this.data1 = {};
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');
    this.provincesBillingSource = completerService.local(provinces, 'name', 'name');
  }

  ngOnInit() {
    this.shippingCountry = this.userInfo.shippingAddress.country;
    this.shippingProvince = this.userInfo.shippingAddress.province;
    this.billingCountry = this.userInfo.billingAddress.country;
    this.billingProvince = this.userInfo.billingAddress.province;
    console.log('userinfo: ', this.userInfo);
  }

  public onReturnData(data: any) {
    // Do what you want to do
    console.warn(JSON.parse(data));
  }

  cancelCrop() {
    this.showEditImageModal = false;
  }

  convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  saveCrop() {
    this.showEditImageModal = false;
    this.userInfo.profileLink = this.croppedImage;

    const uploadData = new FormData();
    uploadData.append('leadPicture', this.selectedUncroppedFile, this.selectedUncroppedFile.name);

    // const binary = this.convertDataURIToBinary(this.croppedImage);
    // console.log('binary', binary);

    this.crmService.uploadContactProfileImage(this.currentContact.id, uploadData).subscribe(res => {
      console.log('imga result: ', res);
      // this.userInfo.profileLink = res.data.fulfillmentValue.pictureURI;
      this.updateProfile();
    });
  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }

  showConfirmModal(event) {
    // if (this.eventData) { return false; }
    // if (event.target.value.trim() !== this.userInfo[event.target.id]) {
    //   this.showModal = true;
    //   this.eventData = event;
    //  } else {
    //    this.showModal = false;
    // }
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  phoneNumberValidation(number) {
    const re =  /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    return re.test(number);
  }

  onEnter() {}

  onSelectShippingProvince(event) {
    console.log('province select: ', event);
    this.shippingProvince = event.originalObject.name;
    this.userInfo.shippingAddress.province = event.originalObject.short;
    // const provincesSourceList = provinces.filter(p => p.country === this.selectedCountry);
    // this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
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

  confirmChange() {
    // this.userInfo[this.eventData.target.id] = this.eventData.target.value;
    // this.eventData = undefined;
    // this.changedUserInfo.emit({'data': this.userInfo});
  }

  cancelChange() {
    this.eventData.target.value = this.userInfo[this.eventData.target.id];
    this.eventData = undefined;
  }

  changeImage() {
    this.showEditImageModal = true;
  }

  loadImageFailed () {
  }

  updateProfile() {
    this.invalidBusinessName = false;
    this.invalidFirstName = false;
    this.invalidLastName = false;
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
    this.invalidEmail = !this.checkEmailValidation(this.userInfo.email);
    this.invalidPrimaryPhone = !this.phoneNumberValidation(this.userInfo.phoneNumbers.primary);
    if (this.userInfo.phoneNumbers.secondary) {
      this.invalidSecondaryPhone = !this.phoneNumberValidation(this.userInfo.phoneNumbers.secondary);
    }
    console.log('user info: ', this.userInfo);
    if (this.userInfo.type === 'PERSON') {
      if (this.userInfo.person.firstName !== '' && this.userInfo.person.lastName !== '' && this.userInfo.email !== '' && !this.invalidEmail
        && this.userInfo.shippingAddress.address && this.userInfo.shippingAddress.city && this.userInfo.shippingAddress.postalCode &&
        !this.invalidPrimaryPhone && this.userInfo.phoneNumbers.primary && !this.invalidSecondaryPhone && this.billingProvince !== '' &&
        this.billingCountry !== '') {
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
        if (this.userInfo.person.firstName === undefined || this.userInfo.person.firstName === '') {
          this.invalidFirstName = true;
        }
        if (this.userInfo.person.lastName === '') {
          console.log('check again agai: ', this.userInfo, this.shippingProvince);
          this.invalidLastName = true;
        }
        if (!this.userInfo.email) {
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
        if (!this.userInfo.phoneNumbers.primary) {
          this.invalidPrimaryPhone = true;
        }
      }
    } else {
      if (this.userInfo.business.name && this.userInfo.email && !this.invalidEmail &&
        this.userInfo.shippingAddress.address && this.userInfo.shippingAddress.city && this.userInfo.shippingAddress.postalCode &&
        !this.invalidPrimaryPhone && this.userInfo.phoneNumbers.primary && !this.invalidSecondaryPhone) {
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
        if (this.userInfo.business.name === undefined || this.userInfo.business.name === '') {
          this.invalidBusinessName = true;
        }
        if (!this.userInfo.email) {
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
        if (!this.userInfo.phoneNumbers.primary) {
          this.invalidPrimaryPhone = true;
        }
      }
    }
  }

  saveData() {
    let savingData;
    if (this.userInfo.type === 'PERSON') {
      savingData = {
        type: this.userInfo.type,
        currencyId: this.userInfo.currencyId,
        termId: this.userInfo.termId,
        pricingCategoryId: this.userInfo.pricingCategoryId,
        shippingAddress: this.userInfo.shippingAddress,
        email: this.userInfo.email,
        phoneNumbers: this.userInfo.phoneNumbers,
        followers: this.userInfo.followers.map(f => f.username),
        person: {
          firstName: this.userInfo.person.firstName,
          lastName: this.userInfo.person.lastName,
        },
        keywordIds: this.userInfo.keywordIds ? this.userInfo.keywordIds : [],
        note: this.userInfo.note ? this.userInfo.note : '',
        billingAddress: this.userInfo.billingAddress
      };
    } else {
      savingData = {
        type: this.userInfo.type,
        currencyId: this.userInfo.currencyId,
        termId: this.userInfo.termId,
        pricingCategoryId: this.userInfo.pricingCategoryId,
        shippingAddress: this.userInfo.shippingAddress,
        email: this.userInfo.email,
        phoneNumbers: this.userInfo.phoneNumbers,
        followers: this.userInfo.followers.map(f => f.username),
        business: {
          name: this.userInfo.business.name
        },
        keywordIds: this.userInfo.keywordIds ? this.userInfo.keywordIds : [],
        note: this.userInfo.note ? this.userInfo.note : '',
        billingAddress: this.userInfo.billingAddress
      };
    }
    if (!savingData.phoneNumbers.secondary) {
      delete(savingData.phoneNumbers.secondary);
    }
    this.crmService.updateIndividualContact(this.userInfo.id, savingData).subscribe(res => {
      console.log('contact update: ', res);
    });
  }
}

