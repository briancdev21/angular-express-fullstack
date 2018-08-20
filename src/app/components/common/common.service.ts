import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class CommonService {

  showAlertModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showYnModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
  }

}
