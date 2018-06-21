import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class PmService {

  currentProjectId: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {
  }

}
