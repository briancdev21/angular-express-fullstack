import { Component, Input } from '@angular/core';
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
export class ProfileInfoBarComponent {

  @Input() userInfo;
  showModal = false;
  eventData: any;
  primaryphone: any;

  constructor(private router: Router) {

  }

  formatPhoneNumber(s) {
    const s2 = ('' + s).replace(/\D/g, '');
    const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
  }

  showConfirmModal(event) {
    console.log('sdf:',  this.userInfo[event.target.id]);
    if (event.target.value.trim() !== this.userInfo[event.target.id]) {
      this.showModal = true;
      this.eventData = event;
      console.log('even:', event);
     } else {
       this.showModal = false;
    }
  }

  confirmChange() {
    this.userInfo[this.eventData.target.id] = this.eventData.target.value;
  }

  cancelChange() {
    this.eventData.target.value = this.userInfo[this.eventData.target.id];
  }

  ngOnInit() {
    this.userInfo.primaryphone = this.formatPhoneNumber(this.userInfo.primaryphone);
    this.userInfo.mobilephone = this.formatPhoneNumber(this.userInfo.mobilephone);
  }
}
