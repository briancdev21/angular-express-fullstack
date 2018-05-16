import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productinfobar',
  templateUrl: './productinfobar.component.html',
  styleUrls: [
    './productinfobar.component.css'
  ],
  entryComponents: [
  ]
})
export class ProductInfoBarComponent implements OnInit {

  @Input() userInfo;
  data1: any;
  showEditImageModal = false;

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
    this.data1 = {};
  }

  cancelCrop() {
    this.showEditImageModal = false;
  }

  saveCrop() {
    this.showEditImageModal = false;
    this.userInfo.profileLink = this.croppedImage;
  }

  ngOnInit() {
  }

}

