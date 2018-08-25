import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class FilterService {
  openImageUploadModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  sendImageData: BehaviorSubject<any> = new BehaviorSubject({});
  constructor() {
  }
}
