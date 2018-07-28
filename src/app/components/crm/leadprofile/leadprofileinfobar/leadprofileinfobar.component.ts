import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CrmService } from '../../../../services/crm.service';
import { countries } from '../../../../../assets/json/countries';
import { provinces } from '../../../../../assets/json/provinces';
import { CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'app-leadprofileinfobar',
  templateUrl: './leadprofileinfobar.component.html',
  styleUrls: [
    './leadprofileinfobar.component.css'
  ],
  entryComponents: [
  ]
})
export class LeadProfileInfoBarComponent implements OnInit {

  @Input() userInfo;
  @Input() currentLead;
  @Output() changedUserInfo = new EventEmitter;
  showModal = false;
  eventData: any;
  primaryphone: any;
  name: string;
  data1: any;
  showEditImageModal = false;
  customerNotes: string;
  countriesSource: CompleterData;
  provincesSource: CompleterData;
  provincesBillingSource: CompleterData;

  croppedImage: any = '';
  BASE64_MARKER = ';base64,';
  selectedUncroppedFile: any;
  imageChangedEvent: any;
  selectedProvince: any;
  selectedCountry: any;
  selectedBillingProvince: any;
  selectedBillingCountry: any;
  shippingProvince: any;
  shippingCountry: any;
  billingProvince: any;
  billingCountry: any;
  billingAddressChanged = false;
  shippingAddressChanged = false;
  shippingProvinceChanged = false;
  shippingCountryChanged = false;
  billingProvinceChanged = false;
  billingCountryChanged = false;
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

  constructor(private router: Router, private crmService: CrmService, private completerService: CompleterService ) {

    this.eventData = undefined;
    this.name = 'Angular2';

    this.data1 = {};
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');
    this.provincesBillingSource = completerService.local(provinces, 'name', 'name');
  }

  ngOnInit() {
    // this.shippingCountry = countries.filter(c => c.code === this.userInfo.shippingAddress.country)[0].name;
    // this.shippingProvince = provinces.filter(p => p.country === this.userInfo.shippingAddress.province)[0].name;
    // this.billingCountry = countries.filter(c => c.code === this.userInfo.billingAddress.country)[0].name;
    // this.billingProvince = provinces.filter(p => p.country === this.userInfo.billingAddress.province)[0].name;
    this.shippingCountry = this.userInfo.shippingAddress.country;
    this.shippingProvince = this.userInfo.shippingAddress.province;
    this.billingCountry = this.userInfo.billingAddress.country;
    this.billingProvince = this.userInfo.billingAddress.province;
    console.log('userinfo: ', this.userInfo);
    console.log('userinfo: ', this.userInfo, provinces);
  }

  public onReturnData(data: any) {
    // Do what you want to do
    console.warn(JSON.parse(data));
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedUncroppedFile = event.target.files[0];
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }

  imageLoaded() {

  }

  cancelCrop() {
    this.showEditImageModal = false;
  }

  // dataURLtoFile(dataurl, filename) {
  //   const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1];
  //   const bstr = window.atob(arr[1]);
  //   let n = bstr.length;
  //   const u8arr = new Uint8Array(n);
  //   while (n--) {
  //       u8arr[n] = bstr.charCodeAt(n);
  //   }
  //   return new File([u8arr], filename, {type: mime});
  // }

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

    this.crmService.uploadLeadProfileImage(this.currentLead.id, uploadData).subscribe(res => {
      console.log('imga result: ', res);
      // this.userInfo.profileLink = res.data.fulfillmentValue.pictureURI;
      this.changedUserInfo.emit({'data': this.userInfo});
    });
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

  showConfirmModal(event) {
    // if (this.eventData) { return false; }
    // if (event.target.value.trim() !== this.userInfo[event.target.id]) {
    //   if (this.phoneNumberChanged) {
    //     if (!this.phoneNumberValidation(this.userInfo.primaryphone)) {
    //       this.invalidPrimaryPhone = true;
    //       return false;
    //     } else {
    //       this.invalidPrimaryPhone = false;
    //       this.showModal = true;
    //       this.eventData = event;
    //     }
    //     if (!this.phoneNumberValidation(this.userInfo.mobilephone)) {
    //       this.invalidSecondaryPhone = true;
    //       return false;
    //     } else {
    //       this.invalidSecondaryPhone = false;
    //       this.showModal = true;
    //       this.eventData = event;
    //     }
    //   } else {
    //     this.showModal = true;
    //     this.eventData = event;
    //   }
    //  } else {
    //    this.showModal = false;
    // }
  }

  showConfirmShippingAddressModal(event) {
    // if (this.eventData) { return false; }
    // if (event.target.value.trim() !== this.userInfo.shippingAddress[event.target.id]) {
    //   this.showModal = true;
    //   this.eventData = event;
    //   this.shippingAddressChanged = true;
    //  } else {
    //    this.showModal = false;
    // }
  }

  showConfirmBillingAddressModal(event) {
    // console.log('event data: ', event, this.userInfo);
    // if (this.eventData) { return false; }
    // if (event.target.value.trim() !== this.userInfo.billingAddress[event.target.id]) {
    //   this.showModal = true;
    //   this.eventData = event;
    //   this.billingAddressChanged = true;
    //  } else {
    //    this.showModal = false;
    // }
  }

  checkEmailValidation(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
  }

  confirmChange() {
    console.log('phone : ', this.userInfo, this.phoneNumberValidation(this.userInfo.primaryPhone));
    if (!this.phoneNumberValidation(this.userInfo.primaryphone)) {

      this.invalidPrimaryPhone = true;
    } else {
      this.invalidPrimaryPhone = false;
    }
    if (!this.phoneNumberValidation(this.userInfo.mobilephone)) {
      this.invalidSecondaryPhone = true;
    } else {
      this.invalidSecondaryPhone = false;
    }
    if (this.billingAddressChanged) {
      this.userInfo.billingAddress[this.eventData.target.id] = this.eventData.target.value;
      this.billingAddressChanged = false;
    } else if (this.shippingAddressChanged) {
      this.userInfo.shippingAddress[this.eventData.target.id] = this.eventData.target.value;
      this.shippingAddressChanged = false;
    } else if (this.shippingProvinceChanged) {
      this.userInfo.shippingAddress.province = this.selectedProvince;
      this.shippingProvinceChanged = false;
    } else if (this.shippingCountryChanged) {
      this.userInfo.shippingAddress.country = this.selectedCountry;
      this.shippingProvinceChanged = false;
    } else if (this.billingProvinceChanged) {
      this.userInfo.billingAddress.province = this.selectedBillingProvince;
      this.billingProvinceChanged = false;
    } else if (this.shippingAddressChanged) {
      this.userInfo.billingAddress.country = this.selectedBillingCountry;
      this.billingCountryChanged = false;
    } else {
      this.userInfo[this.eventData.target.id] = this.eventData.target.value;
    }
    this.eventData = undefined;
    this.changedUserInfo.emit({'data': this.userInfo});
  }

  // cancelChange() {
  //   if (this.billingAddressChanged) {
  //     this.eventData.target.value = this.userInfo.billingAddress[this.eventData.target.id];
  //     this.billingAddressChanged = false;
  //   } else if (this.shippingAddressChanged) {
  //     this.eventData.target.value = this.userInfo.shippingAddress[this.eventData.target.id];
  //     this.shippingAddressChanged = false;
  //   } else if (this.shippingProvinceChanged) {
  //     this.selectedProvince = this.userInfo.shippingAddress.province;
  //     this.shippingProvinceChanged = false;
  //   } else if (this.shippingCountryChanged) {
  //     this.selectedCountry = this.userInfo.shippingAddress.country;
  //     this.shippingProvinceChanged = false;
  //   } else if (this.billingProvinceChanged) {
  //     this.selectedBillingProvince = this.userInfo.billingAddress.province;
  //     this.billingProvinceChanged = false;
  //   } else if (this.shippingAddressChanged) {
  //     this.selectedBillingCountry = this.userInfo.billingAddress.country;
  //     this.billingCountryChanged = false;
  //   } else {
  //     this.eventData.target.value = this.userInfo[this.eventData.target.id];
  //   }
  //   this.eventData = undefined;
  // }

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
    this.invalidSecondaryPhone = !this.phoneNumberValidation(this.userInfo.phoneNumbers.secondary);
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
        note: this.userInfo.note ? this.userInfo.note : ''
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
        note: this.userInfo.note ? this.userInfo.note : ''
      };
    }
    this.crmService.updateIndividualLead(this.userInfo.id, savingData).subscribe(res => {
      console.log('lead update: ', res);
    });
  }
}

