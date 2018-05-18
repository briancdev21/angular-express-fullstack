import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../services/shared.service';

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

  @Input() productInfo;
  data1: any;
  showEditImageModal = false;
  keywordsList;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  // croppedImage = this.productInfo.profileLink;

  constructor(private router: Router, private sharedService: SharedService) {
    this.data1 = {};
    this.sharedService.getKeywords().subscribe(res => {
      this.keywordsList = res.results;
      console.log('keywords: ', this.keywordsList);
    });
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
      this.croppedImage = image;
  }

  imageLoaded() {

  }

  cancelCrop() {
    this.showEditImageModal = false;
  }

  saveCrop() {
    this.showEditImageModal = false;
    this.productInfo.pictureURI = this.croppedImage;
  }

  changeImage() {
    this.showEditImageModal = true;
  }

  getTagName(id) {
    return this.keywordsList.filter(k => k.id === id)[0].name;
  }

}

