import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CrmService } from '../../../../services/crm.service';

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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedUncroppedFile = event.target.files[0];
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }

  imageLoaded() {

  }
  constructor(private router: Router, private crmService: CrmService ) {

    this.eventData = undefined;
    this.name = 'Angular2';

    this.data1 = {};
  }

  public onReturnData(data: any) {
    // Do what you want to do
    console.warn(JSON.parse(data));
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

    this.crmService.uploadProfileImage(3, uploadData).subscribe(res => {
      console.log('imga result: ', res);
      this.userInfo.profileLink = res.data.fulfillmentValue.pictureURI;
      this.changedUserInfo.emit({'data': this.userInfo});
    });
  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }

  showConfirmModal(event) {
    if (this.eventData) { return false; }
    if (event.target.value.trim() !== this.userInfo[event.target.id]) {
      this.showModal = true;
      this.eventData = event;
     } else {
       this.showModal = false;
    }
  }

  onKeywordsChanged(event) {
    const keywordIds = event.map( k => k.id);
    this.userInfo.keywordIds = keywordIds;
    this.changedUserInfo.emit({'data': this.userInfo});
  }

  confirmChange() {
    this.userInfo[this.eventData.target.id] = this.eventData.target.value;
    this.eventData = undefined;
    this.changedUserInfo.emit({'data': this.userInfo});
  }

  cancelChange() {
    this.eventData.target.value = this.userInfo[this.eventData.target.id];
    this.eventData = undefined;
  }

  ngOnInit() {
    this.userInfo.primaryphone = this.formatPhoneNumber(this.userInfo.primaryphone);
    this.userInfo.mobilephone = this.formatPhoneNumber(this.userInfo.mobilephone);
  }

  changeImage() {
    this.showEditImageModal = true;
  }

  loadImageFailed () {
  }
}

