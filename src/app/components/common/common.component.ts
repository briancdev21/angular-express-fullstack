import {Component, EventEmitter, Input, Output, HostListener} from '@angular/core';

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
}
