import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MultiKeywordSelectComponent } from '../multikeywordselect/multikeywordselect.component';

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
  @Output() changedUserInfo = new EventEmitter;
  showModal = false;
  eventData: any;
  primaryphone: any;
  name: string;
  data1: any;
  showEditImageModal = false;
  customerNotes: string;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  // croppedImage = this.userInfo.profileLink;

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }

  imageLoaded() {

  }
  constructor(private router: Router) {

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

  saveCrop() {
    this.showEditImageModal = false;
    this.userInfo.profileLink = this.croppedImage;
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
    console.log('keywords changed: ', event);
    const keywordIds = event.map( k => k.id);
    this.userInfo.keywordIds = keywordIds;
    this.changedUserInfo.emit({'data': this.userInfo});
    console.log('this.uerif: ', this.userInfo);
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

