import { Injectable, Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class ProductProfileService {
  editModalClosed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  productDetailsUpdate: BehaviorSubject<boolean> = new BehaviorSubject(false);
  productPricingCategoryUpdate: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {

  }
}
