import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class SalesService {

  selectedCategory: BehaviorSubject<string> = new BehaviorSubject('');
  deletedCategory: BehaviorSubject<string> = new BehaviorSubject('');
  proposalAdded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
  }

}
