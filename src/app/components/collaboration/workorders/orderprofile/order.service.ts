import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class OrderService {

	private openAvailabilityModal = new BehaviorSubject<boolean>(false);
	private timelineData = new BehaviorSubject<any>({});
	private availableStaff = new BehaviorSubject<any>({});
	private removedStaff = new BehaviorSubject<any>({});
	saveWorkOrder: BehaviorSubject<object> = new BehaviorSubject({});

	openModal = this.openAvailabilityModal.asObservable();
	getTimelineData = this.timelineData.asObservable();
	getAvailableStaff = this.availableStaff.asObservable();
	getRemovedStaff = this.removedStaff.asObservable();


	constructor() {
	}

	showAvailabilityModal(data) {
		this.openAvailabilityModal.next(data);
	}

	postTimelineData(data) {
		this.timelineData.next(data);
	}

	postAvailableStaff(data) {
		this.availableStaff.next(data);
	}

	postRemovedStaff (data) {
		this.removedStaff.next(data);
	}
}
