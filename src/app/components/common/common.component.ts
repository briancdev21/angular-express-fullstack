import {Component, EventEmitter, Input, Output, HostListener} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})


export class CommonComponent {
  mRotateMenu = true;
  mProfileOpened = false;
  mAlertOpened = false;
  mNotificationOpened = false;

  constructor (private router: Router) {
    const m = localStorage.getItem('menu_collapsed');
    if (m === 'true') {
      this.mRotateMenu = true;
    } else if (m === 'false') {
      this.mRotateMenu = false;
    } else {
      this.mRotateMenu = true;
    }
    this.expandSidebar.emit(!this.mRotateMenu);
  }

  @Output() expandSidebar = new EventEmitter<boolean>();
  @HostListener('window:click', ['$event'])
  handleClick( event: any ): void {
    if (this.mProfileOpened || this.mAlertOpened || this.mNotificationOpened) {
      this.mProfileOpened = false;
      this.mNotificationOpened = false;
      this.mAlertOpened = false;
    }
 }

  toggleMenuRotate(): void {
    this.mRotateMenu = !this.mRotateMenu;
    localStorage.setItem( 'menu_collapsed', this.mRotateMenu.toString() );
    this.expandSidebar.emit(this.mRotateMenu);
  }

  openProfile(event: any): void {
    this.mProfileOpened = !this.mProfileOpened;
    this.mAlertOpened = false;
    this.mNotificationOpened = false;
  }

  openNotifications(event: any): void {
    this.mNotificationOpened = !this.mNotificationOpened;
    this.mAlertOpened = false;
    this.mProfileOpened = false;
  }

  openAlerts(event: any): void {
    this.mAlertOpened = !this.mAlertOpened;
    this.mNotificationOpened = false;
    this.mProfileOpened = false;
  }

  goToUserProfile() {
    this.router.navigate(['./userprofile']);
  }

  goToUserSettings() {
    this.router.navigate(['./settings']);
  }
}
