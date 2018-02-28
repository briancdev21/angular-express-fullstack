import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SubnavHandlerService {
  public onNewData = new BehaviorSubject<boolean>(false);
  public submenudata = new BehaviorSubject<boolean>(false);
  public topmenudata = new BehaviorSubject<boolean>(false);

  currentvalue = this.onNewData.asObservable();
  assignvalue = this.submenudata.asObservable();
  mrotatevalue = this.topmenudata.asObservable();

  menurotate( rotatemenu: boolean) {
    this.onNewData.next( rotatemenu );
  }

  submenuhandler( assign: boolean ) {
    this.submenudata.next( assign );
  }

  topmenuhandler( mrotate: boolean ) {
    this.topmenudata.next( mrotate );
  }
}
