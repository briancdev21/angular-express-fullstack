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

  constructor(private router: Router, private crmService: CrmService, private completerService: CompleterService ) {

    this.eventData = undefined;
    this.name = 'Angular2';

    this.data1 = {};
    this.countriesSource = completerService.local(countries, 'name', 'name');
    this.provincesSource = completerService.local(provinces, 'name', 'name');
  }

  ngOnInit() {
    this.shippingCountry = this.userInfo.shippingaddress.country;
    this.shippingProvince = this.userInfo.shippingaddress.province;
    this.billingCountry = this.userInfo.billingaddress.country;
    this.billingProvince = this.userInfo.billingaddress.province;
    console.log('userinfo: ', this.userInfo);
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
    if (this.eventData) { return false; }
    if (event.target.value.trim() !== this.userInfo[event.target.id]) {
      if (this.phoneNumberChanged) {
        if (!this.phoneNumberValidation(this.userInfo.primaryphone)) {
          this.invalidPrimaryPhone = true;
          return false;
        } else {
          this.invalidPrimaryPhone = false;
          this.showModal = true;
          this.eventData = event;
        }
        if (!this.phoneNumberValidation(this.userInfo.mobilephone)) {
          this.invalidSecondaryPhone = true;
          return false;
        } else {
          this.invalidSecondaryPhone = false;
          this.showModal = true;
          this.eventData = event;
        }
      } else {
        this.showModal = true;
        this.eventData = event;
      }
     } else {
       this.showModal = false;
    }
  }

  showConfirmShippingAddressModal(event) {
    if (this.eventData) { return false; }
    if (event.target.value.trim() !== this.userInfo.shippingaddress[event.target.id]) {
      this.showModal = true;
      this.eventData = event;
      this.shippingAddressChanged = true;
     } else {
       this.showModal = false;
    }
  }

  showConfirmBillingAddressModal(event) {
    console.log('event data: ', event, this.userInfo);
    if (this.eventData) { return false; }
    if (event.target.value.trim() !== this.userInfo.billingaddress[event.target.id]) {
      this.showModal = true;
      this.eventData = event;
      this.billingAddressChanged = true;
     } else {
       this.showModal = false;
    }
  }

  onEnter() {}

  onSelectShippingProvince(event) {
    console.log('province select: ', event);
    this.selectedProvince = event.originalObject.short;
    if (this.selectedProvince !== this.userInfo.shippingaddress.province) {
      this.showModal = true;
      this.shippingProvinceChanged = true;
    }
    const provincesSourceList = provinces.filter(p => p.country === this.selectedCountry);
    this.provincesSource = this.completerService.local(provincesSourceList, 'name', 'name');
  }

  onSelectShippingCountry(event) {
    this.selectedCountry = event.originalObject.code;
    if (this.selectedCountry !== this.userInfo.shippingaddress.country) {
      this.showModal = true;
      this.shippingCountryChanged = true;
    }
    this.selectedCountry = event.originalObject.country;
    this.shippingCountry = countries.filter(c => c.code === this.selectedCountry)[0].name;
  }

  onSelectBillingProvince(event) {
    this.selectedBillingProvince = event.originalObject.short;
    if (this.selectedBillingProvince !== this.userInfo.billingaddress.province) {
      this.showModal = true;
      this.billingProvinceChanged = true;
    }
    const provincesSourceList = provinces.filter(p => p.country === this.selectedBillingCountry);
    this.provincesBillingSource = this.completerService.local(provincesSourceList, 'name', 'name');
  }

  onSelectBillingCountry(event) {
    this.selectedBillingCountry = event.originalObject.code;
    if (this.selectedBillingCountry !== this.userInfo.billiingaddress.country) {
      this.showModal = true;
      this.billingCountryChanged = true;
    }
    this.selectedBillingCountry = event.originalObject.country;
    this.billingCountry = countries.filter(c => c.code === this.selectedBillingCountry)[0].name;
  }

  onKeywordsChanged(event) {
    const keywordIds = event.map( k => k.id);
    this.userInfo.keywordIds = keywordIds;
    this.changedUserInfo.emit({'data': this.userInfo});
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
      this.userInfo.billingaddress[this.eventData.target.id] = this.eventData.target.value;
      this.billingAddressChanged = false;
    } else if (this.shippingAddressChanged) {
      this.userInfo.shippingaddress[this.eventData.target.id] = this.eventData.target.value;
      this.shippingAddressChanged = false;
    } else if (this.shippingProvinceChanged) {
      this.userInfo.shippingaddress.province = this.selectedProvince;
      this.shippingProvinceChanged = false;
    } else if (this.shippingCountryChanged) {
      this.userInfo.shippingaddress.country = this.selectedCountry;
      this.shippingProvinceChanged = false;
    } else if (this.billingProvinceChanged) {
      this.userInfo.billingaddress.province = this.selectedBillingProvince;
      this.billingProvinceChanged = false;
    } else if (this.shippingAddressChanged) {
      this.userInfo.billingaddress.country = this.selectedBillingCountry;
      this.billingCountryChanged = false;
    } else {
      this.userInfo[this.eventData.target.id] = this.eventData.target.value;
    }
    this.eventData = undefined;
    this.changedUserInfo.emit({'data': this.userInfo});
  }

  cancelChange() {
    if (this.billingAddressChanged) {
      this.eventData.target.value = this.userInfo.billingaddress[this.eventData.target.id];
      this.billingAddressChanged = false;
    } else if (this.shippingAddressChanged) {
      this.eventData.target.value = this.userInfo.shippingaddress[this.eventData.target.id];
      this.shippingAddressChanged = false;
    } else if (this.shippingProvinceChanged) {
      this.selectedProvince = this.userInfo.shippingaddress.province;
      this.shippingProvinceChanged = false;
    } else if (this.shippingCountryChanged) {
      this.selectedCountry = this.userInfo.shippingaddress.country;
      this.shippingProvinceChanged = false;
    } else if (this.billingProvinceChanged) {
      this.selectedBillingProvince = this.userInfo.billingaddress.province;
      this.billingProvinceChanged = false;
    } else if (this.shippingAddressChanged) {
      this.selectedBillingCountry = this.userInfo.billingaddress.country;
      this.billingCountryChanged = false;
    } else {
      this.eventData.target.value = this.userInfo[this.eventData.target.id];
    }
    this.eventData = undefined;
  }

  changeImage() {
    this.showEditImageModal = true;
  }

  loadImageFailed () {
  }
}

