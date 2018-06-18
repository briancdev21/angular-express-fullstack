import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class FilterService {
constructor() {
}

saveClicked: BehaviorSubject<boolean> = new BehaviorSubject(false);
chargeFeeData: BehaviorSubject<any> = new BehaviorSubject({});
convertClicked: BehaviorSubject<boolean> = new BehaviorSubject(false);

}
