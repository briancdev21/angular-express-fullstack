import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class CollaborationService {
  private closeSidebar = new BehaviorSubject<boolean>(false);

  closeEvent = this.closeSidebar.asObservable();

  constructor() {

  }

  closeSidebarModal(data) {
    this.closeSidebar.next(data);
  }
}
